<?php

/**
 * Web Routes for Bank AJK Application
 * 
 * This file contains all the web routes for the application.
 * Routes are organized into logical groups for better maintainability:
 * - Protected Admin Routes (CRUD operations)
 * - Public Frontend Routes (customer-facing pages)
 * - API Routes (for AJAX/search functionality)
 * - File Download Routes
 * - Utility Routes
 */

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// =============================================================================
// CONTROLLER IMPORTS
// =============================================================================

// Admin Controllers
use App\Http\Controllers\Admin\MenuController;

// Core Content Controllers
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\AnnualReportController;
use App\Http\Controllers\BankServiceController;
use App\Http\Controllers\BoardOfDirectorController;
use App\Http\Controllers\BodCommitteeController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\FinancialHighlightController;
use App\Http\Controllers\FinancialReportController;
use App\Http\Controllers\ManagementController;
use App\Http\Controllers\NewsAnnouncementController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSchemeController;
use App\Http\Controllers\ProductSchemeAttributeController;
use App\Http\Controllers\ProfitRateController;
use App\Http\Controllers\ScheduleOfChargeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceAttributeController;
use App\Http\Controllers\TopNavbarMessageController;

// Geographic & Branch Controllers
use App\Http\Controllers\BranchController;
use App\Http\Controllers\BranchServiceController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\RegionController;

// Utility Controllers
use App\Http\Controllers\LoanCalculatorController;

// API Controllers
use App\Http\Controllers\Api\SearchController;

// =============================================================================
// PROTECTED ADMIN ROUTES
// =============================================================================
/**
 * All routes in this group require authentication and email verification.
 * These routes handle the administrative CRUD operations for the bank's 
 * content management system.
 */
Route::middleware(['auth', 'verified'])->group(function () {

    // -------------------------------------------------------------------------
    // DASHBOARD
    // -------------------------------------------------------------------------
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // -------------------------------------------------------------------------
    // HOMEPAGE CONTENT MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('carousels', CarouselController::class)->middleware('can:view carousels');
    Route::resource('bank-services', BankServiceController::class)->middleware('can:view bank services');
    Route::resource('news-announcements', NewsAnnouncementController::class)->middleware('can:view news announcements');
    Route::resource('top-navbar-messages', TopNavbarMessageController::class)->middleware('can:view top navbar messages');

    // -------------------------------------------------------------------------
    // ORGANIZATIONAL STRUCTURE MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('managements', ManagementController::class)->middleware('can:view managements');
    Route::resource('board-of-directors', BoardOfDirectorController::class)->middleware('can:view board of directors');
    Route::resource('bod-committees', BodCommitteeController::class)->middleware('can:view bod committees');

    // -------------------------------------------------------------------------
    // PRODUCT & SERVICE MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('product', ProductController::class)->middleware('can:view products'); // Singular route for product
    Route::resource('product-schemes', ProductSchemeController::class)->middleware('can:view product schemes');
    Route::resource('product-scheme-attributes', ProductSchemeAttributeController::class)->middleware('can:view product scheme attributes');
    Route::resource('services', ServiceController::class)->middleware('can:view services');
    Route::resource('service-attributes', ServiceAttributeController::class)->middleware('can:view service attributes');

    // -------------------------------------------------------------------------
    // FINANCIAL REPORTS & DOCUMENTS
    // -------------------------------------------------------------------------
    Route::resource('financial-reports', FinancialReportController::class)->middleware('can:view financial reports');
    Route::resource('annual-reports', AnnualReportController::class)->middleware('can:view annual reports');
    Route::resource('financial-highlights', FinancialHighlightController::class)->middleware('can:view financial highlights');
    Route::resource('profit-rates', ProfitRateController::class)->middleware('can:view profit rates');
    Route::resource('schedule-of-charges', ScheduleOfChargeController::class)->middleware('can:view schedule of charges');
    Route::resource('downloads', DownloadController::class)->middleware('can:view downloads');

    // -------------------------------------------------------------------------
    // GEOGRAPHIC & BRANCH MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('regions', RegionController::class)->middleware('can:view regions');
    Route::resource('districts', DistrictController::class)->middleware('can:view districts');
    Route::resource('branches', BranchController::class)->middleware('can:view branches');
    Route::resource('branch-services', BranchServiceController::class)->middleware('can:view branch services');

    // -------------------------------------------------------------------------
    // COMMUNICATION & CONTACT MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('contacts', ContactController::class)->middleware('can:view contacts');
    Route::resource('careers', CareerController::class)->middleware('can:view careers');

    // -------------------------------------------------------------------------
    // ABOUT US MANAGEMENT (Special naming to avoid conflicts)
    // -------------------------------------------------------------------------
    Route::resource('admin-about-us', AboutUsController::class)->names([
        'index' => 'about-us.index',
        'create' => 'about-us.create',
        'store' => 'about-us.store',
        'show' => 'about-us.show',
        'edit' => 'about-us.edit',
        'update' => 'about-us.update',
        'destroy' => 'about-us.destroy',
    ])->parameters(['admin-about-us' => 'aboutUs'])->middleware('can:view about us');

});

// =============================================================================
// PUBLIC FRONTEND ROUTES
// =============================================================================
/**
 * These routes are accessible to all users without authentication.
 * They serve the public-facing website content for bank customers.
 */

// -------------------------------------------------------------------------
// HOMEPAGE
// -------------------------------------------------------------------------
Route::get('/', [PageController::class, 'home'])->name('home');

// -------------------------------------------------------------------------
// ABOUT US SECTION
// -------------------------------------------------------------------------
Route::prefix('about-us')->name('about.')->group(function () {
    Route::get('/', [AboutUsController::class, 'publicIndex'])->name('about-us');
    Route::get('/board-of-directors', [PageController::class, 'boardOfDirectors'])->name('board-directors');
    Route::get('/management', [PageController::class, 'management'])->name('management');
    Route::get('/bod-committees', [BodCommitteeController::class, 'publicIndex'])->name('bod-committees');
    Route::get('/branch-network', [PageController::class, 'branchNetwork'])->name('branch-network');
    Route::get('/organogram', [PageController::class, 'organizationStructure'])->name('organogram');
});

// -------------------------------------------------------------------------
// PRODUCTS SECTION
// -------------------------------------------------------------------------
Route::prefix('products')->name('products.')->group(function () {
    Route::get('/deposit-accounts', [PageController::class, 'depositAccounts'])->name('deposit-accounts');
    Route::get('/term-deposit', [PageController::class, 'termDeposit'])->name('term-deposit');
    Route::get('/consumer-finances', [PageController::class, 'consumerFinances'])->name('consumer-finances');
    Route::get('/commercial-sme-finances', [PageController::class, 'commercialSME'])->name('commercial-sme-finances');
    Route::get('/agriculture-finances', [PageController::class, 'agriculture'])->name('agriculture-finances');
    Route::get('/micro-finances', [PageController::class, 'microFinance'])->name('micro-finances');
});

// -------------------------------------------------------------------------
// SERVICES SECTION
// -------------------------------------------------------------------------
Route::prefix('services-page')->name('service-pages.')->group(function () {
    Route::get('/all-services', [ServiceController::class, 'indexHomePage'])->name('all');
    Route::get('/lockers-facility', [ServiceController::class, 'lockersFacility'])->name('lockers-facility');
    Route::get('/utility-bills-collection', [ServiceController::class, 'utilityBillsCollection'])->name('utility-bills-collection');
    Route::get('/services-for-ajk-psc', [ServiceController::class, 'servicesForAjkPsc'])->name('services-for-ajk-psc');
    Route::get('/home-remittance', [ServiceController::class, 'homeRemittance'])->name('home-remittance');

    // Dynamic service pages (must be last to avoid conflicts)
    Route::get('/{slug}', [ServiceController::class, 'showHomePage'])->name('show');
});

// -------------------------------------------------------------------------
// FINANCIAL INFORMATION SECTION
// -------------------------------------------------------------------------
Route::prefix('financials')->name('financials.')->group(function () {
    Route::get('/statements', [PageController::class, 'financialStatements'])->name('statements');
    Route::get('/annual-reports', [PageController::class, 'annualReports'])->name('annualReports');
    Route::get('/financial-highlights', [PageController::class, 'financialHighlights'])->name('financialHighlights');
});

// -------------------------------------------------------------------------
// RATES & CHARGES SECTION
// -------------------------------------------------------------------------
Route::prefix('rates')->name('rates.')->group(function () {
    Route::get('/profit-rates', [PageController::class, 'profitRates'])->name('profit-rates');
    Route::get('/schedule-of-charges', [ScheduleOfChargeController::class, 'publicIndex'])->name('schedule-of-charges');
    Route::get('/schedule-of-charges/{scheduleOfCharge}/download', [ScheduleOfChargeController::class, 'download'])->name('schedule-of-charges.download');
});

// -------------------------------------------------------------------------
// NEWS & ANNOUNCEMENTS SECTION
// -------------------------------------------------------------------------
Route::get('/news', [PageController::class, 'news'])->name('news');
Route::get('/news/{slug}', [PageController::class, 'newsDetail'])->name('news.detail');

// -------------------------------------------------------------------------
// CAREER OPPORTUNITIES SECTION
// -------------------------------------------------------------------------
Route::get('/join-the-bank', [CareerController::class, 'publicIndex'])->name('public-careers');
Route::get('/join-the-bank/{career}', [CareerController::class, 'publicShow'])->name('public-careers.detail');

// -------------------------------------------------------------------------
// CONTACT & COMMUNICATION
// -------------------------------------------------------------------------
Route::get('/contact-us', [PageController::class, 'contact'])->name('contact');
Route::post('/contact-us', [PageController::class, 'contactSubmit'])->name('contact.submit');

// -------------------------------------------------------------------------
// PUBLIC DOWNLOADS SECTION
// -------------------------------------------------------------------------
Route::get('/documents', [DownloadController::class, 'publicIndex'])->name('public-downloads');
Route::get('/documents/{download}/download', [DownloadController::class, 'download'])->name('public-downloads.download');

// -------------------------------------------------------------------------
// UTILITY TOOLS
// -------------------------------------------------------------------------
Route::get('/loan-calculator', [LoanCalculatorController::class, 'index'])->name('loan-calculator');
// =============================================================================
// FILE DOWNLOAD ROUTES
// =============================================================================
/**
 * These routes handle file downloads for various documents and attachments.
 * Organized by document type for better maintainability.
 */

// -------------------------------------------------------------------------
// CAREER DOCUMENT DOWNLOADS
// -------------------------------------------------------------------------
Route::get('careers/{career}/download', [CareerController::class, 'download'])
    ->name('public-careers.download');

// -------------------------------------------------------------------------
// FINANCIAL DOCUMENT DOWNLOADS
// -------------------------------------------------------------------------
Route::get('annual-reports/{annual_report}/download', [AnnualReportController::class, 'download'])
    ->name('annual-reports.download');

Route::get('financial-highlights/{financial_highlight}/download', [FinancialHighlightController::class, 'download'])
    ->name('financial-highlights.download');

Route::get('financial-reports/{financial_report}/download/{type}', [FinancialReportController::class, 'download'])
    ->name('financial-reports.download');

// -------------------------------------------------------------------------
// ADMINISTRATIVE DOCUMENT DOWNLOADS
// -------------------------------------------------------------------------
Route::get('schedule-of-charges/{scheduleOfCharge}/download', [ScheduleOfChargeController::class, 'download'])
    ->name('schedule-of-charges.admin-download');

Route::get('downloads/{download}/download', [DownloadController::class, 'download'])
    ->name('downloads.admin-download');

// =============================================================================
// API ROUTES
// =============================================================================
/**
 * API endpoints for AJAX requests and external integrations.
 */
Route::prefix('api')->group(function () {
    Route::get('/search', [SearchController::class, 'search']);
});

// =============================================================================
// ADMIN PANEL ROUTES
// =============================================================================
/**
 * Administrative routes for menu management and system configuration.
 * These routes are protected by authentication and verification middleware.
 */
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    // -------------------------------------------------------------------------
    // USER MANAGEMENT SYSTEM
    // -------------------------------------------------------------------------
    Route::resource('users', \App\Http\Controllers\UserController::class);
    Route::resource('roles', \App\Http\Controllers\RoleController::class);
    Route::resource('permissions', \App\Http\Controllers\PermissionController::class);

    // Menu Management System
    Route::resource('menus', MenuController::class);
    Route::post('menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');
    Route::post('clear-menu-cache', [MenuController::class, 'clearCache'])->name('clear-menu-cache');
});

// =============================================================================
// ROUTE INCLUDES
// =============================================================================
/**
 * Include additional route files for better organization.
 * These files contain specialized routes for settings and authentication.
 */
require __DIR__ . '/settings.php';  // Application settings routes
require __DIR__ . '/auth.php';      // Authentication routes (login, register, etc.)