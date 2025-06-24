<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class AboutUs extends Model
{
    /** @use HasFactory<\Database\Factories\AboutUsFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'vision',
        'mission',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::scope('active'),
            AllowedFilter::scope('inactive'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'title',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    public function getStatusAttribute(): string
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }
}
