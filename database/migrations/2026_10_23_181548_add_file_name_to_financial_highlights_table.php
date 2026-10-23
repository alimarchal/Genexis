<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Keep the name the file had when it was uploaded; the stored copy gets a random name.
     * Existing records stay null and fall back to a name built from the fiscal year.
     */
    public function up(): void
    {
        Schema::table('financial_highlights', function (Blueprint $table) {
            $table->string('file_name')->nullable()->after('financial_highlights');
        });
    }

    public function down(): void
    {
        Schema::table('financial_highlights', function (Blueprint $table) {
            $table->dropColumn('file_name');
        });
    }
};
