<?php

use App\Models\FinancialHighlight;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('it can view financial highlights index page', function () {
    FinancialHighlight::factory()->count(3)->create();

    $response = $this->get(route('financial-highlights.index'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('FinancialHighlights/Index')
                ->has('financialHighlights.data', 3)
        );
});

// test('it can search financial highlights by fiscal year', function () {
//     FinancialHighlight::factory()->create(['fiscal_year' => 2023]);
//     FinancialHighlight::factory()->create(['fiscal_year' => 2024]);

//     $response = $this->get(route('financial-highlights.index', ['filter[search]' => '2023']));

//     $response->assertOk()
//         ->assertInertia(fn ($page) => $page
//             ->has('financialHighlights.data', 1)
//             ->where('financialHighlights.data.0.fiscal_year', 2023)
//         );
// });

test('it can sort financial highlights by fiscal year', function () {
    FinancialHighlight::factory()->create(['fiscal_year' => 2023]);
    FinancialHighlight::factory()->create(['fiscal_year' => 2024]);

    $response = $this->get(route('financial-highlights.index', ['sort' => 'fiscal_year']));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->where('financialHighlights.data.0.fiscal_year', 2023)
                ->where('financialHighlights.data.1.fiscal_year', 2024)
        );
});

test('it can view create financial highlight page', function () {
    $response = $this->get(route('financial-highlights.create'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('FinancialHighlights/Create')
        );
});

test('it can create financial highlight with valid data', function () {
    $file = UploadedFile::fake()->create('financial-highlight-2024.pdf', 1000, 'application/pdf');

    $response = $this->post(route('financial-highlights.store'), [
        'fiscal_year' => 2024,
        'financial_highlights' => $file,
    ]);

    $response->assertRedirect(route('financial-highlights.index'));

    $this->assertDatabaseHas('financial_highlights', [
        'fiscal_year' => 2024,
        'created_by' => $this->user->id,
    ]);

    Storage::disk('public')->assertExists('financial-highlights/' . $file->hashName());
});

test('it cannot create financial highlight with duplicate fiscal year', function () {
    FinancialHighlight::factory()->create(['fiscal_year' => 2024]);

    $file = UploadedFile::fake()->create('financial-highlight-2024.pdf', 1000, 'application/pdf');

    $response = $this->post(route('financial-highlights.store'), [
        'fiscal_year' => 2024,
        'financial_highlights' => $file,
    ]);

    $response->assertSessionHasErrors('fiscal_year');
});

// test('it cannot create financial highlight without file', function () {
//     $response = $this->post(route('financial-highlights.store'), [
//         'fiscal_year' => 2024,
//     ]);

//     $response->assertSessionHasErrors('financial_highlights');
// });

test('it cannot create financial highlight with invalid file type', function () {
    $file = UploadedFile::fake()->create('document.txt', 1000, 'text/plain');

    $response = $this->post(route('financial-highlights.store'), [
        'fiscal_year' => 2024,
        'financial_highlights' => $file,
    ]);

    $response->assertSessionHasErrors('financial_highlights');
});

test('it cannot create financial highlight with file too large', function () {
    $file = UploadedFile::fake()->create('large-file.pdf', 11000, 'application/pdf'); // 11MB

    $response = $this->post(route('financial-highlights.store'), [
        'fiscal_year' => 2024,
        'financial_highlights' => $file,
    ]);

    $response->assertSessionHasErrors('financial_highlights');
});

test('it can view financial highlight details', function () {
    $financialHighlight = FinancialHighlight::factory()->create([
        'fiscal_year' => 2024,
        'created_by' => $this->user->id,
    ]);

    $response = $this->get(route('financial-highlights.show', $financialHighlight));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('FinancialHighlights/Show')
                ->where('financialHighlight.id', $financialHighlight->id)
                ->where('financialHighlight.fiscal_year', 2024)
        );
});

test('it can view edit financial highlight page', function () {
    $financialHighlight = FinancialHighlight::factory()->create();

    $response = $this->get(route('financial-highlights.edit', $financialHighlight));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('FinancialHighlights/Edit')
                ->where('financialHighlight.id', $financialHighlight->id)
        );
});

test('it can update financial highlight fiscal year', function () {
    $financialHighlight = FinancialHighlight::factory()->create(['fiscal_year' => 2023]);

    $response = $this->put(route('financial-highlights.update', $financialHighlight), [
        'fiscal_year' => 2024,
    ]);

    $response->assertRedirect(route('financial-highlights.index'));

    $this->assertDatabaseHas('financial_highlights', [
        'id' => $financialHighlight->id,
        'fiscal_year' => 2024,
        'updated_by' => $this->user->id,
    ]);
});

test('it can update financial highlight with new file', function () {
    $financialHighlight = FinancialHighlight::factory()->create();
    $oldFilePath = $financialHighlight->financial_highlights;

    if ($oldFilePath) {
        Storage::disk('public')->put($oldFilePath, 'old content');
    }

    $newFile = UploadedFile::fake()->create('new-financial-highlight.pdf', 1000, 'application/pdf');

    $response = $this->put(route('financial-highlights.update', $financialHighlight), [
        'fiscal_year' => $financialHighlight->fiscal_year,
        'financial_highlights' => $newFile,
    ]);

    $response->assertRedirect(route('financial-highlights.index'));

    $financialHighlight->refresh();

    $this->assertDatabaseHas('financial_highlights', [
        'id' => $financialHighlight->id,
        'updated_by' => $this->user->id,
    ]);

    if ($oldFilePath) {
        Storage::disk('public')->assertMissing($oldFilePath);
    }
    Storage::disk('public')->assertExists($financialHighlight->financial_highlights);
});

test('it cannot update financial highlight with duplicate fiscal year', function () {
    $existingHighlight = FinancialHighlight::factory()->create(['fiscal_year' => 2024]);
    $financialHighlight = FinancialHighlight::factory()->create(['fiscal_year' => 2023]);

    $response = $this->put(route('financial-highlights.update', $financialHighlight), [
        'fiscal_year' => 2024,
    ]);

    $response->assertSessionHasErrors('fiscal_year');
});

test('it can delete financial highlight', function () {
    $financialHighlight = FinancialHighlight::factory()->create();
    if ($financialHighlight->financial_highlights) {
        Storage::disk('public')->put($financialHighlight->financial_highlights, 'content');
    }

    $response = $this->delete(route('financial-highlights.destroy', $financialHighlight));

    $response->assertRedirect(route('financial-highlights.index'));

    $this->assertDatabaseMissing('financial_highlights', [
        'id' => $financialHighlight->id,
    ]);

    if ($financialHighlight->financial_highlights) {
        Storage::disk('public')->assertMissing($financialHighlight->financial_highlights);
    }
});
