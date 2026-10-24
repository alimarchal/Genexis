<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use App\Models\AnnualReport;
use App\Models\BankService;
use App\Models\BoardOfDirector;
use App\Models\BodCommittee;
use App\Models\Branch;
use App\Models\Career;
use App\Models\Download;
use App\Models\FinancialHighlight;
use App\Models\FinancialReport;
use App\Models\GalleryAlbum;
use App\Models\Management;
use App\Models\Menu;
use App\Models\NewsAnnouncement;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductScheme;
use App\Models\ProductType;
use App\Models\ProfitRate;
use App\Models\ScheduleOfCharge;
use App\Models\Service;
use App\Models\TouristAttraction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    /**
     * Case-insensitive "contains" search over several columns.
     * LIKE wildcards typed by the visitor (% and _) are escaped so they match literally.
     */
    private function searchColumns($query, $columns, $searchTerm)
    {
        $escaped = '%'.str_replace(['!', '%', '_'], ['!!', '!%', '!_'], mb_strtolower($searchTerm)).'%';

        return $query->where(function ($q) use ($columns, $escaped) {
            foreach ($columns as $column) {
                $q->orWhereRaw("LOWER({$column}) LIKE ? ESCAPE '!'", [$escaped]);
            }
        });
    }

    /**
     * Plain-text teaser of HTML content, cut on a character (not byte) boundary.
     */
    private function excerpt(?string $html, int $limit = 150): string
    {
        $text = trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags((string) $html), ENT_QUOTES | ENT_HTML5, 'UTF-8')) ?? '');

        return Str::limit($text, $limit);
    }

    /**
     * Static public pages that have no database record, with the words visitors use to look for them.
     *
     * @return list<array{title: string, url: string, keywords: string, excerpt: string}>
     */
    private function sitePages(): array
    {
        return [
            ['title' => 'Loan Calculator', 'url' => route('loan-calculator'), 'keywords' => 'loan calculator emi installment markup monthly', 'excerpt' => 'Calculate your monthly installment'],
            ['title' => 'Contact Us', 'url' => route('contact'), 'keywords' => 'contact phone email address complaint feedback helpline uan', 'excerpt' => 'Phone, email and a message form'],
            ['title' => 'Branch Network', 'url' => route('about.branch-network'), 'keywords' => 'branch network atm location map nearest district region', 'excerpt' => 'Find a branch near you'],
            ['title' => 'Organogram', 'url' => route('about.organogram'), 'keywords' => 'organogram organization structure chart hierarchy', 'excerpt' => 'Organisation structure of the Bank'],
            ['title' => 'Management', 'url' => route('about.management'), 'keywords' => 'management executives president ceo team', 'excerpt' => 'Senior management of the Bank'],
            ['title' => 'Board of Directors', 'url' => route('about.board-directors'), 'keywords' => 'board directors bod chairman', 'excerpt' => 'Members of the Board'],
            ['title' => 'Careers', 'url' => route('public-careers'), 'keywords' => 'careers jobs vacancies internship join apply recruitment', 'excerpt' => 'Current job and internship openings'],
            ['title' => 'News & Announcements', 'url' => route('news'), 'keywords' => 'news announcements press updates', 'excerpt' => 'Latest news from the Bank'],
            ['title' => 'Downloads & Tenders', 'url' => route('public-downloads'), 'keywords' => 'downloads documents forms tender bids notices', 'excerpt' => 'Forms, tenders and notices'],
            ['title' => 'Photo Gallery', 'url' => route('gallery'), 'keywords' => 'photo gallery pictures images events album', 'excerpt' => 'Photos of events and initiatives'],
            ['title' => 'Tourist Attractions', 'url' => route('tourist-attractions.public'), 'keywords' => 'tourist tourism attractions neelum jehlum valley lake places visit travel', 'excerpt' => 'Places to visit in Azad Kashmir'],
            ['title' => 'Annual Reports', 'url' => '/financials/annual-reports', 'keywords' => 'annual reports yearly financial', 'excerpt' => 'Annual reports of the Bank'],
            ['title' => 'Financial Statements', 'url' => '/financials/statements', 'keywords' => 'financial statements accounts quarterly', 'excerpt' => 'Quarterly and annual statements'],
            ['title' => 'Financial Highlights', 'url' => '/financials/financial-highlights', 'keywords' => 'financial highlights profit assets deposits', 'excerpt' => 'Key figures of the Bank'],
            ['title' => 'Profit Rates', 'url' => '/rates/profit-rates', 'keywords' => 'profit rates deposit return percent', 'excerpt' => 'Profit rates on deposits'],
            ['title' => 'Schedule of Charges', 'url' => route('rates.schedule-of-charges'), 'keywords' => 'schedule charges fees tariff', 'excerpt' => 'Banking charges and fees'],
        ];
    }

    public function search(Request $request)
    {
        $query = mb_substr(trim((string) $request->get('q')), 0, 100);

        if (mb_strlen($query) < 2) {
            return response()->json(['results' => []]);
        }

        $results = collect();

        // Search News Announcements (High Priority)
        $news = NewsAnnouncement::published()->recent();
        $news = $this->searchColumns($news, ['title', 'content'], $query);
        $news = $news
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'type' => 'News',
                    'url' => route('news.detail', $item->slug),
                    'excerpt' => $this->excerpt($item->content),
                    'image' => $item->image ? asset('storage/'.$item->image) : null,
                ];
            });

        // Search Bank Services (High Priority)
        $services = BankService::where('status', true);
        $services = $this->searchColumns($services, ['title', 'description'], $query);
        $services = $services
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'type' => 'Service',
                    'url' => $item->cta_link ?: '#',
                    'excerpt' => $item->description,
                    'image' => null,
                ];
            });

        // Search Products (High Priority) - Enhanced with keyword mapping
        $products = collect();

        // Define product categories and their keywords
        $productCategories = [
            'deposit-accounts' => [
                'keywords' => ['deposit', 'saving', 'savings', 'current', 'account', 'pls'],
                'url' => '/products/deposit-accounts',
                'title' => 'Deposit Accounts',
            ],
            'consumer-finances' => [
                'keywords' => ['consumer', 'personal', 'loan', 'finance', 'car', 'auto', 'vehicle', 'home', 'house', 'mortgage'],
                'url' => '/products/consumer-finances',
                'title' => 'Consumer Finance',
            ],
            'commercial-sme-finances' => [
                'keywords' => ['commercial', 'sme', 'business', 'trade', 'corporate', 'enterprise'],
                'url' => '/products/commercial-sme-finances',
                'title' => 'Commercial & SME Finance',
            ],
            'micro-finances' => [
                'keywords' => ['micro', 'microfinance', 'small'],
                'url' => '/products/micro-finances',
                'title' => 'Micro Finance',
            ],
            'agriculture-finances' => [
                'keywords' => ['agriculture', 'farming', 'agri', 'farm', 'crop'],
                'url' => '/products/agriculture-finances',
                'title' => 'Agriculture Finance',
            ],
        ];

        // Check if query matches any product category keywords
        $queryLower = strtolower($query);
        foreach ($productCategories as $category => $data) {
            foreach ($data['keywords'] as $keyword) {
                if (strpos($queryLower, $keyword) !== false) {
                    $products->push([
                        'id' => $category,
                        'title' => $data['title'],
                        'type' => 'Product Category',
                        'url' => $data['url'],
                        'excerpt' => 'Browse our '.$data['title'].' products and services',
                        'image' => null,
                    ]);
                    break; // Only add once per category
                }
            }
        }

        // Also search actual Product records
        $actualProducts = Product::where('is_active', true);
        $actualProducts = $this->searchColumns($actualProducts, ['name'], $query);
        $actualProducts = $actualProducts
            ->limit(3)
            ->get()
            ->map(function ($item) {
                // Map products to their appropriate public pages
                $productUrls = [
                    'deposit' => '/products/deposit-accounts',
                    'saving' => '/products/deposit-accounts',
                    'current' => '/products/deposit-accounts',
                    'consumer' => '/products/consumer-finances',
                    'personal' => '/products/consumer-finances',
                    'loan' => '/products/consumer-finances',
                    'car' => '/products/consumer-finances',
                    'auto' => '/products/consumer-finances',
                    'home' => '/products/consumer-finances',
                    'house' => '/products/consumer-finances',
                    'commercial' => '/products/commercial-sme-finances',
                    'sme' => '/products/commercial-sme-finances',
                    'business' => '/products/commercial-sme-finances',
                    'trade' => '/products/commercial-sme-finances',
                    'micro' => '/products/micro-finances',
                    'agriculture' => '/products/agriculture-finances',
                    'farming' => '/products/agriculture-finances',
                    'agri' => '/products/agriculture-finances',
                ];

                $url = '#';
                $productName = strtolower($item->name);
                foreach ($productUrls as $keyword => $productUrl) {
                    if (strpos($productName, $keyword) !== false) {
                        $url = $productUrl;
                        break;
                    }
                }

                return [
                    'id' => $item->id,
                    'title' => $item->name,
                    'type' => 'Product',
                    'url' => $url,
                    'excerpt' => 'Banking Product',
                    'image' => null,
                ];
            });

        // Combine keyword-based and actual products, prioritize keyword matches
        $products = $products->concat($actualProducts)->take(3);

        // Search Downloads (High Priority)
        $downloads = Download::where('is_active', true);
        $downloads = $this->searchColumns($downloads, ['title', 'description'], $query);
        $downloads = $downloads
            ->limit(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'type' => 'Download',
                    'url' => route('public-downloads.download', $item->id),
                    'excerpt' => $item->description ?: 'Download file',
                    'image' => null,
                ];
            });

        // Search Branches (High Priority)
        $branches = Branch::where('status', 'active');
        $branches = $this->searchColumns($branches, ['name', 'address', 'code'], $query);
        $branches = $branches
            ->limit(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->name,
                    'type' => 'Branch',
                    'url' => '/about-us/branch-network',
                    'excerpt' => $item->address ?: 'Bank Branch',
                    'image' => null,
                ];
            });

        // Search Board of Directors (Medium Priority)
        $boardMembers = BoardOfDirector::where('is_active', true);
        $boardMembers = $this->searchColumns($boardMembers, ['full_name', 'designation', 'short_description'], $query);
        $boardMembers = $boardMembers
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->full_name,
                    'type' => 'Board Member',
                    'url' => '/about-us/board-of-directors',
                    'excerpt' => $item->designation,
                    'image' => $item->image ? asset('storage/'.$item->image) : null,
                ];
            });

        // Search Management (Medium Priority)
        $management = Management::where('status', 'active');
        $management = $this->searchColumns($management, ['full_name', 'designation', 'description'], $query);
        $management = $management
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->full_name,
                    'type' => 'Management',
                    'url' => '/about-us/management',
                    'excerpt' => $item->designation,
                    'image' => null,
                ];
            });

        // Search Services (Medium Priority)
        $generalServices = Service::where('is_active', true);
        $generalServices = $this->searchColumns($generalServices, ['name', 'description'], $query);
        $generalServices = $generalServices
            ->limit(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->name,
                    'type' => 'Service',
                    'url' => route('service-pages.all'),
                    'excerpt' => $item->description ?: 'Bank Service',
                    'image' => $item->image ? asset('storage/'.$item->image) : null,
                ];
            });

        // Search Product Types (Medium Priority)
        $productTypes = ProductType::where('is_active', true);
        $productTypes = $this->searchColumns($productTypes, ['name'], $query);
        $productTypes = $productTypes
            ->limit(2)
            ->get()
            ->map(function ($item) {
                // Map product types to appropriate category pages
                $typeName = strtolower($item->name);
                $url = '/products/consumer-finances'; // default

                if (strpos($typeName, 'deposit') !== false || strpos($typeName, 'saving') !== false) {
                    $url = '/products/deposit-accounts';
                } elseif (strpos($typeName, 'commercial') !== false || strpos($typeName, 'sme') !== false || strpos($typeName, 'business') !== false) {
                    $url = '/products/commercial-sme-finances';
                } elseif (strpos($typeName, 'micro') !== false) {
                    $url = '/products/micro-finances';
                } elseif (strpos($typeName, 'agri') !== false || strpos($typeName, 'farm') !== false) {
                    $url = '/products/agriculture-finances';
                }

                return [
                    'id' => $item->id,
                    'title' => $item->name,
                    'type' => 'Product Type',
                    'url' => $url,
                    'excerpt' => 'Banking Product Category',
                    'image' => null,
                ];
            });

        // Search Product Schemes (Low Priority)
        $productSchemes = ProductScheme::where('is_active', true);
        $productSchemes = $this->searchColumns($productSchemes, ['name', 'description'], $query);
        $productSchemes = $productSchemes
            ->limit(2)
            ->get()
            ->map(function ($item) {
                // Map product schemes to appropriate category pages
                $schemeName = strtolower($item->name);
                $url = '/products/consumer-finances'; // default

                if (strpos($schemeName, 'deposit') !== false || strpos($schemeName, 'saving') !== false) {
                    $url = '/products/deposit-accounts';
                } elseif (strpos($schemeName, 'commercial') !== false || strpos($schemeName, 'sme') !== false || strpos($schemeName, 'business') !== false) {
                    $url = '/products/commercial-sme-finances';
                } elseif (strpos($schemeName, 'micro') !== false) {
                    $url = '/products/micro-finances';
                } elseif (strpos($schemeName, 'agri') !== false || strpos($schemeName, 'farm') !== false) {
                    $url = '/products/agriculture-finances';
                }

                return [
                    'id' => $item->id,
                    'title' => $item->name,
                    'type' => 'Product Scheme',
                    'url' => $url,
                    'excerpt' => $item->description ?: 'Product Scheme Details',
                    'image' => null,
                ];
            });

        // Search Annual Reports (Low Priority)
        $annualReports = AnnualReport::query();
        $annualReports = $this->searchColumns($annualReports, ['annual_report_fiscal_year'], $query);
        $annualReports = $annualReports
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => "Annual Report {$item->annual_report_fiscal_year}",
                    'type' => 'Annual Report',
                    'url' => '/financials/annual-reports',
                    'excerpt' => "Annual Report for fiscal year {$item->annual_report_fiscal_year}",
                    'image' => null,
                ];
            });

        // Search Financial Reports (Low Priority)
        $financialReports = FinancialReport::query();
        $financialReports = $this->searchColumns($financialReports, ['fiscal_year'], $query);
        $financialReports = $financialReports
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => "Financial Report {$item->fiscal_year}",
                    'type' => 'Financial Report',
                    'url' => '/financials/statements',
                    'excerpt' => "Financial Report for fiscal year {$item->fiscal_year}",
                    'image' => null,
                ];
            });

        // Search Financial Highlights (Low Priority)
        $financialHighlights = FinancialHighlight::query();
        $financialHighlights = $this->searchColumns($financialHighlights, ['fiscal_year'], $query);
        $financialHighlights = $financialHighlights
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => "Financial Highlights {$item->fiscal_year}",
                    'type' => 'Financial Highlights',
                    'url' => '/financials/financial-highlights',
                    'excerpt' => "Financial highlights for fiscal year {$item->fiscal_year}",
                    'image' => null,
                ];
            });

        // Search Schedule of Charges (Low Priority)
        $scheduleOfCharges = ScheduleOfCharge::where('is_active', true);
        $scheduleOfCharges = $this->searchColumns($scheduleOfCharges, ['title', 'description'], $query);
        $scheduleOfCharges = $scheduleOfCharges
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'type' => 'Schedule of Charges',
                    'url' => route('rates.schedule-of-charges'),
                    'excerpt' => $item->description ?: 'Banking charges and fees',
                    'image' => null,
                ];
            });

        // Search Profit Rates (Low Priority)
        $profitRates = ProfitRate::where('is_active', true);
        $profitRates = $this->searchColumns($profitRates, ['category'], $query);
        $profitRates = $profitRates
            ->limit(2)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->category,
                    'type' => 'Profit Rate',
                    'url' => '/rates/profit-rates',
                    'excerpt' => "Rate: {$item->rate}%",
                    'image' => null,
                ];
            });

        // Search Pages (if they exist)
        $pages = collect();
        if (class_exists(Page::class) && Schema::hasTable('pages')) {
            if (Schema::hasColumns('pages', ['title', 'content', 'is_published'])) {
                $pages = Page::where('is_published', true);
                $pages = $this->searchColumns($pages, ['title', 'content'], $query);
                $pages = $pages
                    ->limit(2)
                    ->get()
                    ->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'title' => $item->title,
                            'type' => 'Page',
                            'url' => '#',
                            'excerpt' => $this->excerpt($item->content),
                            'image' => null,
                        ];
                    });
            }
        }

        $careers = $this->searchColumns(Career::active()->latest(), ['title', 'description', 'location', 'requirements'], $query)
            ->limit(3)
            ->get()
            ->map(fn (Career $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'Career',
                'url' => route('public-careers.detail', $item->id),
                'excerpt' => $this->excerpt($item->description) ?: ($item->location ?: 'Career opportunity'),
                'image' => null,
            ]);

        $galleryAlbums = $this->searchColumns(GalleryAlbum::active()->orderBy('order'), ['title', 'description'], $query)
            ->limit(3)
            ->get()
            ->map(fn (GalleryAlbum $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'Photo Gallery',
                'url' => route('gallery.show', $item->slug),
                'excerpt' => $item->description ?: 'Photo album',
                'image' => $item->cover_image_url,
            ]);

        $touristAttractions = $this->searchColumns(TouristAttraction::active()->orderBy('order'), ['title', 'summary', 'content'], $query)
            ->limit(3)
            ->get()
            ->map(fn (TouristAttraction $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'Tourist Attraction',
                'url' => route('tourist-attractions.public.show', $item->slug),
                'excerpt' => $item->summary ?: $this->excerpt($item->content),
                'image' => $item->image_url,
            ]);

        $committees = $this->searchColumns(BodCommittee::query()->where('is_active', true)->orderBy('sort_order'), ['name', 'description'], $query)
            ->limit(2)
            ->get()
            ->map(fn (BodCommittee $item) => [
                'id' => $item->id,
                'title' => $item->name,
                'type' => 'Committee',
                'url' => route('about.bod-committees'),
                'excerpt' => $this->excerpt($item->description) ?: 'Board committee',
                'image' => null,
            ]);

        $aboutUs = $this->searchColumns(AboutUs::query()->where('is_active', true)->orderBy('sort_order'), ['title', 'content', 'vision', 'mission'], $query)
            ->limit(2)
            ->get()
            ->map(fn (AboutUs $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'About Us',
                'url' => route('about.about-us'),
                'excerpt' => $this->excerpt($item->vision ?: $item->content),
                'image' => null,
            ]);

        $menuPages = $this->searchColumns(Menu::active()->orderBy('sort_order'), ['title'], $query)
            ->limit(8)
            ->get()
            ->filter(fn (Menu $item) => $item->url !== '#' && ! str_starts_with($item->url, 'http'))
            ->map(fn (Menu $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'Page',
                'url' => $item->url,
                'excerpt' => 'Go to '.$item->title,
                'image' => null,
            ]);

        $sitePages = collect($this->sitePages())
            ->filter(fn (array $page) => str_contains(mb_strtolower($page['title'].' '.$page['keywords']), mb_strtolower($query)))
            ->reject(fn (array $page) => $menuPages->contains('url', $page['url']))
            ->take(5)
            ->map(fn (array $page) => [
                'id' => $page['url'],
                'title' => $page['title'],
                'type' => 'Page',
                'url' => $page['url'],
                'excerpt' => $page['excerpt'],
                'image' => null,
            ]);

        // Combine and sort results (high priority items first)
        $results = $results->concat($news)
            ->concat($services)
            ->concat($products)
            ->concat($downloads)
            ->concat($branches)
            ->concat($boardMembers)
            ->concat($management)
            ->concat($generalServices)
            ->concat($productTypes)
            ->concat($productSchemes)
            ->concat($annualReports)
            ->concat($financialReports)
            ->concat($financialHighlights)
            ->concat($scheduleOfCharges)
            ->concat($profitRates)
            ->concat($pages)
            ->concat($careers)
            ->concat($galleryAlbums)
            ->concat($touristAttractions)
            ->concat($committees)
            ->concat($aboutUs)
            ->concat($menuPages)
            ->concat($sitePages)
            ->unique(fn (array $item) => $item['type'].'|'.$item['url'].'|'.$item['title'])
            ->take(40);

        return response()->json([
            'results' => $results->values(),
            'total' => $results->count(),
            'query' => $query,
        ]);
    }
}
