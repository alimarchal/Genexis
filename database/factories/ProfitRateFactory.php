<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfitRate>
 */
class ProfitRateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'PLS Saving Deposit',
            'Term Deposit 1 Year',
            'Term Deposit 2 Years',
            'Term Deposit 3 Years',
            'Current Account',
            'Roshan Digital Saving',
            'Special Saving Account',
            'Certificate Deposit',
        ];

        $validFrom = fake()->dateTimeBetween('-2 years', 'now');
        $validTo = fake()->optional(0.3)->dateTimeBetween($validFrom, '+1 year');

        return [
            'category' => fake()->randomElement($categories),
            'rate' => fake()->randomFloat(2, 1.5, 15.75),
            'valid_from' => $validFrom,
            'valid_to' => $validTo,
            'is_active' => fake()->boolean(80), // 80% chance of being active
            'created_by' => 1, // Default admin user
            'updated_by' => 1,
        ];
    }
}
