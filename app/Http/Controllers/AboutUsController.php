<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAboutUsRequest;
use App\Http\Requests\UpdateAboutUsRequest;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class AboutUsController extends Controller
{
    public function index(Request $request)
    {
        $aboutUsList = QueryBuilder::for(AboutUs::class)
            ->allowedFilters(AboutUs::getAllowedFilters())
            ->allowedSorts(AboutUs::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('AboutUs/Index', [
            'aboutUsList' => $aboutUsList,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('AboutUs/Create');
    }

    public function store(StoreAboutUsRequest $request)
    {
        AboutUs::create($request->validated());

        return redirect()->route('about-us.index')
            ->with('success', 'About Us content created successfully.');
    }

    public function show(AboutUs $aboutUs)
    {
        return Inertia::render('AboutUs/Show', [
            'aboutUs' => $aboutUs,
        ]);
    }

    public function edit(AboutUs $aboutUs)
    {
        return Inertia::render('AboutUs/Edit', [
            'aboutUs' => $aboutUs,
        ]);
    }

    public function update(UpdateAboutUsRequest $request, AboutUs $aboutUs)
    {
        $aboutUs->update($request->validated());

        return redirect()->route('about-us.index')
            ->with('success', 'About Us content updated successfully.');
    }

    public function destroy(AboutUs $aboutUs)
    {
        $aboutUs->delete();

        return redirect()->route('about-us.index')
            ->with('success', 'About Us content deleted successfully.');
    }

    /**
     * Display a listing of the resource for the public website.
     */
    public function publicIndex(Request $request)
    {
        $aboutUs = AboutUs::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('About/AboutUs', [
            'aboutUs' => $aboutUs,
        ]);
    }
}
