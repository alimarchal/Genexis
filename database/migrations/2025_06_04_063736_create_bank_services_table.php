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
        Schema::create('bank_services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('icon'); // icon name for lucide icons
            $table->json('products'); // array of products
            $table->string('cta_text');
            $table->string('cta_link');
            $table->string('color'); // gradient color classes
            $table->json('benefits'); // array of benefits
            $table->integer('order')->default(0);
            $table->boolean('status')->default(true);
            $table->enum('service_type', ['service', 'deposit', 'stat'])->default('service');
            $table->string('stat_number')->nullable(); // for stats like "87+", "500K+"
            $table->string('stat_label')->nullable(); // for stats like "Branches", "Customers"
            $table->string('stat_description')->nullable(); // for stats like "Across AJK"
            $table->userTracking();
            $table->timestamps();

            $table->index(['status', 'order']);
            $table->index('service_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_services');
    }
};
