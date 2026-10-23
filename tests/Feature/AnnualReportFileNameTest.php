<?php

use App\Models\AnnualReport;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('local');
    Storage::fake('public');

    $this->admin = $this->createAdminUser();
});

it('keeps the uploaded file name and shows it on the public page instead of the stored hash', function () {
    $this->actingAs($this->admin)->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2025,
        'annual_report' => UploadedFile::fake()->create('Annual Report 2025.pdf', 100, 'application/pdf'),
    ])->assertRedirect(route('annual-reports.index'));

    $report = AnnualReport::firstOrFail();
    expect($report->file_name)->toBe('Annual Report 2025.pdf')
        ->and($report->annual_report)->not->toContain('Annual Report 2025')
        ->and($report->display_file_name)->toBe('Annual Report 2025.pdf');

    $this->get(route('financials.annualReports'))
        ->assertInertia(fn ($page) => $page->where('annualReports.0.file_name', 'Annual Report 2025.pdf'));
});

it('keeps the name of a file uploaded in chunks', function () {
    $id = chunkedUpload($this->admin, 'annual-reports', 'AR-2024 final.pdf', pdfBytes(80));

    $this->actingAs($this->admin)->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2024,
        'annual_report_upload_id' => $id,
    ])->assertRedirect();

    expect(AnnualReport::firstOrFail()->file_name)->toBe('AR-2024 final.pdf');
});

it('sends the download under the readable name', function () {
    $this->actingAs($this->admin)->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2023,
        'annual_report' => UploadedFile::fake()->create('Bank of AJK Annual Report 2023.pdf', 100, 'application/pdf'),
    ]);

    $response = $this->get(route('annual-reports.download', AnnualReport::firstOrFail()))->assertOk();

    expect($response->headers->get('content-disposition'))->toContain('Bank of AJK Annual Report 2023.pdf');
});

it('replaces the kept name when a new file is uploaded and leaves it alone otherwise', function () {
    $this->actingAs($this->admin)->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2022,
        'annual_report' => UploadedFile::fake()->create('first.pdf', 50, 'application/pdf'),
    ]);
    $report = AnnualReport::firstOrFail();

    $this->actingAs($this->admin)->put(route('annual-reports.update', $report), ['annual_report_fiscal_year' => 2022])->assertSessionHasNoErrors();
    expect($report->fresh()->file_name)->toBe('first.pdf');

    $this->actingAs($this->admin)->put(route('annual-reports.update', $report), [
        'annual_report_fiscal_year' => 2022,
        'annual_report' => UploadedFile::fake()->create('second.pdf', 50, 'application/pdf'),
    ])->assertSessionHasNoErrors();
    expect($report->fresh()->file_name)->toBe('second.pdf');
});

it('falls back to a readable name from the fiscal year for records without a kept name', function () {
    Storage::disk('public')->put('annual-reports/ZcuiZqgK9cNy5OsLKdSc2otbeJjJQEHQRByJVrKh.pdf', pdfBytes(50));
    $report = AnnualReport::factory()->create([
        'annual_report_fiscal_year' => 2021,
        'annual_report' => 'annual-reports/ZcuiZqgK9cNy5OsLKdSc2otbeJjJQEHQRByJVrKh.pdf',
        'file_name' => null,
    ]);

    expect($report->display_file_name)->toBe('Annual Report 2021.pdf');

    $this->get(route('financials.annualReports'))
        ->assertInertia(fn ($page) => $page->where('annualReports.0.file_name', 'Annual Report 2021.pdf'));

    expect($this->get(route('annual-reports.download', $report))->headers->get('content-disposition'))->toContain('Annual Report 2021.pdf');
});

it('adds the real extension when the kept name has none or a different one', function () {
    $report = AnnualReport::factory()->make(['annual_report_fiscal_year' => 2020, 'annual_report' => 'annual-reports/abc.pdf', 'file_name' => 'Report']);

    expect($report->display_file_name)->toBe('Report.pdf');
});

it('has no name for a record without a file', function () {
    expect(AnnualReport::factory()->make(['annual_report' => null])->display_file_name)->toBeNull();
});
