<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Models\Managment;
use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('welcome');
    }

    public function about()
    {
        return Inertia::render('WebsitePages/about');
    }

    public function bod()
    {
        $managment = Managment::where('status', 'active')->get();

        return Inertia::render('WebsitePages/board-of-directors', [
            'managment' => $managment,
        ]);
    }

    public function managment()
    {
        $managment = Managment::where('status', 'active')->get();

        return Inertia::render('WebsitePages/managment', [
            'managment' => $managment,
        ]);
    }

    public function testComponent()
    {
        return Inertia::render('TestComponent');
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        //
    }
}
