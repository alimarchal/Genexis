<?php

use App\Models\Download;
use App\Support\SpellingFixes;

it('corrects the known misspellings and keeps the capitalisation', function (string $before, string $after) {
    expect(SpellingFixes::apply($before))->toBe($after);
})->with([
    ['Tendor For Services', 'Tender For Services'],
    ['Tendors for Goods', 'Tenders for Goods'],
    ['TENDORS FOR GOODS', 'TENDERS FOR GOODS'],
    ['Carrer Opportunities ', 'Career Opportunities '],
    ['Corrigendum - Carrer Opportunities - ', 'Corrigendum - Career Opportunities - '],
    ['Tender For Services-Hairing Of Testing Service Firm ', 'Tender For Services-Hiring Of Testing Service Firm '],
    ['Evalutioan Report (Renovation Work Islamgarh Branch Mirpur)', 'Evaluation Report (Renovation Work Islamgarh Branch Mirpur)'],
    ['Tender for Goods', 'Tender for Goods'],
    ['Career Opportunities', 'Career Opportunities'],
    ['Attendorship', 'Attendorship'],
]);

it('fixes the titles of existing downloads and leaves the rest alone', function () {
    $migration = require database_path('migrations/2026_10_26_000001_fix_download_title_spellings.php');

    $bad = Download::factory()->create(['title' => 'Tendor For Services', 'file_path' => 'downloads/tendor1.pdf', 'updated_at' => '2026-01-01 00:00:00']);
    $good = Download::factory()->create(['title' => 'Tender For Goods', 'updated_at' => '2026-01-01 00:00:00']);

    $migration->up();
    $migration->up();

    expect($bad->fresh()->title)->toBe('Tender For Services')
        ->and($bad->fresh()->file_path)->toBe('downloads/tendor1.pdf')
        ->and($bad->fresh()->updated_at->isAfter('2026-01-02'))->toBeTrue()
        ->and($good->fresh()->title)->toBe('Tender For Goods')
        ->and($good->fresh()->updated_at->toDateString())->toBe('2026-01-01');
});

it('has no misspelled titles left in the download seeder', function () {
    preg_match_all("/'title' => '([^\n]*)',/", file_get_contents(database_path('seeders/DownloadSeeder.php')), $titles);

    foreach ($titles[1] as $title) {
        expect(SpellingFixes::apply($title))->toBe($title);
    }
});
