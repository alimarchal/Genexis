<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsAnnouncement extends Model
{
    /** @use HasFactory<\Database\Factories\NewsAnnouncementFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'excerpt',
        'image',
        'published_date',
        'is_featured',
        'category',
        'slug',
        'is_published',
    ];

    protected $casts = [
        'published_date' => 'date',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($newsAnnouncement) {
            if (empty($newsAnnouncement->slug)) {
                $newsAnnouncement->slug = Str::slug($newsAnnouncement->title);
            }
            
            // Auto-generate excerpt if not provided
            if (empty($newsAnnouncement->excerpt) && !empty($newsAnnouncement->content)) {
                $newsAnnouncement->excerpt = $newsAnnouncement->generateExcerpt();
            }
        });

        static::updating(function ($newsAnnouncement) {
            if ($newsAnnouncement->isDirty('title')) {
                $newsAnnouncement->slug = Str::slug($newsAnnouncement->title);
            }
            
            // Auto-generate excerpt if not provided
            if (empty($newsAnnouncement->excerpt) && !empty($newsAnnouncement->content)) {
                $newsAnnouncement->excerpt = $newsAnnouncement->generateExcerpt();
            }
        });
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeRecent($query)
    {
        return $query->where('published_date', '<=', now());
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Generate excerpt from content.
     * 
     * @param int $length Maximum length of excerpt
     * @return string
     */
    public function generateExcerpt(int $length = 200): string
    {
        if (empty($this->content)) {
            return '';
        }

        $excerpt = substr(strip_tags($this->content), 0, $length);
        
        if (strlen(strip_tags($this->content)) > $length) {
            $excerpt .= '...';
        }

        return $excerpt;
    }
}
