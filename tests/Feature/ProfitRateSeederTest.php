<?php

use App\Models\ProfitRate;
use Database\Seeders\ProfitRateSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('profit rates seeder seeds expected number of entries', function () {
    $this->seed(ProfitRateSeeder::class);

    $this->assertDatabaseCount('profit_rates', 15);
});

test('profit rate categories seeded correctly', function () {
    $this->seed(ProfitRateSeeder::class);

    $categories = ProfitRate::pluck('category')->toArray();

    expect($categories)->toContain('PLS Saving Deposit')
        ->toContain("7 Days' Notice Deposit")
        ->toContain('5 Year TDR');
});

test('seeded profit rates have is_active set to true', function () {
    $this->seed(ProfitRateSeeder::class);

    $activeCount = ProfitRate::where('is_active', true)->count();

    expect($activeCount)->toBe(15);
});

test('seeded profit rates have correct date range', function () {
    $this->seed(ProfitRateSeeder::class);

    $rate = ProfitRate::first();

    expect($rate->valid_from->format('Y-m-d'))->toBe('2025-02-01')
        ->and($rate->valid_to->format('Y-m-d'))->toBe('2025-06-30');
});

test('seeded profit rates have correct sort_order', function () {
    $this->seed(ProfitRateSeeder::class);

    // Check the first rate has sort_order = 1
    $firstRate = ProfitRate::where('category', 'PLS Saving Deposit')->first();
    expect($firstRate->sort_order)->toBe(1);

    // Check the last rate has sort_order = 15
    $lastRate = ProfitRate::where('category', '5 Year TDR')->first();
    expect($lastRate->sort_order)->toBe(15);

    // Check that rates are ordered by sort_order
    $rates = ProfitRate::orderBy('sort_order')->pluck('category')->toArray();
    expect($rates[0])->toBe('PLS Saving Deposit');
    expect($rates[14])->toBe('5 Year TDR');
});
