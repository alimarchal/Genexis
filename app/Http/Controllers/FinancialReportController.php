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
            ->defaultSort('-fiscal_year', '-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('FinancialReports/Index', [
            'financialReports' => $financialReports,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('FinancialReports/Create');
    }

    public function store(StoreFinancialReportRequest $request)
    {
        $validated = $request->validated();
        $data = $validated;

        // Handle file uploads
        $reportTypes = ['first_quarter_report', 'half_yearly_report', 'third_quarter_report', 'annual_report'];

        foreach ($reportTypes as $reportType) {
            if ($request->hasFile($reportType)) {
                $data[$reportType] = $request->file($reportType)->store('financial-reports', 'public');
            }
        }

        FinancialReport::create($data);

        return redirect()->route('financial-reports.index')
            ->with('success', 'Financial report created successfully.');
    }

    public function show(FinancialReport $financialReport)
    {
        return Inertia::render('FinancialReports/Show', [
            'financialReport' => $financialReport,
        ]);
    }

    public function edit(FinancialReport $financialReport)
    {
        return Inertia::render('FinancialReports/Edit', [
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

    public function download(FinancialReport $financialReport, $type)
    {
        $allowedTypes = ['first_quarter_report', 'half_yearly_report', 'third_quarter_report', 'annual_report'];

        if (!in_array($type, $allowedTypes)) {
            abort(404, 'Invalid report type');
        }

        $filePath = $financialReport->$type;

        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            abort(404, 'File not found');
        }

        // Generate a proper filename
        $typeNames = [
            'first_quarter_report' => 'Q1',
            'half_yearly_report' => 'Half-Yearly',
            'third_quarter_report' => 'Q3',
            'annual_report' => 'Annual'
        ];

        $typeName = $typeNames[$type];
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        $fileName = "Financial-Report-{$typeName}-FY{$financialReport->fiscal_year}.{$extension}";

        return Storage::disk('public')->download($filePath, $fileName);
    }
}