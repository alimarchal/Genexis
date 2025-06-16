<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductTypeAccountRequest;
use App\Http\Requests\UpdateProductTypeAccountRequest;
use App\Models\ProductType;
use App\Models\ProductTypeAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ProductTypeAccountController extends Controller
{
    public function index(Request $request)
    {
        $productTypeAccounts = QueryBuilder::for(ProductTypeAccount::class)
            ->with('productType.product')
            ->allowedFilters(ProductTypeAccount::getAllowedFilters())
            ->allowedSorts(ProductTypeAccount::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();



        $productTypes = ProductType::with('product')->active()->get();
        // dd($productTypeAccounts);
        return Inertia::render('ProductTypeAccount/Index', [
            'productTypeAccounts' => $productTypeAccounts,
            'productTypes' => $productTypes,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        $productTypes = ProductType::with('product')->active()->get();

        return Inertia::render('ProductTypeAccount/Create', [
            'productTypes' => $productTypes,
        ]);
    }

    public function store(StoreProductTypeAccountRequest $request)
    {
        ProductTypeAccount::create($request->validated());

        return redirect()->route('product-type-accounts.index')
            ->with('success', 'Product type account created successfully.');
    }

    public function show(ProductTypeAccount $productTypeAccount)
    {
        $productTypeAccount->load(['productType.product', 'productSchemes']);

        return Inertia::render('ProductTypeAccount/Show', [
            'productTypeAccount' => $productTypeAccount,
        ]);
    }

    public function edit(ProductTypeAccount $productTypeAccount)
    {
        $productTypes = ProductType::with('product')->active()->get();

        return Inertia::render('ProductTypeAccount/Edit', [
            'productTypeAccount' => $productTypeAccount,
            'productTypes' => $productTypes,
        ]);
    }

    public function update(UpdateProductTypeAccountRequest $request, ProductTypeAccount $productTypeAccount)
    {
        $productTypeAccount->update($request->validated());

        return redirect()->route('product-type-accounts.index')
            ->with('success', 'Product type account updated successfully.');
    }

    public function destroy(ProductTypeAccount $productTypeAccount)
    {
        $productTypeAccount->delete();

        return redirect()->route('product-type-accounts.index')
            ->with('success', 'Product type account deleted successfully.');
    }
}