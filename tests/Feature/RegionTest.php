<?php

use App\Models\Division;
use App\Models\Region;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    // Create a division for tests that need to create regions
    $this->division = Division::create([
        'name' => 'Test Division',
        'short_name' => 'TD',
        'is_active' => true,
    ]);

    // Seed some regions for read tests
    $this->seed([
        \Database\Seeders\DivisionSeeder::class,
        \Database\Seeders\RegionSeeder::class,
    ]);
});

test('it can view regions index page', function () {
    $response = $this->get(route('regions.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Region/Index'));
});

test('it can view create region page', function () {
    $response = $this->get(route('regions.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Region/Create'));
});

test('it can create region with valid data', function () {
    $response = $this->post(route('regions.store'), [
        'name' => 'Test Region',
        'status' => 'active',
        'division_id' => $this->division->id,
    ]);

    $response->assertRedirect(route('regions.index'));
    $this->assertDatabaseHas('regions', [
        'name' => 'Test Region',
        'status' => 'active',
        'division_id' => $this->division->id,
    ]);
});

test('it can view region details', function () {
    $region = \App\Models\Region::where('name', 'Muzaffarabad')->first();

    $response = $this->get(route('regions.show', $region));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Region/Show'));
});

test('it can view edit region page', function () {
    $region = \App\Models\Region::where('name', 'Muzaffarabad')->first();

    $response = $this->get(route('regions.edit', $region));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Region/Edit'));
});

test('it can update region', function () {
    $region = \App\Models\Region::where('name', 'Muzaffarabad')->first();

    $response = $this->put(route('regions.update', $region), [
        'name' => 'Updated Region',
        'status' => 'inactive',
        'division_id' => $region->division_id,
    ]);

    $response->assertRedirect(route('regions.index'));
    $this->assertDatabaseHas('regions', [
        'id' => $region->id,
        'name' => 'Updated Region',
        'status' => 'inactive',
        'division_id' => $region->division_id,
    ]);
});

test('it can delete region', function () {
    // Create a test region that's safe to delete
    $region = \App\Models\Region::create([
        'name' => 'Deletable Test Region',
        'status' => 'active',
        'division_id' => $this->division->id,
    ]);

    $response = $this->delete(route('regions.destroy', $region));

    $response->assertRedirect(route('regions.index'));
    $this->assertDatabaseMissing('regions', ['id' => $region->id]);
});

test('it validates required fields when creating region', function () {
    $response = $this->post(route('regions.store'), []);

    $response->assertSessionHasErrors(['name', 'status', 'division_id']);
});
