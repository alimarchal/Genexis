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
        Schema::create('financial_reports', function (Blueprint $table) {
            $table->id();
            // Fiscal year (e.g. 2015, 2016, ...)
            $table->year('fiscal_year')->unique();
            // URLs or file paths for each report type
            $table->string('first_quarter_report')->nullable();
            $table->string('half_yearly_report')->nullable();
            $table->string('third_quarter_report')->nullable();
            $table->string('annual_report')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_reports');
    }
};
