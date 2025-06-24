<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBoardOfDirectorRequest;
use App\Http\Requests\UpdateBoardOfDirectorRequest;
use App\Models\BoardOfDirector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BoardOfDirectorController extends Controller
{
    public function index(Request $request)
    {
        $boardOfDirectors = QueryBuilder::for(BoardOfDirector::class)
            ->allowedFilters(BoardOfDirector::getAllowedFilters())
            ->allowedSorts(BoardOfDirector::getAllowedSorts())
            ->defaultSort('-sort_order')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('BoardOfDirector/Index', [
            'boardOfDirectors' => $boardOfDirectors,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('BoardOfDirector/Create');
    }

    public function store(StoreBoardOfDirectorRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('board-of-directors', 'public');
        }

        BoardOfDirector::create($validated);

        return redirect()->route('board-of-directors.index')
            ->with('success', 'Board member created successfully.');
    }

    public function show(BoardOfDirector $boardOfDirector)
    {
        return Inertia::render('BoardOfDirector/Show', [
            'boardOfDirector' => $boardOfDirector,
        ]);
    }

    public function edit(BoardOfDirector $boardOfDirector)
    {
        return Inertia::render('BoardOfDirector/Edit', [
            'boardOfDirector' => $boardOfDirector,
        ]);
    }

    public function update(UpdateBoardOfDirectorRequest $request, BoardOfDirector $boardOfDirector)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($boardOfDirector->image) {
                Storage::disk('public')->delete($boardOfDirector->image);
            }
            $validated['image'] = $request->file('image')->store('board-of-directors', 'public');
        } else {
            // Remove image from update data to preserve existing value
            unset($validated['image']);
        }

        $boardOfDirector->update($validated);

        return redirect()->route('board-of-directors.index')
            ->with('success', 'Board member updated successfully.');
    }

    public function destroy(BoardOfDirector $boardOfDirector)
    {
        // Delete image if exists
        if ($boardOfDirector->image) {
            Storage::disk('public')->delete($boardOfDirector->image);
        }

        $boardOfDirector->delete();

        return redirect()->route('board-of-directors.index')
            ->with('success', 'Board member deleted successfully.');
    }
}
