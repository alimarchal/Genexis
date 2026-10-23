<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Maker-checker: a change made by a maker waits here until a checker approves or rejects it.
     * The row is also the log of who asked for the change, who decided, when and why.
     */
    public function up(): void
    {
        Schema::create('change_requests', function (Blueprint $table) {
            $table->id();
            $table->string('module');
            $table->string('module_label');
            $table->string('action', 20);
            $table->string('route_name');
            $table->json('route_parameters')->nullable();
            $table->string('subject_type')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->string('summary');
            $table->json('payload')->nullable();
            $table->json('files')->nullable();
            $table->string('status', 20)->default('pending');
            $table->foreignId('maker_id')->constrained('users');
            $table->foreignId('checker_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('failure_reason')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index(['subject_type', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('change_requests');
    }
};
