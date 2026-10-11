<?php

namespace Database\Factories;

use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Region>
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
            'division_id' => 10, // Use default division_id from migration
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
