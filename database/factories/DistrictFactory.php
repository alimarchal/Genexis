<?php

namespace Database\Factories;

use App\Models\District;
use App\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<District>
 */
class DistrictFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'region_id' => Region::factory(),
            'name' => fake()->unique()->city().' District',
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
