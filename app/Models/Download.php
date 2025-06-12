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
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'file_size' => 'integer',
        'download_count' => 'integer',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('category'),
            AllowedFilter::exact('is_featured'),
            AllowedFilter::exact('is_active'),
            AllowedFilter::partial('title'),
            AllowedFilter::partial('description'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            AllowedSort::field('title'),
            AllowedSort::field('category'),
            AllowedSort::field('download_count'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];
    }

    public function getFileUrlAttribute()
    {
        return $this->file_path ? asset('storage/'.$this->file_path) : null;
    }

    public function getFileSizeFormattedAttribute()
    {
        if (! $this->file_size) {
            return 'Unknown';
        }

        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;

        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2).' '.$units[$i];
    }

    public function getStatusAttribute()
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }
}
