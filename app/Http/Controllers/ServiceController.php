<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceController extends Controller
{


    public function index(Request $request)
    {
        $services = QueryBuilder::for(Service::class)
            ->allowedFilters(Service::getAllowedFilters())
            ->allowedSorts(Service::getAllowedSorts())
            ->withCount('attributes')
            ->defaultSort('-created_at')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($service) => [
                'id' => $service->id,
                'name' => $service->name,
                'slug' => $service->slug,
                'description' => $service->description,
                'icon' => $service->icon,
                'image' => $service->image,
                'image_url' => $service->image_url,
                'is_active' => $service->is_active,
                'sort_order' => $service->sort_order,
                'attributes_count' => $service->attributes_count,
                'created_at' => $service->created_at,
                'updated_at' => $service->updated_at,
            ]);

        return Inertia::render('Services/Index', [
            'services' => $services,
            'filters' => $request->all('filter'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/Create');
    }

    public function store(StoreServiceRequest $request)
    {
        $validated = $request->validated();

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        $service = Service::create($validated);

        // Create attributes
        if (!empty($validated['attributes'])) {
            foreach ($validated['attributes'] as $index => $attribute) {
                if (!empty(trim($attribute['attribute_name'])) && !empty(trim($attribute['attribute_value']))) {
                    $service->attributes()->create([
                        'attribute_name' => trim($attribute['attribute_name']),
                        'attribute_value' => trim($attribute['attribute_value']),
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        return redirect()
            ->route('services.index')
            ->with('success', 'Service created successfully.');
    }

    public function show(Service $service)
    {
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'slug' => $service->slug,
                'description' => $service->description,
                'icon' => $service->icon,
                'image' => $service->image,
                'image_url' => $service->image_url,
                'is_active' => $service->is_active,
                'sort_order' => $service->sort_order,
                'meta_data' => $service->meta_data,
                'attributes' => $service->attributes->map(fn($attr) => [
                    'id' => $attr->id,
                    'attribute_name' => $attr->attribute_name,
                    'attribute_value' => $attr->attribute_value,
                    'sort_order' => $attr->sort_order,
                ]),
                'created_at' => $service->created_at,
                'updated_at' => $service->updated_at,
            ],
        ]);
    }

    public function edit(Service $service)
    {
        // Ensure attributes are loaded with proper ordering
        $service->load([
            'attributes' => function ($query) {
                $query->orderBy('sort_order');
            }
        ]);

        return Inertia::render('Services/Edit', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'slug' => $service->slug,
                'description' => $service->description,
                'icon' => $service->icon,
                'image' => $service->image,
                'image_url' => $service->image_url,
                'is_active' => $service->is_active,
                'sort_order' => $service->sort_order,
                'meta_data' => $service->meta_data,
                'attributes' => $service->attributes->map(function ($attr) {
                    return [
                        'id' => $attr->id,
                        'attribute_name' => $attr->attribute_name,
                        'attribute_value' => $attr->attribute_value,
                        'sort_order' => $attr->sort_order,
                    ];
                })->values()->toArray(), // Ensure it's a proper array
            ],
        ]);
    }

    public function update(UpdateServiceRequest $request, Service $service)
    {
        $validated = $request->validated();

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        $service->update($validated);

        // Update attributes
        if (isset($validated['attributes'])) {
            // Delete existing attributes
            $service->attributes()->delete();

            // Create new attributes
            foreach ($validated['attributes'] as $index => $attribute) {
                if (!empty(trim($attribute['attribute_name'])) && !empty(trim($attribute['attribute_value']))) {
                    $service->attributes()->create([
                        'attribute_name' => trim($attribute['attribute_name']),
                        'attribute_value' => trim($attribute['attribute_value']),
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        return redirect()
            ->route('services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        // Delete image file
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        // Delete attributes (handled by cascade)
        $service->delete();

        return redirect()
            ->route('services.index')
            ->with('success', 'Service deleted successfully.');
    }

    public function indexHomePage()
    {
        $services = Service::active()
            ->ordered()
            ->with('attributes')
            ->get();

        return Inertia::render('Services/IndexHomePage', [
            'services' => $services,
        ]);
    }

    public function showHomePage(Service $service)
    {
        $service->load('attributes');

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function lockersFacility()
    {
        $service = Service::where('slug', 'lockers-facility')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function utilityBillsCollection()
    {
        $service = Service::where('slug', 'utility-bills-collection')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function servicesForAjkPsc()
    {
        $service = Service::where('slug', 'services-for-ajk-psc')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function homeRemittance()
    {
        $service = Service::where('slug', 'home-remittance')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }
}
