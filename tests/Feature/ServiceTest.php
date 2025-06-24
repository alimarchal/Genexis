<?php

use App\Models\Service;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view services index page', function () {
    // Create services directly without seeding to avoid conflicts
    Service::factory()->count(3)->create();

    $response = $this->get(route('services.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Services/Index'));
});

test('it can view create service page', function () {
    $response = $this->get(route('services.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Services/Create'));
});

test('it can create service with valid data', function () {
    $file = UploadedFile::fake()->image('service.jpg', 800, 600);

    $response = $this->post(route('services.store'), [
        'name' => 'Test Service',
        'slug' => 'test-service',
        'description' => 'Test Description',
        'image' => $file,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $response->assertRedirect(route('services.index'));
    $this->assertDatabaseHas('services', [
        'name' => 'Test Service',
        'slug' => 'test-service',
        'description' => 'Test Description',
        'is_active' => 1,
    ]);
});

test('it cannot create service with invalid file type', function () {
    $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

    $response = $this->post(route('services.store'), [
        'name' => 'Test Service',
        'slug' => 'test-service',
        'description' => 'Test Description',
        'image' => $file,
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $response->assertSessionHasErrors('image');
});

test('it can view service details', function () {
    $service = Service::factory()->create();

    $response = $this->get(route('services.show', $service));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Services/Show'));
});

test('it can view edit service page', function () {
    $service = Service::factory()->create();

    $response = $this->get(route('services.edit', $service));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Services/Edit'));
});

test('it can update service', function () {
    $service = Service::factory()->create();

    $response = $this->put(route('services.update', $service), [
        'name' => 'Updated Service',
        'slug' => 'updated-service',
        'description' => 'Updated Description',
        'is_active' => false,
        'sort_order' => 2,
    ]);

    $response->assertRedirect(route('services.index'));
    $this->assertDatabaseHas('services', [
        'id' => $service->id,
        'name' => 'Updated Service',
        'slug' => 'updated-service',
        'description' => 'Updated Description',
        'is_active' => 0,
    ]);
});

test('it can delete service', function () {
    $service = Service::factory()->create();

    $response = $this->delete(route('services.destroy', $service));

    $response->assertRedirect(route('services.index'));
    $this->assertDatabaseMissing('services', ['id' => $service->id]);
});

test('it validates required fields when creating service', function () {
    $response = $this->post(route('services.store'), []);

    $response->assertSessionHasErrors(['name', 'description']);
});

test('it can view public services page', function () {
    Service::factory()->count(3)->create(['is_active' => true]);

    $response = $this->get(route('service-pages.all'));

    $response->assertStatus(200);
});

test('it can view public service detail page', function () {
    $service = Service::factory()->create(['is_active' => true]);

    $response = $this->get(route('service-pages.show', $service->slug));

    $response->assertStatus(200);
});
