<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Access tokens for the data extraction API (only a hash of each token is kept) and the log of every extraction.
     */
    public function up(): void
    {
        Schema::create('api_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('token_hash', 64)->unique();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
            $table->timestamps();
        });

        Schema::create('extraction_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('api_token_id')->nullable()->constrained('api_tokens')->nullOnDelete();
            $table->string('dataset');
            $table->string('format', 10);
            $table->json('filters')->nullable();
            $table->unsignedInteger('page');
            $table->unsignedInteger('per_page');
            $table->unsignedInteger('records_returned');
            $table->unsignedBigInteger('records_matching');
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamp('created_at')->nullable()->index();

            $table->index(['dataset', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('extraction_logs');
        Schema::dropIfExists('api_tokens');
    }
};
