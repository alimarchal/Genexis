<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class ProductSchemeAttribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_scheme_id',
        'attribute_name',
        'attribute_value',
        'attribute_type',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function productScheme()
    {
        return $this->belongsTo(ProductScheme::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('attribute_name'),
            AllowedFilter::partial('attribute_value'),
            AllowedFilter::exact('attribute_type'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::exact('product_scheme_id'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'attribute_name',
            'attribute_type',
            'sort_order',
            'product_scheme_id',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }
}
