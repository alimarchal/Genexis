<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardOfDirector extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'full_name',
        'designation',
        'short_description',
        'full_biography',
        'experience',
        'achievements',
        'image',
        'sort_order',
        'is_active',
        'is_chairman',
    ];

    protected $casts = [
        'experience' => 'array',
        'achievements' => 'array',
        'is_active' => 'boolean',
        'is_chairman' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public function scopeChairman($query)
    {
        return $query->where('is_chairman', true);
    }
}
