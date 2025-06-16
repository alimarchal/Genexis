<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create([
            'name' => 'Liability',
            'is_active' => true,
        ]);

        \App\Models\Product::create([
            'name' => 'Asset',
            'is_active' => true,
        ]);
    }
}