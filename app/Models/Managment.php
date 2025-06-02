<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class Managment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'full_name',
        'designation',
        'description',
        'attachment',
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
            AllowedFilter::partial('full_name'),
            AllowedFilter::partial('designation'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('title'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'full_name',
            'designation',
            'order',
            'status',
            'created_at',
            'updated_at',
        ];
    }

    public function getAttachmentUrlAttribute(): ?string
    {
        if ($this->attachment) {
            return asset('storage/'.$this->attachment);
        }

        return null;
    }
}
