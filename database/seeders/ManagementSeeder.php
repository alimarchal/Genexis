<?php

namespace Database\Seeders;

use App\Models\Management;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ManagementSeeder extends Seeder
{
    public function run(): void
    {

        $user = \App\Models\User::create([
            'name' => 'System Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $managementData = [
            [
                'title' => 'Mr.',
                'full_name' => 'Shahid Shahzad Mir',
                'designation' => 'President/CEO and CFO',
                'description' => null,
                'attachment' => 'management-attachments/ssmir.jpg',
                'order' => 1,
                'status' => 'active',
            ],
            [
                'title' => 'Syed',
                'full_name' => 'Tashfeen Gilani',
                'designation' => 'Divisional Head Treasury Division & CCO',
                'description' => null,
                'attachment' => 'management-attachments/tg.jpg',
                'order' => 3,
                'status' => 'active',
            ],
            [
                'title' => 'Ms.',
                'full_name' => 'Rahila Javed',
                'designation' => 'Divisional Head Human Resource Management Division',
                'description' => null,
                'attachment' => 'management-attachments/raheela.jpg',
                'order' => 4,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Raja Ghulam Mustafa',
                'designation' => 'Divisional Head Commercial & Retail Banking Division',
                'description' => null,
                'attachment' => 'management-attachments/raja-mustafa.png',
                'order' => 5,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Akhter Hussain',
                'designation' => 'Divisional Head Credit Administration Division',
                'description' => null,
                'attachment' => 'management-attachments/akt.jpg',
                'order' => 6,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Amjad Mahmood Gilani',
                'designation' => 'Divisional Head Risk Management Division',
                'description' => null,
                'attachment' => null,
                'order' => 7,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Imtiaz Shaheen',
                'designation' => 'Divisional Head Credit Management Division',
                'description' => null,
                'attachment' => null,
                'order' => 8,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Gulzar A. Rao',
                'designation' => 'Divisional Head, IT Division (CIO)',
                'description' => null,
                'attachment' => 'management-attachments/gulzar-a-rao.jpg',
                'order' => 9,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Muhammad Aslam Awan',
                'designation' => 'Divisional Head Islamic Banking Division (A)',
                'description' => null,
                'attachment' => null,
                'order' => 10,
                'status' => 'active',
            ],
            [
                'title' => 'Raja',
                'full_name' => 'Masood Khan',
                'designation' => 'Divisional Head Special Asset Management Division',
                'description' => null,
                'attachment' => null,
                'order' => 11,
                'status' => 'active',
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Javed Iqbal',
                'designation' => 'Chief Compliance Officer, Compliance Division',
                'description' => null,
                'attachment' => null,
                'order' => 12,
                'status' => 'active',
            ],
        ];

        foreach ($managementData as $index => $data) {
            Management::create(array_merge($data, [
                'created_by' => 1,
                'updated_by' => 1,
            ]));
        }
    }
}
