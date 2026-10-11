<?php

namespace App\Http\Resources\V1;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Branch
 */
class BranchResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $contacts = $this->relationLoaded('contacts')
            ? $this->contacts->where('status', 'active')
            : collect();

        return [
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'address' => $this->address,
            'region' => $this->whenLoaded('region', fn () => ['id' => $this->region->id, 'name' => $this->region->name]),
            'district' => $this->whenLoaded('district', fn () => ['id' => $this->district->id, 'name' => $this->district->name]),
            'latitude' => $this->latitude !== null ? (float) $this->latitude : null,
            'longitude' => $this->longitude !== null ? (float) $this->longitude : null,
            'map_url' => $this->map_url,
            'directions' => $this->directions,
            'facilities' => $this->facilityList(),
            'is_24_hours' => (bool) $this->is_24_hours,
            'operating_hours' => $this->operating_hours,
            'holidays' => $this->holidays,
            'phones' => $contacts->pluck('phone')->filter()->unique()->values(),
            'emails' => $contacts->pluck('email')->filter()->unique()->values(),
            'distance_km' => $this->when(isset($this->distance_km), fn () => round($this->distance_km, 2)),
        ];
    }

    /**
     * Facilities are stored either as a JSON list or as comma separated text.
     *
     * @return list<string>
     */
    private function facilityList(): array
    {
        $raw = $this->facilities;

        if (blank($raw)) {
            return [];
        }

        $decoded = json_decode($raw, true);
        $items = is_array($decoded) ? $decoded : explode(',', $raw);

        return array_values(array_filter(array_map('trim', $items)));
    }
}
