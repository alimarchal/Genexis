<?php

namespace App\Models;

use App\Support\PublicFile;
use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;

class TouristAttraction extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
        'image',
        'route_map_image',
        'order',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    protected $appends = ['image_url', 'route_map_image_url'];

    protected static function booted(): void
    {
        static::saving(function (TouristAttraction $attraction) {
            if (blank($attraction->slug) || $attraction->isDirty('title') && ! $attraction->isDirty('slug')) {
                $attraction->slug = static::uniqueSlug($attraction->title, $attraction->id);
            }
        });
    }

    protected static function uniqueSlug(string $title, ?int $ignoreId): string
    {
        $base = Str::slug($title) ?: 'attraction';
        $slug = $base;
        $suffix = 2;

        while (static::query()->where('slug', $slug)->when($ignoreId, fn (Builder $query) => $query->whereKeyNot($ignoreId))->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function getImageUrlAttribute(): ?string
    {
        return PublicFile::url($this->image);
    }

    public function getRouteMapImageUrlAttribute(): ?string
    {
        return PublicFile::url($this->route_map_image);
    }

    /**
     * @return list<AllowedFilter>
     */
    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::exact('status'),
        ];
    }

    /**
     * @return list<string>
     */
    public static function getAllowedSorts(): array
    {
        return ['id', 'title', 'order', 'status', 'created_at', 'updated_at'];
    }
}
