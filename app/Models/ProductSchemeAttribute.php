<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSchemeAttribute extends Model
{
    /** @use HasFactory<\Database\Factories\ProductSchemeAttributeFactory> */
    use HasFactory;

    protected $fillable = [
        'product_scheme_id',
        'attribute_name',
        'attribute_value',
        'attribute_type',
        'sort_order',
        'is_active',
    ];

    public function productScheme()
    {
        return $this->belongsTo(ProductScheme::class);
    }
}
