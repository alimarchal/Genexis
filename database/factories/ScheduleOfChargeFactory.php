<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ScheduleOfCharge>
 */
class ScheduleOfChargeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fromDate = fake()->dateTimeBetween('-2 years', 'now');
        $toDate = fake()->boolean(70) ? fake()->dateTimeBetween($fromDate, '+1 year') : null;

        return [
            'title' => fake()->sentence(3, true),
            'from' => $fromDate->format('Y-m-d'),
            'to' => $toDate?->format('Y-m-d'),
            'attachment' => fake()->boolean(60) ? 'schedule-of-charges/'.fake()->uuid().'.pdf' : null,
            'description' => fake()->boolean(80) ? fake()->paragraph() : null,
            'is_active' => fake()->boolean(85),
            'created_by' => 1, // Assuming user ID 1 exists
            'updated_by' => 1,
        ];
    }
}
