<?php

use App\Models\District;
use App\Models\Region;
use App\Models\User;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);

    // Seed the required data for district tests
    $this->seed([
        \Database\Seeders\DivisionSeeder::class,
        \Database\Seeders\RegionSeeder::class,
        \Database\Seeders\DistrictSeeder::class,
    ]);
});

test('it can view districts index page', function () {
    $response = $this->get(route('districts.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('District/Index'));
});

test('it can view create district page', function () {
    $response = $this->get(route('districts.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('District/Create'));
});

test('it can create district with valid data', function () {
    $region = \App\Models\Region::where('name', 'Muzaffarabad')->first();

    $response = $this->post(route('districts.store'), [
        'name' => 'Test District',
        'region_id' => $region->id,
        'status' => 'active',
    ]);

    $response->assertRedirect(route('districts.index'));
    $this->assertDatabaseHas('districts', [
        'name' => 'Test District',
        'region_id' => $region->id,
        'status' => 'active',
    ]);
});

test('it can view district details', function () {
    $district = \App\Models\District::where('name', 'Muzaffarabad')->first();

    $response = $this->get(route('districts.show', $district));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('District/Show'));
});

test('it can view edit district page', function () {
    $district = \App\Models\District::where('name', 'Muzaffarabad')->first();

    $response = $this->get(route('districts.edit', $district));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('District/Edit'));
});

test('it can update district', function () {
    $district = \App\Models\District::where('name', 'Muzaffarabad')->first();

    $response = $this->put(route('districts.update', $district), [
        'name' => 'Updated District',
        'region_id' => $district->region_id,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('districts.index'));
    $this->assertDatabaseHas('districts', [
        'id' => $district->id,
        'name' => 'Updated District',
        'region_id' => $district->region_id,
        'status' => 'inactive',
    ]);
});

test('it can delete district', function () {
    // Create a test district that's safe to delete
    $region = \App\Models\Region::where('name', 'Muzaffarabad')->first();
    $district = \App\Models\District::create([
        'name' => 'Deletable Test District',
        'region_id' => $region->id,
        'status' => 'active',
    ]);

    $response = $this->delete(route('districts.destroy', $district));

    $response->assertRedirect(route('districts.index'));
    $this->assertDatabaseMissing('districts', ['id' => $district->id]);
});

test('it validates required fields when creating district', function () {
    $response = $this->post(route('districts.store'), []);

    $response->assertSessionHasErrors(['name', 'region_id', 'status']);
});
