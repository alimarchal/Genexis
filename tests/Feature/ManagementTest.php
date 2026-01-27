<?php

use App\Models\Management;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view managements index page', function () {
    Management::factory()->count(3)->create();

    $response = $this->get(route('managements.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Management/Index'));
});

test('it can view create management page', function () {
    $response = $this->get(route('managements.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Management/Create'));
});

test('it can create management with valid data', function () {
    $file = UploadedFile::fake()->image('management.jpg', 400, 400);

    $response = $this->post(route('managements.store'), [
        'full_name' => 'John Doe',
        'designation' => 'Chief Executive Officer',
        'description' => 'Test biography',
        'attachment' => $file,
        'order' => 1,
        'status' => 'active',
    ]);

    $response->assertRedirect(route('managements.index'));
    $this->assertDatabaseHas('managements', [
        'full_name' => 'John Doe',
        'designation' => 'Chief Executive Officer',
        'description' => 'Test biography',
        'status' => 'active',
    ]);
});

test('it cannot create management with invalid file type', function () {
    $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

    $response = $this->post(route('managements.store'), [
        'full_name' => 'John Doe',
        'designation' => 'Chief Executive Officer',
        'description' => 'Test biography',
        'attachment' => $file,
        'order' => 1,
        'status' => 'active',
    ]);

    $response->assertSessionHasErrors('attachment');
});

test('it can view management details', function () {
    $management = Management::factory()->create();

    $response = $this->get(route('managements.show', $management));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Management/Show'));
});

test('it can view edit management page', function () {
    $management = Management::factory()->create();

    $response = $this->get(route('managements.edit', $management));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Management/Edit'));
});

test('it can update management', function () {
    $management = Management::factory()->create();

    $response = $this->put(route('managements.update', $management), [
        'full_name' => 'Jane Smith',
        'designation' => 'Chief Financial Officer',
        'description' => 'Updated biography',
        'order' => 2,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('managements.index'));
    $this->assertDatabaseHas('managements', [
        'id' => $management->id,
        'full_name' => 'Jane Smith',
        'designation' => 'Chief Financial Officer',
        'description' => 'Updated biography',
        'status' => 'inactive',
    ]);
});

test('it can delete management', function () {
    $management = Management::factory()->create();

    $response = $this->delete(route('managements.destroy', $management));

    $response->assertRedirect(route('managements.index'));
    $this->assertDatabaseMissing('managements', ['id' => $management->id]);
});

test('it validates required fields when creating management', function () {
    $response = $this->post(route('managements.store'), []);

    $response->assertSessionHasErrors(['full_name', 'designation', 'status']);
});
