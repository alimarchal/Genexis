<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BoardOfDirector>
 */
class BoardOfDirectorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement(['Mr.', 'Ms.', 'Dr.', 'Prof.']),
            'full_name' => fake()->name(),
            'designation' => fake()->randomElement(['Chairman', 'Vice Chairman', 'Director', 'Independent Director']),
            'short_description' => fake()->sentence(10),
            'full_biography' => fake()->paragraph(3),
            'experience' => json_encode([
                fake()->sentence(5),
                fake()->sentence(5),
                fake()->sentence(5),
            ]),
            'achievements' => json_encode([
                fake()->sentence(4),
                fake()->sentence(4),
            ]),
            'image' => 'directors/' . fake()->slug(2) . '.jpg',
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active' => fake()->boolean(80),
            'is_chairman' => false,
        ];
    }
}
