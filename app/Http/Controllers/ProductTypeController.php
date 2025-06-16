<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductTypeRequest;
use App\Http\Requests\UpdateProductTypeRequest;
use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ProductTypeController extends Controller
{
    public function index(Request $request)
    {
        $productTypes = QueryBuilder::for(ProductType::class)
            ->with('product')
            ->allowedFilters(ProductType::getAllowedFilters())
            ->allowedSorts(ProductType::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        $products = Product::active()->get();

        return Inertia::render('ProductType/Index', [
            'productTypes' => $productTypes,
            'products' => $products,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        $products = Product::active()->get();

        return Inertia::render('ProductType/Create', [
            'products' => $products,
        ]);
    }

    public function store(StoreProductTypeRequest $request)
    {
        ProductType::create($request->validated());

        return redirect()->route('product-types.index')
            ->with('success', 'Product type created successfully.');
    }

    public function show(ProductType $productType)
    {
        $productType->load(['product', 'productTypeAccounts']);

        return Inertia::render('ProductType/Show', [
            'productType' => $productType,
        ]);
    }

    public function edit(ProductType $productType)
    {
        $products = Product::active()->get();

        return Inertia::render('ProductType/Edit', [
            'productType' => $productType,
            'products' => $products,
        ]);
    }

    public function update(UpdateProductTypeRequest $request, ProductType $productType)
    {
        $productType->update($request->validated());

        return redirect()->route('product-types.index')
            ->with('success', 'Product type updated successfully.');
    }

    public function destroy(ProductType $productType)
    {
        $productType->delete();

        return redirect()->route('product-types.index')
            ->with('success', 'Product type deleted successfully.');
    }
}