<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class ProductScheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_type_account_id',
        'name',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function productTypeAccount()
    {
        return $this->belongsTo(ProductTypeAccount::class);
    }

    public function attributes()
    {
        return $this->hasMany(ProductSchemeAttribute::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
            AllowedFilter::partial('description'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::exact('product_type_account_id'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'product_type_account_id',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }
}