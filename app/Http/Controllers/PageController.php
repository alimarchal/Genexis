<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Models\BankService;
use App\Models\BoardOfDirector;
use App\Models\Carousel;
use App\Models\Managment;
use App\Models\Page;
use App\Models\ProductTypeAccount;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        $carousels = Carousel::active()
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($carousel) {
                return [
                    'id' => $carousel->id,
                    'title' => $carousel->title,
                    'subtitle' => $carousel->description,
                    'image' => $carousel->image_url,
                    'ctaText' => $carousel->button_text,
                    'ctaLink' => $carousel->button_url,
                ];
            });

        $bankServices = BankService::active()
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'description' => $service->description,
                    'icon' => $service->icon,
                    'products' => $service->products,
                    'cta_text' => $service->cta_text,
                    'cta_link' => $service->cta_link,
                    'color' => $service->color,
                    'benefits' => $service->benefits,
                    'service_type' => $service->service_type,
                    'stat_number' => $service->stat_number,
                    'stat_label' => $service->stat_label,
                    'stat_description' => $service->stat_description,
                ];
            });

        return Inertia::render('welcome', [
            'carousels' => $carousels,
            'bankServices' => $bankServices,
        ]);
    }

    public function about()
    {
        return Inertia::render('WebsitePages/about');
    }

    public function boardOfDirectors()
    {

        $boardOfDirectors = BoardOfDirector::active()
            ->ordered()
            ->get();

        return Inertia::render('About/BoardOfDirectors', [
            'boardOfDirectors' => $boardOfDirectors,
        ]);
    }

    public function management()
    {
        $managment = Managment::where('status', 'active')->get();

        return Inertia::render('About/Management', [
            'managment' => $managment,
        ]);
    }

    public function contact()
    {
        return inertia('Contact/Index');
    }

    public function depositAccounts()
    {

        $depositAccount = ProductTypeAccount::where('name', 'Deposit Accounts')->first();

        $schemes = $depositAccount->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return inertia('Products/DepositAccounts', [
            'schemes' => $schemes,
        ]);
    }

    public function termDeposit()
    {

        $termDeposit = ProductTypeAccount::where('name', 'Term Deposit')->first();

        $schemes = $termDeposit->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return inertia('Products/TermDeposit', [
            'schemes' => $schemes,
        ]);
    }

    public function consumerFinances()
    {
        $consumerFinance = ProductTypeAccount::where('name', 'Consumer Finances')->first();

        $schemes = $consumerFinance->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return inertia('Products/ConsumerFinances', ['schemes' => $schemes]);
    }

    public function commercialSME()
    {
        $commercialSME = ProductTypeAccount::where('name', 'Commercial / SME Finances')->first();

        $schemes = $commercialSME->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return inertia('Products/CommercialSmeFinances', ['schemes' => $schemes]);
    }

    public function agriculture()
    {
        $agriculture = ProductTypeAccount::where('name', 'Agriculture Finances')->first();

        $schemes = $agriculture->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return inertia('Products/AgricultureFinances', ['schemes' => $schemes]);
    }

    public function microFinance()
    {
        $microFinance = ProductTypeAccount::where('name', 'Micro Finances')->first();

        $schemes = $microFinance->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return inertia('Products/MicroFinances', ['schemes' => $schemes]);
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
