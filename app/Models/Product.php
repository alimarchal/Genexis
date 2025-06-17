<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function product_types()
    {
        return $this->hasMany(ProductType::class);
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
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }
}
