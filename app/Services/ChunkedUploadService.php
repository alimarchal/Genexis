<?php

namespace App\Services;

use App\Enums\UploadStatus;
use App\Models\UploadSession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Resumable chunked uploads for very large files (several GB).
 *
 * A browser cannot post a multi-gigabyte form: PHP, the web server and proxies all
 * cap request bodies. Instead the file is sent in small chunks that are appended to a
 * temporary file, tracked in the upload_sessions table, then validated and moved into
 * public storage. Every step is recorded so the process can be traced and resumed.
 */
class ChunkedUploadService
{
    private const TEMP_DISK = 'local';

    /**
     * @return array{max_bytes: int, label: string, permission: string, extensions: list<string>}
     */
    public function context(string $context): array
    {
        $definition = config("bank.uploads.contexts.{$context}");

        abort_if($definition === null, 422, 'Unknown upload type.');

        return $definition;
    }

    /**
     * Largest file this user may upload for an upload type. Anyone allowed to manage the module gets the
     * module's own limit; a super-admin may additionally always go up to the global super-admin ceiling.
     */
    public function maxBytesFor(User $user, string $context): int
    {
        $moduleLimit = (int) ($this->context($context)['max_bytes'] ?? 0);

        return $user->hasRole('super-admin')
            ? max($moduleLimit, (int) config('bank.uploads.super_admin_max_bytes'))
            : $moduleLimit;
    }

    public function mayUpload(User $user, string $context): bool
    {
        if ($user->hasRole('super-admin')) {
            return true;
        }

        $permission = $this->context($context)['permission'];

        return $user->can("create {$permission}") || $user->can("edit {$permission}");
    }

    /**
     * Upload limits (bytes) for every upload type the user may use.
     *
     * @return array<string, int>
     */
    public function limitsFor(User $user): array
    {
        return collect(array_keys(config('bank.uploads.contexts')))
            ->filter(fn (string $context) => $this->mayUpload($user, $context))
            ->mapWithKeys(fn (string $context) => [$context => $this->maxBytesFor($user, $context)])
            ->all();
    }

    public function start(User $user, string $context, string $filename, int $size, Request $request): UploadSession
    {
        $definition = $this->context($context);

        $this->authorizeStart($user, $context, $definition, $size);

        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        if (! in_array($extension, $definition['extensions'], true)) {
            throw ValidationException::withMessages([
                'filename' => 'This file type is not allowed here. Allowed: '.implode(', ', $definition['extensions']).'.',
            ]);
        }

        $active = UploadSession::where('user_id', $user->id)->where('status', UploadStatus::Uploading)->count();
        if ($active >= (int) config('bank.uploads.max_active_per_user')) {
            throw ValidationException::withMessages([
                'filename' => 'Too many uploads are already in progress. Finish or cancel one first.',
            ]);
        }

        $this->ensureDiskSpace($size);

        $uuid = (string) Str::uuid();
        $tempPath = "uploads/tmp/{$uuid}.part";
        Storage::disk(self::TEMP_DISK)->put($tempPath, '');

        return UploadSession::create([
            'uuid' => $uuid,
            'user_id' => $user->id,
            'context' => $context,
            'original_name' => Str::limit(basename(str_replace('\\', '/', $filename)), 250, ''),
            'extension' => $extension,
            'declared_size' => $size,
            'chunk_size' => (int) config('bank.uploads.chunk_size'),
            'status' => UploadStatus::Uploading,
            'received_bytes' => 0,
            'temp_path' => $tempPath,
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit((string) $request->userAgent(), 250, ''),
        ]);
    }

    /**
     * Anyone who may manage the module can upload up to the module's limit; nobody else can upload at all.
     *
     * @param  array{max_bytes: int, label: string, permission: string, extensions: list<string>}  $definition
     */
    private function authorizeStart(User $user, string $context, array $definition, int $size): void
    {
        if ($size < 1) {
            throw ValidationException::withMessages(['size' => 'The file is empty.']);
        }

        abort_unless($this->mayUpload($user, $context), 403, 'You are not allowed to upload files here.');

        $limit = $this->maxBytesFor($user, $context);

        if ($size > $limit) {
            throw ValidationException::withMessages([
                'size' => "The file is larger than the maximum of {$this->format($limit)} for {$definition['label']}.",
            ]);
        }
    }

    private function ensureDiskSpace(int $size): void
    {
        $free = @disk_free_space(Storage::disk(self::TEMP_DISK)->path(''));

        if ($free !== false && $free < $size + (int) config('bank.uploads.reserve_bytes')) {
            throw ValidationException::withMessages(['size' => 'The server does not have enough free disk space for this file.']);
        }
    }

    /**
     * Append one chunk. The offset must equal what the server already has, which makes retries safe.
     *
     * @param  resource  $stream
     */
    public function appendChunk(UploadSession $session, int $offset, $stream): UploadSession
    {
        abort_unless($session->isUploading(), 409, 'This upload is no longer active.');

        if ($offset !== $session->received_bytes) {
            throw new ConflictHttpException((string) $session->received_bytes);
        }

        $remaining = $session->declared_size - $session->received_bytes;
        $limit = min($remaining, $session->chunk_size);
        $path = Storage::disk(self::TEMP_DISK)->path($session->temp_path);

        $out = fopen($path, 'cb');
        abort_if($out === false, 500, 'Could not write the upload.');

        ftruncate($out, $session->received_bytes);
        fseek($out, $session->received_bytes);

        $written = stream_copy_to_stream($stream, $out, $limit + 1);
        fflush($out);

        if ($written === false || $written < 1 || $written > $limit) {
            ftruncate($out, $session->received_bytes);
            fclose($out);

            throw new HttpException($written > $limit ? 413 : 422, $written > $limit ? 'The chunk is larger than allowed.' : 'The chunk is empty.');
        }

        fclose($out);

        $session->forceFill([
            'received_bytes' => $session->received_bytes + $written,
            'last_chunk_at' => now(),
        ])->save();

        return $session;
    }

    /**
     * Verify the finished file and move it into public storage.
     */
    public function complete(UploadSession $session): UploadSession
    {
        abort_unless($session->isUploading(), 409, 'This upload is no longer active.');

        if ($session->received_bytes !== $session->declared_size) {
            throw ValidationException::withMessages([
                'upload' => "The upload is incomplete: {$session->received_bytes} of {$session->declared_size} bytes received.",
            ]);
        }

        @set_time_limit(0);

        $temp = Storage::disk(self::TEMP_DISK)->path($session->temp_path);

        if (filesize($temp) !== $session->declared_size) {
            return $this->fail($session, 'The assembled file size does not match the declared size.');
        }

        $mime = (string) (new \finfo(FILEINFO_MIME_TYPE))->file($temp);
        $allowed = config("bank.uploads.mimes.{$session->extension}", []);

        if (! in_array($mime, $allowed, true)) {
            return $this->fail($session, "The file content ({$mime}) does not match its .{$session->extension} extension.");
        }

        $finalPath = "{$session->context}/".Str::random(40).".{$session->extension}";
        $this->moveToPublic($temp, $finalPath);

        $session->forceFill([
            'status' => UploadStatus::Completed,
            'final_path' => $finalPath,
            'mime' => $mime,
            'sha256' => hash_file('sha256', Storage::disk('public')->path($finalPath)),
            'temp_path' => null,
            'completed_at' => now(),
        ])->save();

        return $session;
    }

    private function fail(UploadSession $session, string $reason): UploadSession
    {
        $this->deleteTemp($session);

        $session->forceFill(['status' => UploadStatus::Failed, 'failure_reason' => $reason, 'temp_path' => null])->save();

        throw ValidationException::withMessages(['upload' => $reason]);
    }

    private function moveToPublic(string $from, string $relativeTo): void
    {
        $public = Storage::disk('public');
        $public->makeDirectory(dirname($relativeTo));
        $target = $public->path($relativeTo);

        if (@rename($from, $target)) {
            return;
        }

        $in = fopen($from, 'rb');
        $out = fopen($target, 'wb');
        stream_copy_to_stream($in, $out);
        fclose($in);
        fclose($out);
        @unlink($from);
    }

    public function cancel(UploadSession $session): UploadSession
    {
        if ($session->isUploading()) {
            $this->deleteTemp($session);
            $session->forceFill(['status' => UploadStatus::Cancelled, 'temp_path' => null])->save();
        }

        return $session;
    }

    /**
     * Turn a completed upload into a stored file for a form submission. Single use, owner only.
     *
     * @return array{path: string, mime: string, size: int, name: string}|null
     */
    public function consume(?string $uuid, User $user, string $context, string $field): ?array
    {
        if (blank($uuid)) {
            return null;
        }

        return DB::transaction(function () use ($uuid, $user, $context, $field) {
            $session = UploadSession::where('uuid', $uuid)->lockForUpdate()->first();

            $valid = $session
                && $session->user_id === $user->id
                && $session->context === $context
                && $session->status === UploadStatus::Completed
                && $session->consumed_at === null
                && $session->final_path
                && Storage::disk('public')->exists($session->final_path);

            if (! $valid) {
                throw ValidationException::withMessages([
                    "{$field}_upload_id" => 'This upload is not valid any more. Please upload the file again.',
                ]);
            }

            $session->forceFill(['consumed_at' => now()])->save();

            return [
                'path' => $session->final_path,
                'mime' => (string) $session->mime,
                'size' => $session->declared_size,
                'name' => $session->original_name,
            ];
        });
    }

    /**
     * Store a normally posted (small) file with the real, server-detected type.
     *
     * @return array{path: string, mime: string, size: int, name: string}
     */
    public function storeDirect(UploadedFile $file, string $directory): array
    {
        $mime = (string) (new \finfo(FILEINFO_MIME_TYPE))->file($file->getRealPath());

        return [
            'path' => $file->store($directory, 'public'),
            'mime' => $mime,
            'size' => (int) $file->getSize(),
            'name' => $file->getClientOriginalName(),
        ];
    }

    /**
     * Remove abandoned uploads and finished files that no form ever claimed.
     *
     * @return array{expired: int, orphaned: int}
     */
    public function prune(): array
    {
        $cutoff = now()->subHours((int) config('bank.uploads.stale_hours'));
        $expired = 0;
        $orphaned = 0;

        UploadSession::where('status', UploadStatus::Uploading)
            ->where('updated_at', '<', $cutoff)
            ->each(function (UploadSession $session) use (&$expired) {
                $this->deleteTemp($session);
                $session->forceFill(['status' => UploadStatus::Expired, 'temp_path' => null])->save();
                $expired++;
            });

        UploadSession::where('status', UploadStatus::Completed)
            ->whereNull('consumed_at')
            ->where('completed_at', '<', $cutoff)
            ->each(function (UploadSession $session) use (&$orphaned) {
                if ($session->final_path) {
                    Storage::disk('public')->delete($session->final_path);
                }
                $session->forceFill(['status' => UploadStatus::Expired, 'final_path' => null])->save();
                $orphaned++;
            });

        return ['expired' => $expired, 'orphaned' => $orphaned];
    }

    private function deleteTemp(UploadSession $session): void
    {
        if ($session->temp_path) {
            Storage::disk(self::TEMP_DISK)->delete($session->temp_path);
        }
    }

    private function format(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $power = $bytes > 0 ? (int) floor(log($bytes, 1024)) : 0;

        return round($bytes / (1024 ** $power), 1).' '.$units[min($power, 4)];
    }
}
