<?php

namespace App\Models;

use App\Enums\ChangeRequestStatus;
use Database\Factories\ChangeRequestFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChangeRequest extends Model
{
    /** @use HasFactory<ChangeRequestFactory> */
    use HasFactory;

    protected $fillable = [
        'module', 'module_label', 'action', 'route_name', 'route_parameters', 'subject_type', 'subject_id', 'summary',
        'payload', 'files', 'status', 'maker_id', 'checker_id', 'reviewed_at', 'rejection_reason', 'failure_reason',
    ];

    protected function casts(): array
    {
        return [
            'route_parameters' => 'array',
            'payload' => 'array',
            'files' => 'array',
            'status' => ChangeRequestStatus::class,
            'reviewed_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function maker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'maker_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function checker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'checker_id');
    }

    /**
     * @param  Builder<ChangeRequest>  $query
     * @return Builder<ChangeRequest>
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', ChangeRequestStatus::Pending);
    }

    public function isPending(): bool
    {
        return $this->status === ChangeRequestStatus::Pending;
    }

    /**
     * The record this change is about, or null for a new record or one that no longer exists.
     */
    public function subject(): ?Model
    {
        if (! $this->subject_type || ! $this->subject_id || ! class_exists($this->subject_type)) {
            return null;
        }

        return $this->subject_type::query()->find($this->subject_id);
    }

    /**
     * Ids of chunked uploads that pending changes still need, so they are not cleaned up as abandoned.
     *
     * @return list<string>
     */
    public static function pendingUploadIds(): array
    {
        return static::pending()->pluck('payload')
            ->flatMap(fn (?array $payload) => collect($payload ?? [])->filter(fn ($value, $key) => str_ends_with((string) $key, '_upload_id') && filled($value))->values())
            ->unique()
            ->values()
            ->all();
    }
}
