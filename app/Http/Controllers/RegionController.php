<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegionRequest;
use App\Http\Requests\UpdateRegionRequest;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class RegionController extends Controller
{
    public function index(Request $request)
    {
        $regions = QueryBuilder::for(Region::class)
            ->allowedFilters(Region::getAllowedFilters())
            ->allowedSorts(Region::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Region/Index', [
            'regions' => $regions,
            'filters' => request()->only(['filter', 'sort']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Region/Create');
    }

    public function store(StoreRegionRequest $request)
    {
        $data = $request->validated();

        Region::create($data);

        return redirect()->route('regions.index')
            ->with('success', 'Region created successfully.');
    }

    public function show(Region $region)
    {
        return Inertia::render('Region/Show', [
            'region' => $region,
        ]);
    }

    public function edit(Region $region)
    {
        return Inertia::render('Region/Edit', [
            'region' => $region,
        ]);
    }

    public function update(UpdateRegionRequest $request, Region $region)
    {
        $data = $request->validated();

        $region->update($data);

        return redirect()->route('regions.index')
            ->with('success', 'Region updated successfully.');
    }

    public function destroy(Region $region)
    {
        $region->delete();

        return redirect()->route('regions.index')
            ->with('success', 'Region deleted successfully.');
    }
}
