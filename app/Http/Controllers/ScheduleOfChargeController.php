<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleOfChargeRequest;
use App\Http\Requests\UpdateScheduleOfChargeRequest;
use App\Models\ScheduleOfCharge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ScheduleOfChargeController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('permission:scheduleofcharge.index|scheduleofcharge.create|scheduleofcharge.edit|scheduleofcharge.delete|scheduleofcharge.view', ['only' => ['index', 'show']]);
    //     $this->middleware('permission:scheduleofcharge.create', ['only' => ['create', 'store']]);
    //     $this->middleware('permission:scheduleofcharge.edit', ['only' => ['edit', 'update']]);
    //     $this->middleware('permission:scheduleofcharge.delete', ['only' => ['destroy']]);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $scheduleOfCharges = QueryBuilder::for(ScheduleOfCharge::class)
            ->allowedFilters(ScheduleOfCharge::getAllowedFilters())
            ->allowedSorts(ScheduleOfCharge::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate($request->input('per_page', 10))
            ->appends($request->query());

        return Inertia::render('ScheduleOfCharge/Index', [
            'scheduleOfCharges' => $scheduleOfCharges,
            'filters' => $request->only(['filter', 'sort', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ScheduleOfCharge/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleOfChargeRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('schedule_of_charges', 'public');
        }

        ScheduleOfCharge::create($data);

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of Charge created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('ScheduleOfCharge/Show', [
            'scheduleOfCharge' => $scheduleOfCharge->load([]), // Add any relations if needed
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('ScheduleOfCharge/Edit', [
            'scheduleOfCharge' => $scheduleOfCharge,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleOfChargeRequest $request, ScheduleOfCharge $scheduleOfCharge)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            // Delete old attachment if it exists
            if ($scheduleOfCharge->attachment) {
                Storage::disk('public')->delete($scheduleOfCharge->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('schedule_of_charges', 'public');
        }

        $scheduleOfCharge->update($data);

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of Charge updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScheduleOfCharge $scheduleOfCharge)
    {
        if ($scheduleOfCharge->attachment) {
            Storage::disk('public')->delete($scheduleOfCharge->attachment);
        }
        $scheduleOfCharge->delete();

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of Charge deleted successfully.');
    }

    /**
     * Display a listing of the resource for the public website.
     */
    public function publicIndex(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $scheduleOfCharges = ScheduleOfCharge::where('is_active', true)
            ->orderBy('created_at', 'desc') // Latest records first
            ->orderBy('from', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($charge) {
                return [
                    'id' => $charge->id,
                    'title' => $charge->title,
                    'from' => $charge->from->format('M d, Y'),
                    'to' => $charge->to ? $charge->to->format('M d, Y') : null,
                    'attachment_url' => $charge->attachment_url,
                    'download_url' => $charge->attachment ? route('rates.schedule-of-charges.download', $charge) : null,
                    'description' => $charge->description,
                    'is_active' => $charge->is_active,
                    'status' => $charge->status,
                    'file_size' => $charge->attachment && Storage::disk('public')->exists($charge->attachment)
                        ? $this->formatFileSize(Storage::disk('public')->size($charge->attachment))
                        : null,
                ];
            });

        return Inertia::render('Rates/ScheduleOfCharges', [
            'scheduleOfCharges' => $scheduleOfCharges,
        ]);
    }

    public function download(ScheduleOfCharge $scheduleOfCharge)
    {
        if (! $scheduleOfCharge->attachment || ! Storage::disk('public')->exists($scheduleOfCharge->attachment)) {
            abort(404, 'File not found');
        }

        return Storage::disk('public')->download(
            $scheduleOfCharge->attachment,
            $scheduleOfCharge->title.'.pdf'
        );
    }

    /**
     * Format file size in human readable format
     */
    private function formatFileSize($bytes)
    {
        if ($bytes === 0) {
            return '0 B';
        }

        $units = ['B', 'KB', 'MB', 'GB'];
        $factor = floor(log($bytes, 1024));

        return sprintf('%.1f %s', $bytes / pow(1024, $factor), $units[$factor]);
    }
}
