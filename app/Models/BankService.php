<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class BankService extends Model
{
    /** @use HasFactory<\Database\Factories\BankServiceFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'description',
        'icon',
        'products',
        'cta_text',
        'cta_link',
        'color',
        'benefits',
        'order',
        'status',
        'service_type',
        'stat_number',
        'stat_label',
        'stat_description',
    ];

    protected $casts = [
        'products' => 'array',
        'benefits' => 'array',
        'status' => 'boolean',
        'order' => 'integer',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('service_type', $type);
    }

    // Query Builder Methods
    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('service_type'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return ['title', 'order', 'service_type', 'created_at'];
    }
}
