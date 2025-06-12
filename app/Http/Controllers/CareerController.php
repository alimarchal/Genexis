<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerRequest;
use App\Http\Requests\UpdateCareerRequest;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class CareerController extends Controller
{
    public function index(Request $request)
    {
        $careers = QueryBuilder::for(Career::class)
            ->allowedFilters(Career::getAllowedFilters())
            ->allowedSorts(Career::getAllowedSorts())
            ->defaultSort('-created_at')
            ->with(['creator', 'updater'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Career/Index', [
            'careers' => $careers,
            'filters' => $request->only(['filter']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Career/Create');
    }

    public function store(StoreCareerRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $data['document'] = $file->store('careers', 'public');
        }

        Career::create($data);

        return redirect()->route('careers.index')
            ->with('success', 'Career created successfully.');
    }

    public function show(Career $career)
    {
        $career->load(['creator', 'updater']);

        return Inertia::render('Career/Show', [
            'career' => $career,
        ]);
    }

    public function edit(Career $career)
    {
        return Inertia::render('Career/Edit', [
            'career' => $career,
        ]);
    }

    public function update(UpdateCareerRequest $request, Career $career)
    {
        $data = $request->validated();

        if ($request->hasFile('document')) {
            // Delete old document if it exists
            if ($career->document) {
                Storage::disk('public')->delete($career->document);
            }

            $file = $request->file('document');
            $data['document'] = $file->store('careers', 'public');
        }

        $career->update($data);

        return redirect()->route('careers.index')
            ->with('success', 'Career updated successfully.');
    }

    public function destroy(Career $career)
    {
        // Delete document if it exists
        if ($career->document) {
            Storage::disk('public')->delete($career->document);
        }

        $career->delete();

        return redirect()->route('careers.index')
            ->with('success', 'Career deleted successfully.');
    }

    public function download(Career $career)
    {
        if (! $career->document) {
            abort(404, 'Document not found.');
        }

        if (! Storage::disk('public')->exists($career->document)) {
            abort(404, 'Document not found.');
        }

        $filePath = Storage::disk('public')->path($career->document);

        $originalExtension = pathinfo($career->document, PATHINFO_EXTENSION);
        $filename = $career->title.'.'.$originalExtension;

        return response()->download($filePath, $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    // Public method for website careers
    public function publicIndex(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $careers = Career::where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('closing_date')
                    ->orWhere('closing_date', '>=', now());
            })
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($career) {
                return [
                    'id' => $career->id,
                    'title' => $career->title,
                    'description' => $career->description,
                    'requirements' => $career->requirements,
                    'location' => $career->location,
                    'closing_date' => $career->closing_date,
                    'benefits' => $career->benefits,
                    'is_featured' => $career->is_featured,
                    'views_count' => $career->views_count,
                    'document_url' => $career->document_url,
                    'created_at' => $career->created_at,
                ];
            });

        return Inertia::render('Careers/PublicCareers', [
            'careers' => $careers,
        ]);
    }

    public function publicShow(Career $career)
    {
        if (! $career->is_active || ($career->closing_date && $career->closing_date->isPast())) {
            abort(404, 'Career not available.');
        }

        // Increment views count
        $career->incrementViewsCount();

        return Inertia::render('Careers/PublicCareerDetail', [
            'career' => [
                'id' => $career->id,
                'title' => $career->title,
                'description' => $career->description,
                'requirements' => $career->requirements,
                'location' => $career->location,
                'closing_date' => $career->closing_date,
                'benefits' => $career->benefits,
                'views_count' => $career->views_count,
                'document_url' => $career->document_url,
                'created_at' => $career->created_at,
            ],
        ]);
    }
}
