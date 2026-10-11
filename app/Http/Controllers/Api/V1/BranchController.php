<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\BranchResource;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BranchController extends Controller
{
    private const EARTH_RADIUS_KM = 6371;

    /**
     * List active branches. Filters: region_id, district_id, type, is_24_hours, name, address.
     * Sort: name, code. Pagination: per_page (max 100).
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $branches = QueryBuilder::for(Branch::query()->active())
            ->allowedFilters([
                AllowedFilter::exact('region_id'),
                AllowedFilter::exact('district_id'),
                AllowedFilter::exact('type'),
                AllowedFilter::exact('is_24_hours'),
                AllowedFilter::partial('name'),
                AllowedFilter::partial('address'),
            ])
            ->allowedSorts(['name', 'code'])
            ->defaultSort('code')
            ->with(['region:id,name', 'district:id,name', 'contacts'])
            ->paginate(min((int) $request->integer('per_page', 25), 100))
            ->withQueryString();

        return BranchResource::collection($branches);
    }

    public function show(string $code): BranchResource
    {
        $branch = Branch::query()->active()
            ->where('code', $code)
            ->with(['region:id,name', 'district:id,name', 'contacts'])
            ->firstOrFail();

        return new BranchResource($branch);
    }

    /**
     * Branches within radius_km (default 25, max 200) of a point, nearest first.
     */
    public function nearby(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'lat' => ['required', 'numeric', 'between:-90,90'],
            'lng' => ['required', 'numeric', 'between:-180,180'],
            'radius_km' => ['nullable', 'numeric', 'min:0.1', 'max:200'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $lat = (float) $validated['lat'];
        $lng = (float) $validated['lng'];
        $radius = (float) ($validated['radius_km'] ?? 25);
        $limit = (int) ($validated['limit'] ?? 10);

        $branches = Branch::query()->active()
            ->whereNotNull('latitude')->whereNotNull('longitude')
            ->with(['region:id,name', 'district:id,name', 'contacts'])
            ->get()
            ->each(fn (Branch $branch) => $branch->distance_km = $this->distanceKm($lat, $lng, (float) $branch->latitude, (float) $branch->longitude))
            ->filter(fn (Branch $branch) => $branch->distance_km <= $radius)
            ->sortBy('distance_km')
            ->take($limit)
            ->values();

        return BranchResource::collection($branches);
    }

    /**
     * Great-circle distance (haversine) in kilometres.
     */
    private function distanceKm(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) ** 2 + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) ** 2;

        return self::EARTH_RADIUS_KM * 2 * atan2(sqrt($a), sqrt(1 - $a));
    }
}
