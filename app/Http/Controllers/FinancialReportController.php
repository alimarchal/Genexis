<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFinancialReportRequest;
use App\Http\Requests\UpdateFinancialReportRequest;
use App\Models\FinancialReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class FinancialReportController extends Controller
{
    public function index(Request $request)
    {
        $financialReports = QueryBuilder::for(FinancialReport::class)
            ->allowedFilters(FinancialReport::getAllowedFilters())
            ->allowedSorts(FinancialReport::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Financials/Index', [
            'financialReports' => $financialReports,
            'filters' => request()->only(['filter', 'sort']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Financials/Create');
    }

    public function store(StoreFinancialReportRequest $request)
    {
        $validated = $request->validated();
        $data = $validated;

        // Handle file uploads - check if files exist in the request
        if ($request->hasFile('first_quarter_report')) {
            $data['first_quarter_report'] = $request->file('first_quarter_report')->store('financial-reports', 'public');
        }

        if ($request->hasFile('half_yearly_report')) {
            $data['half_yearly_report'] = $request->file('half_yearly_report')->store('financial-reports', 'public');
        }

        if ($request->hasFile('third_quarter_report')) {
            $data['third_quarter_report'] = $request->file('third_quarter_report')->store('financial-reports', 'public');
        }

        if ($request->hasFile('annual_report')) {
            $data['annual_report'] = $request->file('annual_report')->store('financial-reports', 'public');
        }

        FinancialReport::create($data);

        return redirect()->route('financial-reports.index')
            ->with('success', 'Financial report created successfully.');
    }

    public function show(FinancialReport $financialReport)
    {
        return Inertia::render('Financials/Show', [
            'financialReport' => $financialReport,
        ]);
    }

    public function edit(FinancialReport $financialReport)
    {
        return Inertia::render('Financials/Edit', [
            'financialReport' => $financialReport,
        ]);
    }

    public function update(UpdateFinancialReportRequest $request, FinancialReport $financialReport)
    {
        $data = $request->validated();

        $reportTypes = ['first_quarter_report', 'half_yearly_report', 'third_quarter_report', 'annual_report'];

        foreach ($reportTypes as $reportType) {
            if ($request->hasFile($reportType)) {
                // Delete old file if exists
                if ($financialReport->$reportType) {
                    Storage::disk('public')->delete($financialReport->$reportType);
                }
                $data[$reportType] = $request->file($reportType)->store('financial-reports', 'public');
            } else {
                // Remove from update data to preserve existing value
                unset($data[$reportType]);
            }
        }

        $financialReport->update($data);

        return redirect()->route('financial-reports.index')
            ->with('success', 'Financial report updated successfully.');
    }

    public function destroy(FinancialReport $financialReport)
    {
        $reportTypes = ['first_quarter_report', 'half_yearly_report', 'third_quarter_report', 'annual_report'];

        // Delete all files if they exist
        foreach ($reportTypes as $reportType) {
            if ($financialReport->$reportType) {
                Storage::disk('public')->delete($financialReport->$reportType);
            }
        }

        $financialReport->delete();

        return redirect()->route('financial-reports.index')
            ->with('success', 'Financial report deleted successfully.');
    }
}
