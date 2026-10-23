<?php

use App\Enums\DownloadCategory;
use App\Models\Download;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
    Storage::fake('public');
});

it('offers one fixed list of categories with consistent spelling', function () {
    expect(DownloadCategory::values())->toBe(['General', 'Document', 'Picture', 'Form', 'Report']);
});

it('maps every historical spelling to the right category', function (?string $stored, DownloadCategory $expected) {
    expect(DownloadCategory::normalize($stored))->toBe($expected);
})->with([
    'misspelled document' => ['Dcument', DownloadCategory::Document],
    'another misspelling' => ['Documet', DownloadCategory::Document],
    'lowercase document' => ['document', DownloadCategory::Document],
    'uppercase document' => ['DOCUMENT', DownloadCategory::Document],
    'short picture' => ['pic', DownloadCategory::Picture],
    'lowercase picture' => ['picture', DownloadCategory::Picture],
    'capitalised picture' => ['Picture', DownloadCategory::Picture],
    'singular form' => ['form', DownloadCategory::Form],
    'plural forms' => ['forms', DownloadCategory::Form],
    'plural reports' => ['reports', DownloadCategory::Report],
    'padded value' => ['  Report ', DownloadCategory::Report],
    'general' => ['general', DownloadCategory::General],
    'unknown value' => ['something else entirely', DownloadCategory::General],
    'empty' => ['', DownloadCategory::General],
    'null' => [null, DownloadCategory::General],
]);

it('corrects the categories of existing records when migrating', function () {
    $stored = ['Dcument', 'Documet', 'document', 'Document', 'pic', 'Picture', 'picture', 'form', 'forms', 'reports', 'general'];

    foreach ($stored as $category) {
        Download::factory()->create(['category' => $category]);
    }

    (require database_path('migrations/2026_10_23_000000_normalize_download_categories.php'))->up();

    expect(DB::table('downloads')->distinct()->orderBy('category')->pluck('category')->all())
        ->toBe(['Document', 'Form', 'General', 'Picture', 'Report'])
        ->and(Download::where('category', 'Document')->count())->toBe(4)
        ->and(Download::where('category', 'Picture')->count())->toBe(3)
        ->and(Download::where('category', 'Form')->count())->toBe(2);
});

it('rejects categories that are not in the fixed list', function (string $category) {
    $this->post(route('downloads.store'), [
        'title' => 'Account opening form',
        'file' => UploadedFile::fake()->create('form.pdf', 100),
        'category' => $category,
    ])->assertSessionHasErrors('category');

    expect(Download::count())->toBe(0);
})->with(['forms', 'form', 'picture', 'Dcument', 'reports', '']);

it('accepts every category in the list when creating and updating', function (string $category) {
    $this->post(route('downloads.store'), [
        'title' => "A {$category}",
        'file' => UploadedFile::fake()->create('file.pdf', 100),
        'category' => $category,
    ])->assertRedirect(route('downloads.index'));

    $download = Download::where('title', "A {$category}")->firstOrFail();

    $this->put(route('downloads.update', $download), [
        'title' => "A {$category}",
        'category' => 'General',
    ])->assertRedirect(route('downloads.index'));

    expect($download->fresh()->category)->toBe('General');
})->with(fn () => DownloadCategory::values());

it('passes the category list to the admin pages', function () {
    $download = Download::factory()->create();

    foreach ([route('downloads.index'), route('downloads.create'), route('downloads.edit', $download)] as $url) {
        $this->get($url)->assertInertia(fn ($page) => $page->where('categories', DownloadCategory::values()));
    }
});

it('lists every active file of a category on the public page, not only the first page of results', function () {
    Download::factory()->count(15)->create(['category' => 'Form', 'is_active' => true]);
    Download::factory()->count(3)->create(['category' => 'Picture', 'is_active' => true]);
    Download::factory()->create(['category' => 'Form', 'is_active' => false]);

    $this->get(route('public-downloads', ['category' => 'Form', 'per_page' => 100]))
        ->assertInertia(fn ($page) => $page
            ->where('activeCategory', 'Form')
            ->where('downloads.total', 15)
            ->where('categories', DownloadCategory::values()));

    $this->get(route('public-downloads', ['category' => 'Picture']))
        ->assertInertia(fn ($page) => $page->where('downloads.total', 3));
});

it('shows all active files when no or an unknown category is requested', function () {
    Download::factory()->count(4)->create(['category' => 'Document', 'is_active' => true]);
    Download::factory()->count(2)->create(['category' => 'Form', 'is_active' => true]);

    foreach ([[], ['category' => 'bogus']] as $query) {
        $this->get(route('public-downloads', $query))
            ->assertInertia(fn ($page) => $page->where('activeCategory', null)->where('downloads.total', 6));
    }
});
