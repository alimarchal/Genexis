<?php

use App\Enums\UploadStatus;
use App\Models\UploadSession;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleAndPermissionSeeder::class);
    Storage::fake('local');
    Storage::fake('public');
    config([
        'bank.uploads.chunk_size' => 10,
        'bank.uploads.staff_max_bytes' => 50,
        'bank.uploads.super_admin_max_bytes' => 10_000_000_000,
        'bank.uploads.reserve_bytes' => 0,
        'bank.uploads.max_active_per_user' => 3,
    ]);

    $this->root = User::factory()->create();
    $this->root->assignRole('super-admin');
    $this->staff = User::factory()->create();
    $this->staff->givePermissionTo(['create downloads', 'edit downloads']);
});

describe('starting an upload', function () {
    it('rejects guests', function () {
        $this->postJson(route('admin.uploads.store'), [])->assertUnauthorized();
    });

    it('lets a staff member with the module permission start a small upload', function () {
        startUpload($this->staff)->assertCreated()
            ->assertJsonPath('status', 'uploading')
            ->assertJsonPath('offset', 0)
            ->assertJsonPath('chunk_size', 10);

        expect(UploadSession::count())->toBe(1);
    });

    it('forbids staff without the module permission', function () {
        startUpload(User::factory()->create())->assertForbidden();
        startUpload($this->staff, ['context' => 'financial-reports'])->assertForbidden();
    });

    it('keeps large files for super-admins only', function () {
        startUpload($this->staff, ['size' => 51])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('size');

        startUpload($this->root, ['size' => 5 * 1024 * 1024 * 1024])->assertCreated();
    });

    it('enforces the super-admin ceiling too', function () {
        startUpload($this->root, ['size' => 10_000_000_001])->assertUnprocessable()->assertJsonValidationErrors('size');
    });

    it('only accepts known upload types and allowed extensions', function (array $payload, string $errorField) {
        startUpload($this->root, $payload)->assertStatus(422);
    })->with([
        'unknown type' => [['context' => 'secrets'], 'context'],
        'executable' => [['filename' => 'virus.exe'], 'filename'],
        'php script' => [['filename' => 'shell.php'], 'filename'],
        'double extension' => [['filename' => 'invoice.pdf.php'], 'filename'],
        'no extension' => [['filename' => 'README'], 'filename'],
        'empty file' => [['size' => 0], 'size'],
    ]);

    it('accepts uppercase extensions', function () {
        startUpload($this->root, ['filename' => 'REPORT.PDF'])->assertCreated();
    });

    it('limits how many uploads one user can run at the same time', function () {
        foreach (range(1, 3) as $ignored) {
            startUpload($this->root)->assertCreated();
        }

        startUpload($this->root)->assertUnprocessable();
    });

    it('refuses when the disk cannot hold the file', function () {
        config(['bank.uploads.reserve_bytes' => PHP_INT_MAX / 2]);

        startUpload($this->root)->assertUnprocessable()->assertJsonValidationErrors('size');
    });

    it('stores the client name safely and never uses it as a path', function () {
        $id = startUpload($this->root, ['filename' => '../../etc/passwd.pdf'])->assertCreated()->json('id');

        expect(UploadSession::where('uuid', $id)->first()->original_name)->toBe('passwd.pdf');
    });
});

describe('sending chunks', function () {
    it('assembles a file from chunks and reports progress', function () {
        $content = pdfBytes(25);
        $id = startUpload($this->root)->json('id');

        sendChunk($this->root, $id, 0, substr($content, 0, 10))->assertOk()->assertJsonPath('offset', 10)->assertJsonPath('progress', 40);
        sendChunk($this->root, $id, 10, substr($content, 10, 10))->assertOk()->assertJsonPath('offset', 20)->assertJsonPath('progress', 80);
        sendChunk($this->root, $id, 20, substr($content, 20))->assertOk()->assertJsonPath('progress', 100);

        $done = $this->actingAs($this->root)->postJson(route('admin.uploads.complete', $id))->assertOk()->assertJsonPath('status', 'completed');

        $session = UploadSession::where('uuid', $id)->first();
        expect($session->status)->toBe(UploadStatus::Completed)
            ->and($session->final_path)->toStartWith('downloads/')->toEndWith('.pdf')
            ->and(Storage::disk('public')->get($session->final_path))->toBe($content)
            ->and($session->sha256)->toBe(hash('sha256', $content))
            ->and($session->mime)->toBe('application/pdf')
            ->and($session->temp_path)->toBeNull()
            ->and(Storage::disk('local')->allFiles('uploads/tmp'))->toBe([]);
    });

    it('lets the browser resume by asking where the server stopped', function () {
        $id = startUpload($this->root)->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();

        $this->actingAs($this->root)->getJson(route('admin.uploads.show', $id))
            ->assertOk()->assertJsonPath('offset', 10)->assertJsonPath('status', 'uploading');
    });

    it('answers 409 with the right offset when a chunk arrives out of order', function () {
        $id = startUpload($this->root)->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();

        sendChunk($this->root, $id, 20, pdfBytes(5))->assertStatus(409)->assertJsonPath('offset', 10);
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertStatus(409)->assertJsonPath('offset', 10);

        expect(UploadSession::where('uuid', $id)->value('received_bytes'))->toBe(10);
    });

    it('never lets a failed chunk corrupt what was already stored', function () {
        $id = startUpload($this->root)->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();

        sendChunk($this->root, $id, 10, str_repeat('z', 11))->assertStatus(413);
        sendChunk($this->root, $id, 10, '')->assertStatus(422);

        $session = UploadSession::where('uuid', $id)->first();
        expect($session->received_bytes)->toBe(10)
            ->and(filesize(Storage::disk('local')->path($session->temp_path)))->toBe(10);

        sendChunk($this->root, $id, 10, pdfBytes(10))->assertOk()->assertJsonPath('offset', 20);
    });

    it('rejects data beyond the declared size', function () {
        $id = startUpload($this->root, ['size' => 12])->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();

        sendChunk($this->root, $id, 10, pdfBytes(5))->assertStatus(413);
        sendChunk($this->root, $id, 10, pdfBytes(2))->assertOk();
    });

    it('requires the offset header', function () {
        $id = startUpload($this->root)->json('id');

        $this->actingAs($this->root)->call('PUT', route('admin.uploads.chunk', $id), [], [], [], ['HTTP_ACCEPT' => 'application/json'], 'abc')->assertStatus(422);
    });

    it('handles offsets beyond 2 GB and 4 GB without integer overflow', function () {
        $size = 5 * 1024 * 1024 * 1024;
        $id = startUpload($this->root, ['size' => $size])->json('id');
        $session = UploadSession::where('uuid', $id)->first();

        $resumeAt = 4 * 1024 * 1024 * 1024 + 123;
        $handle = fopen(Storage::disk('local')->path($session->temp_path), 'cb');
        ftruncate($handle, $resumeAt);
        fclose($handle);
        $session->forceFill(['received_bytes' => $resumeAt])->save();

        sendChunk($this->root, $id, $resumeAt, pdfBytes(10))->assertOk()->assertJsonPath('offset', $resumeAt + 10);

        clearstatcache();
        expect(filesize(Storage::disk('local')->path($session->temp_path)))->toBe($resumeAt + 10)
            ->and($session->fresh()->received_bytes)->toBe($resumeAt + 10);

        Storage::disk('local')->delete($session->temp_path);
    });
});

describe('completing an upload', function () {
    it('refuses to complete while bytes are missing', function () {
        $id = startUpload($this->root)->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();

        $this->actingAs($this->root)->postJson(route('admin.uploads.complete', $id))
            ->assertUnprocessable()->assertJsonValidationErrors('upload');

        expect(UploadSession::where('uuid', $id)->value('status'))->toBe(UploadStatus::Uploading);
    });

    it('rejects a file whose content does not match its extension and removes it', function () {
        $id = startUpload($this->root, ['filename' => 'report.pdf', 'size' => 20])->json('id');
        $exe = "MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00\xb8\x00\x00\x00";
        sendChunk($this->root, $id, 0, substr($exe, 0, 10))->assertOk();
        sendChunk($this->root, $id, 10, substr($exe, 10, 10))->assertOk();

        $this->actingAs($this->root)->postJson(route('admin.uploads.complete', $id))
            ->assertUnprocessable()->assertJsonValidationErrors('upload');

        $session = UploadSession::where('uuid', $id)->first();
        expect($session->status)->toBe(UploadStatus::Failed)
            ->and($session->failure_reason)->toContain('does not match')
            ->and(Storage::disk('local')->allFiles('uploads/tmp'))->toBe([])
            ->and(Storage::disk('public')->allFiles())->toBe([]);
    });

    it('cannot be completed twice', function () {
        $id = startUpload($this->root, ['size' => 10])->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();
        $this->actingAs($this->root)->postJson(route('admin.uploads.complete', $id))->assertOk();

        $this->actingAs($this->root)->postJson(route('admin.uploads.complete', $id))->assertStatus(409);
        sendChunk($this->root, $id, 10, pdfBytes(1))->assertStatus(409);
    });
});

describe('ownership and cancelling', function () {
    it('keeps uploads private to their owner', function () {
        $id = startUpload($this->staff)->json('id');
        $other = User::factory()->create();
        $other->givePermissionTo('create downloads');

        $this->actingAs($other)->getJson(route('admin.uploads.show', $id))->assertForbidden();
        sendChunk($other, $id, 0, pdfBytes(5))->assertForbidden();
        $this->actingAs($other)->postJson(route('admin.uploads.complete', $id))->assertForbidden();
        $this->actingAs($other)->deleteJson(route('admin.uploads.destroy', $id))->assertForbidden();
    });

    it('lets a super-admin look at and cancel anyone’s upload', function () {
        $id = startUpload($this->staff)->json('id');

        $this->actingAs($this->root)->getJson(route('admin.uploads.show', $id))->assertOk();
        $this->actingAs($this->root)->deleteJson(route('admin.uploads.destroy', $id))->assertOk()->assertJsonPath('status', 'cancelled');
    });

    it('deletes the temporary file when cancelled', function () {
        $id = startUpload($this->root)->json('id');
        sendChunk($this->root, $id, 0, pdfBytes(10))->assertOk();
        expect(Storage::disk('local')->allFiles('uploads/tmp'))->toHaveCount(1);

        $this->actingAs($this->root)->deleteJson(route('admin.uploads.destroy', $id))->assertOk();

        expect(Storage::disk('local')->allFiles('uploads/tmp'))->toBe([]);
        sendChunk($this->root, $id, 10, pdfBytes(5))->assertStatus(409);
    });
});

describe('upload log', function () {
    it('is visible to super-admins only', function () {
        startUpload($this->staff)->assertCreated();

        $this->actingAs($this->staff)->get(route('admin.uploads.index'))->assertForbidden();

        $this->actingAs($this->root)->get(route('admin.uploads.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Uploads/Index')
                ->has('sessions.data', 1)
                ->where('sessions.data.0.user.id', $this->staff->id)
                ->where('sessions.data.0.progress_percent', 0));
    });

    it('filters by status', function () {
        UploadSession::factory()->create(['status' => UploadStatus::Failed]);
        UploadSession::factory()->create(['status' => UploadStatus::Completed]);

        $this->actingAs($this->root)->get(route('admin.uploads.index', ['status' => 'failed']))
            ->assertInertia(fn ($page) => $page->has('sessions.data', 1)->where('sessions.data.0.status', 'failed'));
    });
});

describe('pruning', function () {
    it('expires abandoned uploads and unused finished files, keeping recent and consumed ones', function () {
        $stalePart = 'uploads/tmp/stale.part';
        Storage::disk('local')->put($stalePart, 'partial');
        Storage::disk('public')->put('downloads/unused.pdf', 'x');
        Storage::disk('public')->put('downloads/used.pdf', 'x');

        $stale = UploadSession::factory()->create(['temp_path' => $stalePart, 'updated_at' => now()->subHours(30)]);
        $recent = UploadSession::factory()->create(['temp_path' => 'uploads/tmp/recent.part', 'updated_at' => now()->subHour()]);
        $unused = UploadSession::factory()->create(['status' => UploadStatus::Completed, 'final_path' => 'downloads/unused.pdf', 'completed_at' => now()->subHours(30)]);
        $used = UploadSession::factory()->create(['status' => UploadStatus::Completed, 'final_path' => 'downloads/used.pdf', 'completed_at' => now()->subHours(30), 'consumed_at' => now()->subHours(29)]);

        $this->artisan('uploads:prune')->assertSuccessful();

        expect($stale->fresh()->status)->toBe(UploadStatus::Expired)
            ->and(Storage::disk('local')->exists($stalePart))->toBeFalse()
            ->and($recent->fresh()->status)->toBe(UploadStatus::Uploading)
            ->and($unused->fresh()->status)->toBe(UploadStatus::Expired)
            ->and(Storage::disk('public')->exists('downloads/unused.pdf'))->toBeFalse()
            ->and($used->fresh()->status)->toBe(UploadStatus::Completed)
            ->and(Storage::disk('public')->exists('downloads/used.pdf'))->toBeTrue();
    });
});
