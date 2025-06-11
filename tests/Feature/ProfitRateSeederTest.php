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

test('seeded profit rates have is_active false by default', function () {
    $this->seed(ProfitRateSeeder::class);

    $inactiveCount = ProfitRate::where('is_active', false)->count();

    expect($inactiveCount)->toBe(15);
});

test('seeded profit rates have correct date range', function () {
    $this->seed(ProfitRateSeeder::class);

    $rate = ProfitRate::first();

    expect($rate->valid_from->format('Y-m-d'))->toBe('2025-02-01')
        ->and($rate->valid_to->format('Y-m-d'))->toBe('2025-06-30');
});
