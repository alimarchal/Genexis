<?php

use App\Models\AnnualReport;
use App\Models\Career;
use App\Models\Download;
use App\Models\FinancialHighlight;
use App\Models\FinancialReport;
use App\Models\ScheduleOfCharge;
use App\Models\UploadSession;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleAndPermissionSeeder::class);
    Storage::fake('local');
    Storage::fake('public');
    config(['bank.uploads.staff_max_bytes' => 1000]);

    $this->root = User::factory()->create();
    $this->root->assignRole('super-admin');
});

function pdf(int $length = 40): string
{
    return substr(str_pad('%PDF-1.4 ', $length, 'x'), 0, $length);
}

describe('financial reports', function () {
    it('creates a report from files uploaded in chunks and removes the temporary data', function () {
        $q1 = chunkedUpload($this->root, 'financial-reports', 'q1.pdf', pdf(47));
        $annual = chunkedUpload($this->root, 'financial-reports', 'annual.pdf', pdf(33));

        $this->actingAs($this->root)->post(route('financial-reports.store'), [
            'fiscal_year' => 2024,
            'first_quarter_report_upload_id' => $q1,
            'annual_report_upload_id' => $annual,
        ])->assertRedirect(route('financial-reports.index'));

        $report = FinancialReport::where('fiscal_year', 2024)->firstOrFail();
        expect(Storage::disk('public')->get($report->first_quarter_report))->toBe(pdf(47))
            ->and(Storage::disk('public')->get($report->annual_report))->toBe(pdf(33))
            ->and($report->half_yearly_report)->toBeNull()
            ->and(UploadSession::whereNotNull('consumed_at')->count())->toBe(2)
            ->and(Storage::disk('local')->allFiles('uploads/tmp'))->toBe([]);
    });

    it('serves the stored large file back', function () {
        $id = chunkedUpload($this->root, 'financial-reports', 'annual.pdf', pdf(100));
        $this->actingAs($this->root)->post(route('financial-reports.store'), ['fiscal_year' => 2023, 'annual_report_upload_id' => $id]);
        $report = FinancialReport::firstOrFail();

        $this->get(route('financial-reports.download', [$report, 'annual_report']))->assertOk();
    });

    it('lets an upload be used only once', function () {
        $id = chunkedUpload($this->root, 'financial-reports', 'q1.pdf', pdf());
        $payload = fn (int $year) => ['fiscal_year' => $year, 'first_quarter_report_upload_id' => $id];

        $this->actingAs($this->root)->post(route('financial-reports.store'), $payload(2022))->assertRedirect();
        $this->actingAs($this->root)->post(route('financial-reports.store'), $payload(2021))
            ->assertSessionHasErrors('first_quarter_report_upload_id');

        expect(FinancialReport::where('fiscal_year', 2021)->exists())->toBeFalse();
    });

    it('rejects an upload that belongs to somebody else or to another module', function () {
        $other = User::factory()->create();
        $other->assignRole('super-admin');
        $foreign = chunkedUpload($other, 'financial-reports', 'q1.pdf', pdf());
        $wrongModule = chunkedUpload($this->root, 'downloads', 'q1.pdf', pdf());

        $this->actingAs($this->root)->post(route('financial-reports.store'), ['fiscal_year' => 2020, 'first_quarter_report_upload_id' => $foreign])
            ->assertSessionHasErrors('first_quarter_report_upload_id');
        $this->actingAs($this->root)->post(route('financial-reports.store'), ['fiscal_year' => 2020, 'first_quarter_report_upload_id' => $wrongModule])
            ->assertSessionHasErrors('first_quarter_report_upload_id');
    });

    it('rejects ids that were never completed or do not exist', function () {
        $unfinished = startUpload($this->root, ['context' => 'financial-reports'])->json('id');

        foreach ([$unfinished, '2f1c9a0e-0000-4000-8000-000000000000'] as $id) {
            $this->actingAs($this->root)->post(route('financial-reports.store'), ['fiscal_year' => 2019, 'annual_report_upload_id' => $id])
                ->assertSessionHasErrors('annual_report_upload_id');
        }

        $this->actingAs($this->root)->post(route('financial-reports.store'), ['fiscal_year' => 2019, 'annual_report_upload_id' => 'not-a-uuid'])
            ->assertSessionHasErrors('annual_report_upload_id');
    });

    it('replaces a file on update and deletes the old one only after the record is saved', function () {
        Storage::disk('public')->put('financial-reports/old.pdf', 'old');
        $report = FinancialReport::create(['fiscal_year' => 2018, 'annual_report' => 'financial-reports/old.pdf']);
        $id = chunkedUpload($this->root, 'financial-reports', 'new.pdf', pdf(25));

        $this->actingAs($this->root)->post(route('financial-reports.update', $report), ['_method' => 'PUT', 'fiscal_year' => 2018, 'annual_report_upload_id' => $id])
            ->assertRedirect(route('financial-reports.index'));

        $report->refresh();
        expect($report->annual_report)->not->toBe('financial-reports/old.pdf')
            ->and(Storage::disk('public')->exists('financial-reports/old.pdf'))->toBeFalse()
            ->and(Storage::disk('public')->get($report->annual_report))->toBe(pdf(25));
    });

    it('keeps the old file when the update is rejected', function () {
        Storage::disk('public')->put('financial-reports/old.pdf', 'old');
        FinancialReport::create(['fiscal_year' => 2017]);
        $report = FinancialReport::create(['fiscal_year' => 2016, 'annual_report' => 'financial-reports/old.pdf']);
        $id = chunkedUpload($this->root, 'financial-reports', 'new.pdf', pdf(25));

        $this->actingAs($this->root)->post(route('financial-reports.update', $report), ['_method' => 'PUT', 'fiscal_year' => 2017, 'annual_report_upload_id' => $id])
            ->assertSessionHasErrors('fiscal_year');

        expect($report->fresh()->annual_report)->toBe('financial-reports/old.pdf')
            ->and(Storage::disk('public')->exists('financial-reports/old.pdf'))->toBeTrue()
            ->and(UploadSession::where('uuid', $id)->value('consumed_at'))->toBeNull();
    });

    it('leaves untouched files alone on update', function () {
        Storage::disk('public')->put('financial-reports/keep.pdf', 'keep');
        $report = FinancialReport::create(['fiscal_year' => 2015, 'annual_report' => 'financial-reports/keep.pdf']);

        $this->actingAs($this->root)->post(route('financial-reports.update', $report), ['_method' => 'PUT', 'fiscal_year' => 2015])->assertRedirect();

        expect($report->fresh()->annual_report)->toBe('financial-reports/keep.pdf');
    });

    it('still accepts a small file posted directly', function () {
        $this->actingAs($this->root)->post(route('financial-reports.store'), [
            'fiscal_year' => 2014,
            'annual_report' => UploadedFile::fake()->createWithContent('a.pdf', pdf(50)),
        ])->assertRedirect();

        expect(Storage::disk('public')->exists(FinancialReport::first()->annual_report))->toBeTrue();
    });
});

describe('other modules', function () {
    it('creates a download with the real type and size', function () {
        $id = chunkedUpload($this->root, 'downloads', 'tender.pdf', pdf(77));

        $this->actingAs($this->root)->post(route('downloads.store'), [
            'title' => 'Tender', 'category' => 'general', 'is_active' => true, 'file_upload_id' => $id,
        ])->assertRedirect(route('downloads.index'));

        $download = Download::where('title', 'Tender')->firstOrFail();
        expect($download->file_type)->toBe('application/pdf')
            ->and($download->file_size)->toBe(77)
            ->and(Storage::disk('public')->get($download->file_path))->toBe(pdf(77));
    });

    it('requires a file for a new download', function () {
        $this->actingAs($this->root)->post(route('downloads.store'), ['title' => 'Nothing', 'category' => 'general'])
            ->assertSessionHasErrors('file');
    });

    it('creates an annual report, a PowerPoint highlight, a schedule of charges and a vacancy from chunked uploads', function () {
        $annual = chunkedUpload($this->root, 'annual-reports', 'ar.pdf', pdf(30));
        $this->actingAs($this->root)->post(route('annual-reports.store'), ['annual_report_fiscal_year' => 2024, 'annual_report_upload_id' => $annual])->assertRedirect();

        $zip = "PK\x03\x04".str_repeat('0', 40);
        $highlight = chunkedUpload($this->root, 'financial-highlights', 'fh.pptx', $zip);
        $this->actingAs($this->root)->post(route('financial-highlights.store'), ['fiscal_year' => 2024, 'financial_highlights_upload_id' => $highlight])->assertRedirect();

        $schedule = chunkedUpload($this->root, 'schedule-of-charges', 'soc.pdf', pdf(30));
        $this->actingAs($this->root)->post(route('schedule-of-charges.store'), ['title' => 'Charges', 'from' => '2024-01-01', 'attachment_upload_id' => $schedule])->assertRedirect();

        $career = chunkedUpload($this->root, 'careers', 'job.pdf', pdf(30));
        $this->actingAs($this->root)->post(route('careers.store'), ['title' => 'Teller', 'description' => 'd', 'requirements' => 'r', 'location' => 'Mirpur', 'document_upload_id' => $career])->assertRedirect();

        foreach ([AnnualReport::first()->annual_report, FinancialHighlight::first()->financial_highlights, ScheduleOfCharge::first()->attachment, Career::first()->document] as $path) {
            expect(Storage::disk('public')->exists($path))->toBeTrue();
        }
    });
});

describe('abandoned uploads', function () {
    it('a finished upload that is never attached to a record is cleaned up by the scheduled prune', function () {
        $id = chunkedUpload($this->root, 'downloads', 'forgotten.pdf', pdf(30));
        $path = UploadSession::where('uuid', $id)->value('final_path');
        expect(Storage::disk('public')->exists($path))->toBeTrue();

        $this->travel(2)->days();
        $this->artisan('uploads:prune')->assertSuccessful();

        expect(Storage::disk('public')->exists($path))->toBeFalse();
    });

    it('is registered in the scheduler', function () {
        $this->artisan('schedule:list')->expectsOutputToContain('uploads:prune')->assertSuccessful();
    });
});
