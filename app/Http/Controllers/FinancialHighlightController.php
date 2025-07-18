<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFinancialHighlightRequest;
use App\Http\Requests\UpdateFinancialHighlightRequest;
use App\Models\FinancialHighlight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class FinancialHighlightController extends Controller
{
    public function index(Request $request)
    {
        $financialHighlights = QueryBuilder::for(FinancialHighlight::class)
            ->allowedFilters(FinancialHighlight::getAllowedFilters())
            ->allowedSorts(FinancialHighlight::getAllowedSorts())
            ->defaultSort('-fiscal_year', '-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('FinancialHighlights/Index', [
            'financialHighlights' => $financialHighlights,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('FinancialHighlights/Create');
    }

    public function store(StoreFinancialHighlightRequest $request)
    {
        $validated = $request->validated();
        $data = $validated;

        if ($request->hasFile('financial_highlights')) {
            $data['financial_highlights'] = $request->file('financial_highlights')->store('financial-highlights', 'public');
        }

        FinancialHighlight::create($data);

        return redirect()->route('financial-highlights.index')
            ->with('success', 'Financial highlights created successfully.');
    }

    public function show(FinancialHighlight $financialHighlight)
    {
        return Inertia::render('FinancialHighlights/Show', [
            'financialHighlight' => $financialHighlight,
        ]);
    }

    public function edit(FinancialHighlight $financialHighlight)
    {
        return Inertia::render('FinancialHighlights/Edit', [
            'financialHighlight' => $financialHighlight,
        ]);
    }

    public function update(UpdateFinancialHighlightRequest $request, FinancialHighlight $financialHighlight)
    {
        $data = $request->validated();

        if ($request->hasFile('financial_highlights')) {
            if ($financialHighlight->financial_highlights) {
                Storage::disk('public')->delete($financialHighlight->financial_highlights);
            }
            $data['financial_highlights'] = $request->file('financial_highlights')->store('financial-highlights', 'public');
        } else {
            unset($data['financial_highlights']);
        }

        $financialHighlight->update($data);

        return redirect()->route('financial-highlights.index')
            ->with('success', 'Financial highlights updated successfully.');
    }

    public function destroy(FinancialHighlight $financialHighlight)
    {
        if ($financialHighlight->financial_highlights) {
            Storage::disk('public')->delete($financialHighlight->financial_highlights);
        }

        $financialHighlight->delete();

        return redirect()->route('financial-highlights.index')
            ->with('success', 'Financial highlights deleted successfully.');
    }

    public function download(FinancialHighlight $financialHighlight)
    {
        if (!$financialHighlight->financial_highlights || !Storage::disk('public')->exists($financialHighlight->financial_highlights)) {
            abort(404, 'File not found');
        }

        $extension = pathinfo($financialHighlight->financial_highlights, PATHINFO_EXTENSION);
        $fileName = "Financial-Highlights-FY{$financialHighlight->fiscal_year}.{$extension}";

        return Storage::disk('public')->download($financialHighlight->financial_highlights, $fileName);
    }
}