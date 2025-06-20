<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;
use App\Models\District;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BranchController extends Controller
{
    public function index(Request $request)
    {
        $branches = QueryBuilder::for(Branch::class)
            ->with(['region', 'district'])
            ->allowedFilters(Branch::getAllowedFilters())
            ->allowedSorts(Branch::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Branch/Index', [
            'branches' => $branches,
            'filters' => request()->only(['filter', 'sort']),
        ]);
    }

    public function create()
    {
        $regions = Region::active()->orderBy('name')->get();
        $districts = District::active()->with('region')->orderBy('name')->get();

        return Inertia::render('Branch/Create', [
            'regions' => $regions,
            'districts' => $districts,
        ]);
    }

    public function store(StoreBranchRequest $request)
    {
        $data = $request->validated();

        Branch::create($data);

        return redirect()->route('branches.index')
            ->with('success', 'Branch created successfully.');
    }

    public function show(Branch $branch)
    {
        $branch->load(['region', 'district', 'contacts', 'branchServices']);

        return Inertia::render('Branch/Show', [
            'branch' => $branch,
        ]);
    }

    public function edit(Branch $branch)
    {
        $regions = Region::active()->orderBy('name')->get();
        $districts = District::active()->with('region')->orderBy('name')->get();
        $branch->load(['region', 'district']);

        return Inertia::render('Branch/Edit', [
            'branch' => $branch,
            'regions' => $regions,
            'districts' => $districts,
        ]);
    }

    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $data = $request->validated();

        $branch->update($data);

        return redirect()->route('branches.index')
            ->with('success', 'Branch updated successfully.');
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return redirect()->route('branches.index')
            ->with('success', 'Branch deleted successfully.');
    }
}
