<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreManagementRequest;
use App\Http\Requests\UpdateManagementRequest;
use App\Models\Management;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ManagementController extends Controller
{
    public function index(Request $request)
    {
        $managements = QueryBuilder::for(Management::class)
            ->allowedFilters(Management::getAllowedFilters())
            ->allowedSorts(Management::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Management/Index', [
            'managements' => $managements,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Create');
    }

    public function store(StoreManagementRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('management-attachments', 'public');
        }

        $data['created_by'] = auth()->id();

        Management::create($data);

        return redirect()->route('managements.index')
            ->with('success', 'Management member created successfully.');
    }

    public function show(Management $management)
    {
        return Inertia::render('Management/Show', [
            'management' => $management,
        ]);
    }

    public function edit(Management $management)
    {
        return Inertia::render('Management/Edit', [
            'management' => $management,
        ]);
    }

    public function update(UpdateManagementRequest $request, Management $management)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($management->attachment) {
                Storage::disk('public')->delete($management->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('management-attachments', 'public');
        } else {
            // Remove attachment from update data to preserve existing value
            unset($data['attachment']);
        }

        $data['updated_by'] = auth()->id();

        $management->update($data);

        return redirect()->route('managements.index')
            ->with('success', 'Management member updated successfully.');
    }

    public function destroy(Management $management)
    {
        // Delete attachment if exists
        if ($management->attachment) {
            Storage::disk('public')->delete($management->attachment);
        }

        $management->delete();

        return redirect()->route('managements.index')
            ->with('success', 'Management member deleted successfully.');
    }
}
