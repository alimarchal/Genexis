<?php

namespace Database\Factories;

use App\Models\Managment;
use Illuminate\Database\Eloquent\Factories\Factory;

class ManagmentFactory extends Factory
{
    protected $model = Managment::class;

    public function definition(): array
    {
        return [
            'title' => fake()->randomElement(['Mr.', 'Ms.', 'Mrs.', 'Dr.']),
            'full_name' => fake()->name(),
            'designation' => fake()->randomElement([
                'President/CEO and CFO',
                'Chief Operating Officer',
                'Head of Operations',
                'General Manager',
                'Deputy General Manager',
                'Assistant General Manager',
                'Senior Manager',
                'Manager',
                'Assistant Manager'
            ]),
            'description' => fake()->paragraph(3),
            'order' => fake()->numberBetween(1, 100),
            'status' => fake()->randomElement(['active', 'inactive']),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }

    public function active()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    public function inactive()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}