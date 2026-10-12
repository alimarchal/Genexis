<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('upload_sessions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('context', 60);
            $table->string('original_name');
            $table->string('extension', 20);
            $table->unsignedBigInteger('declared_size');
            $table->unsignedBigInteger('received_bytes')->default(0);
            $table->unsignedInteger('chunk_size');
            $table->string('status', 20)->default('uploading');
            $table->string('temp_path')->nullable();
            $table->string('final_path')->nullable();
            $table->string('mime', 150)->nullable();
            $table->string('sha256', 64)->nullable();
            $table->string('failure_reason')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->timestamp('last_chunk_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('consumed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['status', 'updated_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('upload_sessions');
    }
};
