<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\NamedResource;
use App\Models\Region;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RegionController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $regions = Region::query()->where('status', 'active')
            ->withCount(['branches' => fn ($query) => $query->active()])
            ->orderBy('name')
            ->get();

        return NamedResource::collection($regions);
    }
}
