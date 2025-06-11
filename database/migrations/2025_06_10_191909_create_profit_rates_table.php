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
        Schema::create('profit_rates', function (Blueprint $table) {
            $table->id();
            $table->string('category');               // e.g. "PLS Saving Deposit"
            $table->decimal('rate', 5, 2);            // e.g. 10.50
            $table->date('valid_from');               // start date of this rate
            $table->date('valid_to')->nullable();     // end date; null if current
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->nullable()->after('is_active');
            $table->userTracking();
            $table->timestamps();
            $table->index('sort_order');
            $table->index('category');
            $table->index('valid_from');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profit_rates');
    }
};
