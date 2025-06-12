<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            [
                'name' => 'Islamic Banking Division',
                'short_name' => 'IBD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Operations Division',
                'short_name' => 'OD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Credit Management Division',
                'short_name' => 'CMD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Human Resource Management Division',
                'short_name' => 'HRMD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Special Asset Management Division',
                'short_name' => 'SAM',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Compliance Division',
                'short_name' => 'CD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Treasury Management Division',
                'short_name' => 'TMD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Financial Control Division',
                'short_name' => 'FCD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Information Technology Division',
                'short_name' => 'ITD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Commercial & Retail Banking Division',
                'short_name' => 'CRBD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Credit Administration Division',
                'short_name' => 'CAD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Risk Management Division',
                'short_name' => 'RMD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Audit & Inspection Division',
                'short_name' => 'AID',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('divisions')->insert($divisions);
    }
}
