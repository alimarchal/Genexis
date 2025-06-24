<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBranchServiceRequest;
use App\Http\Requests\UpdateBranchServiceRequest;
use App\Models\Branch;
use App\Models\BranchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BranchServiceController extends Controller
{
    public function index(Request $request)
    {
        $branchServices = QueryBuilder::for(BranchService::class)
            ->with('branch')
            ->allowedFilters(BranchService::getAllowedFilters())
            ->allowedSorts(BranchService::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        $branches = Branch::active()->orderBy('name')->get();

        return Inertia::render('BranchService/Index', [
            'branchServices' => $branchServices,
            'branches' => $branches,
            'filters' => request()->only(['filter', 'sort']),
        ]);
    }

    public function create()
    {
        $branches = Branch::active()->orderBy('name')->get();

        return Inertia::render('BranchService/Create', [
            'branches' => $branches,
        ]);
    }

    public function store(StoreBranchServiceRequest $request)
    {
        $data = $request->validated();

        BranchService::create($data);

        return redirect()->route('branch-services.index')
            ->with('success', 'Branch service created successfully.');
    }

    public function show(BranchService $branchService)
    {
        $branchService->load('branch');

        return Inertia::render('BranchService/Show', [
            'branchService' => $branchService,
        ]);
    }

    public function edit(BranchService $branchService)
    {
        $branches = Branch::active()->orderBy('name')->get();
        $branchService->load('branch');

        return Inertia::render('BranchService/Edit', [
            'branchService' => $branchService,
            'branches' => $branches,
        ]);
    }

    public function update(UpdateBranchServiceRequest $request, BranchService $branchService)
    {
        $data = $request->validated();

        $branchService->update($data);

        return redirect()->route('branch-services.index')
            ->with('success', 'Branch service updated successfully.');
    }

    public function destroy(BranchService $branchService)
    {
        $branchService->delete();

        return redirect()->route('branch-services.index')
            ->with('success', 'Branch service deleted successfully.');
    }
}
