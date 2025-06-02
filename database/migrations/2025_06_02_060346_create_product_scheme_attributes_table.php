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
        Schema::create('product_scheme_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_scheme_id')->constrained()->onDelete('cascade');
            $table->string('attribute_name');
            $table->text('attribute_value');
            $table->string('attribute_type')->default('text'); // text, number, boolean, date
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_scheme_attributes');
    }
};
