<?php

namespace App\Http\Controllers;

use App\Services\ChunkedUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

abstract class Controller
{
    /**
     * Page size taken from ?per_page, bounded so a visitor cannot request the whole table.
     */
    protected function perPage(int $default = 15, int $max = 100): int
    {
        return max(1, min((int) request()->input('per_page', $default), $max));
    }

    /**
     * Resolve the files submitted with a form, whether posted directly (small files)
     * or uploaded earlier through the chunked uploader (referenced by "<field>_upload_id").
     *
     * Returns the data with the stored paths filled in, the paths of files that were
     * replaced (delete them only after the record was saved), and details of each new file.
     *
     * @param  array<string, mixed>  $data  validated request data
     * @param  array<string, string>  $columns  form field => database column
     * @param  array<string, string>  $nameColumns  form field => column that keeps the name the file was uploaded with
     * @return array{0: array<string, mixed>, 1: list<string>, 2: array<string, array{path: string, mime: string, size: int, name: string}>}
     */
    protected function applyUploads(Request $request, array $data, string $context, array $columns, ?object $existing = null, array $nameColumns = []): array
    {
        $uploads = app(ChunkedUploadService::class);
        $obsolete = [];
        $files = [];

        foreach ($columns as $field => $column) {
            unset($data[$field], $data["{$field}_upload_id"]);

            $file = $request->hasFile($field)
                ? $uploads->storeDirect($request->file($field), $context)
                : $uploads->consume($request->input("{$field}_upload_id"), $request->user(), $context, $field);

            if ($file === null) {
                continue;
            }

            $data[$column] = $file['path'];
            $files[$field] = $file;

            if (isset($nameColumns[$field])) {
                $data[$nameColumns[$field]] = $file['name'];
            }

            if ($existing && ! empty($existing->{$column})) {
                $obsolete[] = $existing->{$column};
            }
        }

        return [$data, $obsolete, $files];
    }

    /**
     * @param  list<string>  $paths
     */
    protected function deleteStoredFiles(array $paths): void
    {
        foreach ($paths as $path) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Send a stored file. Uses a file response so browsers can resume large downloads (HTTP Range).
     */
    protected function sendPublicFile(?string $path, string $downloadName): BinaryFileResponse
    {
        abort_if(blank($path) || ! Storage::disk('public')->exists($path), 404, 'File not found.');

        // Titles may contain characters that are illegal in a Content-Disposition file name (for example "/").
        $safeName = trim(preg_replace('/[\\\\\/:*?"<>|\r\n]+/', '-', $downloadName), ' .-') ?: 'download';

        return response()->download(Storage::disk('public')->path($path), $safeName);
    }
}
