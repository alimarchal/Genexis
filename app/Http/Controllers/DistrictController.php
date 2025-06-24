<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDistrictRequest;
use App\Http\Requests\UpdateDistrictRequest;
use App\Models\District;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class DistrictController extends Controller
{
    public function index(Request $request)
    {
        $districts = QueryBuilder::for(District::class)
            ->with('region')
            ->allowedFilters(District::getAllowedFilters())
            ->allowedSorts(District::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        $regions = Region::active()->orderBy('name')->get();

        return Inertia::render('District/Index', [
            'districts' => $districts,
            'regions' => $regions,
            'filters' => $request->query(),
        ]);
    }

    public function create()
    {
        $regions = Region::active()->orderBy('name')->get();

        return Inertia::render('District/Create', [
            'regions' => $regions,
        ]);
    }

    public function store(StoreDistrictRequest $request)
    {
        $data = $request->validated();

        District::create($data);

        return redirect()->route('districts.index')
            ->with('success', 'District created successfully.');
    }

    public function show(District $district)
    {
        $district->load('region');

        return Inertia::render('District/Show', [
            'district' => $district,
        ]);
    }

    public function edit(District $district)
    {
        $regions = Region::active()->orderBy('name')->get();
        $district->load('region');

        return Inertia::render('District/Edit', [
            'district' => $district,
            'regions' => $regions,
        ]);
    }

    public function update(UpdateDistrictRequest $request, District $district)
    {
        $data = $request->validated();

        $district->update($data);

        return redirect()->route('districts.index')
            ->with('success', 'District updated successfully.');
    }

    public function destroy(District $district)
    {
        $district->delete();

        return redirect()->route('districts.index')
            ->with('success', 'District deleted successfully.');
    }
}
