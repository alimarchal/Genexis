<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfitRateRequest;
use App\Http\Requests\UpdateProfitRateRequest;
use App\Models\ProfitRate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ProfitRateController extends Controller
{
    public function index(Request $request)
    {
        $profitRates = QueryBuilder::for(ProfitRate::class)
            ->allowedFilters(ProfitRate::getAllowedFilters())
            ->allowedSorts(ProfitRate::getAllowedSorts())
            ->defaultSort('sort_order', '-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('ProfitRates/Index', [
            'profitRates' => $profitRates,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('ProfitRates/Create');
    }

    public function store(StoreProfitRateRequest $request)
    {
        ProfitRate::create($request->validated());

        return redirect()->route('profit-rates.index')
            ->with('success', 'Profit rate created successfully.');
    }

    public function show(ProfitRate $profitRate)
    {
        return Inertia::render('ProfitRates/Show', [
            'profitRate' => $profitRate,
        ]);
    }

    public function edit(ProfitRate $profitRate)
    {
        return Inertia::render('ProfitRates/Edit', [
            'profitRate' => $profitRate,
        ]);
    }

    public function update(UpdateProfitRateRequest $request, ProfitRate $profitRate)
    {
        $profitRate->update($request->validated());

        return redirect()->route('profit-rates.index')
            ->with('success', 'Profit rate updated successfully.');
    }

    public function destroy(ProfitRate $profitRate)
    {
        $profitRate->delete();

        return redirect()->route('profit-rates.index')
            ->with('success', 'Profit rate deleted successfully.');
    }
}