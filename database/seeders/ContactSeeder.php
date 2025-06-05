<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        $branches = Branch::take(20)->get();

        $positions = [
            'Branch Manager',
            'Assistant Manager',
            'Operations Officer',
            'Customer Service Officer',
            'Credit Officer',
            'Finance Officer',
            'Marketing Executive',
            'Administrative Assistant',
        ];

        $departments = [
            'Operations',
            'Customer Service',
            'Credit & Recovery',
            'Finance & Accounts',
            'Marketing',
            'Administration',
            'Human Resources',
        ];

        foreach ($branches as $branch) {
            // Create 2-4 contacts per branch
            $contactCount = rand(2, 4);

            for ($i = 0; $i < $contactCount; $i++) {
                $name = fake()->name();
                $email = strtolower(str_replace(' ', '.', $name)).'@genexis.com.pk';

                Contact::create([
                    'name' => $name,
                    'email' => $email,
                    'phone' => fake()->phoneNumber(),
                    'position' => fake()->randomElement($positions),
                    'department' => fake()->randomElement($departments),
                    'branch_id' => $branch->id,
                    'status' => fake()->randomElement(['active', 'active', 'active', 'inactive']), // 75% active
                    'created_by' => 1,
                    'updated_by' => 1,
                ]);
            }
        }
    }
}
