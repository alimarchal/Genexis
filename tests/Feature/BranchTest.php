<?php

use App\Models\Branch;
use App\Models\District;
use App\Models\User;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);

    // Seed the required data for branch tests
    $this->seed([
        \Database\Seeders\DivisionSeeder::class,
        \Database\Seeders\RegionSeeder::class,
        \Database\Seeders\DistrictSeeder::class,
        \Database\Seeders\BranchSeeder::class,
    ]);
});

test('it can view branches index page', function () {
    $response = $this->get(route('branches.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Branch/Index'));
});

test('it can view create branch page', function () {
    $response = $this->get(route('branches.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Branch/Create'));
});

test('it can create branch with valid data', function () {
    $district = \App\Models\District::where('name', 'Muzaffarabad')->first();

    $response = $this->post(route('branches.store'), [
        'name' => 'Test Branch',
        'code' => 'TB001',
        'address' => 'Test Address',
        'type' => 'sub_branch',
        'region_id' => $district->region_id,
        'district_id' => $district->id,
        'status' => 'active',
        'facilities' => json_encode(['ATM', 'Parking']),
        'operating_hours' => json_encode([
            'monday' => ['open' => '09:00', 'close' => '17:00']
        ]),
        'holidays' => json_encode(['Eid']),
    ]);

    $response->assertRedirect(route('branches.index'));
    $this->assertDatabaseHas('branches', [
        'name' => 'Test Branch',
        'code' => 'TB001',
        'address' => 'Test Address',
        'type' => 'sub_branch',
        'region_id' => $district->region_id,
        'district_id' => $district->id,
        'status' => 'active',
    ]);
});

test('it can view branch details', function () {
    $branch = \App\Models\Branch::where('code', '0001')->first();

    $response = $this->get(route('branches.show', $branch));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Branch/Show'));
});

test('it can view edit branch page', function () {
    $branch = \App\Models\Branch::where('code', '0001')->first();

    $response = $this->get(route('branches.edit', $branch));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Branch/Edit'));
});

test('it can update branch', function () {
    $branch = \App\Models\Branch::where('code', '0001')->first();

    $response = $this->put(route('branches.update', $branch), [
        'name' => 'Updated Branch',
        'code' => 'UB001',
        'address' => 'Updated Address',
        'type' => 'sub_branch',
        'region_id' => $branch->region_id,
        'district_id' => $branch->district_id,
        'status' => 'inactive',
        'facilities' => json_encode(['ATM']),
        'operating_hours' => json_encode([
            'monday' => ['open' => '09:00', 'close' => '17:00']
        ]),
        'holidays' => json_encode(['Eid']),
    ]);

    $response->assertRedirect(route('branches.index'));
    $this->assertDatabaseHas('branches', [
        'id' => $branch->id,
        'name' => 'Updated Branch',
        'code' => 'UB001',
        'address' => 'Updated Address',
        'type' => 'sub_branch',
        'status' => 'inactive',
    ]);
});

test('it can delete branch', function () {
    // Create a test branch that's safe to delete
    $district = \App\Models\District::where('name', 'Muzaffarabad')->first();
    $branch = \App\Models\Branch::create([
        'name' => 'Deletable Test Branch',
        'code' => 'DTB001',
        'address' => 'Test Address',
        'type' => 'sub_branch',
        'region_id' => $district->region_id,
        'district_id' => $district->id,
        'status' => 'active',
        'facilities' => json_encode(['ATM']),
        'operating_hours' => json_encode([
            'monday' => ['open' => '09:00', 'close' => '17:00']
        ]),
        'holidays' => json_encode(['Eid']),
    ]);

    $response = $this->delete(route('branches.destroy', $branch));

    $response->assertRedirect(route('branches.index'));
    $this->assertDatabaseMissing('branches', ['id' => $branch->id]);
});

test('it validates required fields when creating branch', function () {
    $response = $this->post(route('branches.store'), []);

    $response->assertSessionHasErrors(['region_id', 'district_id', 'code', 'type', 'name', 'address', 'status']);
});
