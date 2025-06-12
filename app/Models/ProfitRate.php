<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class ProfitRate extends Model
{
    /** @use HasFactory<\Database\Factories\ProfitRateFactory> */
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
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    public function scopeCurrent($query)
    {
        return $query->where('valid_from', '<=', now())
            ->where(function ($q) {
                $q->whereNull('valid_to')
                    ->orWhere('valid_to', '>=', now());
            });
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('category'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::scope('current'),
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
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        ];
    }

    public function getStatusAttribute(): string
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }
}
