<?php

namespace Database\Factories;

use App\Models\ContactSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactSubmission>
 */
class ContactSubmissionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'district' => fake()->city(),
            'tehsil' => fake()->city(),
            'place' => fake()->streetName(),
            'category' => fake()->randomElement(['general_inquiry', 'complaint', 'feedback', 'account_services']),
            'subject' => fake()->sentence(4),
            'message' => fake()->paragraph(),
            'ip_address' => fake()->ipv4(),
            'user_agent' => 'Mozilla/5.0',
            'submitted_at' => now(),
        ];
    }
}
