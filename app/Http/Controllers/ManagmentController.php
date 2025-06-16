<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreManagmentRequest;
use App\Http\Requests\UpdateManagmentRequest;
use App\Models\Managment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ManagmentController extends Controller
{
    public function index(Request $request)
    {
        $managments = QueryBuilder::for(Managment::class)
            ->allowedFilters(Managment::getAllowedFilters())
            ->allowedSorts(Managment::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Managment/Index', [
            'managments' => $managments,
            'filters' => request()->all(), // Changed from request()->only(['filter', 'sort'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Managment/Create');
    }

    public function store(StoreManagmentRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('managment-attachments', 'public');
        }

        $data['created_by'] = auth()->id();

        Managment::create($data);

        return redirect()->route('managments.index')
            ->with('success', 'Management member created successfully.');
    }

    public function show(Managment $managment)
    {
        return Inertia::render('Managment/Show', [
            'managment' => $managment,
        ]);
    }

    public function edit(Managment $managment)
    {
        return Inertia::render('Managment/Edit', [
            'managment' => $managment,
        ]);
    }

    public function update(UpdateManagmentRequest $request, Managment $managment)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($managment->attachment) {
                Storage::disk('public')->delete($managment->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('managment-attachments', 'public');
        } else {
            // Remove attachment from update data to preserve existing value
            unset($data['attachment']);
        }

        $data['updated_by'] = auth()->id();

        $managment->update($data);

        return redirect()->route('managments.index')
            ->with('success', 'Management member updated successfully.');
    }

    public function destroy(Managment $managment)
    {
        // Delete attachment if exists
        if ($managment->attachment) {
            Storage::disk('public')->delete($managment->attachment);
        }

        $managment->delete();

        return redirect()->route('managments.index')
            ->with('success', 'Management member deleted successfully.');
    }
}
