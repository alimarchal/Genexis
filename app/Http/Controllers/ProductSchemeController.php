<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductSchemeRequest;
use App\Http\Requests\UpdateProductSchemeRequest;
use App\Models\ProductScheme;
use App\Models\ProductTypeAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ProductSchemeController extends Controller
{
    public function index(Request $request)
    {
        $productSchemes = QueryBuilder::for(ProductScheme::class)
            ->with('productTypeAccount.productType.product')
            ->allowedFilters(ProductScheme::getAllowedFilters())
            ->allowedSorts(ProductScheme::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        $accounts = ProductTypeAccount::with('productType.product')->active()->get();

        return Inertia::render('ProductScheme/Index', [
            'productSchemes' => $productSchemes,
            'accounts' => $accounts,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        $accounts = ProductTypeAccount::with('productType.product')->active()->get();

        return Inertia::render('ProductScheme/Create', [
            'accounts' => $accounts,
        ]);
    }

    public function store(StoreProductSchemeRequest $request)
    {
        ProductScheme::create($request->validated());

        return redirect()->route('product-schemes.index')
            ->with('success', 'Product scheme created successfully.');
    }

    public function show(ProductScheme $productScheme)
    {
        $productScheme->load(['productTypeAccount.productType.product', 'attributes']);

        return Inertia::render('ProductScheme/Show', [
            'productScheme' => $productScheme,
        ]);
    }

    public function edit(ProductScheme $productScheme)
    {
        $accounts = ProductTypeAccount::with('productType.product')->active()->get();

        return Inertia::render('ProductScheme/Edit', [
            'productScheme' => $productScheme,
            'accounts' => $accounts,
        ]);
    }

    public function update(UpdateProductSchemeRequest $request, ProductScheme $productScheme)
    {
        $productScheme->update($request->validated());

        return redirect()->route('product-schemes.index')
            ->with('success', 'Product scheme updated successfully.');
    }

    public function destroy(ProductScheme $productScheme)
    {
        $productScheme->delete();

        return redirect()->route('product-schemes.index')
            ->with('success', 'Product scheme deleted successfully.');
    }
}
