<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\BranchService;
use Illuminate\Database\Seeder;

class BranchServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'service_name' => 'Account Opening',
                'description' => 'Open new savings and current accounts',
                'service_fee' => 0.00,
            ],
            [
                'service_name' => 'Cash Deposit',
                'description' => 'Deposit cash into accounts',
                'service_fee' => 0.00,
            ],
            [
                'service_name' => 'Cash Withdrawal',
                'description' => 'Withdraw cash from accounts',
                'service_fee' => 0.00,
            ],
            [
                'service_name' => 'Fund Transfer',
                'description' => 'Transfer funds between accounts',
                'service_fee' => 25.00,
            ],
            [
                'service_name' => 'Loan Application',
                'description' => 'Apply for personal and business loans',
                'service_fee' => 500.00,
            ],
            // [
            //     'service_name' => 'ATM Card Issuance',
            //     'description' => 'Issue new ATM/Debit cards',
            //     'service_fee' => 200.00,
            // ],
            [
                'service_name' => 'Statement Request',
                'description' => 'Account statement printing',
                'service_fee' => 50.00,
            ],
            [
                'service_name' => 'Foreign Exchange',
                'description' => 'Currency exchange services',
                'service_fee' => null,
            ],
        ];

        $branches = Branch::all();

        foreach ($branches as $branch) {
            // Add random 4-7 services per branch, main branches get more services
            $serviceCount = $branch->type === 'main_branch' ? rand(6, 8) : rand(4, 6);
            $selectedServices = collect($services)->shuffle()->take($serviceCount);

            foreach ($selectedServices as $service) {
                BranchService::create([
                    'branch_id' => $branch->id,
                    'service_name' => $service['service_name'],
                    'description' => $service['description'],
                    'service_fee' => $service['service_fee'],
                    'is_available' => true,
                    'availability_hours' => [
                        'monday' => ['09:00', '17:00'],
                        'tuesday' => ['09:00', '17:00'],
                        'wednesday' => ['09:00', '17:00'],
                        'thursday' => ['09:00', '17:00'],
                        'friday' => ['09:00', '17:00'],
                        'saturday' => ['09:00', '13:00'],
                        'sunday' => null,
                    ],
                    'status' => 'active',
                ]);
            }
        }
    }
}
