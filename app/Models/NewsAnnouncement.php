<?php

namespace App\Models;

use Database\Factories\NewsAnnouncementFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsAnnouncement extends Model
{
    /** @use HasFactory<NewsAnnouncementFactory> */
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
        'published_date' => 'date:Y-m-d',
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
            if (empty($newsAnnouncement->excerpt) && ! empty($newsAnnouncement->content)) {
                $newsAnnouncement->excerpt = $newsAnnouncement->generateExcerpt();
            }
        });

        static::updating(function ($newsAnnouncement) {
            if ($newsAnnouncement->isDirty('title')) {
                $newsAnnouncement->slug = Str::slug($newsAnnouncement->title);
            }

            // Auto-generate excerpt if it's empty and content is being updated or excerpt is being cleared
            if (empty($newsAnnouncement->excerpt) && ! empty($newsAnnouncement->content)) {
                if ($newsAnnouncement->isDirty('content') || $newsAnnouncement->isDirty('excerpt')) {
                    $newsAnnouncement->excerpt = $newsAnnouncement->generateExcerpt();
                }
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
     * @param  int  $length  Maximum length of excerpt
     */
    /**
     * Plain-text preview (no tags, entities decoded) for cards and lists.
     */
    public function plainPreview(int $length = 160): string
    {
        $source = $this->excerpt ?: (string) $this->content;
        $withBreaks = preg_replace('#</(p|div|li|h[1-6]|tr)>|<br\s*/?>#i', ' ', $source) ?? $source;
        $text = html_entity_decode(strip_tags($withBreaks), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = trim(preg_replace('/\s+/u', ' ', $text) ?? $text);

        return Str::limit($text, $length);
    }

    public function generateExcerpt(int $length = 200): string
    {
        if (empty($this->content)) {
            return '';
        }

        $strippedContent = strip_tags($this->content);
        $excerpt = substr($strippedContent, 0, $length);

        if (strlen($strippedContent) > $length) {
            $excerpt .= '...';
        }

        return $excerpt;
    }
}
