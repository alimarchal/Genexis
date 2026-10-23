<?php

namespace Database\Factories;

use App\Enums\ChangeRequestStatus;
use App\Models\ChangeRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChangeRequest>
 */
class ChangeRequestFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'module' => 'news-announcements',
            'module_label' => 'News Announcements',
            'action' => 'create',
            'route_name' => 'news-announcements.store',
            'summary' => fake()->sentence(4),
            'payload' => ['title' => fake()->sentence(4)],
            'status' => ChangeRequestStatus::Pending,
            'maker_id' => User::factory(),
        ];
    }
}
