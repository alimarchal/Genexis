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
    public function index(Request $request)
    {
        $scheduleOfCharges = QueryBuilder::for(ScheduleOfCharge::class)
            ->allowedFilters(ScheduleOfCharge::getAllowedFilters())
            ->allowedSorts(ScheduleOfCharge::getAllowedSorts())
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('ScheduleOfCharges/Index', [
            'scheduleOfCharges' => $scheduleOfCharges,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('ScheduleOfCharges/Create');
    }

    public function store(StoreScheduleOfChargeRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('schedule-of-charges', 'public');
        }

        ScheduleOfCharge::create($data);

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of charges created successfully.');
    }

    public function show(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('ScheduleOfCharges/Show', [
            'scheduleOfCharge' => $scheduleOfCharge,
        ]);
    }

    public function edit(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('ScheduleOfCharges/Edit', [
            'scheduleOfCharge' => $scheduleOfCharge,
        ]);
    }

    public function update(UpdateScheduleOfChargeRequest $request, ScheduleOfCharge $scheduleOfCharge)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            if ($scheduleOfCharge->attachment) {
                Storage::disk('public')->delete($scheduleOfCharge->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('schedule-of-charges', 'public');
        } else {
            unset($data['attachment']);
        }

        $scheduleOfCharge->update($data);

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of charges updated successfully.');
    }

    public function destroy(ScheduleOfCharge $scheduleOfCharge)
    {
        if ($scheduleOfCharge->attachment) {
            Storage::disk('public')->delete($scheduleOfCharge->attachment);
        }

        $scheduleOfCharge->delete();

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of charges deleted successfully.');
    }

    public function download(ScheduleOfCharge $scheduleOfCharge)
    {
        if (!$scheduleOfCharge->attachment || !Storage::disk('public')->exists($scheduleOfCharge->attachment)) {
            abort(404, 'File not found');
        }

        $extension = pathinfo($scheduleOfCharge->attachment, PATHINFO_EXTENSION);
        $fileName = "Schedule-of-Charges-{$scheduleOfCharge->title}.{$extension}";

        return Storage::disk('public')->download($scheduleOfCharge->attachment, $fileName);
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
