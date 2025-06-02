<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'image',
        'is_active',
        'sort_order',
        'meta_data',
    ];

    protected $casts = [
        'meta_data' => 'array',
        'is_active' => 'boolean',
    ];

    public function attributes()
    {
        return $this->hasMany(ServiceAttribute::class)->orderBy('sort_order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
