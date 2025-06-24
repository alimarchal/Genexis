<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'position' => fake()->jobTitle(),
            'department' => fake()->randomElement(['Customer Service', 'Operations', 'Finance', 'IT', 'HR', 'Marketing']),
            'branch_id' => \App\Models\Branch::factory(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
