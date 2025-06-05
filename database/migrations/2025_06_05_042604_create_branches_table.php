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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('region_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('district_id')->constrained()->cascadeOnUpdate();
            $table->string('code')->unique();
            $table->enum('type', ['main_branch', 'sub_branch', 'atm', 'service_center', 'mobile_unit'])->default('sub_branch');
            $table->text('facilities')->nullable();
            $table->string('name');
            $table->string('address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('map_url')->nullable();
            $table->string('map_icon')->nullable();
            $table->string('map_color', 7)->default('#007bff');
            $table->integer('map_priority')->default(0);
            $table->boolean('show_on_map')->default(true);
            $table->string('popup_image')->nullable();
            $table->text('directions')->nullable();
            $table->json('operating_hours')->nullable();
            $table->boolean('is_24_hours')->default(false);
            $table->json('holidays')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
