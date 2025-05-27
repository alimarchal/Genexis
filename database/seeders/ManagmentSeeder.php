<?php

namespace Database\Seeders;

use App\Models\Managment;
use Illuminate\Database\Seeder;

class ManagmentSeeder extends Seeder
{
    public function run(): void
    {
        // Create some sample management members
        Managment::create([
            'title' => 'Mr.',
            'full_name' => 'Shahid Shahzad Mir',
            'designation' => 'President/CEO and CFO',
            'description' => 'Leading the bank with over 20 years of experience in financial services and strategic management.',
            'order' => 1,
            'status' => 'active',
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Managment::create([
            'title' => 'Mr.',
            'full_name' => 'Ahmad Ali Khan',
            'designation' => 'Chief Operating Officer',
            'description' => 'Overseeing daily operations with expertise in banking operations and customer service excellence.',
            'order' => 2,
            'status' => 'active',
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        // Create additional random members
        Managment::factory(8)->active()->create();
    }
}