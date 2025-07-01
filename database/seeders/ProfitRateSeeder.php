<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ProfitRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed provisional rates for Feb 01 to Jun 30, 2025
        $now = Carbon::now();
        DB::table('profit_rates')->insert([
            [
                'category' => 'PLS Saving Deposit',
                'rate' => 10.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => 'BMBA',
                'rate' => 10.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => 'SDA(from 0.05M to Rs. 50M)',
                'rate' => 10.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => 'SDA(Above to Rs. 50M to Rs.100M)',
                'rate' => 10.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => 'SDA(Above to Rs.100M)',
                'rate' => 10.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 5,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => 'Premium Plus Remittance Saving Account',
                'rate' => 10.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 6,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => "7 Days' Notice Deposit",
                'rate' => 4.00,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 7,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '30 Days\' Deposit',
                'rate' => 4.00,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 8,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '3 Month TDR',
                'rate' => 4.00,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 9,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '6 Month TDR',
                'rate' => 4.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 10,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '1 Year TDR',
                'rate' => 6.00,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 11,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '2 Year TDR',
                'rate' => 6.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 12,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '3 Year TDR',
                'rate' => 7.00,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 13,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '4 Year TDR',
                'rate' => 7.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 14,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category' => '5 Year TDR',
                'rate' => 8.50,
                'valid_from' => '2025-02-01',
                'valid_to' => '2025-06-30',
                'is_active' => true,
                'sort_order' => 15,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}