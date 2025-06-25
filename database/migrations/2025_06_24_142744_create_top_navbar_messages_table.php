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
        Schema::create('top_navbar_messages', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('General'); // Achievement, Services, Support, Digital, General
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->string('icon')->default('📢');
            $table->text('text');
            $table->string('color')->default('from-blue-500 to-cyan-600'); // Tailwind gradient classes
            $table->string('bg_color')->default('from-blue-50 to-cyan-50'); // Background gradient classes
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('top_navbar_messages');
    }
};
