<?php

namespace Database\Seeders;

use App\Models\ProductType;
use App\Models\ProductTypeAccount;
use Illuminate\Database\Seeder;

class ProductTypeAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get Asset ProductType
        $assetType = ProductType::where('name', 'Asset')->first();

        // Create Asset accounts
        ProductTypeAccount::create([
            'product_type_id' => $assetType->id,
            'name' => 'Consumer Finances',
            'is_active' => true,
        ]);

        ProductTypeAccount::create([
            'product_type_id' => $assetType->id,
            'name' => 'Commercial / SME Finances',
            'is_active' => true,
        ]);

        ProductTypeAccount::create([
            'product_type_id' => $assetType->id,
            'name' => 'Agriculture Finances',
            'is_active' => true,
        ]);

        ProductTypeAccount::create([
            'product_type_id' => $assetType->id,
            'name' => 'Micro Finances',
            'is_active' => true,
        ]);

        // Get Liability ProductType
        $liabilityType = ProductType::where('name', 'Liability')->first();

        // Create Liability accounts
        ProductTypeAccount::create([
            'product_type_id' => $liabilityType->id,
            'name' => 'Deposit Accounts',
            'is_active' => true,
        ]);

        ProductTypeAccount::create([
            'product_type_id' => $liabilityType->id,
            'name' => 'Term Deposit',
            'is_active' => true,
        ]);
    }
}
