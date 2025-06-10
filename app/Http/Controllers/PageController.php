<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Models\BankService;
use App\Models\BoardOfDirector;
use App\Models\Branch;
use App\Models\Carousel;
use App\Models\District;
use App\Models\FinancialReport;
use App\Models\Managment;
use App\Models\NewsAnnouncement;
use App\Models\Page;
use App\Models\ProductTypeAccount;
use App\Models\Region;
use Inertia\Inertia;

class PageController extends Controller
{
    private function getImageUrl($image)
    {
        if (! $image) {
            return null;
        }

        // If it's already a full URL, check if it's a via.placeholder.com URL that might not work
        if (filter_var($image, FILTER_VALIDATE_URL)) {
            // If it's a via.placeholder.com URL, replace with a more reliable service
            if (str_contains($image, 'via.placeholder.com')) {
                // Extract dimensions and text from the URL
                preg_match('/(\d+)x(\d+)/', $image, $dimensions);
                preg_match('/text=([^&]+)/', $image, $text);

                $width = $dimensions[1] ?? '800';
                $height = $dimensions[2] ?? '600';
                $textContent = $text[1] ?? 'News';

                // Use picsum.photos with a seed for consistent images
                $seed = crc32($textContent); // Generate a consistent seed from text

                return "https://picsum.photos/seed/{$seed}/{$width}/{$height}";
            }

            return $image;
        }

        // Otherwise, treat as a storage file path
        return asset('storage/'.$image);
    }

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

        $newsAnnouncements = NewsAnnouncement::published()
            ->featured()
            ->recent()
            ->orderBy('published_date', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($news) {
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'content' => $news->content,
                    'image' => $news->image,
                    'image_url' => $this->getImageUrl($news->image),
                    'published_date' => $news->published_date,
                    'is_featured' => $news->is_featured,
                    'category' => $news->category,
                    'slug' => $news->slug,
                    'is_published' => $news->is_published,
                    'created_at' => $news->created_at->toISOString(),
                    'excerpt' => substr(strip_tags($news->content), 0, 150).'...',
                ];
            });

        return Inertia::render('welcome', [
            'carousels' => $carousels,
            'bankServices' => $bankServices,
            'newsAnnouncements' => $newsAnnouncements,
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

    public function news()
    {
        $newsAnnouncements = NewsAnnouncement::published()
            ->orderBy('published_date', 'desc')
            ->paginate(12)
            ->through(function ($news) {
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'content' => $news->content,
                    'image' => $news->image,
                    'image_url' => $this->getImageUrl($news->image),
                    'published_date' => $news->published_date,
                    'is_featured' => $news->is_featured,
                    'category' => $news->category,
                    'slug' => $news->slug,
                    'is_published' => $news->is_published,
                    'created_at' => $news->created_at->toISOString(),
                    'excerpt' => substr(strip_tags($news->content), 0, 150).'...',
                ];
            });

        return Inertia::render('News/Index', [
            'newsAnnouncements' => $newsAnnouncements,
            'autoBreadcrumbs' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'News & Announcements', 'isActive' => true],
            ],
        ]);
    }

    public function newsDetail($slug)
    {
        $news = NewsAnnouncement::published()
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedNews = NewsAnnouncement::published()
            ->where('id', '!=', $news->id)
            ->where('category', $news->category)
            ->limit(3)
            ->get()
            ->map(function ($news) {
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'slug' => $news->slug,
                    'category' => $news->category,
                    'published_date' => $news->published_date,
                    'excerpt' => substr(strip_tags($news->content), 0, 100).'...',
                ];
            });

        return Inertia::render('News/Detail', [
            'news' => [
                'id' => $news->id,
                'title' => $news->title,
                'content' => $news->content,
                'image' => $news->image,
                'image_url' => $this->getImageUrl($news->image),
                'published_date' => $news->published_date,
                'is_featured' => $news->is_featured,
                'category' => $news->category,
                'slug' => $news->slug,
                'created_at' => $news->created_at->toISOString(),
            ],
            'relatedNews' => $relatedNews,
            'autoBreadcrumbs' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'News & Announcements', 'href' => '/news'],
                ['label' => $news->title, 'isActive' => true],
            ],
        ]);
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

    public function branchNetwork()
    {
        $branches = Branch::with(['region', 'district', 'contacts', 'branchServices'])
            ->active()
            ->orderBy('map_priority', 'desc')
            ->orderBy('name')
            ->get()
            ->map(function ($branch) {
                return [
                    'id' => $branch->id,
                    'name' => $branch->name,
                    'code' => $branch->code,
                    'type' => $branch->type,
                    'address' => $branch->address,
                    'city' => $branch->district->name ?? '',
                    'region' => $branch->region->name ?? '',
                    'full_address' => $branch->full_address,
                    'latitude' => $branch->latitude,
                    'longitude' => $branch->longitude,
                    'phone' => $branch->contacts->first()?->phone ?? '',
                    'email' => $branch->contacts->first()?->email ?? '',
                    'fax' => '', // No fax field in contacts table
                    'services' => $branch->branchServices->pluck('service_name')->toArray(),
                    'facilities' => $branch->facilities ? explode(',', $branch->facilities) : [],
                    'operating_hours' => $branch->operating_hours,
                    'is_24_hours' => $branch->is_24_hours,
                    'is_open' => $branch->is_open,
                    'operating_status' => $branch->operating_status,
                    'today_hours' => $branch->today_hours,
                    'google_maps_url' => $branch->google_maps_url,
                    'has_atm' => in_array('ATM Card Issuance', $branch->branchServices->pluck('service_name')->toArray()),
                ];
            });

        $regions = Region::with('districts')->orderBy('name')->get();
        $districts = District::orderBy('name')->get();

        return inertia('BranchNetwork/Index', [
            'branches' => $branches,
            'regions' => $regions,
            'districts' => $districts,
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

    public function financialStatements()
    {
        $financialReports = FinancialReport::orderBy('fiscal_year', 'desc')
            ->get()
            ->map(function ($report) {
                return [
                    'id' => $report->id,
                    'fiscal_year' => $report->fiscal_year,
                    'first_quarter_report' => $report->first_quarter_report,
                    'first_quarter_report_url' => $report->first_quarter_report_url,
                    'half_yearly_report' => $report->half_yearly_report,
                    'half_yearly_report_url' => $report->half_yearly_report_url,
                    'third_quarter_report' => $report->third_quarter_report,
                    'third_quarter_report_url' => $report->third_quarter_report_url,
                    'annual_report' => $report->annual_report,
                    'annual_report_url' => $report->annual_report_url,
                    'created_at' => $report->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Financials/Statements', [
            'financialReports' => $financialReports,
        ]);
    }
}
