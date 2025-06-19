<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class ProfitRate extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'category',
        'rate',
        'valid_from',
        'valid_to',
        'is_active',
        'sort_order',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'rate' => 'decimal:2',
        'valid_from' => 'date',
        'valid_to' => 'date',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('category'),
            AllowedFilter::callback('rate_range', function ($query, $value) {
                switch ($value) {
                    case 'low':
                        return $query->where('rate', '<', 5);
                    case 'medium':
                        return $query->whereBetween('rate', [5, 10]);
                    case 'high':
                        return $query->where('rate', '>', 10);
                    default:
                        return $query;
                }
            }),
            AllowedFilter::callback('is_active', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_active', true);
                if ($value === '0')
                    return $query->where('is_active', false);
                return $query;
            }),
            AllowedFilter::callback('validity_status', function ($query, $value) {
                $currentDate = now()->toDateString();
                switch ($value) {
                    case 'current':
                        return $query->where('valid_from', '<=', $currentDate)
                            ->where(function ($q) use ($currentDate) {
                                $q->whereNull('valid_to')->orWhere('valid_to', '>=', $currentDate);
                            });
                    case 'upcoming':
                        return $query->where('valid_from', '>', $currentDate);
                    case 'expired':
                        return $query->whereNotNull('valid_to')->where('valid_to', '<', $currentDate);
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
            'category',
            'rate',
            'valid_from',
            'valid_to',
            'sort_order',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active)
            return 'inactive';

        $currentDate = now()->toDateString();

        if ($this->valid_from > $currentDate)
            return 'upcoming';
        if ($this->valid_to && $this->valid_to < $currentDate)
            return 'expired';
        return 'current';
    }

    public function getRateRangeAttribute(): string
    {
        if ($this->rate < 5)
            return 'low';
        if ($this->rate <= 10)
            return 'medium';
        return 'high';
    }
}