<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class Download extends Model
{
    /** @use HasFactory<\Database\Factories\DownloadFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'file_type',
        'file_size',
        'category',
        'is_featured',
        'is_active',
        'download_count',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'file_size' => 'integer',
        'download_count' => 'integer',
    ];

    protected $appends = [
        'file_size_formatted',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('category'),
            AllowedFilter::exact('file_type'),
            AllowedFilter::partial('title'),
            AllowedFilter::partial('description'),
            AllowedFilter::callback('is_featured', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_featured', true);
                if ($value === '0')
                    return $query->where('is_featured', false);
                return $query;
            }),
            AllowedFilter::callback('is_active', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_active', true);
                if ($value === '0')
                    return $query->where('is_active', false);
                return $query;
            }),
            AllowedFilter::scope('file_size_min'),
            AllowedFilter::scope('file_size_max'),
            AllowedFilter::scope('download_count_min'),
            AllowedFilter::scope('download_count_max'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            AllowedSort::field('title'),
            AllowedSort::field('category'),
            AllowedSort::field('file_type'),
            AllowedSort::field('file_size'),
            AllowedSort::field('download_count'),
            AllowedSort::field('is_featured'),
            AllowedSort::field('is_active'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];
    }

    public function getFileUrlAttribute()
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }

    public function getFileSizeFormattedAttribute()
    {
        if (!$this->file_size) {
            return 'Unknown';
        }

        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;

        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    public function getStatusAttribute()
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }

    public function scopeFileSizeMin($query, $size)
    {
        return $query->where('file_size', '>=', $size);
    }

    public function scopeFileSizeMax($query, $size)
    {
        return $query->where('file_size', '<=', $size);
    }

    public function scopeDownloadCountMin($query, $count)
    {
        return $query->where('download_count', '>=', $count);
    }

    public function scopeDownloadCountMax($query, $count)
    {
        return $query->where('download_count', '<=', $count);
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }
}