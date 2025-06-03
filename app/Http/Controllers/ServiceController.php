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

    public function lockersFacility()
    {
        $service = Service::where('slug', 'lockers-facility')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }

    public function utilityBillsCollection()
    {
        $service = Service::where('slug', 'utility-bills-collection')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }

    public function servicesForAjkPsc()
    {
        $service = Service::where('slug', 'services-for-ajk-psc')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }

    public function homeRemittance()
    {
        $service = Service::where('slug', 'home-remittance')->firstOrFail();
        $service->load('attributes');

        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }
}
