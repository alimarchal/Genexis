<?php

use App\Models\FinancialHighlight;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('local');
    Storage::fake('public');

    $this->admin = $this->createAdminUser();
});

it('keeps the uploaded file name and shows it on the public page instead of the stored hash', function () {
    $this->actingAs($this->admin)->post(route('financial-highlights.store'), [
        'fiscal_year' => 2025,
        'financial_highlights' => UploadedFile::fake()->create('Financial Highlights 2025.pdf', 100, 'application/pdf'),
    ])->assertRedirect(route('financial-highlights.index'));

    $report = FinancialHighlight::firstOrFail();
    expect($report->file_name)->toBe('Financial Highlights 2025.pdf')
        ->and($report->financial_highlights)->not->toContain('Financial Highlights 2025')
        ->and($report->display_file_name)->toBe('Financial Highlights 2025.pdf');

    $this->get(route('financials.financialHighlights'))
        ->assertInertia(fn ($page) => $page->where('financialHighlights.0.file_name', 'Financial Highlights 2025.pdf'));
});

it('keeps the name of a file uploaded in chunks', function () {
    $id = chunkedUpload($this->admin, 'financial-highlights', 'FH-2024 final.pdf', pdfBytes(80));

    $this->actingAs($this->admin)->post(route('financial-highlights.store'), [
        'fiscal_year' => 2024,
        'financial_highlights_upload_id' => $id,
    ])->assertRedirect();

    expect(FinancialHighlight::firstOrFail()->file_name)->toBe('FH-2024 final.pdf');
});

it('sends the download under the readable name', function () {
    $this->actingAs($this->admin)->post(route('financial-highlights.store'), [
        'fiscal_year' => 2023,
        'financial_highlights' => UploadedFile::fake()->create('Bank of AJK Financial Highlights 2023.pdf', 100, 'application/pdf'),
    ]);

    $response = $this->get(route('financial-highlights.download', FinancialHighlight::firstOrFail()))->assertOk();

    expect($response->headers->get('content-disposition'))->toContain('Bank of AJK Financial Highlights 2023.pdf');
});

it('replaces the kept name when a new file is uploaded and leaves it alone otherwise', function () {
    $this->actingAs($this->admin)->post(route('financial-highlights.store'), [
        'fiscal_year' => 2022,
        'financial_highlights' => UploadedFile::fake()->create('first.pdf', 50, 'application/pdf'),
    ]);
    $report = FinancialHighlight::firstOrFail();

    $this->actingAs($this->admin)->put(route('financial-highlights.update', $report), ['fiscal_year' => 2022])->assertSessionHasNoErrors();
    expect($report->fresh()->file_name)->toBe('first.pdf');

    $this->actingAs($this->admin)->put(route('financial-highlights.update', $report), [
        'fiscal_year' => 2022,
        'financial_highlights' => UploadedFile::fake()->create('second.pdf', 50, 'application/pdf'),
    ])->assertSessionHasNoErrors();
    expect($report->fresh()->file_name)->toBe('second.pdf');
});

it('falls back to a readable name from the fiscal year for records without a kept name', function () {
    Storage::disk('public')->put('financial-highlights/ZcuiZqgK9cNy5OsLKdSc2otbeJjJQEHQRByJVrKh.pdf', pdfBytes(50));
    $report = FinancialHighlight::factory()->create([
        'fiscal_year' => 2021,
        'financial_highlights' => 'financial-highlights/ZcuiZqgK9cNy5OsLKdSc2otbeJjJQEHQRByJVrKh.pdf',
        'file_name' => null,
    ]);

    expect($report->display_file_name)->toBe('Financial Highlights 2021.pdf');

    $this->get(route('financials.financialHighlights'))
        ->assertInertia(fn ($page) => $page->where('financialHighlights.0.file_name', 'Financial Highlights 2021.pdf'));

    expect($this->get(route('financial-highlights.download', $report))->headers->get('content-disposition'))->toContain('Financial Highlights 2021.pdf');
});

it('adds the real extension when the kept name has none or a different one', function () {
    $report = FinancialHighlight::factory()->make(['fiscal_year' => 2020, 'financial_highlights' => 'financial-highlights/abc.pdf', 'file_name' => 'Highlights']);

    expect($report->display_file_name)->toBe('Highlights.pdf');
});

it('has no name for a record without a file', function () {
    expect(FinancialHighlight::factory()->make(['financial_highlights' => null])->display_file_name)->toBeNull();
});
