<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\ServiceAttribute;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ServiceAttribute>
 */
class ServiceAttributeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'service_id' => Service::factory(),
            'attribute_name' => $this->faker->words(2, true),
            'attribute_value' => $this->faker->paragraph(),
            'sort_order' => $this->faker->numberBetween(0, 100),
        ];
    }
}
