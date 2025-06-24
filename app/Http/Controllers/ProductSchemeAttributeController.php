<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductSchemeAttributeRequest;
use App\Http\Requests\UpdateProductSchemeAttributeRequest;
use App\Models\ProductScheme;
use App\Models\ProductSchemeAttribute;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ProductSchemeAttributeController extends Controller
{
    public function index(Request $request)
    {
        $attributes = QueryBuilder::for(ProductSchemeAttribute::class)
            ->with('productScheme.productTypeAccount.productType.product')
            ->allowedFilters(ProductSchemeAttribute::getAllowedFilters())
            ->allowedSorts(ProductSchemeAttribute::getAllowedSorts())
            ->defaultSort('sort_order')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        $schemes = ProductScheme::with('productTypeAccount')->active()->get();

        return Inertia::render('ProductSchemeAttribute/Index', [
            'attributes' => $attributes,
            'schemes' => $schemes,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        $schemes = ProductScheme::with('productTypeAccount')->active()->get();

        return Inertia::render('ProductSchemeAttribute/Create', [
            'schemes' => $schemes,
        ]);
    }

    public function store(StoreProductSchemeAttributeRequest $request)
    {
        ProductSchemeAttribute::create($request->validated());

        return redirect()->route('product-scheme-attributes.index')
            ->with('success', 'Attribute created successfully.');
    }

    public function show(ProductSchemeAttribute $productSchemeAttribute)
    {
        $productSchemeAttribute->load('productScheme.productTypeAccount.productType.product');

        return Inertia::render('ProductSchemeAttribute/Show', [
            'productSchemeAttribute' => $productSchemeAttribute,
        ]);
    }

    public function edit(ProductSchemeAttribute $productSchemeAttribute)
    {
        $schemes = ProductScheme::with('productTypeAccount')->active()->get();

        return Inertia::render('ProductSchemeAttribute/Edit', [
            'productSchemeAttribute' => $productSchemeAttribute,
            'schemes' => $schemes,
        ]);
    }

    public function update(UpdateProductSchemeAttributeRequest $request, ProductSchemeAttribute $productSchemeAttribute)
    {
        $productSchemeAttribute->update($request->validated());

        return redirect()->route('product-scheme-attributes.index')
            ->with('success', 'Attribute updated successfully.');
    }

    public function destroy(ProductSchemeAttribute $productSchemeAttribute)
    {
        $productSchemeAttribute->delete();

        return redirect()->route('product-scheme-attributes.index')
            ->with('success', 'Attribute deleted successfully.');
    }
}
