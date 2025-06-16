<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class ProductTypeAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_type_id',
        'name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function productSchemes()
    {
        return $this->hasMany(ProductScheme::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::exact('product_type_id'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'product_type_id',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }
}