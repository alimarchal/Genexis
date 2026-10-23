<?php

use App\Http\Controllers\Api\Extract\V1\ExtractionController;
use App\Http\Controllers\Api\V1\BranchController;
use App\Http\Controllers\Api\V1\CareerController;
use App\Http\Controllers\Api\V1\ContactInfoController;
use App\Http\Controllers\Api\V1\DistrictController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\RateController;
use App\Http\Controllers\Api\V1\RegionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API v1
|--------------------------------------------------------------------------
| Read-only, unauthenticated, rate limited per IP (see AppServiceProvider)
| and cacheable. Never exposes internal columns such as created_by.
*/
Route::prefix('v1')
    ->name('api.v1.')
    ->middleware(['throttle:api', 'cache.headers:public;max_age=300;etag'])
    ->group(function () {
        Route::get('branches', [BranchController::class, 'index'])->name('branches.index');
        Route::get('branches/nearby', [BranchController::class, 'nearby'])->name('branches.nearby');
        Route::get('branches/{code}', [BranchController::class, 'show'])->name('branches.show');

        Route::get('regions', [RegionController::class, 'index'])->name('regions.index');
        Route::get('districts', [DistrictController::class, 'index'])->name('districts.index');

        Route::get('contact', ContactInfoController::class)->name('contact');
        Route::get('rates', RateController::class)->name('rates');

        Route::get('news', [NewsController::class, 'index'])->name('news.index');
        Route::get('news/{slug}', [NewsController::class, 'show'])->name('news.show');

        Route::get('careers', [CareerController::class, 'index'])->name('careers.index');
        Route::get('careers/{career}', [CareerController::class, 'show'])->whereNumber('career')->name('careers.show');
    });

/*
|--------------------------------------------------------------------------
| Data extraction API v1
|--------------------------------------------------------------------------
| Separate from the public API: needs an API token of a user holding the
| "extract data" permission ("extract sensitive data" as well for personal
| data), is rate limited per token and logs every extraction.
*/
Route::prefix('extract/v1')
    ->name('api.extract.v1.')
    ->middleware(['throttle:extract-ip', 'auth.token', 'throttle:extract'])
    ->group(function () {
        Route::get('datasets', [ExtractionController::class, 'index'])->name('datasets');
        Route::get('{dataset}', [ExtractionController::class, 'show'])->where('dataset', '[a-z\-]+')->name('show');
    });
