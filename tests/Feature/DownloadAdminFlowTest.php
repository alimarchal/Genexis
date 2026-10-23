<?php

use App\Models\Download;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('local');
    Storage::fake('public');

    $this->admin = $this->createAdminUser();
});

it('saves a download uploaded in chunks, lists it in admin and on the public documents page, and serves the file', function () {
    $uploadId = chunkedUpload($this->admin, 'downloads', 'Tender Notice.pdf', pdfBytes(120));

    $this->actingAs($this->admin)->post(route('downloads.store'), [
        'title' => 'Tender Notice',
        'category' => 'Document',
        'is_active' => true,
        'file_upload_id' => $uploadId,
    ])->assertRedirect(route('downloads.index'))
        ->assertSessionHas('success', 'Download created successfully.');

    $download = Download::where('title', 'Tender Notice')->firstOrFail();
    expect($download->is_active)->toBeTrue()
        ->and($download->file_size)->toBe(120)
        ->and($download->created_by)->toBe($this->admin->id);

    $this->actingAs($this->admin)->get(route('downloads.index'))
        ->assertInertia(fn ($page) => $page->component('Download/Index')->has('downloads.data', 1)->where('downloads.data.0.title', 'Tender Notice'));

    $this->get(route('public-downloads'))
        ->assertInertia(fn ($page) => $page->has('downloads.data', 1)->where('downloads.data.0.title', 'Tender Notice'));

    $response = $this->actingAs($this->admin)->get(route('downloads.admin-download', $download))->assertOk();
    expect($response->headers->get('content-disposition'))->toContain('Tender Notice.pdf')
        ->and($download->fresh()->download_count)->toBe(1);
});

it('shows the success message to the admin after saving', function () {
    $uploadId = chunkedUpload($this->admin, 'downloads', 'a.pdf', pdfBytes(60));

    $this->actingAs($this->admin)->followingRedirects()->post(route('downloads.store'), [
        'title' => 'Flash check',
        'category' => 'Form',
        'file_upload_id' => $uploadId,
    ])->assertInertia(fn ($page) => $page->component('Download/Index')->where('flash.success', 'Download created successfully.'));

    $this->get(route('downloads.index'))->assertInertia(fn ($page) => $page->where('flash.success', null));
});

it('rejects a save without a file and reports it on the file field', function () {
    $this->actingAs($this->admin)->from(route('downloads.create'))->post(route('downloads.store'), [
        'title' => 'No file',
        'category' => 'Document',
    ])->assertRedirect(route('downloads.create'))->assertSessionHasErrors('file');

    expect(Download::count())->toBe(0);
});

it('reports an upload that is no longer valid instead of silently dropping it', function () {
    $this->actingAs($this->admin)->from(route('downloads.create'))->post(route('downloads.store'), [
        'title' => 'Stale upload',
        'category' => 'Document',
        'file_upload_id' => '2f1c9a0e-0000-4000-8000-000000000000',
    ])->assertSessionHasErrors('file_upload_id');

    expect(Download::count())->toBe(0);
});

it('serves an active file through the admin download link to visitors and admins alike', function () {
    Storage::disk('public')->put('downloads/active.pdf', pdfBytes(50));
    $active = Download::factory()->create(['is_active' => true, 'file_path' => 'downloads/active.pdf', 'title' => 'Active file']);

    $this->get(route('downloads.admin-download', $active))->assertOk();
    $this->actingAs($this->admin)->get(route('downloads.admin-download', $active))->assertOk();
});

it('answers 404 when the stored file is missing instead of failing', function () {
    $missing = Download::factory()->create(['is_active' => true, 'file_path' => 'downloads/gone.pdf']);

    $this->actingAs($this->admin)->get(route('downloads.admin-download', $missing))->assertNotFound();
});
