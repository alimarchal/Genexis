<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTypeAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_type_id',
        'name',
        'is_active',
    ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function productSchemes()
    {
        return $this->hasMany(ProductScheme::class);
    }
}
