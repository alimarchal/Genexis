<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    /** @use HasFactory<\Database\Factories\ProductTypeFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'is_active',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
