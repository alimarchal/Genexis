<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class Career extends Model
{
    /** @use HasFactory<\Database\Factories\CareerFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'description',
        'requirements',
        'location',
        'document',
        'closing_date',
        'is_active',
        'is_featured',
        'views_count',
        'benefits',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'views_count' => 'integer',
        'closing_date' => 'date',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('location'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::exact('is_featured'),
            AllowedFilter::partial('title'),
            AllowedFilter::partial('description'),
            AllowedFilter::partial('requirements'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            AllowedSort::field('title'),
            AllowedSort::field('location'),
            AllowedSort::field('closing_date'),
            AllowedSort::field('views_count'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];
    }

    public function getDocumentUrlAttribute()
    {
        return $this->document ? asset('storage/'.$this->document) : null;
    }

    public function getStatusAttribute()
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }

    public function incrementViewsCount()
    {
        $this->increment('views_count');
    }

    public function getIsExpiredAttribute()
    {
        return $this->closing_date && $this->closing_date->isPast();
    }
}
