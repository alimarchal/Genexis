<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['email', 'fax', 'telephone_no', 'mobile_no', 'whatsapp']);

        $contact = match ($type) {
            'email' => fake()->email(),
            'fax' => fake()->phoneNumber(),
            'telephone_no' => fake()->phoneNumber(),
            'mobile_no' => fake()->phoneNumber(),
            'whatsapp' => fake()->phoneNumber(),
        };

        return [
            'contact' => $contact,
            'type' => $type,
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
