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
            ->paginate($this->perPage(15))
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

        [$data] = $this->applyUploads($request, $data, 'financial-highlights', ['financial_highlights' => 'financial_highlights'], nameColumns: ['financial_highlights' => 'file_name']);

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

        [$data, $obsolete] = $this->applyUploads($request, $data, 'financial-highlights', ['financial_highlights' => 'financial_highlights'], $financialHighlight, ['financial_highlights' => 'file_name']);

        $financialHighlight->update($data);
        $this->deleteStoredFiles($obsolete);

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
        if (! $financialHighlight->financial_highlights || ! Storage::disk('public')->exists($financialHighlight->financial_highlights)) {
            abort(404, 'File not found');
        }

        return $this->sendPublicFile($financialHighlight->financial_highlights, $financialHighlight->display_file_name);
    }
}
