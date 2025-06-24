<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bod_committees', function (Blueprint $table) {
            $table->id();
            $table->string('name');                                    // e.g. "Human Resource Committee of BoD"
            $table->text('description')->nullable();                   // Committee description
            $table->unsignedBigInteger('chairman_board_id')->nullable(); // Chairman from board_of_directors
            $table->unsignedBigInteger('secretary_board_id')->nullable(); // Secretary from board_of_directors  
            $table->unsignedBigInteger('secretary_management_id')->nullable(); // Secretary from managments
            $table->json('board_members')->nullable();                 // Array of board member IDs
            $table->json('management_members')->nullable();            // Array of management member IDs
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->nullable();
            $table->userTracking();
            $table->timestamps();

            // Foreign keys
            $table->foreign('chairman_board_id')->references('id')->on('board_of_directors')->onDelete('set null');
            $table->foreign('secretary_board_id')->references('id')->on('board_of_directors')->onDelete('set null');
            $table->foreign('secretary_management_id')->references('id')->on('managments')->onDelete('set null');

            // Indexes
            $table->index('is_active');
            $table->index('sort_order');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bod_committees');
    }
};
