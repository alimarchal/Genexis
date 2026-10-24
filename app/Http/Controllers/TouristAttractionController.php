<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTouristAttractionRequest;
use App\Http\Requests\UpdateTouristAttractionRequest;
use App\Models\TouristAttraction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class TouristAttractionController extends Controller
{
    private const IMAGE_FIELDS = ['image', 'route_map_image'];

    public function index(): Response
    {
        $attractions = QueryBuilder::for(TouristAttraction::class)
            ->allowedFilters(TouristAttraction::getAllowedFilters())
            ->allowedSorts(TouristAttraction::getAllowedSorts())
            ->defaultSort('order', '-created_at')
            ->paginate($this->perPage(15))
            ->withQueryString();

        return Inertia::render('TouristAttraction/Index', [
            'attractions' => $attractions,
            'filters' => request()->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('TouristAttraction/Create');
    }

    public function store(StoreTouristAttractionRequest $request): RedirectResponse
    {
        $data = $request->safe()->except(self::IMAGE_FIELDS);

        foreach (self::IMAGE_FIELDS as $field) {
            if ($request->hasFile($field)) {
                $data[$field] = $request->file($field)->store('tourist-attractions', 'public');
            }
        }

        TouristAttraction::create($data);

        return redirect()->route('tourist-attractions.index')
            ->with('success', 'Tourist attraction created successfully.');
    }

    public function show(TouristAttraction $touristAttraction): Response
    {
        return Inertia::render('TouristAttraction/Show', [
            'attraction' => $touristAttraction->load(['creator:id,name', 'updater:id,name']),
        ]);
    }

    public function edit(TouristAttraction $touristAttraction): Response
    {
        return Inertia::render('TouristAttraction/Edit', [
            'attraction' => $touristAttraction,
        ]);
    }

    public function update(UpdateTouristAttractionRequest $request, TouristAttraction $touristAttraction): RedirectResponse
    {
        $data = $request->safe()->except(self::IMAGE_FIELDS);

        foreach (self::IMAGE_FIELDS as $field) {
            if ($request->hasFile($field)) {
                $this->deleteFile($touristAttraction->{$field});
                $data[$field] = $request->file($field)->store('tourist-attractions', 'public');
            }
        }

        $touristAttraction->update($data);

        return redirect()->route('tourist-attractions.index')
            ->with('success', 'Tourist attraction updated successfully.');
    }

    public function destroy(TouristAttraction $touristAttraction): RedirectResponse
    {
        foreach (self::IMAGE_FIELDS as $field) {
            $this->deleteFile($touristAttraction->{$field});
        }

        $touristAttraction->delete();

        return redirect()->route('tourist-attractions.index')
            ->with('success', 'Tourist attraction deleted successfully.');
    }

    public function publicIndex(): Response
    {
        $attractions = TouristAttraction::active()
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn (TouristAttraction $attraction) => [
                'title' => $attraction->title,
                'slug' => $attraction->slug,
                'summary' => $attraction->summary,
                'image_url' => $attraction->image_url,
            ]);

        return Inertia::render('TouristAttractions/Index', [
            'attractions' => $attractions,
            'autoBreadcrumbs' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'Tourist Attractions', 'isActive' => true],
            ],
        ]);
    }

    public function publicShow(string $slug): Response
    {
        $attraction = TouristAttraction::active()->where('slug', $slug)->firstOrFail();

        return Inertia::render('TouristAttractions/Show', [
            'attraction' => [
                'title' => $attraction->title,
                'slug' => $attraction->slug,
                'summary' => $attraction->summary,
                'content' => $attraction->content,
                'image_url' => $attraction->image_url,
                'route_map_image_url' => $attraction->route_map_image_url,
            ],
            'autoBreadcrumbs' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'Tourist Attractions', 'href' => route('tourist-attractions.public')],
                ['label' => $attraction->title, 'isActive' => true],
            ],
        ]);
    }

    private function deleteFile(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
