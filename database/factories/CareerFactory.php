<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Career>
 */
class CareerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $locations = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
        $jobTitles = [
            'Software Engineer',
            'Senior Software Developer',
            'Database Administrator',
            'IT Support Specialist',
            'Network Administrator',
            'Project Manager',
            'Business Analyst',
            'Quality Assurance Engineer',
            'DevOps Engineer',
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Data Analyst',
            'System Administrator',
            'Cybersecurity Specialist',
        ];

        return [
            'title' => fake()->randomElement($jobTitles),
            'description' => fake()->paragraphs(3, true),
            'requirements' => fake()->paragraphs(2, true),
            'location' => fake()->randomElement($locations),
            'document' => fake()->boolean(60) ? 'careers/'.fake()->uuid().'.pdf' : null,
            'closing_date' => fake()->boolean(80) ? fake()->dateTimeBetween('+1 week', '+3 months')->format('Y-m-d') : null,
            'benefits' => fake()->boolean(70) ? fake()->paragraph() : null,
            'is_active' => fake()->boolean(85),
            'is_featured' => fake()->boolean(15),
            'views_count' => fake()->numberBetween(0, 100),
            'created_by' => 1, // Assuming user ID 1 exists
            'updated_by' => 1,
        ];
    }
}
