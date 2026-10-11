<?php

namespace App\Http\Resources\V1;

use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Career
 */
class CareerResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $detailed = $request->routeIs('api.v1.careers.show');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'location' => $this->location,
            'closing_date' => $this->closing_date?->toDateString(),
            'is_featured' => (bool) $this->is_featured,
            'description' => $this->when($detailed, fn () => $this->description),
            'requirements' => $this->when($detailed, fn () => $this->requirements),
            'benefits' => $this->when($detailed, fn () => $this->benefits),
            'document_url' => $this->document ? route('public-careers.download', $this->id) : null,
        ];
    }
}
