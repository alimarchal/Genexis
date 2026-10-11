<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Minimal id + name (+ parent id) shape shared by regions and districts.
 */
class NamedResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'region_id' => $this->when(isset($this->region_id), fn () => $this->region_id),
            'branches_count' => $this->whenCounted('branches'),
        ];
    }
}
