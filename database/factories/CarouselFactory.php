<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Carousel>
 */
class CarouselFactory extends Factory
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
            'description' => fake()->sentence(10),
            'image' => 'carousel/sample_'.fake()->numberBetween(1, 5).'.jpg',
            'button_text' => fake()->randomElement(['Learn More', 'Get Started', 'Apply Now', 'Explore', 'Contact Us']),
            'button_url' => '/'.fake()->slug(2),
            'order' => fake()->numberBetween(1, 10),
            'status' => fake()->randomElement(['active', 'inactive']),
            'created_by' => 1,
        ];
    }
}
