<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use App\Models\ServiceAttribute;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $services = QueryBuilder::for(Service::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::partial('description'),
                AllowedFilter::exact('is_active'),
            ])
            ->allowedSorts([
                'id',
                'name',
                'sort_order',
                'is_active',
                'created_at',
                'updated_at',
            ])
            ->defaultSort('-created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Services/Index', [
            'services' => $services,
            'filters' => $request->only(['filter']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/Create');
    }

    public function store(StoreServiceRequest $request)
    {
        $validated = $request->validated();

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        $service = Service::create($validated);

        // Handle service attributes
        if (! empty($validated['attributes'])) {
            foreach ($validated['attributes'] as $index => $attribute) {
                if (! empty($attribute['name']) && ! empty($attribute['value'])) {
                    ServiceAttribute::create([
                        'service_id' => $service->id,
                        'attribute_name' => $attribute['name'],
                        'attribute_value' => $attribute['value'],
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        // Immediately clear menu cache for new services
        try {
            app(MenuService::class)->clearMenuCache();
        } catch (\Exception $e) {
            \Log::warning('Failed to clear menu cache after service creation: ' . $e->getMessage());
        }

        return redirect()->route('services.index')
            ->with('success', 'Service created successfully.');
    }

    public function show(Service $service)
    {
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => [
                ...$service->toArray(),
                'image_url' => $service->image ? asset('storage/'.$service->image) : null,
            ],
        ]);
    }

    public function edit(Service $service)
    {
        $service->load('attributes');

        return Inertia::render('Services/Edit', [
            'service' => [
                ...$service->toArray(),
                'image_url' => $service->image ? asset('storage/'.$service->image) : null,
            ],
        ]);
    }

    public function update(UpdateServiceRequest $request, Service $service)
    {
        $validated = $request->validated();

        // Update slug if name changed
        if ($validated['name'] !== $service->name) {
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

        // Immediately clear menu cache to ensure real-time updates
        try {
            app(MenuService::class)->clearMenuCache();
        } catch (\Exception $e) {
            \Log::warning('Failed to clear menu cache after service update: ' . $e->getMessage());
        }

        // Update service attributes
        if (isset($validated['attributes'])) {
            // Delete existing attributes
            $service->attributes()->delete();

            // Create new attributes
            foreach ($validated['attributes'] as $index => $attribute) {
                if (! empty($attribute['name']) && ! empty($attribute['value'])) {
                    ServiceAttribute::create([
                        'service_id' => $service->id,
                        'attribute_name' => $attribute['name'],
                        'attribute_value' => $attribute['value'],
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        return redirect()->route('services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        // Delete image if exists
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        // Immediately clear menu cache after service deletion
        try {
            app(MenuService::class)->clearMenuCache();
        } catch (\Exception $e) {
            \Log::warning('Failed to clear menu cache after service deletion: ' . $e->getMessage());
        }

        return redirect()->route('services.index')
            ->with('success', 'Service deleted successfully.');
    }

    // Existing public methods for frontend
    public function indexHomePage()
    {
        $services = Service::active()->ordered()->get();

        return Inertia::render('Services/IndexHomePage', [
            'services' => $services,
        ]);
    }

    public function showHomePage(Service $service)
    {

        // Check if service is active
        if (!$service->is_active) {
            abort(404, 'Service not available.');
        }

        $service->load('attributes');

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function lockersFacility()
    {
        $service = Service::where('slug', 'lockers-facility')
            ->where('is_active', true)
            ->with('attributes')
            ->first();

        if (!$service) {
            abort(404, 'Service not available.');
        }

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function utilityBillsCollection()
    {
        $service = Service::where('slug', 'utility-bills-collection')
            ->where('is_active', true)
            ->with('attributes')
            ->first();

        if (!$service) {
            abort(404, 'Service not available.');
        }

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function servicesForAjkPsc()
    {
        $service = Service::where('slug', 'services-for-ajk-psc')
            ->where('is_active', true)
            ->with('attributes')
            ->first();

        if (!$service) {
            abort(404, 'Service not available.');
        }

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }

    public function homeRemittance()
    {
        $service = Service::where('slug', 'home-remittance')
            ->where('is_active', true)
            ->with('attributes')
            ->first();

        if (!$service) {
            abort(404, 'Service not available.');
        }

        return Inertia::render('Services/ShowHomePage', [
            'service' => $service,
        ]);
    }
}
