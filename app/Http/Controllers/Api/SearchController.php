<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnnualReport;
use App\Models\BankService;
use App\Models\BoardOfDirector;
use App\Models\Branch;
use App\Models\Download;
use App\Models\FinancialHighlight;
use App\Models\FinancialReport;
use App\Models\Management;
use App\Models\NewsAnnouncement;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductScheme;
use App\Models\ProductType;
use App\Models\ProfitRate;
use App\Models\ScheduleOfCharge;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SearchController extends Controller
{
    /**
     * Get the appropriate LIKE operator for case-insensitive search based on database driver
     */
    private function getLikeOperator(): string
    {
        $driver = DB::connection()->getDriverName();

        return match ($driver) {
            'pgsql' => 'ILIKE',
            'mysql', 'mariadb' => 'LIKE',
            'sqlite' => 'LIKE', // SQLite LIKE is case-insensitive by default
            'sqlsrv' => 'LIKE', // SQL Server
            default => 'LIKE'
        };
    }

    /**
     * Apply case-insensitive LIKE search that works across database drivers
     */
    private function searchColumns($query, $columns, $searchTerm)
    {
        $driver = DB::connection()->getDriverName();

        return $query->where(function ($q) use ($columns, $searchTerm, $driver) {
            foreach ($columns as $index => $column) {
                if ($driver === 'pgsql') {
                    if ($index === 0) {
                        $q->where($column, 'ILIKE', "%{$searchTerm}%");
                    } else {
                        $q->orWhere($column, 'ILIKE', "%{$searchTerm}%");
                    }
                } else {
                    // For MySQL/MariaDB, use LOWER() for case-insensitive search
                    if ($index === 0) {
                        $q->whereRaw("LOWER({$column}) LIKE LOWER(?)", ["%{$searchTerm}%"]);
                    } else {
                        $q->orWhereRaw("LOWER({$column}) LIKE LOWER(?)", ["%{$searchTerm}%"]);
                    }
                }
            }
        });
    }

    public function search(Request $request)
    {
        $query = $request->get('q');

        if (empty($query) || strlen($query) < 2) {
            return response()->json(['results' => []]);
        }

        $results = collect();

        // Search News Announcements (High Priority)
        $news = NewsAnnouncement::where('is_published', true);
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
                    'excerpt' => strip_tags(substr($item->content, 0, 150)).'...',
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
                    'url' => '/services/all-services',
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
        if (class_exists(\App\Models\Page::class) && Schema::hasTable('pages')) {
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
                            'excerpt' => strip_tags(substr($item->content ?? '', 0, 150)).'...',
                            'image' => null,
                        ];
                    });
            }
        }

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
            ->take(25);

        return response()->json([
            'results' => $results->values(),
            'total' => $results->count(),
            'query' => $query,
        ]);
    }
}
