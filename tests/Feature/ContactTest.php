<?php

use App\Models\Contact;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    // Seed the required data for contact tests
    $this->seed([
        \Database\Seeders\DivisionSeeder::class,
        \Database\Seeders\RegionSeeder::class,
        \Database\Seeders\DistrictSeeder::class,
        \Database\Seeders\BranchSeeder::class,
        \Database\Seeders\ContactSeeder::class,
    ]);
});

test('it can view contacts index page', function () {
    $response = $this->get(route('contacts.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('ContactManagement/Index'));
});

test('it can view create contact page', function () {
    $response = $this->get(route('contacts.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('ContactManagement/Create'));
});

test('it can create contact with valid data', function () {
    $branch = \App\Models\Branch::where('code', '0001')->first();

    $response = $this->post(route('contacts.store'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '123-456-7890',
        'position' => 'Manager',
        'department' => 'Customer Service',
        'branch_id' => $branch->id,
        'status' => 'active',
    ]);

    $response->assertRedirect(route('contacts.index'));
    $this->assertDatabaseHas('contacts', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '123-456-7890',
        'position' => 'Manager',
        'department' => 'Customer Service',
        'branch_id' => $branch->id,
        'status' => 'active',
    ]);
});

test('it can view contact details', function () {
    $contact = \App\Models\Contact::first();

    $response = $this->get(route('contacts.show', $contact));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('ContactManagement/Show'));
});

test('it can view edit contact page', function () {
    $contact = \App\Models\Contact::first();

    $response = $this->get(route('contacts.edit', $contact));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('ContactManagement/Edit'));
});

test('it can update contact', function () {
    $contact = \App\Models\Contact::first();

    $response = $this->put(route('contacts.update', $contact), [
        'name' => 'Jane Smith',
        'email' => 'jane@example.com',
        'phone' => '987-654-3210',
        'position' => 'Senior Manager',
        'department' => 'Operations',
        'branch_id' => $contact->branch_id,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('contacts.index'));
    $this->assertDatabaseHas('contacts', [
        'id' => $contact->id,
        'name' => 'Jane Smith',
        'email' => 'jane@example.com',
        'phone' => '987-654-3210',
        'position' => 'Senior Manager',
        'department' => 'Operations',
        'status' => 'inactive',
    ]);
});

test('it can delete contact', function () {
    // Create a test contact that's safe to delete
    $branch = \App\Models\Branch::where('code', '0001')->first();
    $contact = \App\Models\Contact::create([
        'name' => 'Deletable Contact',
        'email' => 'delete@example.com',
        'phone' => '111-222-3333',
        'position' => 'Test Position',
        'department' => 'Test Department',
        'branch_id' => $branch->id,
        'status' => 'active',
    ]);

    $response = $this->delete(route('contacts.destroy', $contact));

    $response->assertRedirect(route('contacts.index'));
    $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
});

test('it validates required fields when creating contact', function () {
    $response = $this->post(route('contacts.store'), []);

    $response->assertSessionHasErrors(['name', 'email', 'branch_id', 'status']);
});
