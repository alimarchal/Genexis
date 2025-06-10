<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnnualReportRequest;
use App\Http\Requests\UpdateAnnualReportRequest;
use App\Models\AnnualReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class AnnualReportController extends Controller
{
    public function index(Request $request)
    {
        $annualReports = QueryBuilder::for(AnnualReport::class)
            ->allowedFilters(AnnualReport::getAllowedFilters())
            ->allowedSorts(AnnualReport::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('AnnualReports/Index', [
            'annualReports' => $annualReports,
            'filters' => request()->only(['filter', 'sort']),
        ]);
    }

    public function create()
    {
        return Inertia::render('AnnualReports/Create');
    }

    public function store(StoreAnnualReportRequest $request)
    {
        $validated = $request->validated();
        $data = $validated;

        if ($request->hasFile('annual_report')) {
            $data['annual_report'] = $request->file('annual_report')->store('annual-reports', 'public');
        }

        AnnualReport::create($data);

        return redirect()->route('annual-reports.index')
            ->with('success', 'Annual report created successfully.');
    }

    public function show(AnnualReport $annualReport)
    {
        return Inertia::render('AnnualReports/Show', [
            'annualReport' => $annualReport,
        ]);
    }

    public function edit(AnnualReport $annualReport)
    {
        return Inertia::render('AnnualReports/Edit', [
            'annualReport' => $annualReport,
        ]);
    }

    public function update(UpdateAnnualReportRequest $request, AnnualReport $annualReport)
    {
        $validated = $request->validated();
        $data = $validated;

        if ($request->hasFile('annual_report')) {
            if ($annualReport->annual_report) {
                Storage::disk('public')->delete($annualReport->annual_report);
            }
            $data['annual_report'] = $request->file('annual_report')->store('annual-reports', 'public');
        }

        $annualReport->update($data);

        return redirect()->route('annual-reports.index')
            ->with('success', 'Annual report updated successfully.');
    }

    public function destroy(AnnualReport $annualReport)
    {
        if ($annualReport->annual_report) {
            Storage::disk('public')->delete($annualReport->annual_report);
        }

        $annualReport->delete();

        return redirect()->route('annual-reports.index')
            ->with('success', 'Annual report deleted successfully.');
    }

    public function download(AnnualReport $annualReport)
    {
        if (! $annualReport->annual_report || ! Storage::disk('public')->exists($annualReport->annual_report)) {
            abort(404, 'File not found');
        }

        return Storage::disk('public')->download(
            $annualReport->annual_report,
            'Annual-Report-'.$annualReport->annual_report_fiscal_year.'.pdf'
        );
    }
}
