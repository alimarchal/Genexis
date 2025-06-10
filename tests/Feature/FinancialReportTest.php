<?php

use App\Models\FinancialReport;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('it can display financial reports index', function () {
    FinancialReport::factory()->count(3)->create();

    $response = $this->get(route('financial-reports.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('Financials/Index')
        ->has('financialReports.data', 3)
    );
});

test('it can display create form', function () {
    $response = $this->get(route('financial-reports.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('Financials/Create')
    );
});

test('it can create financial report without files', function () {
    $data = [
        'fiscal_year' => 2025,
    ];

    $response = $this->post(route('financial-reports.store'), $data);

    $response->assertRedirect(route('financial-reports.index'));
    $this->assertDatabaseHas('financial_reports', [
        'fiscal_year' => 2025,
    ]);
});

test('it can create financial report with files', function () {
    Storage::fake('public');

    $data = [
        'fiscal_year' => 2025,
        'first_quarter_report' => UploadedFile::fake()->create('q1-2025.pdf', 1000, 'application/pdf'),
        'annual_report' => UploadedFile::fake()->create('annual-2025.pdf', 2000, 'application/pdf'),
    ];

    $response = $this->post(route('financial-reports.store'), $data);

    $response->assertRedirect(route('financial-reports.index'));

    $report = FinancialReport::where('fiscal_year', 2025)->first();
    expect($report)->not->toBeNull();
    expect($report->first_quarter_report)->not->toBeNull();
    expect($report->annual_report)->not->toBeNull();

    Storage::disk('public')->assertExists($report->first_quarter_report);
    Storage::disk('public')->assertExists($report->annual_report);
});

test('it validates required fiscal year', function () {
    $response = $this->post(route('financial-reports.store'), []);

    $response->assertSessionHasErrors(['fiscal_year']);
});

test('it validates unique fiscal year', function () {
    FinancialReport::factory()->create(['fiscal_year' => 2025]);

    $response = $this->post(route('financial-reports.store'), [
        'fiscal_year' => 2025,
    ]);

    $response->assertSessionHasErrors(['fiscal_year']);
});

test('it can display show page', function () {
    $report = FinancialReport::factory()->create();

    $response = $this->get(route('financial-reports.show', $report));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('Financials/Show')
        ->has('financialReport')
        ->where('financialReport.id', $report->id)
    );
});

test('it can update financial report', function () {
    Storage::fake('public');

    $report = FinancialReport::factory()->create(['fiscal_year' => 2024]);

    $data = [
        'fiscal_year' => 2024,
        'first_quarter_report' => UploadedFile::fake()->create('new-q1-2024.pdf', 1000, 'application/pdf'),
        '_method' => 'PUT',
    ];

    $response = $this->put(route('financial-reports.update', $report), $data);

    $response->assertRedirect(route('financial-reports.index'));

    $report->refresh();
    expect($report->first_quarter_report)->not->toBeNull();
    Storage::disk('public')->assertExists($report->first_quarter_report);
});

test('it can delete financial report', function () {
    Storage::fake('public');

    $report = FinancialReport::factory()->create([
        'first_quarter_report' => 'financial-reports/test-file.pdf',
        'annual_report' => 'financial-reports/test-annual.pdf',
    ]);

    Storage::disk('public')->put($report->first_quarter_report, 'test content');
    Storage::disk('public')->put($report->annual_report, 'test content');

    $response = $this->delete(route('financial-reports.destroy', $report));

    $response->assertRedirect(route('financial-reports.index'));
    $this->assertDatabaseMissing('financial_reports', ['id' => $report->id]);

    Storage::disk('public')->assertMissing($report->first_quarter_report);
    Storage::disk('public')->assertMissing($report->annual_report);
});
