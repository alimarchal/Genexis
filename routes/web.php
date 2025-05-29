<?php

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
Route::get('/about-us/managment', [PageController::class, 'managment'])->name('about.managment');
Route::get('/test-component', [PageController::class, 'testComponent'])->name('test-component');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
