<?php

namespace App\Models;

use App\Support\PublicFile;
use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;

class GalleryAlbum extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'order',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    protected $appends = ['cover_image_url'];

    protected static function booted(): void
    {
        static::saving(function (GalleryAlbum $album) {
            if (blank($album->slug) || $album->isDirty('title') && ! $album->isDirty('slug')) {
                $album->slug = static::uniqueSlug($album->title, $album->id);
            }
        });
    }

    protected static function uniqueSlug(string $title, ?int $ignoreId): string
    {
        $base = Str::slug($title) ?: 'album';
        $slug = $base;
        $suffix = 2;

        while (static::query()->where('slug', $slug)->when($ignoreId, fn (Builder $query) => $query->whereKeyNot($ignoreId))->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }

    /**
     * @return HasMany<GalleryPhoto, $this>
     */
    public function photos(): HasMany
    {
        return $this->hasMany(GalleryPhoto::class)->orderBy('order')->orderBy('id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return PublicFile::url($this->cover_image);
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
