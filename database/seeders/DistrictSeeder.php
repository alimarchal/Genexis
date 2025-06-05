<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $districts = [
            ['region_id' => 1, 'name' => 'Muzaffarabad'],
            ['region_id' => 1, 'name' => 'Neelum'],
            ['region_id' => 1, 'name' => 'Jhelum Valley'],
            ['region_id' => 2, 'name' => 'Bagh'],
            ['region_id' => 2, 'name' => 'Poonch'],
            ['region_id' => 2, 'name' => 'Haveli'],
            ['region_id' => 2, 'name' => 'Sudhanoti'],
            ['region_id' => 3, 'name' => 'Kotli'],
            ['region_id' => 4, 'name' => 'Mirpur'],
            ['region_id' => 4, 'name' => 'Bhimber'],
        ];

        foreach ($districts as $district) {
            District::create($district);
        }
    }
}
