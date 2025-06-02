<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::active()
            ->ordered()
            ->with('attributes')
            ->get();

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }

    public function show(Service $service)
    {
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }
}
