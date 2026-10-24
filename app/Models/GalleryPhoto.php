<?php

namespace App\Models;

use App\Support\PublicFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_album_id',
        'image',
        'caption',
        'order',
    ];

    protected $appends = ['image_url'];

    /**
     * @return BelongsTo<GalleryAlbum, $this>
     */
    public function album(): BelongsTo
    {
        return $this->belongsTo(GalleryAlbum::class, 'gallery_album_id');
    }

    public function getImageUrlAttribute(): ?string
    {
        return PublicFile::url($this->image);
    }
}
