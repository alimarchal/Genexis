<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TopNavbarMessage>
 */
class TopNavbarMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['Alert', 'Announcement', 'News', 'Maintenance', 'Update'];
        $priorities = ['low', 'medium', 'high', 'urgent'];
        $icons = ['⚠️', '📢', '📰', '🔧', '📝'];
        $colors = ['#ffffff', '#000000', '#333333'];
        $bgColors = ['#dc3545', '#17a2b8', '#28a745', '#ffc107', '#6f42c1'];

        return [
            'type' => fake()->randomElement($types),
            'priority' => fake()->randomElement($priorities),
            'icon' => fake()->randomElement($icons),
            'text' => fake()->sentence(8),
            'color' => fake()->randomElement($colors),
            'bg_color' => fake()->randomElement($bgColors),
            'is_active' => fake()->boolean(80), // 80% chance of being active
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}
