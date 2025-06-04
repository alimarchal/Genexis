<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankService>
 */
class BankServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $serviceTypes = ['main', 'additional', 'stat'];
        $serviceType = fake()->randomElement($serviceTypes);
        $icons = ['User', 'Building', 'Star', 'Smartphone', 'MapPin', 'Users', 'CreditCard', 'Shield', 'TrendingUp', 'Globe'];
        $colors = [
            'from-blue-600 to-blue-800',
            'from-green-600 to-green-800',
            'from-purple-600 to-purple-800',
            'from-indigo-600 to-indigo-800',
            'from-orange-600 to-orange-800',
            'from-teal-600 to-teal-800',
            'from-red-600 to-red-800',
            'from-yellow-600 to-yellow-800',
        ];

        $products = [
            'Current Account',
            'Savings Account',
            'Fixed Deposits',
            'Personal Loans',
            'Business Accounts',
            'Trade Finance',
            'Cash Management',
            'Corporate Loans',
            'Islamic Savings',
            'Mobile Banking',
            'Internet Banking',
        ];

        $benefits = [
            'Free ATM withdrawals',
            '24/7 online banking',
            'Mobile app support',
            'Personalized service',
            'Competitive rates',
            'Quick processing',
            'Expert advice',
            'Secure transactions',
        ];

        return [
            'title' => fake()->randomElement(['Consumer Banking', 'Corporate Banking', 'Islamic Banking', 'Digital Services', 'Investment Banking', 'Trade Finance']),
            'description' => fake()->paragraph(2),
            'icon' => fake()->randomElement($icons),
            'products' => fake()->randomElements($products, fake()->numberBetween(2, 5)),
            'cta_text' => fake()->randomElement(['Learn More', 'Open Account', 'Get Started', 'Apply Now', 'Contact Us']),
            'cta_link' => '/'.fake()->slug(2),
            'color' => fake()->randomElement($colors),
            'benefits' => fake()->randomElements($benefits, fake()->numberBetween(3, 6)),
            'order' => fake()->numberBetween(1, 10),
            'status' => fake()->boolean(80),
            'service_type' => $serviceType,
            'stat_number' => $serviceType === 'stat' ? fake()->numberBetween(10, 999).'+' : null,
            'stat_label' => $serviceType === 'stat' ? fake()->randomElement(['Branches', 'Customers', 'Years', 'Services']) : null,
            'stat_description' => $serviceType === 'stat' ? fake()->sentence(4) : null,
        ];
    }
}
