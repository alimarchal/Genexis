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
            ->defaultSort('-is_featured', '-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Careers/Index', [
            'careers' => $careers,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Careers/Create');
    }

    public function store(StoreCareerRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('document')) {
            $data['document'] = $request->file('document')->store('careers', 'public');
        }

        Career::create($data);

        return redirect()->route('careers.index')
            ->with('success', 'Career created successfully.');
    }

    public function show(Career $career)
    {
        $career->incrementViews();

        return Inertia::render('Careers/Show', [
            'career' => $career,
        ]);
    }

    public function edit(Career $career)
    {
        return Inertia::render('Careers/Edit', [
            'career' => $career,
        ]);
    }

    public function update(UpdateCareerRequest $request, Career $career)
    {
        $data = $request->validated();
        
        // Convert string boolean values to actual booleans
        $data['is_active'] = $request->input('is_active') === '1';
        $data['is_featured'] = $request->input('is_featured') === '1';

        if ($request->hasFile('document')) {
            if ($career->document) {
                Storage::disk('public')->delete($career->document);
            }
            $data['document'] = $request->file('document')->store('careers', 'public');
        } else {
            unset($data['document']);
        }

        $career->update($data);

        return redirect()->route('careers.index')
            ->with('success', 'Career updated successfully.');
    }

    public function destroy(Career $career)
    {
        if ($career->document) {
            Storage::disk('public')->delete($career->document);
        }

        $career->delete();

        return redirect()->route('careers.index')
            ->with('success', 'Career deleted successfully.');
    }

  public function download(Career $career)
{
    $path = $career->document; // e.g. careers/career11.jpeg

    if (!Storage::disk('public')->exists($path)) {
        abort(404, 'File not found.');
    }

    return Storage::disk('public')->download($path, basename($path));
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
        if (!$career->is_active || ($career->closing_date && $career->closing_date->isPast())) {
            abort(404, 'Career not available.');
        }

        // Increment views count
        $career->incrementViews();


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
