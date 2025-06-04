<?php

use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\BankServiceController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\ManagmentController;
use App\Http\Controllers\NewsAnnouncementController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('managments', ManagmentController::class);
    Route::resource('carousels', CarouselController::class);
    Route::resource('bank-services', BankServiceController::class);
    Route::resource('news-announcements', NewsAnnouncementController::class);
});

Route::get('/', [PageController::class, 'home'])->name(name: 'home');
// Route::get('/about-us', [PageController::class, 'about'])->name('about');
// Route::get('/about-us/board-of-directors', [PageController::class, 'bod'])->name('about.bod');
// // Route::get('/about-us/managment', [PageController::class, 'managment'])->name('about.managment');
// Route::get('/test-component', [PageController::class, 'testComponent'])->name('test-component');

Route::prefix('about-us')->name('about.')->group(function () {
    Route::get('/board-of-directors', [PageController::class, 'boardOfDirectors'])->name('board-directors');
    Route::get('/management', [PageController::class, 'management'])->name('management');
});

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/deposit-accounts', [PageController::class, 'depositAccounts'])->name('deposit-accounts');
    Route::get('/term-deposit', [PageController::class, 'termDeposit'])->name('term-deposit');
    Route::get('/consumer-finances', [PageController::class, 'consumerFinances'])->name('consumer-finances');
    Route::get('/commercial-sme-finances', [PageController::class, 'commercialSME'])->name('commercial-sme-finances');
    Route::get('/agriculture-finances', [PageController::class, 'agriculture'])->name('agriculture-finances');
    Route::get('/micro-finances', [PageController::class, 'microFinance'])->name('micro-finances');
});

Route::prefix('services')->name('services.')->group(function () {

    Route::get('/all-services', [ServiceController::class, 'index'])->name('index');
    Route::get('/lockers-facility', [ServiceController::class, 'lockersFacility'])->name('lockers-facility');
    Route::get('/utility-bills-collection', [ServiceController::class, 'utilityBillsCollection'])->name('utility-bills-collection');
    Route::get('/services-for-ajk-psc', [ServiceController::class, 'servicesForAjkPsc'])->name('services-for-ajk-psc');
    Route::get('/home-remittance', [ServiceController::class, 'homeRemittance'])->name('home-remittance');
    // Route::get('/{service}', [ServiceController::class, 'show'])->name('home-remittance');
});

Route::prefix('financials')->name('financials.')->group(function () {
    Route::get('/statements', function () {
        return inertia('Financials/Statements');
    })->name('statements');
});

Route::prefix('rates')->name('rates.')->group(function () {
    Route::get('/profit-rates', function () {
        return inertia('Rates/ProfitRates');
    })->name('profit-rates');
});

Route::get('/contact-us', [PageController::class, 'contact'])->name('contact');

Route::get('/news', [PageController::class, 'news'])->name('news');
Route::get('/news/{slug}', [PageController::class, 'newsDetail'])->name('news.detail');

// Admin routes (protected by auth middleware)
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('menus', MenuController::class);
    Route::post('menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');
    Route::post('clear-menu-cache', [MenuController::class, 'clearCache'])->name('clear-menu-cache');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
