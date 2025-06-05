<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\QueryBuilder\AllowedFilter;

class BranchService extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'branch_id',
        'service_name',
        'description',
        'is_available',
        'availability_hours',
        'service_fee',
        'status',
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'availability_hours' => 'array',
        'service_fee' => 'decimal:2',
        'status' => 'string',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)->where('status', 'active');
    }

    public function getFormattedServiceFeeAttribute(): string
    {
        return $this->service_fee ? 'PKR '.number_format($this->service_fee, 2) : 'Free';
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('service_name'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('branch_id'),
            AllowedFilter::exact('is_available'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'service_name',
            'status',
            'service_fee',
            'created_at',
            'updated_at',
        ];
    }
}
