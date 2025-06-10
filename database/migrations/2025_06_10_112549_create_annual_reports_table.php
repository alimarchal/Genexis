<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('annual_reports', function (Blueprint $table) {
            $table->id();
            // Fiscal year (e.g. 2015, 2016, ...)
            $table->year('annual_report_fiscal_year')->unique();
            // URLs or file paths for each report type
            $table->string('annual_report')->nullable();
            $table->userTracking();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annual_reports');
    }
};
