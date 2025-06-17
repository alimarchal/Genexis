<?php

namespace Database\Seeders;

use App\Models\ProductType;
use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductType::create([
            'product_id' => 1,  // Liability product
            'name' => 'Liability',
            'is_active' => true,
        ]);

        ProductType::create([
            'product_id' => 2,  // Asset product
            'name' => 'Asset',
            'is_active' => true,
        ]);
    }
}
