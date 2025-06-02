<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductScheme extends Model
{
    /** @use HasFactory<\Database\Factories\ProductSchemeFactory> */
    use HasFactory;

    protected $fillable = [
        'product_type_account_id',
        'name',
        'description',
        'is_active',
    ];

    public function productTypeAccount()
    {
        return $this->belongsTo(ProductTypeAccount::class);
    }

    public function attributes()
    {
        return $this->hasMany(ProductSchemeAttribute::class);
    }
}
