<?php

use App\Models\ProfitRate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('it can view profit rates index page', function () {
    ProfitRate::factory()->count(3)->create();

    $response = $this->get(route('profit-rates.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('ProfitRates/Index')
            ->has('profitRates.data', 3)
        );
});

test('it can search profit rates by category', function () {
    ProfitRate::factory()->create(['category' => 'PLS Saving Deposit']);
    ProfitRate::factory()->create(['category' => '1 Year TDR']);

    $response = $this->get(route('profit-rates.index', ['search' => 'PLS']));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('profitRates.data', 1)
            ->where('profitRates.data.0.category', 'PLS Saving Deposit')
        );
});

test('it can filter profit rates by status', function () {
    ProfitRate::factory()->create(['is_active' => true]);
    ProfitRate::factory()->create(['is_active' => false]);

    $response = $this->get(route('profit-rates.index', ['filter' => ['is_active' => '1']]));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('profitRates.data', 1)
            ->where('profitRates.data.0.is_active', true)
        );
});

test('it can filter current profit rates', function () {
    // Current rate
    ProfitRate::factory()->create([
        'valid_from' => now()->subDays(10),
        'valid_to' => now()->addDays(10),
    ]);

    // Past rate
    ProfitRate::factory()->create([
        'valid_from' => now()->subDays(30),
        'valid_to' => now()->subDays(10),
    ]);

    $response = $this->get(route('profit-rates.index', ['filter' => ['current' => '1']]));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('profitRates.data', 1)
        );
});

test('it can sort profit rates by category', function () {
    ProfitRate::factory()->create(['category' => 'Z Category']);
    ProfitRate::factory()->create(['category' => 'A Category']);

    $response = $this->get(route('profit-rates.index', ['sort' => 'category']));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('profitRates.data.0.category', 'A Category')
            ->where('profitRates.data.1.category', 'Z Category')
        );
});

test('it can view create profit rate page', function () {
    $response = $this->get(route('profit-rates.create'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('ProfitRates/Create')
        );
});

test('it can create a new profit rate', function () {
    $data = [
        'category' => 'Test Deposit',
        'rate' => 8.50,
        'valid_from' => '2025-06-01',
        'valid_to' => '2025-12-31',
        'is_active' => true,
    ];

    $response = $this->post(route('profit-rates.store'), $data);

    $response->assertRedirect(route('profit-rates.index'));

    $this->assertDatabaseHas('profit_rates', [
        'category' => 'Test Deposit',
        'rate' => 8.50,
        'is_active' => true,
        'created_by' => $this->user->id,
        'updated_by' => $this->user->id,
    ]);
});

test('it validates required fields when creating profit rate', function () {
    $response = $this->post(route('profit-rates.store'), []);

    $response->assertSessionHasErrors(['category', 'rate', 'valid_from', 'is_active']);
});

test('it validates rate is numeric and within range', function () {
    $response = $this->post(route('profit-rates.store'), [
        'category' => 'Test Deposit',
        'rate' => 'invalid',
        'valid_from' => '2025-06-01',
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors('rate');

    $response = $this->post(route('profit-rates.store'), [
        'category' => 'Test Deposit',
        'rate' => -1,
        'valid_from' => '2025-06-01',
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors('rate');

    $response = $this->post(route('profit-rates.store'), [
        'category' => 'Test Deposit',
        'rate' => 101,
        'valid_from' => '2025-06-01',
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors('rate');
});

test('it validates valid_to is after valid_from', function () {
    $response = $this->post(route('profit-rates.store'), [
        'category' => 'Test Deposit',
        'rate' => 8.50,
        'valid_from' => '2025-06-01',
        'valid_to' => '2025-05-01',
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors('valid_to');
});

test('it can view show profit rate page', function () {
    $profitRate = ProfitRate::factory()->create();

    $response = $this->get(route('profit-rates.show', $profitRate));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('ProfitRates/Show')
            ->where('profitRate.id', $profitRate->id)
        );
});

test('it can view edit profit rate page', function () {
    $profitRate = ProfitRate::factory()->create();

    $response = $this->get(route('profit-rates.edit', $profitRate));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('ProfitRates/Edit')
            ->where('profitRate.id', $profitRate->id)
        );
});

test('it can update profit rate', function () {
    $profitRate = ProfitRate::factory()->create([
        'category' => 'Old Category',
        'rate' => 5.00,
    ]);

    $data = [
        'category' => 'Updated Category',
        'rate' => 7.50,
        'valid_from' => $profitRate->valid_from->format('Y-m-d'),
        'valid_to' => $profitRate->valid_to?->format('Y-m-d') ?? '',
        'is_active' => $profitRate->is_active,
    ];

    $response = $this->put(route('profit-rates.update', $profitRate), $data);

    $response->assertRedirect(route('profit-rates.index'));

    $this->assertDatabaseHas('profit_rates', [
        'id' => $profitRate->id,
        'category' => 'Updated Category',
        'rate' => 7.50,
        'updated_by' => $this->user->id,
    ]);
});

test('it can delete profit rate', function () {
    $profitRate = ProfitRate::factory()->create();

    $response = $this->delete(route('profit-rates.destroy', $profitRate));

    $response->assertRedirect(route('profit-rates.index'));

    $this->assertDatabaseMissing('profit_rates', [
        'id' => $profitRate->id,
    ]);
});

test('it tracks user information when creating profit rate', function () {
    $data = [
        'category' => 'User Tracked Deposit',
        'rate' => 6.00,
        'valid_from' => '2025-06-01',
        'is_active' => true,
    ];

    $this->post(route('profit-rates.store'), $data);

    $this->assertDatabaseHas('profit_rates', [
        'category' => 'User Tracked Deposit',
        'created_by' => $this->user->id,
        'updated_by' => $this->user->id,
    ]);
});

test('it tracks user information when updating profit rate', function () {
    $profitRate = ProfitRate::factory()->create();
    $newUser = User::factory()->create();
    $this->actingAs($newUser);

    $data = [
        'category' => $profitRate->category,
        'rate' => 9.00,
        'valid_from' => $profitRate->valid_from->format('Y-m-d'),
        'valid_to' => $profitRate->valid_to?->format('Y-m-d') ?? '',
        'is_active' => $profitRate->is_active,
    ];

    $this->put(route('profit-rates.update', $profitRate), $data);

    $this->assertDatabaseHas('profit_rates', [
        'id' => $profitRate->id,
        'updated_by' => $newUser->id,
    ]);
});

test('it returns correct status attribute', function () {
    $activeRate = ProfitRate::factory()->create(['is_active' => true]);
    $inactiveRate = ProfitRate::factory()->create(['is_active' => false]);

    expect($activeRate->status)->toBe('Active');
    expect($inactiveRate->status)->toBe('Inactive');
});

test('it correctly identifies current profit rates', function () {
    $currentRate = ProfitRate::factory()->create([
        'valid_from' => now()->subDays(10),
        'valid_to' => now()->addDays(10),
    ]);

    $pastRate = ProfitRate::factory()->create([
        'valid_from' => now()->subDays(30),
        'valid_to' => now()->subDays(10),
    ]);

    $futureRate = ProfitRate::factory()->create([
        'valid_from' => now()->addDays(10),
        'valid_to' => now()->addDays(30),
    ]);

    $ongoingRate = ProfitRate::factory()->create([
        'valid_from' => now()->subDays(10),
        'valid_to' => null,
    ]);

    $currentRates = ProfitRate::current()->get();

    expect($currentRates)->toContain($currentRate);
    expect($currentRates)->toContain($ongoingRate);
    expect($currentRates)->not->toContain($pastRate);
    expect($currentRates)->not->toContain($futureRate);
});

test('it can paginate profit rates', function () {
    ProfitRate::factory()->count(25)->create();

    $response = $this->get(route('profit-rates.index', ['per_page' => 10]));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('profitRates.data', 10)
            ->where('profitRates.per_page', 10)
            ->where('profitRates.total', 25)
        );
});

test('it includes creator and updater relationships', function () {
    $creator = User::factory()->create(['name' => 'Creator User']);
    $updater = User::factory()->create(['name' => 'Updater User']);

    $profitRate = ProfitRate::factory()->create([
        'created_by' => $creator->id,
        'updated_by' => $updater->id,
    ]);

    $response = $this->get(route('profit-rates.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('profitRates.data.0.creator.name', 'Creator User')
        );
});
