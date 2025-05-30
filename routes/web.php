<?php

use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\ManagmentController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('managments', ManagmentController::class);
});

Route::get('/', [PageController::class, 'home'])->name(name: 'home');
Route::get('/about-us', [PageController::class, 'about'])->name('about');
Route::get('/about-us/board-of-directors', [PageController::class, 'bod'])->name('about.bod');
// Route::get('/about-us/managment', [PageController::class, 'managment'])->name('about.managment');
Route::get('/test-component', [PageController::class, 'testComponent'])->name('test-component');

Route::prefix('about')->name('about.')->group(function () {
    Route::get('/', function () {
        return inertia('About/Index');
    })->name('index');

    Route::get('/board-directors', function () {
        return inertia('About/BoardDirectors');
    })->name('board-directors');

    Route::get('/management', [PageController::class, 'managment'])->name('management');
});

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/deposit-accounts', function () {
        return inertia('Products/DepositAccounts');
    })->name('deposit-accounts');

    Route::get('/term-deposit', function () {
        return inertia('Products/TermDeposit');
    })->name('term-deposit');

    Route::get('/consumer-finances', function () {
        return inertia('Products/ConsumerFinances');
    })->name('consumer-finances');

    Route::get('/commercial-sme-finances', function () {
        return inertia('Products/CommercialSmeFinances');
    })->name('commercial-sme-finances');

    Route::get('/agriculture-finances', function () {
        return inertia('Products/AgricultureFinances');
    })->name('agriculture-finances');

    Route::get('/micro-finances', function () {
        return inertia('Products/MicroFinances');
    })->name('micro-finances');
});

Route::prefix('services')->name('services.')->group(function () {
    Route::get('/', function () {
        return inertia('Services/Index');
    })->name('index');

    Route::get('/home-remittance', function () {
        return inertia('Services/HomeRemittance');
    })->name('home-remittance');
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

// Admin routes (protected by auth middleware)
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('menus', MenuController::class);
    Route::post('menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');
    Route::post('clear-menu-cache', [MenuController::class, 'clearCache'])->name('clear-menu-cache');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
