<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTopNavbarMessageRequest;
use App\Http\Requests\UpdateTopNavbarMessageRequest;
use App\Models\TopNavbarMessage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class TopNavbarMessageController extends Controller
{
    public function index()
    {
        $messages = QueryBuilder::for(TopNavbarMessage::class)
            ->allowedFilters([
                AllowedFilter::partial('text'),
                AllowedFilter::exact('is_active'),
                AllowedFilter::exact('priority'),
            ])
            ->defaultSort('sort_order')
            ->allowedSorts(['sort_order', 'created_at', 'priority'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('TopNavbarMessages/Index', [
            'messages' => $messages,
            'filters' => request()->only(['filter']),
        ]);
    }

    public function create()
    {
        return Inertia::render('TopNavbarMessages/Create');
    }

    public function store(StoreTopNavbarMessageRequest $request)
    {
        TopNavbarMessage::create($request->validated());

        return redirect()->route('top-navbar-messages.index')
            ->with('success', 'Message created successfully.');
    }

    public function show(TopNavbarMessage $topNavbarMessage)
    {
        return Inertia::render('TopNavbarMessages/Show', [
            'message' => $topNavbarMessage
        ]);
    }

    public function edit(TopNavbarMessage $topNavbarMessage)
    {
        return Inertia::render('TopNavbarMessages/Edit', [
            'message' => $topNavbarMessage
        ]);
    }

    public function update(UpdateTopNavbarMessageRequest $request, TopNavbarMessage $topNavbarMessage)
    {
        $topNavbarMessage->update($request->validated());

        return redirect()->route('top-navbar-messages.index')
            ->with('success', 'Message updated successfully.');
    }

    public function destroy(TopNavbarMessage $topNavbarMessage)
    {
        $topNavbarMessage->delete();

        return redirect()->route('top-navbar-messages.index')
            ->with('success', 'Message deleted successfully.');
    }
}