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
        Schema::create('schedule_of_charges', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('from');
            $table->date('to')->nullable();
            $table->string('attachment')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->userTracking();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_of_charges');
    }
};
