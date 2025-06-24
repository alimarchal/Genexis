<?php

use App\Models\Managment;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view managements index page', function () {
    Managment::factory()->count(3)->create();

    $response = $this->get(route('managments.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Managment/Index'));
});

test('it can view create management page', function () {
    $response = $this->get(route('managments.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Managment/Create'));
});

test('it can create management with valid data', function () {
    $file = UploadedFile::fake()->image('management.jpg', 400, 400);

    $response = $this->post(route('managments.store'), [
        'full_name' => 'John Doe',
        'designation' => 'Chief Executive Officer',
        'description' => 'Test biography',
        'attachment' => $file,
        'order' => 1,
        'status' => 'active',
    ]);

    $response->assertRedirect(route('managments.index'));
    $this->assertDatabaseHas('managments', [
        'full_name' => 'John Doe',
        'designation' => 'Chief Executive Officer',
        'description' => 'Test biography',
        'status' => 'active',
    ]);
});

test('it cannot create management with invalid file type', function () {
    $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

    $response = $this->post(route('managments.store'), [
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
    $management = Managment::factory()->create();

    $response = $this->get(route('managments.show', $management));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Managment/Show'));
});

test('it can view edit management page', function () {
    $management = Managment::factory()->create();

    $response = $this->get(route('managments.edit', $management));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Managment/Edit'));
});

test('it can update management', function () {
    $management = Managment::factory()->create();

    $response = $this->put(route('managments.update', $management), [
        'full_name' => 'Jane Smith',
        'designation' => 'Chief Financial Officer',
        'description' => 'Updated biography',
        'order' => 2,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('managments.index'));
    $this->assertDatabaseHas('managments', [
        'id' => $management->id,
        'full_name' => 'Jane Smith',
        'designation' => 'Chief Financial Officer',
        'description' => 'Updated biography',
        'status' => 'inactive',
    ]);
});

test('it can delete management', function () {
    $management = Managment::factory()->create();

    $response = $this->delete(route('managments.destroy', $management));

    $response->assertRedirect(route('managments.index'));
    $this->assertDatabaseMissing('managments', ['id' => $management->id]);
});

test('it validates required fields when creating management', function () {
    $response = $this->post(route('managments.store'), []);

    $response->assertSessionHasErrors(['full_name', 'designation', 'status']);
});
