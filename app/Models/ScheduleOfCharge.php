<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class ScheduleOfCharge extends Model
{
    /** @use HasFactory<\Database\Factories\ScheduleOfChargeFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'from',
        'to',
        'attachment',
        'description',
        'is_active',
    ];

    protected $casts = [
        'from' => 'date',
        'to' => 'date',
        'is_active' => 'boolean',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('is_active'),
            AllowedFilter::partial('title'),
            AllowedFilter::scope('date_range'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            AllowedSort::field('title'),
            AllowedSort::field('from'),
            AllowedSort::field('to'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];
    }

    public function scopeDateRange($query, $from = null, $to = null)
    {
        if ($from) {
            $query->where('from', '>=', $from);
        }
        if ($to) {
            $query->where('to', '<=', $to);
        }

        return $query;
    }

    public function getAttachmentUrlAttribute()
    {
        return $this->attachment ? asset('storage/'.$this->attachment) : null;
    }

    public function getStatusAttribute()
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }
}
