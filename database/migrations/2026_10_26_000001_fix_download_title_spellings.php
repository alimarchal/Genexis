<?php

use App\Models\Download;
use App\Support\SpellingFixes;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Fix "Tendor", "Carrer", "Hairing" and "Evalutioan" in the titles of existing downloads.
     * Records are saved normally so the change shows up as an update in incremental extractions.
     */
    public function up(): void
    {
        Download::query()
            ->where(function ($query) {
                foreach (array_keys(SpellingFixes::WORDS) as $wrong) {
                    $query->orWhere('title', 'like', "%{$wrong}%");
                }
            })
            ->each(function (Download $download) {
                $fixed = SpellingFixes::apply($download->title);

                if ($fixed !== $download->title) {
                    $download->update(['title' => $fixed]);
                }
            });
    }

    public function down(): void
    {
        // A spelling correction is not undone.
    }
};
