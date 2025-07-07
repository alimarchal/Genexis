<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Models\ServiceAttribute;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Http\Requests\StoreServiceAttributeRequest;
use App\Http\Requests\UpdateServiceAttributeRequest;


class ServiceAttributeController extends Controller
{
    public function index(Request $request)
    {
        $serviceAttributes = QueryBuilder::for(ServiceAttribute::class)
            ->allowedFilters([
                AllowedFilter::partial('attribute_name'),
                AllowedFilter::exact('service_id')
            ])
            ->allowedSorts(['id', 'attribute_name', 'sort_order', 'created_at'])
            ->with('service:id,name')
            ->defaultSort('sort_order')
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        $services = Service::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('ServiceAttributes/Index', [
            'serviceAttributes' => $serviceAttributes,
            'services' => $services,
            'filters' => $request->only(['filter']),
        ]);
    }

    public function create()
    {
        $services = Service::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('ServiceAttributes/Create', [
            'services' => $services,
        ]);
    }

    public function store(StoreServiceAttributeRequest $request)
    {
        $data = $request->validated();

        ServiceAttribute::create($data);

        return redirect()->route('service-attributes.index')
            ->with('success', 'Service attribute created successfully.');
    }

    public function show(ServiceAttribute $serviceAttribute)
    {
        $serviceAttribute->load('service:id,name');

        return Inertia::render('ServiceAttributes/Show', [
            'serviceAttribute' => $serviceAttribute,
        ]);
    }

    public function edit(ServiceAttribute $serviceAttribute)
    {
        $serviceAttribute->load('service:id,name');
        $services = Service::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('ServiceAttributes/Edit', [
            'serviceAttribute' => $serviceAttribute,
            'services' => $services,
        ]);
    }

    public function update(UpdateServiceAttributeRequest $request, ServiceAttribute $serviceAttribute)
    {
        $data = $request->validated();

        $serviceAttribute->update($data);

        return redirect()->route('service-attributes.index')
            ->with('success', 'Service attribute updated successfully.');
    }

    public function destroy(ServiceAttribute $serviceAttribute)
    {
        $serviceAttribute->delete();

        return redirect()->route('service-attributes.index')
            ->with('success', 'Service attribute deleted successfully.');
    }
}