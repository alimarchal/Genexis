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
        Schema::create('branch_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('service_name');
            $table->text('description')->nullable();
            $table->boolean('is_available')->default(true);
            $table->json('availability_hours')->nullable();
            $table->decimal('service_fee', 10, 2)->nullable();
            $table->enum('status', ['active', 'inactive', 'temporarily_unavailable'])->default('active');
            $table->timestamps();
            $table->unique(['branch_id', 'service_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branch_services');
    }
};
