<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Mobile Banking',
            'Internet Banking',
            'ATM Services',
            'Credit Cards',
            'Personal Loans',
            'Business Accounts',
            'Fixed Deposits',
            'Investment Services',
            'Currency Exchange',
            'Wire Transfers',
            'Safe Deposit Box',
            'Mortgage Services',
            'Financial Planning',
            'Insurance Services',
            'Trade Finance',
            'Remittance Services'
        ]);

        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name),
            'description' => fake()->paragraph(2),
            'icon' => fake()->randomElement(['CreditCard', 'Smartphone', 'Globe', 'Building', 'TrendingUp']),
            'image' => 'services/' . fake()->slug(2) . '.jpg',
            'is_active' => fake()->boolean(80),
            'sort_order' => fake()->numberBetween(1, 10),
            'meta_data' => json_encode([
                'features' => fake()->randomElements(['24/7 Access', 'Secure', 'Fast', 'Reliable'], 2),
                'benefits' => fake()->randomElements(['Convenient', 'Cost Effective', 'Time Saving'], 2)
            ]),
        ];
    }
}
