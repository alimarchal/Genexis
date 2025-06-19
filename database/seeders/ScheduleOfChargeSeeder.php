<?php

namespace Database\Seeders;

use App\Models\ScheduleOfCharge;
use Illuminate\Database\Seeder;

class ScheduleOfChargeSeeder extends Seeder
{
    public function run(): void
    {
        // Create specific schedule of charges
        $schedules = [
            [
                'title' => 'Schedule Of Bank Charges ',
                'from' => '2025-01-01',
                'to' => '2025-6-30',
                'description' => ' Bank Of Azad Jammu And Kashmir Schedule Of Charges 2025 ',
                'is_active' => true,
                 'attachment' => 'schedule_of_charges/schedule_from_jan_to_jun_2025.pdf',
            ],
            // [
            //     'title' => 'Savings Account Charges 2024',
            //     'from' => '2024-01-01',
            //     'to' => '2024-12-31',
            //     'description' => 'Schedule of charges for savings account services effective from January 2024',
            //     'is_active' => true,
            // ],
            // [
            //     'title' => 'ATM and Digital Banking Charges',
            //     'from' => '2024-06-01',
            //     'to' => null,
            //     'description' => 'Updated charges for ATM transactions and digital banking services',
            //     'is_active' => true,
            // ],
            // [
            //     'title' => 'Corporate Banking Charges 2024',
            //     'from' => '2024-01-01',
            //     'to' => '2024-12-31',
            //     'description' => 'Schedule of charges for corporate banking services',
            //     'is_active' => true,
            // ],
            // [
            //     'title' => 'Previous Schedule 2023',
            //     'from' => '2023-01-01',
            //     'to' => '2023-12-31',
            //     'description' => 'Previous year schedule of charges (archived)',
            //     'is_active' => false,
            // ],
        ];

        foreach ($schedules as $schedule) {
            ScheduleOfCharge::create(array_merge($schedule, [
                'created_by' => 1,
                'updated_by' => 1,
            ]));
        }

        // Create additional random schedules
        //  ScheduleOfCharge::factory(15)->create();
    }
}
