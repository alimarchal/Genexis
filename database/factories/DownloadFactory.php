<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Download>
 */
class DownloadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['general', 'Document', 'picture', 'form', 'forms', 'reports'];
        $fileTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-excel', 'image/jpeg', 'application/zip'];
        $extensions = ['pdf', 'doc', 'xls', 'jpg', 'zip'];

        $fileType = fake()->randomElement($fileTypes);
        $extension = fake()->randomElement($extensions);

        return [
            'title' => fake()->sentence(4, true),
            'description' => fake()->boolean(70) ? fake()->paragraph() : null,
            'file_path' => 'downloads/' . fake()->uuid() . '.' . $extension,
            'file_type' => $fileType,
            'file_size' => fake()->numberBetween(50000, 10000000), // 50KB to 10MB
            'category' => fake()->randomElement($categories),
            'is_featured' => fake()->boolean(20),
            'is_active' => fake()->boolean(90),
            'download_count' => fake()->numberBetween(0, 500),
            'created_by' => 1, // Assuming user ID 1 exists
            'updated_by' => 1,
        ];
    }
}
