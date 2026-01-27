<?php

use App\Models\Download;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view downloads index page', function () {
    Download::factory()->count(3)->create();

    $response = $this->get(route('downloads.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Index'));
});

test('it can view create download page', function () {
    $response = $this->get(route('downloads.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Create'));
});

test('it can create download with valid data', function () {
    $file = UploadedFile::fake()->create('document.pdf', 1000);

    $response = $this->post(route('downloads.store'), [
        'title' => 'Test Download',
        'description' => 'Test description',
        'file' => $file,
        'category' => 'forms',
        'is_featured' => true,
        'is_active' => true,
    ]);

    $response->assertRedirect(route('downloads.index'));
    $response->assertSessionHas('success', 'Download created successfully.');

    $this->assertDatabaseHas('downloads', [
        'title' => 'Test Download',
        'description' => 'Test description',
        'category' => 'forms',
        'is_featured' => true,
        'is_active' => true,
        'created_by' => $this->user->id,
    ]);

    Storage::disk('public')->assertExists('downloads/' . $file->hashName());
});

test('it validates required fields when creating download', function () {
    $response = $this->post(route('downloads.store'), []);

    $response->assertSessionHasErrors(['title', 'file', 'category']);
});

test('it validates file type when creating download', function () {
    $file = UploadedFile::fake()->create('document.txt', 1000);

    $response = $this->post(route('downloads.store'), [
        'title' => 'Test Download',
        'file' => $file,
        'category' => 'forms',
        'is_featured' => true,
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors('file');
});

test('it can view download details', function () {
    $download = Download::factory()->create();

    $response = $this->get(route('downloads.show', $download));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Show'));
});

test('it can view edit download page', function () {
    $download = Download::factory()->create();

    $response = $this->get(route('downloads.edit', $download));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Edit'));
});

test('it can update download', function () {
    $download = Download::factory()->create();

    $response = $this->put(route('downloads.update', $download), [
        'title' => 'Updated Download',
        'description' => 'Updated description',
        'category' => 'reports',
        'is_featured' => false,
        'is_active' => false,
    ]);

    $response->assertRedirect(route('downloads.index'));
    $response->assertSessionHas('success', 'Download updated successfully.');

    $this->assertDatabaseHas('downloads', [
        'id' => $download->id,
        'title' => 'Updated Download',
        'description' => 'Updated description',
        'category' => 'reports',
        'is_featured' => false,
        'is_active' => false,
        'updated_by' => $this->user->id,
    ]);
});

test('it can update download with new file', function () {
    $oldFile = UploadedFile::fake()->create('old.pdf', 1000);
    $download = Download::factory()->create([
        'file_path' => $oldFile->store('downloads', 'public'),
    ]);

    $newFile = UploadedFile::fake()->create('new.pdf', 1500);

    $response = $this->put(route('downloads.update', $download), [
        'title' => $download->title,
        'description' => $download->description,
        'file' => $newFile,
        'category' => $download->category,
        'is_featured' => $download->is_featured,
        'is_active' => $download->is_active,
    ]);

    $response->assertRedirect(route('downloads.index'));

    $download->refresh();
    expect($download->file_path)->toContain('downloads/');
    expect($download->file_type)->toBe('application/pdf');
    expect($download->file_size)->toBeGreaterThan(0);
});

test('it can delete download', function () {
    $file = UploadedFile::fake()->create('document.pdf', 1000);
    $download = Download::factory()->create([
        'file_path' => $file->store('downloads', 'public'),
    ]);

    $response = $this->delete(route('downloads.destroy', $download));

    $response->assertRedirect(route('downloads.index'));
    $response->assertSessionHas('success', 'Download deleted successfully.');

    $this->assertDatabaseMissing('downloads', ['id' => $download->id]);
    Storage::disk('public')->assertMissing($download->file_path);
});

test('it can download file and increment counter', function () {
    // Create a real file that can be downloaded
    $file = UploadedFile::fake()->create('document.pdf', 1000);
    $storedPath = $file->store('downloads', 'public');

    // Ensure the file exists in the fake storage
    Storage::disk('public')->assertExists($storedPath);

    $download = Download::factory()->create([
        'file_path' => $storedPath,
        'download_count' => 0,
    ]);

    $response = $this->get(route('downloads.admin-download', $download));

    $response->assertStatus(200);

    $download->refresh();
    expect($download->download_count)->toBe(1);
});

test('it returns 404 for missing file', function () {
    $download = Download::factory()->create([
        'file_path' => 'nonexistent/file.pdf',
    ]);

    $response = $this->get(route('downloads.admin-download', $download));

    $response->assertStatus(404);
});

test('it can view public downloads page', function () {
    Download::factory()->count(5)->create(['is_active' => true]);
    Download::factory()->count(2)->create(['is_active' => false]);

    $response = $this->get(route('public-downloads'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('Rates/PublicDownloads')
            ->has('downloads.data', 5)
    );
});

test('it filters downloads by search query', function () {
    $downloads = Download::factory()->count(5)->create();

    $response = $this->get(route('downloads.index', ['filter[title]' => $downloads->first()->title]));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Index'));
});

test('it filters downloads by category', function () {
    Download::factory()->create(['category' => 'forms']);
    Download::factory()->create(['category' => 'reports']);

    $response = $this->get(route('downloads.index', ['filter[category]' => 'forms']));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Index'));
});

test('it filters downloads by status', function () {
    Download::factory()->create(['is_active' => true]);
    Download::factory()->create(['is_active' => false]);

    $response = $this->get(route('downloads.index', ['filter[is_active]' => '1']));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Index'));
});

test('it filters downloads by featured status', function () {
    Download::factory()->create(['is_featured' => true]);
    Download::factory()->create(['is_featured' => false]);

    $response = $this->get(route('downloads.index', ['filter[is_featured]' => '1']));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Download/Index'));
});

test('public downloads only shows active downloads', function () {
    Download::factory()->count(3)->create(['is_active' => true]);
    Download::factory()->count(2)->create(['is_active' => false]);

    $response = $this->get(route('public-downloads'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('Rates/PublicDownloads')
            ->has('downloads.data', 3)
    );
});

test('public downloads orders by featured then created date', function () {
    $regular = Download::factory()->create([
        'is_active' => true,
        'is_featured' => false,
        'created_at' => now()->subDays(1),
    ]);

    $featured = Download::factory()->create([
        'is_active' => true,
        'is_featured' => true,
        'created_at' => now()->subDays(2),
    ]);

    $response = $this->get(route('public-downloads'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('Rates/PublicDownloads')
            ->where('downloads.data.0.id', $featured->id)
            ->where('downloads.data.1.id', $regular->id)
    );
});
