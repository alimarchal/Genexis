<?php

namespace Database\Factories;

use App\Models\BoardOfDirector;
use App\Models\Managment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BodCommittee>
 */
class BodCommitteeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $committees = [
            'Audit Committee',
            'Risk Management Committee',
            'Human Resource Committee',
            'IT Committee',
            'Credit Committee',
            'Asset Liability Committee',
            'Executive Committee',
        ];

        return [
            'name' => fake()->randomElement($committees) . ' of BoD',
            'description' => fake()->sentence(10),
            'chairman_board_id' => null, // Will be set in specific tests
            'secretary_board_id' => null,
            'secretary_management_id' => null,
            'board_members' => [],
            'management_members' => [],
            'is_active' => fake()->boolean(80), // 80% chance of being active
            'sort_order' => fake()->numberBetween(1, 10),
            'created_by' => 1, // Default admin user
            'updated_by' => 1,
        ];
    }

    /**
     * Indicate that the committee should have a chairman from board.
     */
    public function withChairman(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'chairman_board_id' => BoardOfDirector::factory()->create(['is_active' => true])->id,
            ];
        });
    }

    /**
     * Indicate that the committee should have a secretary from board.
     */
    public function withBoardSecretary(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'secretary_board_id' => BoardOfDirector::factory()->create(['is_active' => true])->id,
            ];
        });
    }

    /**
     * Indicate that the committee should have a secretary from management.
     */
    public function withManagementSecretary(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'secretary_management_id' => Managment::factory()->create(['status' => 'active'])->id,
            ];
        });
    }

    /**
     * Indicate that the committee should be active.
     */
    public function active(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => true,
            ];
        });
    }

    /**
     * Indicate that the committee should be inactive.
     */
    public function inactive(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }
}
