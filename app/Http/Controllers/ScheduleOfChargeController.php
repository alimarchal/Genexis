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

        return Inertia::render('Admin/ScheduleOfCharges/Index', [
            'scheduleOfCharges' => $scheduleOfCharges,
            'filters' => $request->only(['filter', 'sort', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ScheduleOfCharges/Create');
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

        return redirect()->route('admin.schedule-of-charges.index')
            ->with('success', 'Schedule of Charge created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('Admin/ScheduleOfCharges/Show', [
            'scheduleOfCharge' => $scheduleOfCharge->load([]), // Add any relations if needed
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ScheduleOfCharge $scheduleOfCharge)
    {
        return Inertia::render('Admin/ScheduleOfCharges/Edit', [
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

        return redirect()->route('admin.schedule-of-charges.index')
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

        return redirect()->route('admin.schedule-of-charges.index')
            ->with('success', 'Schedule of Charge deleted successfully.');
    }

    /**
     * Display a listing of the resource for the public website.
     */
    public function publicIndex(Request $request)
    {
        $scheduleOfCharges = QueryBuilder::for(ScheduleOfCharge::class)
            ->where('is_active', true) // Only show active charges on the public site
            ->allowedFilters(ScheduleOfCharge::getAllowedFilters()) // You might want a different set of filters for public
            ->allowedSorts(ScheduleOfCharge::getAllowedSorts())   // You might want a different set of sorts for public
            ->defaultSort('title') // Default sort by title for public view
            ->paginate($request->input('per_page', 10)) // Or a different pagination size
            ->appends($request->query());

        return Inertia::render('PublicScheduleOfCharges/Index', [
            'scheduleOfCharges' => $scheduleOfCharges,
            'filters' => $request->only(['filter', 'sort', 'per_page']), // Adjust filters as needed
        ]);
    }
}
