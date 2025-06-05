<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\QueryBuilder\AllowedFilter;

class Contact extends Model
{
    /** @use HasFactory<\Database\Factories\ContactFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'position',
        'department',
        'branch_id',
        'status',
    ];

    protected $casts = [
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

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
            AllowedFilter::partial('email'),
            AllowedFilter::partial('position'),
            AllowedFilter::partial('department'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('branch_id'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'email',
            'position',
            'department',
            'status',
            'created_at',
            'updated_at',
        ];
    }
}
