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
            ->with(['creator', 'updater'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('ScheduleOfCharge/Index', [
            'scheduleOfCharges' => $scheduleOfCharges,
            'filters' => $request->only(['filter']),
        ]);
    }

    public function create()
    {
        return Inertia::render('ScheduleOfCharge/Create');
    }

    public function store(StoreScheduleOfChargeRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('schedule-of-charges', 'public');
        }

        ScheduleOfCharge::create($data);

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of Charge created successfully.');
    }

    public function show(ScheduleOfCharge $scheduleOfCharge)
    {
        $scheduleOfCharge->load(['creator', 'updater']);

        return Inertia::render('ScheduleOfCharge/Show', [
            'scheduleOfCharge' => $scheduleOfCharge,
        ]);
    }

    public function edit(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('ScheduleOfCharge/Edit', [
            'scheduleOfCharge' => $scheduleOfCharge,
        ]);
    }

    public function update(UpdateScheduleOfChargeRequest $request, ScheduleOfCharge $scheduleOfCharge)
    {
        $data = $request->validated();

        if ($request->hasFile('attachment')) {
            // Delete old attachment if it exists
            if ($scheduleOfCharge->attachment) {
                Storage::disk('public')->delete($scheduleOfCharge->attachment);
            }
            $data['attachment'] = $request->file('attachment')->store('schedule-of-charges', 'public');
        }

        $scheduleOfCharge->update($data);

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of Charge updated successfully.');
    }

    public function destroy(ScheduleOfCharge $scheduleOfCharge)
    {
        // Delete attachment if it exists
        if ($scheduleOfCharge->attachment) {
            Storage::disk('public')->delete($scheduleOfCharge->attachment);
        }

        $scheduleOfCharge->delete();

        return redirect()->route('schedule-of-charges.index')
            ->with('success', 'Schedule of Charge deleted successfully.');
    }

    public function download(ScheduleOfCharge $scheduleOfCharge)
    {
        if (! $scheduleOfCharge->attachment) {
            abort(404, 'File not found.');
        }

        $filePath = storage_path('app/public/'.$scheduleOfCharge->attachment);

        if (! file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        return response()->download($filePath, $scheduleOfCharge->title.'.'.pathinfo($filePath, PATHINFO_EXTENSION));
    }
}
