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
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $profitRates = QueryBuilder::for(ProfitRate::class)
            ->with(['creator', 'updater'])
            ->allowedFilters(ProfitRate::getAllowedFilters())
            ->allowedSorts(ProfitRate::getAllowedSorts())
            ->defaultSort('-created_at')
            ->when($request->get('search'), function ($query, $search) {
                $query->where('category', 'like', "%{$search}%");
            })
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('ProfitRates/Index', [
            'profitRates' => $profitRates,
            'filters' => request()->only(['filter', 'sort', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ProfitRates/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfitRateRequest $request)
    {
        $data = $request->validated();

        ProfitRate::create($data);

        return redirect()->route('profit-rates.index')
            ->with('success', 'Profit rate created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProfitRate $profitRate)
    {
        return Inertia::render('ProfitRates/Show', [
            'profitRate' => $profitRate->load('creator', 'updater'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProfitRate $profitRate)
    {
        return Inertia::render('ProfitRates/Edit', [
            'profitRate' => $profitRate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfitRateRequest $request, ProfitRate $profitRate)
    {
        $data = $request->validated();

        $profitRate->update($data);

        return redirect()->route('profit-rates.index')
            ->with('success', 'Profit rate updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProfitRate $profitRate)
    {
        $profitRate->delete();

        return redirect()->route('profit-rates.index')
            ->with('success', 'Profit rate deleted successfully.');
    }
}
