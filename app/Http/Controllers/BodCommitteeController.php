<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBodCommitteeRequest;
use App\Http\Requests\UpdateBodCommitteeRequest;
use App\Models\BodCommittee;
use App\Models\BoardOfDirector;
use App\Models\Management;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class BodCommitteeController extends Controller
{
    public function index(Request $request)
    {
        $bodCommittees = QueryBuilder::for(BodCommittee::class)
            ->with(['chairmanBoard', 'secretaryBoard', 'secretaryManagement'])
            ->allowedFilters(BodCommittee::getAllowedFilters())
            ->allowedSorts(BodCommittee::getAllowedSorts())
            ->defaultSort('sort_order', '-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('BodCommittees/Index', [
            'bodCommittees' => $bodCommittees,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        $boardMembers = BoardOfDirector::active()->ordered()->get();
        $managementMembers = Management::where('status', 'active')->orderBy('order')->get();

        return Inertia::render('BodCommittees/Create', [
            'boardMembers' => $boardMembers,
            'managementMembers' => $managementMembers,
        ]);
    }

    public function store(StoreBodCommitteeRequest $request)
    {
        $data = $request->validated();

        // Convert "none" to null for chairman_board_id
        if ($data['chairman_board_id'] === 'none') {
            $data['chairman_board_id'] = null;
        }

        BodCommittee::create($data);

        return redirect()->route('bod-committees.index')
            ->with('success', 'BOD Committee created successfully.');
    }

    public function show(BodCommittee $bodCommittee)
    {
        $bodCommittee->load(['chairmanBoard', 'secretaryBoard', 'secretaryManagement']);

        // Load board and management members with details
        $bodCommittee->board_members_list = $bodCommittee->boardMembersList;
        $bodCommittee->management_members_list = $bodCommittee->managementMembersList;

        return Inertia::render('BodCommittees/Show', [
            'bodCommittee' => $bodCommittee,
        ]);
    }

    public function edit(BodCommittee $bodCommittee)
    {
        $bodCommittee->load(['chairmanBoard', 'secretaryBoard', 'secretaryManagement']);
        $boardMembers = BoardOfDirector::active()->ordered()->get();
        $managementMembers = Management::where('status', 'active')->orderBy('order')->get();

        return Inertia::render('BodCommittees/Edit', [
            'bodCommittee' => $bodCommittee,
            'boardMembers' => $boardMembers,
            'managementMembers' => $managementMembers,
        ]);
    }

    public function update(UpdateBodCommitteeRequest $request, BodCommittee $bodCommittee)
    {
        $data = $request->validated();

        // Convert "none" to null for chairman_board_id
        if ($data['chairman_board_id'] === 'none') {
            $data['chairman_board_id'] = null;
        }

        $bodCommittee->update($data);

        return redirect()->route('bod-committees.index')
            ->with('success', 'BOD Committee updated successfully.');
    }

    public function destroy(BodCommittee $bodCommittee)
    {
        $bodCommittee->delete();

        return redirect()->route('bod-committees.index')
            ->with('success', 'BOD Committee deleted successfully.');
    }

    // Public page for website
    public function publicIndex()
    {
        $committees = BodCommittee::active()
            ->ordered()
            ->with(['chairmanBoard', 'secretaryBoard', 'secretaryManagement'])
            ->get()
            ->map(function ($committee) {
                return [
                    'id' => $committee->id,
                    'name' => $committee->name,
                    'description' => $committee->description,
                    'chairman' => $committee->chairmanBoard ? [
                        'name' => $committee->chairmanBoard->full_name,
                        'designation' => $committee->chairmanBoard->designation,
                        'image_url' => $committee->chairmanBoard->image_url,
                    ] : null,
                    'secretary' => $committee->secretaryName ? [
                        'name' => $committee->secretaryName,
                        'type' => $committee->secretaryType,
                        'designation' => $committee->secretaryBoard ?
                            $committee->secretaryBoard->designation :
                            $committee->secretaryManagement->designation,
                    ] : null,
                    'board_members' => $committee->boardMembersList->map(function ($member) {
                        return [
                            'name' => $member->full_name,
                            'designation' => $member->designation,
                            'image_url' => $member->image_url,
                        ];
                    }),
                    'management_members' => $committee->managementMembersList->map(function ($member) {
                        return [
                            'name' => $member->full_name,
                            'designation' => $member->designation,
                            'attachment' => $member->attachment ? asset('storage/' . $member->attachment) : null,
                        ];
                    }),
                ];
            });

        return Inertia::render('About/BodCommittees', [
            'committees' => $committees,
        ]);
    }
}
