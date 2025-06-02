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
        Schema::create('board_of_directors', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(); // Mr., Ms., Dr., etc.
            $table->string('full_name');
            $table->string('designation');
            $table->text('short_description')->nullable();
            $table->longText('full_biography')->nullable();
            $table->json('experience')->nullable(); // Array of experience items
            $table->json('achievements')->nullable(); // Array of achievements
            $table->string('image')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_chairman')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('board_of_directors');
    }
};
