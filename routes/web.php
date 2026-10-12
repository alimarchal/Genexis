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

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\UploadController;
// =============================================================================
// CONTROLLER IMPORTS
// =============================================================================

// Admin Controllers
use App\Http\Controllers\AnnualReportController;
// Core Content Controllers
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
use App\Http\Controllers\LoanCalculatorController;
use App\Http\Controllers\ManagementController;
use App\Http\Controllers\NewsAnnouncementController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSchemeAttributeController;
use App\Http\Controllers\ProductSchemeController;
use App\Http\Controllers\ProductTypeAccountController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfitRateController;
// Geographic & Branch Controllers
use App\Http\Controllers\RegionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScheduleOfChargeController;
use App\Http\Controllers\ServiceAttributeController;
// Utility Controllers
use App\Http\Controllers\ServiceController;
// API Controllers
use App\Http\Controllers\TopNavbarMessageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // -------------------------------------------------------------------------
    // HOMEPAGE CONTENT MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('carousels', CarouselController::class)->guardedBy('carousels');
    Route::resource('bank-services', BankServiceController::class)->guardedBy('bank services');
    Route::resource('news-announcements', NewsAnnouncementController::class)->guardedBy('news announcements');
    Route::resource('top-navbar-messages', TopNavbarMessageController::class)->guardedBy('top navbar messages');

    // -------------------------------------------------------------------------
    // ORGANIZATIONAL STRUCTURE MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('managements', ManagementController::class)->guardedBy('managements');
    Route::resource('board-of-directors', BoardOfDirectorController::class)->guardedBy('board of directors');
    Route::resource('bod-committees', BodCommitteeController::class)->guardedBy('bod committees');

    // -------------------------------------------------------------------------
    // PRODUCT & SERVICE MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('product', ProductController::class)->guardedBy('products'); // Singular route for product
    Route::resource('product-types', ProductTypeController::class)->guardedBy('product types');
    Route::resource('product-type-accounts', ProductTypeAccountController::class)->guardedBy('product type accounts');
    Route::resource('product-schemes', ProductSchemeController::class)->guardedBy('product schemes');
    Route::resource('product-scheme-attributes', ProductSchemeAttributeController::class)->guardedBy('product scheme attributes');
    Route::resource('services', ServiceController::class)->guardedBy('services');
    Route::resource('service-attributes', ServiceAttributeController::class)->guardedBy('service attributes');

    // -------------------------------------------------------------------------
    // FINANCIAL REPORTS & DOCUMENTS
    // -------------------------------------------------------------------------
    Route::resource('financial-reports', FinancialReportController::class)->guardedBy('financial reports');
    Route::resource('annual-reports', AnnualReportController::class)->guardedBy('annual reports');
    Route::resource('financial-highlights', FinancialHighlightController::class)->guardedBy('financial highlights');
    Route::resource('profit-rates', ProfitRateController::class)->guardedBy('profit rates');
    Route::resource('schedule-of-charges', ScheduleOfChargeController::class)->guardedBy('schedule of charges');
    Route::resource('downloads', DownloadController::class)->guardedBy('downloads');

    // -------------------------------------------------------------------------
    // GEOGRAPHIC & BRANCH MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('regions', RegionController::class)->guardedBy('regions');
    Route::resource('districts', DistrictController::class)->guardedBy('districts');
    Route::resource('branches', BranchController::class)->guardedBy('branches');
    Route::resource('branch-services', BranchServiceController::class)->guardedBy('branch services');

    // -------------------------------------------------------------------------
    // COMMUNICATION & CONTACT MANAGEMENT
    // -------------------------------------------------------------------------
    Route::resource('contacts', ContactController::class)->guardedBy('contacts');
    Route::resource('careers', CareerController::class)->guardedBy('careers');

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
    ])->parameters(['admin-about-us' => 'aboutUs'])->guardedBy('about us');

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

// Section landing URLs used by breadcrumbs: send visitors to the section's first page
Route::permanentRedirect('/financials', '/financials/statements');
Route::permanentRedirect('/rates', '/rates/profit-rates');

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
    Route::get('/schedule-of-charges/{scheduleOfCharge}/download', [ScheduleOfChargeController::class, 'download'])->name('schedule-of-charges.download')->middleware('throttle:downloads');
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
Route::get('/documents/{download}/download', [DownloadController::class, 'download'])->name('public-downloads.download')->middleware('throttle:downloads');

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
Route::middleware('throttle:downloads')->group(function () {
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
});

// =============================================================================
// API ROUTES
// =============================================================================
/**
 * API endpoints for AJAX requests and external integrations.
 */
Route::prefix('api')->middleware('throttle:api')->group(function () {
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
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);

    Route::resource('contact-submissions', ContactSubmissionController::class)
        ->only(['index', 'show', 'destroy'])
        ->parameters(['contact-submissions' => 'contactSubmission'])
        ->guardedBy('contact submissions');

    // Resumable large-file uploads (super-admins may send multi-GB files; see ChunkedUploadService)
    Route::get('uploads', [UploadController::class, 'index'])->middleware('permission:view uploads')->name('uploads.index');
    Route::middleware('throttle:uploads')->group(function () {
        Route::post('uploads', [UploadController::class, 'store'])->name('uploads.store');
        Route::get('uploads/{uploadSession}', [UploadController::class, 'show'])->name('uploads.show');
        Route::put('uploads/{uploadSession}/chunk', [UploadController::class, 'chunk'])->name('uploads.chunk');
        Route::post('uploads/{uploadSession}/complete', [UploadController::class, 'complete'])->name('uploads.complete');
        Route::delete('uploads/{uploadSession}', [UploadController::class, 'destroy'])->name('uploads.destroy');
    });

    // Menu Management System
    Route::resource('menus', MenuController::class)->guardedBy('menus');
    Route::post('menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder')->middleware('permission:edit menus');
    Route::post('clear-menu-cache', [MenuController::class, 'clearCache'])->name('clear-menu-cache')->middleware('permission:edit menus');
});

// =============================================================================
// ROUTE INCLUDES
// =============================================================================
/**
 * Include additional route files for better organization.
 * These files contain specialized routes for settings and authentication.
 */
require __DIR__.'/settings.php';  // Application settings routes
require __DIR__.'/auth.php';      // Authentication routes (login, register, etc.)
