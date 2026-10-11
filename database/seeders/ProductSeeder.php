<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Liability',
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Asset',
            'is_active' => true,
        ]);
    }
}
