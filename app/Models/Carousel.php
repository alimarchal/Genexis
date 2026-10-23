<?php

namespace App\Models;

use App\Support\PublicFile;
use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class Carousel extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'description',
        'image',
        'button_text',
        'button_url',
        'order',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'status' => 'string',
        'order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::partial('description'),
            AllowedFilter::exact('status'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'title',
            'order',
            'status',
            'created_at',
            'updated_at',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        return PublicFile::url($this->image);
    }
}
