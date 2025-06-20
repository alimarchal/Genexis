<?php

use App\Models\AnnualReport;
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

test('it can view annual reports index page', function () {
    AnnualReport::factory()->count(3)->create();

    $response = $this->get(route('annual-reports.index'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('AnnualReports/Index')
                ->has('annualReports.data', 3)
        );
});

test('it can search annual reports by fiscal year', function () {
    AnnualReport::factory()->create(['annual_report_fiscal_year' => 2023]);
    AnnualReport::factory()->create(['annual_report_fiscal_year' => 2024]);

    $response = $this->get(route('annual-reports.index', ['filter' => ['annual_report_fiscal_year' => '2023']]));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->has('annualReports.data', 1)
                ->where('annualReports.data.0.annual_report_fiscal_year', 2023)
        );
});

test('it can sort annual reports by fiscal year', function () {
    AnnualReport::factory()->create(['annual_report_fiscal_year' => 2023]);
    AnnualReport::factory()->create(['annual_report_fiscal_year' => 2024]);

    $response = $this->get(route('annual-reports.index', ['sort' => 'annual_report_fiscal_year']));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->where('annualReports.data.0.annual_report_fiscal_year', 2023)
                ->where('annualReports.data.1.annual_report_fiscal_year', 2024)
        );
});

test('it can view create annual report page', function () {
    $response = $this->get(route('annual-reports.create'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('AnnualReports/Create')
        );
});

test('it can create annual report with valid data', function () {
    $file = UploadedFile::fake()->create('annual-report-2024.pdf', 1000, 'application/pdf');

    $response = $this->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2024,
        'annual_report' => $file,
    ]);

    $response->assertRedirect(route('annual-reports.index'));

    $this->assertDatabaseHas('annual_reports', [
        'annual_report_fiscal_year' => 2024,
        'created_by' => $this->user->id,
    ]);

    Storage::disk('public')->assertExists('annual-reports/' . $file->hashName());
});

test('it cannot create annual report with duplicate fiscal year', function () {
    AnnualReport::factory()->create(['annual_report_fiscal_year' => 2024]);

    $file = UploadedFile::fake()->create('annual-report-2024.pdf', 1000, 'application/pdf');

    $response = $this->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2024,
        'annual_report' => $file,
    ]);

    $response->assertSessionHasErrors('annual_report_fiscal_year');
});


test('it cannot create annual report with invalid file type', function () {
    $file = UploadedFile::fake()->create('document.txt', 1000, 'text/plain');

    $response = $this->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2024,
        'annual_report' => $file,
    ]);

    $response->assertSessionHasErrors('annual_report');
});

test('it cannot create annual report with file too large', function () {
    $file = UploadedFile::fake()->create('large-file.pdf', 11000, 'application/pdf'); // 11MB

    $response = $this->post(route('annual-reports.store'), [
        'annual_report_fiscal_year' => 2024,
        'annual_report' => $file,
    ]);

    $response->assertSessionHasErrors('annual_report');
});

test('it can view annual report details', function () {
    $annualReport = AnnualReport::factory()->create([
        'annual_report_fiscal_year' => 2024,
        'created_by' => $this->user->id,
    ]);

    $response = $this->get(route('annual-reports.show', $annualReport));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('AnnualReports/Show')
                ->where('annualReport.id', $annualReport->id)
                ->where('annualReport.annual_report_fiscal_year', 2024)
        );
});

test('it can view edit annual report page', function () {
    $annualReport = AnnualReport::factory()->create();

    $response = $this->get(route('annual-reports.edit', $annualReport));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('AnnualReports/Edit')
                ->where('annualReport.id', $annualReport->id)
        );
});

test('it can update annual report fiscal year', function () {
    $annualReport = AnnualReport::factory()->create(['annual_report_fiscal_year' => 2023]);

    $response = $this->put(route('annual-reports.update', $annualReport), [
        'annual_report_fiscal_year' => 2024,
    ]);

    $response->assertRedirect(route('annual-reports.index'));

    $this->assertDatabaseHas('annual_reports', [
        'id' => $annualReport->id,
        'annual_report_fiscal_year' => 2024,
        'updated_by' => $this->user->id,
    ]);
});

test('it can update annual report with new file', function () {
    $annualReport = AnnualReport::factory()->create();
    $oldFilePath = $annualReport->annual_report;

    if ($oldFilePath) {
        Storage::disk('public')->put($oldFilePath, 'old content');
    }

    $newFile = UploadedFile::fake()->create('new-annual-report.pdf', 1000, 'application/pdf');

    $response = $this->put(route('annual-reports.update', $annualReport), [
        'annual_report_fiscal_year' => $annualReport->annual_report_fiscal_year,
        'annual_report' => $newFile,
    ]);

    $response->assertRedirect(route('annual-reports.index'));

    $annualReport->refresh();

    $this->assertDatabaseHas('annual_reports', [
        'id' => $annualReport->id,
        'updated_by' => $this->user->id,
    ]);

    if ($oldFilePath) {
        Storage::disk('public')->assertMissing($oldFilePath);
    }
    Storage::disk('public')->assertExists($annualReport->annual_report);
});

test('it cannot update annual report with duplicate fiscal year', function () {
    $existingReport = AnnualReport::factory()->create(['annual_report_fiscal_year' => 2024]);
    $annualReport = AnnualReport::factory()->create(['annual_report_fiscal_year' => 2023]);

    $response = $this->put(route('annual-reports.update', $annualReport), [
        'annual_report_fiscal_year' => 2024,
    ]);

    $response->assertSessionHasErrors('annual_report_fiscal_year');
});

test('it can delete annual report', function () {
    $annualReport = AnnualReport::factory()->create();
    if ($annualReport->annual_report) {
        Storage::disk('public')->put($annualReport->annual_report, 'content');
    }

    $response = $this->delete(route('annual-reports.destroy', $annualReport));

    $response->assertRedirect(route('annual-reports.index'));

    $this->assertDatabaseMissing('annual_reports', [
        'id' => $annualReport->id,
    ]);

    if ($annualReport->annual_report) {
        Storage::disk('public')->assertMissing($annualReport->annual_report);
    }
});
