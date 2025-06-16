<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarouselRequest;
use App\Http\Requests\UpdateCarouselRequest;
use App\Models\Carousel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class CarouselController extends Controller
{
    public function index(Request $request)
    {
        $carousels = QueryBuilder::for(Carousel::class)
            ->allowedFilters(Carousel::getAllowedFilters())
            ->allowedSorts(Carousel::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Carousel/Index', [
            'carousels' => $carousels,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Carousel/Create');
    }

    public function store(StoreCarouselRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('carousel-images', 'public');
        }

        $data['created_by'] = auth()->id();

        Carousel::create($data);

        return redirect()->route('carousels.index')
            ->with('success', 'Carousel slide created successfully.');
    }

    public function show(Carousel $carousel)
    {
        return Inertia::render('Carousel/Show', [
            'carousel' => $carousel,
        ]);
    }

    public function edit(Carousel $carousel)
    {
        return Inertia::render('Carousel/Edit', [
            'carousel' => $carousel,
        ]);
    }

    public function update(UpdateCarouselRequest $request, Carousel $carousel)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($carousel->image) {
                Storage::disk('public')->delete($carousel->image);
            }
            $data['image'] = $request->file('image')->store('carousel-images', 'public');
        } else {
            // Remove image from update data to preserve existing value
            unset($data['image']);
        }

        $data['updated_by'] = auth()->id();

        $carousel->update($data);

        return redirect()->route('carousels.index')
            ->with('success', 'Carousel slide updated successfully.');
    }

    public function destroy(Carousel $carousel)
    {
        // Delete image if exists
        if ($carousel->image) {
            Storage::disk('public')->delete($carousel->image);
        }

        $carousel->delete();

        return redirect()->route('carousels.index')
            ->with('success', 'Carousel slide deleted successfully.');
    }
}
