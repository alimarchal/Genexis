<?php

namespace Database\Factories;

use App\Models\TouristAttraction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TouristAttraction>
 */
class TouristAttractionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->words(3, true),
            'summary' => fake()->sentence(10),
            'content' => '<p>'.fake()->paragraph().'</p>',
            'image' => null,
            'route_map_image' => null,
            'order' => fake()->numberBetween(0, 10),
            'status' => 'active',
        ];
    }

    public function inactive(): static
    {
        return $this->state(['status' => 'inactive']);
    }
}
