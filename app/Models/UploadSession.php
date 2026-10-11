<?php

namespace App\Models;

use App\Enums\UploadStatus;
use Database\Factories\UploadSessionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UploadSession extends Model
{
    /** @use HasFactory<UploadSessionFactory> */
    use HasFactory;

    protected $fillable = [
        'uuid', 'user_id', 'context', 'original_name', 'extension', 'declared_size', 'received_bytes',
        'chunk_size', 'status', 'temp_path', 'final_path', 'mime', 'sha256', 'failure_reason',
        'ip_address', 'user_agent', 'last_chunk_at', 'completed_at', 'consumed_at',
    ];

    protected $appends = ['progress_percent'];

    protected function casts(): array
    {
        return [
            'status' => UploadStatus::class,
            'declared_size' => 'integer',
            'received_bytes' => 'integer',
            'chunk_size' => 'integer',
            'last_chunk_at' => 'datetime',
            'completed_at' => 'datetime',
            'consumed_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getProgressPercentAttribute(): float
    {
        if ($this->declared_size <= 0) {
            return 0;
        }

        return round(min(100, $this->received_bytes / $this->declared_size * 100), 2);
    }

    public function isUploading(): bool
    {
        return $this->status === UploadStatus::Uploading;
    }
}
