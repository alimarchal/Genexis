<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AboutUs>
 */
class AboutUsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'content' => fake()->paragraphs(5, true),
            'vision' => fake()->paragraphs(2, true),
            'mission' => fake()->paragraphs(2, true),
            'is_active' => fake()->boolean(80),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
