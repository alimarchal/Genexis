<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Admin-managed tables that did not have created_by / updated_by yet.
     *
     * @var list<string>
     */
    private array $tables = [
        'about_us',
        'board_of_directors',
        'divisions',
        'news_announcements',
        'product_schemes',
        'product_scheme_attributes',
        'product_types',
        'product_type_accounts',
        'products',
        'service_attributes',
        'services',
        'top_navbar_messages',
    ];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            if (! Schema::hasTable($table)) {
                continue;
            }

            foreach (['created_by', 'updated_by'] as $column) {
                if (Schema::hasColumn($table, $column)) {
                    continue;
                }

                Schema::table($table, function (Blueprint $blueprint) use ($column) {
                    $blueprint->foreignId($column)->nullable()->constrained('users')->nullOnDelete();
                });
            }
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            foreach (['created_by', 'updated_by'] as $column) {
                if (! Schema::hasTable($table) || ! Schema::hasColumn($table, $column)) {
                    continue;
                }

                Schema::table($table, function (Blueprint $blueprint) use ($column) {
                    $blueprint->dropConstrainedForeignId($column);
                });
            }
        }
    }
};
