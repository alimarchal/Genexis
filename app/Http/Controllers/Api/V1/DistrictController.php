<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\NamedResource;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DistrictController extends Controller
{
    /**
     * Optional ?region_id= narrows the list to one region.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $districts = District::query()->where('status', 'active')
            ->when($request->filled('region_id'), fn ($query) => $query->where('region_id', $request->integer('region_id')))
            ->withCount(['branches' => fn ($query) => $query->active()])
            ->orderBy('name')
            ->get();

        return NamedResource::collection($districts);
    }
}
