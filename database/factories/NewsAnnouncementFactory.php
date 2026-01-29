<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NewsAnnouncement>
 */
class NewsAnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6, true);
        $content = fake()->paragraphs(5, true);

        return [
            'title' => $title,
            'content' => $content,
            'excerpt' => fake()->text(200),
            'image' => fake()->imageUrl(800, 600, 'business'),
            'published_date' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
            'category' => fake()->randomElement(['general', 'banking', 'services', 'announcements', 'updates']),
            'slug' => \Illuminate\Support\Str::slug($title),
            'is_published' => fake()->boolean(90), // 90% chance of being published
        ];
    }
}
