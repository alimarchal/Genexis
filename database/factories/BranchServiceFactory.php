<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BranchService>
 */
class BranchServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_name' => fake()->randomElement([
                'Account Opening',
                'Cash Deposit',
                'Cash Withdrawal',
                'Money Transfer',
                'Loan Application',
                'Credit Card Services',
                'Safe Deposit Box',
                'Foreign Exchange',
                'Online Banking',
                'Mobile Banking',
            ]),
            'description' => fake()->paragraph(),
            'is_available' => fake()->boolean(90),
            'availability_hours' => [
                'monday' => ['start' => '09:00', 'end' => '17:00'],
                'tuesday' => ['start' => '09:00', 'end' => '17:00'],
                'wednesday' => ['start' => '09:00', 'end' => '17:00'],
                'thursday' => ['start' => '09:00', 'end' => '17:00'],
                'friday' => ['start' => '09:00', 'end' => '17:00'],
            ],
            'service_fee' => fake()->optional()->randomFloat(2, 0, 100),
            'status' => fake()->randomElement(['active', 'inactive', 'temporarily_unavailable']),
        ];
    }
}
