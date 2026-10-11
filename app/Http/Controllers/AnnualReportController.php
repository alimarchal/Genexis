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
            ->defaultSort('-annual_report_fiscal_year', '-created_at')
            ->paginate($this->perPage(15))
            ->withQueryString();

        return Inertia::render('AnnualReports/Index', [
            'annualReports' => $annualReports,
            'filters' => request()->all(),
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

        [$data] = $this->applyUploads($request, $data, 'annual-reports', ['annual_report' => 'annual_report']);

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
        $data = $request->validated();

        [$data, $obsolete] = $this->applyUploads($request, $data, 'annual-reports', ['annual_report' => 'annual_report'], $annualReport);

        $annualReport->update($data);
        $this->deleteStoredFiles($obsolete);

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

        $extension = pathinfo($annualReport->annual_report, PATHINFO_EXTENSION);
        $fileName = "Annual-Report-FY{$annualReport->annual_report_fiscal_year}.{$extension}";

        return $this->sendPublicFile($annualReport->annual_report, $fileName);
    }
}
