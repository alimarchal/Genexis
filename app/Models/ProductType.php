<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class ProductType extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productTypeAccounts()
    {
        return $this->hasMany(ProductTypeAccount::class);
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
            AllowedFilter::exact('product_id'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'product_id',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }
}
