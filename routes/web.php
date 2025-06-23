<?php

use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\AnnualReportController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\BankServiceController;
use App\Http\Controllers\BoardOfDirectorController;
use App\Http\Controllers\BodCommitteeController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\BranchServiceController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\FinancialHighlightController;
use App\Http\Controllers\FinancialReportController;
use App\Http\Controllers\ManagmentController;
use App\Http\Controllers\NewsAnnouncementController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSchemeAttributeController;
use App\Http\Controllers\ProductSchemeController;
use App\Http\Controllers\ProductTypeAccountController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfitRateController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\ScheduleOfChargeController;
use App\Http\Controllers\ServiceAttributeController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('carousels', CarouselController::class);
    Route::resource('bank-services', BankServiceController::class);
    Route::resource('news-announcements', NewsAnnouncementController::class);
    Route::resource('managments', ManagmentController::class);
    Route::resource('board-of-directors', controller: BoardOfDirectorController::class);
    Route::resource('bod-committees', BodCommitteeController::class);
    // Route::resource('product-types', ProductTypeController::class);
    // Route::resource('product-type-accounts', ProductTypeAccountController::class);
    Route::resource('product-schemes', ProductSchemeController::class);
    Route::resource('product-scheme-attributes', ProductSchemeAttributeController::class);
    Route::resource('services', ServiceController::class);

    Route::resource('financial-reports', FinancialReportController::class);
    Route::resource('annual-reports', AnnualReportController::class);
    Route::resource('financial-highlights', FinancialHighlightController::class);
    Route::resource('profit-rates', ProfitRateController::class);


    // New CRUD routes
    Route::resource('regions', RegionController::class);
    Route::resource('districts', DistrictController::class);
    Route::resource('branches', BranchController::class);
    Route::resource('contacts', ContactController::class);
    Route::resource('branch-services', BranchServiceController::class);

    // Schedule of Charges and Downloads CRUD
    Route::resource('schedule-of-charges', ScheduleOfChargeController::class);
    Route::resource('downloads', DownloadController::class);

    // Product CRUD - singular route
    Route::resource('product', ProductController::class);
    Route::resource('service-attributes', ServiceAttributeController::class);
    Route::resource('careers', CareerController::class);

});

// Public routes
Route::get('/', [PageController::class, 'home'])->name('home');

Route::prefix('about-us')->name('about.')->group(function () {
    Route::get('/board-of-directors', [PageController::class, 'boardOfDirectors'])->name('board-directors');
    Route::get('/management', [PageController::class, 'management'])->name('management');
    Route::get('/bod-committees', [BodCommitteeController::class, 'publicIndex'])->name('bod-committees');
    Route::get('/branch-network', [PageController::class, 'branchNetwork'])->name('branch-network');
    Route::get('/organogram', [PageController::class, 'organizationStructure'])->name('organogram');
});

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/deposit-accounts', [PageController::class, 'depositAccounts'])->name('deposit-accounts');
    Route::get('/term-deposit', [PageController::class, 'termDeposit'])->name('term-deposit');
    Route::get('/consumer-finances', [PageController::class, 'consumerFinances'])->name('consumer-finances');
    Route::get('/commercial-sme-finances', [PageController::class, 'commercialSME'])->name('commercial-sme-finances');
    Route::get('/agriculture-finances', [PageController::class, 'agriculture'])->name('agriculture-finances');
    Route::get('/micro-finances', [PageController::class, 'microFinance'])->name('micro-finances');
});

Route::prefix('services-page')->name('service-pages.')->group(function () {
    Route::get('/all-services', [ServiceController::class, 'indexHomePage'])->name('all');
    Route::get('/lockers-facility', [ServiceController::class, 'lockersFacility'])->name('lockers-facility');
    Route::get('/utility-bills-collection', [ServiceController::class, 'utilityBillsCollection'])->name('utility-bills-collection');
    Route::get('/services-for-ajk-psc', [ServiceController::class, 'servicesForAjkPsc'])->name('services-for-ajk-psc');
    Route::get('/home-remittance', [ServiceController::class, 'homeRemittance'])->name('home-remittance');

    // This route handles new services
    Route::get('/{slug}', [ServiceController::class, 'showHomePage'])->name('show');
});

Route::prefix('financials')->name('financials.')->group(function () {
    Route::get('/statements', [PageController::class, 'financialStatements'])->name('statements');
    Route::get('/annual-reports', [PageController::class, 'annualReports'])->name('annualReports');
    Route::get('/financial-highlights', [PageController::class, 'financialHighlights'])->name('financialHighlights');
});

Route::prefix('rates')->name('rates.')->group(function () {
    Route::get('/profit-rates', [PageController::class, 'profitRates'])->name('profit-rates');
    Route::get('/schedule-of-charges', [ScheduleOfChargeController::class, 'publicIndex'])->name('schedule-of-charges');
    Route::get('/schedule-of-charges/{scheduleOfCharge}/download', [ScheduleOfChargeController::class, 'download'])->name('schedule-of-charges.download');
});

Route::get('/contact-us', [PageController::class, 'contact'])->name('contact');
Route::post('/contact-us', [PageController::class, 'contactSubmit'])->name('contact.submit');

Route::get('/public-downloads', [DownloadController::class, 'publicIndex'])->name('public-downloads');
Route::get('/public-downloads/{download}/download', [DownloadController::class, 'download'])->name('public-downloads.download');


Route::get('/careers-at-bajk', [CareerController::class, 'publicIndex'])->name('public-careers');
Route::get('/careers-at-bajk/{career}', [CareerController::class, 'publicShow'])->name('public-careers.show');


// Download routes


Route::get('careers/{career}/download', [CareerController::class, 'download'])->name('public-careers.download');
Route::get('schedule-of-charges/{scheduleOfCharge}/download', [ScheduleOfChargeController::class, 'download'])->name('schedule-of-charges.admin-download');
Route::get('downloads/{download}/download', [DownloadController::class, 'download'])->name('downloads.admin-download');
Route::get('annual-reports/{annual_report}/download', [AnnualReportController::class, 'download'])->name('annual-reports.download');
Route::get('financial-highlights/{financial_highlight}/download', [FinancialHighlightController::class, 'download'])->name('financial-highlights.download');
Route::get('financial-reports/{financial_report}/download/{type}', [FinancialReportController::class, 'download'])->name('financial-reports.download');



Route::get('/news', [PageController::class, 'news'])->name('news');
Route::get('/news/{slug}', [PageController::class, 'newsDetail'])->name('news.detail');

// API Routes
Route::prefix('api')->group(function () {
    Route::get('/search', [SearchController::class, 'search']);
});

// Admin routes (protected by auth middleware)
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('menus', MenuController::class);
    Route::post('menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');
    Route::post('clear-menu-cache', [MenuController::class, 'clearCache'])->name('clear-menu-cache');
});


Route::get('/email-login-proxy', function () {
    $emailUrl = 'https://www.bankajk.com:2096';
    return redirect()->away($emailUrl);
})->name('email.login.proxy');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
