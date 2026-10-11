<?php

namespace App\Http\Resources\V1;

use App\Models\NewsAnnouncement;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin NewsAnnouncement
 */
class NewsResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->when($request->routeIs('api.v1.news.show'), fn () => $this->content),
            'category' => $this->category,
            'is_featured' => (bool) $this->is_featured,
            'published_date' => $this->published_date?->toDateString(),
            'image_url' => $this->image ? (filter_var($this->image, FILTER_VALIDATE_URL) ? $this->image : asset('storage/'.ltrim($this->image, '/'))) : null,
        ];
    }
}
