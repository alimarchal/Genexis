<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Branch>
 */
class BranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'type' => fake()->randomElement(['main_branch', 'sub_branch', 'atm', 'service_center', 'mobile_unit']),
            'facilities' => fake()->randomElements(['ATM', 'Parking', '24/7 Service', 'Drive Through', 'Customer Lounge', 'Safe Deposit Boxes'], rand(1, 4)),
            'name' => fake()->company().' Branch',
            'address' => fake()->address(),
            'latitude' => fake()->latitude(24.8607, 24.8607),
            'longitude' => fake()->longitude(67.0011, 67.0011),
            'map_url' => fake()->url(),
            'map_icon' => fake()->randomElement(['bank', 'atm', 'branch']),
            'map_color' => fake()->hexColor(),
            'map_priority' => fake()->numberBetween(0, 10),
            'show_on_map' => fake()->boolean(80),
            'popup_image' => fake()->imageUrl(300, 200, 'business'),
            'directions' => fake()->paragraph(),
            'operating_hours' => [
                'monday' => ['open' => '09:00', 'close' => '17:00'],
                'tuesday' => ['open' => '09:00', 'close' => '17:00'],
                'wednesday' => ['open' => '09:00', 'close' => '17:00'],
                'thursday' => ['open' => '09:00', 'close' => '17:00'],
                'friday' => ['open' => '09:00', 'close' => '17:00'],
                'saturday' => ['open' => '09:00', 'close' => '13:00'],
            ],
            'is_24_hours' => fake()->boolean(10),
            'holidays' => fake()->randomElements(['Eid', 'Independence Day', 'New Year'], rand(0, 3)),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
