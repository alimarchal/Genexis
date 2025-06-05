<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Region>
 */
class RegionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'Central Region',
                'Northern Region',
                'Southern Region',
                'Eastern Region',
                'Western Region',
                'Capital Region',
                'Coastal Region',
                'Mountain Region',
                'Valley Region',
                'Metropolitan Region',
            ]),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
