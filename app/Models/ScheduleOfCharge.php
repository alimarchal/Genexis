<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;

class ScheduleOfCharge extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'from',
        'to',
        'attachment',
        'description',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'from' => 'date',
        'to' => 'date',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'attachment_url',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::callback('is_active', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_active', true);
                if ($value === '0')
                    return $query->where('is_active', false);
                return $query;
            }),
            AllowedFilter::callback('has_attachment', function ($query, $value) {
                if ($value === 'yes')
                    return $query->whereNotNull('attachment');
                if ($value === 'no')
                    return $query->whereNull('attachment');
                return $query;
            }),
            AllowedFilter::callback('date_range', function ($query, $value) {
                $currentDate = now()->toDateString();
                switch ($value) {
                    case 'current':
                        return $query->where('from', '<=', $currentDate)
                            ->where(function ($q) use ($currentDate) {
                                $q->whereNull('to')->orWhere('to', '>=', $currentDate);
                            });
                    case 'upcoming':
                        return $query->where('from', '>', $currentDate);
                    case 'expired':
                        return $query->whereNotNull('to')->where('to', '<', $currentDate);
                    default:
                        return $query;
                }
            }),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'title',
            'from',
            'to',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }

    public function getAttachmentUrlAttribute(): ?string
    {
        if ($this->attachment && Storage::disk('public')->exists($this->attachment)) {
            return route('schedule-of-charges.admin-download', $this->id);
        }
        return null;
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active)
            return 'inactive';

        $currentDate = now()->toDateString();

        if ($this->from > $currentDate)
            return 'upcoming';
        if ($this->to && $this->to < $currentDate)
            return 'expired';
        return 'current';
    }

    public function getHasAttachmentAttribute(): bool
    {
        return !is_null($this->attachment);
    }
}