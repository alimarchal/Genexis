<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ManagmentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('managments', ManagmentController::class);
});


Route::get('/about-us', [PageController::class, 'aboutUs'])->name('about-us');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
