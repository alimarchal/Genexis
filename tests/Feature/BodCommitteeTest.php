<?php

use App\Models\BodCommittee;
use App\Models\BoardOfDirector;
use App\Models\Management;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('it can view bod committees index page', function () {
    BodCommittee::factory()->count(3)->create();

    $response = $this->get(route('bod-committees.index'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('BodCommittees/Index')
                ->has('bodCommittees.data', 3)
        );
});

test('it can view create bod committee page', function () {
    $response = $this->get(route('bod-committees.create'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('BodCommittees/Create')
                ->has('boardMembers')
                ->has('managementMembers')
        );
});

test('it can create bod committee with valid data', function () {
    $boardMember = BoardOfDirector::factory()->create(['is_active' => true]);
    $managementMember = Management::factory()->create(['status' => 'active']);

    $data = [
        'name' => 'Test Committee',
        'description' => 'Test committee description',
        'chairman_board_id' => $boardMember->id,
        'secretary_management_id' => $managementMember->id,
        'board_members' => [$boardMember->id],
        'management_members' => [$managementMember->id],
        'is_active' => true,
        'sort_order' => 1,
    ];

    $response = $this->post(route('bod-committees.store'), $data);

    $response->assertRedirect(route('bod-committees.index'));

    $this->assertDatabaseHas('bod_committees', [
        'name' => 'Test Committee',
        'description' => 'Test committee description',
        'chairman_board_id' => $boardMember->id,
        'secretary_management_id' => $managementMember->id,
        'is_active' => true,
        'sort_order' => 1,
    ]);
});

test('it can view bod committee details', function () {
    $committee = BodCommittee::factory()->create();

    $response = $this->get(route('bod-committees.show', $committee));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('BodCommittees/Show')
                ->where('bodCommittee.id', $committee->id)
        );
});

test('it can view edit bod committee page', function () {
    $committee = BodCommittee::factory()->create();

    $response = $this->get(route('bod-committees.edit', $committee));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('BodCommittees/Edit')
                ->where('bodCommittee.id', $committee->id)
                ->has('boardMembers')
                ->has('managementMembers')
        );
});

test('it can update bod committee', function () {
    $committee = BodCommittee::factory()->create();
    $boardMember = BoardOfDirector::factory()->create(['is_active' => true]);

    $data = [
        'name' => 'Updated Committee Name',
        'description' => $committee->description,
        'chairman_board_id' => $boardMember->id,
        'secretary_board_id' => null,
        'secretary_management_id' => null,
        'board_members' => [$boardMember->id],
        'management_members' => [],
        'is_active' => $committee->is_active,
        'sort_order' => $committee->sort_order,
    ];

    $response = $this->put(route('bod-committees.update', $committee), $data);

    $response->assertRedirect(route('bod-committees.index'));

    $this->assertDatabaseHas('bod_committees', [
        'id' => $committee->id,
        'name' => 'Updated Committee Name',
        'chairman_board_id' => $boardMember->id,
    ]);
});

test('it can delete bod committee', function () {
    $committee = BodCommittee::factory()->create();

    $response = $this->delete(route('bod-committees.destroy', $committee));

    $response->assertRedirect(route('bod-committees.index'));

    $this->assertDatabaseMissing('bod_committees', [
        'id' => $committee->id,
    ]);
});

test('it can filter bod committees by status', function () {
    BodCommittee::factory()->create(['is_active' => true]);
    BodCommittee::factory()->create(['is_active' => false]);

    $response = $this->get(route('bod-committees.index', ['filter' => ['is_active' => '1']]));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->has('bodCommittees.data', 1)
                ->where('bodCommittees.data.0.is_active', true)
        );
});

test('it can search bod committees by name', function () {
    BodCommittee::factory()->create(['name' => 'Unique Committee Name']);
    BodCommittee::factory()->create(['name' => 'Different Committee']);

    $response = $this->get(route('bod-committees.index', ['filter' => ['name' => 'Unique']]));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->has('bodCommittees.data', 1)
                ->where('bodCommittees.data.0.name', 'Unique Committee Name')
        );
});

test('it can view public bod committees page', function () {
    // Create committee with relations
    $boardMember = BoardOfDirector::factory()->create(['is_active' => true]);
    $managementMember = Management::factory()->create(['status' => 'active']);

    $committee = BodCommittee::factory()->create([
        'is_active' => true,
        'chairman_board_id' => $boardMember->id,
        'secretary_management_id' => $managementMember->id,
        'board_members' => [$boardMember->id],
        'management_members' => [$managementMember->id],
    ]);

    $response = $this->get(route('about.bod-committees'));

    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('About/BodCommittees')
                ->has('committees', 1)
                ->where('committees.0.name', $committee->name)
        );
});

test('it validates required fields when creating bod committee', function () {
    $response = $this->post(route('bod-committees.store'), []);

    $response->assertSessionHasErrors(['name']);
});

test('it validates foreign key constraints', function () {
    $data = [
        'name' => 'Test Committee',
        'chairman_board_id' => 99999, // Non-existent ID
        'is_active' => true,
    ];

    $response = $this->post(route('bod-committees.store'), $data);

    $response->assertSessionHasErrors(['chairman_board_id']);
});

test('seeded committees exist and are accessible', function () {
    // Run seeders
    $this->seed(\Database\Seeders\BoardOfDirectorSeeder::class);
    $this->seed(\Database\Seeders\ManagementSeeder::class);
    $this->seed(\Database\Seeders\BodCommitteeSeeder::class);

    // Check that committees were seeded
    $committees = BodCommittee::all();
    expect($committees->count())->toBeGreaterThan(0);

    // Check public page can load seeded data
    $response = $this->get(route('about.bod-committees'));
    $response->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('About/BodCommittees')
                ->has('committees')
        );
});
