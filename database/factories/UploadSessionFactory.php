<?php

namespace Database\Factories;

use App\Enums\UploadStatus;
use App\Models\UploadSession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<UploadSession>
 */
class UploadSessionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => (string) Str::uuid(),
            'user_id' => User::factory(),
            'context' => 'downloads',
            'original_name' => 'report.pdf',
            'extension' => 'pdf',
            'declared_size' => 1000,
            'received_bytes' => 0,
            'chunk_size' => 100,
            'status' => UploadStatus::Uploading,
        ];
    }
}
