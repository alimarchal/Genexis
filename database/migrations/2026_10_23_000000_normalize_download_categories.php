<?php

use App\Enums\DownloadCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Put every existing download into one of the fixed categories and use the same
     * spelling as the admin form from now on.
     */
    public function up(): void
    {
        DB::table('downloads')
            ->select('category')
            ->distinct()
            ->pluck('category')
            ->each(function (?string $category) {
                $normalized = DownloadCategory::normalize($category)->value;

                if ($normalized !== $category) {
                    DB::table('downloads')->where('category', $category)->update(['category' => $normalized]);
                }
            });

        DB::table('downloads')->whereNull('category')->update(['category' => DownloadCategory::General->value]);

        Schema::table('downloads', function (Blueprint $table) {
            $table->string('category')->default(DownloadCategory::General->value)->change();
        });
    }

    public function down(): void
    {
        Schema::table('downloads', function (Blueprint $table) {
            $table->string('category')->default('general')->change();
        });
    }
};
