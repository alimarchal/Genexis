<?php

use App\Models\Carousel;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view carousels index page', function () {
    Carousel::factory()->count(3)->create();

    $response = $this->get(route('carousels.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Carousel/Index'));
});

test('it can view create carousel page', function () {
    $response = $this->get(route('carousels.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Carousel/Create'));
});

test('it can create carousel with valid data', function () {
    $file = UploadedFile::fake()->image('carousel.jpg', 1920, 1080);

    $response = $this->post(route('carousels.store'), [
        'title' => 'Test Carousel',
        'description' => 'Test Description',
        'image' => $file,
        'button_text' => 'Learn More',
        'button_url' => '/test',
        'order' => 1,
        'status' => 'active',
    ]);

    $response->assertRedirect(route('carousels.index'));
    $this->assertDatabaseHas('carousels', [
        'title' => 'Test Carousel',
        'description' => 'Test Description',
        'status' => 'active',
    ]);
});

test('it cannot create carousel with invalid file type', function () {
    $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

    $response = $this->post(route('carousels.store'), [
        'title' => 'Test Carousel',
        'description' => 'Test Description',
        'image' => $file,
        'button_text' => 'Learn More',
        'button_url' => '/test',
        'order' => 1,
        'status' => 'active',
    ]);

    $response->assertSessionHasErrors('image');
});

test('it cannot create carousel with file too large', function () {
    $file = UploadedFile::fake()->create('large-image.jpg', 350000, 'image/jpeg'); // 350MB

    $response = $this->post(route('carousels.store'), [
        'title' => 'Test Carousel',
        'description' => 'Test Description',
        'image' => $file,
        'button_text' => 'Learn More',
        'button_url' => '/test',
        'order' => 1,
        'status' => 'active',
    ]);

    $response->assertSessionHasErrors('image');
});

test('it can view carousel details', function () {
    $carousel = Carousel::factory()->create();

    $response = $this->get(route('carousels.show', $carousel));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Carousel/Show'));
});

test('it can view edit carousel page', function () {
    $carousel = Carousel::factory()->create();

    $response = $this->get(route('carousels.edit', $carousel));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Carousel/Edit'));
});

test('it can update carousel', function () {
    $carousel = Carousel::factory()->create();

    $response = $this->put(route('carousels.update', $carousel), [
        'title' => 'Updated Carousel',
        'description' => 'Updated Description',
        'button_text' => 'Click Here',
        'button_url' => '/updated',
        'order' => 2,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('carousels.index'));
    $this->assertDatabaseHas('carousels', [
        'id' => $carousel->id,
        'title' => 'Updated Carousel',
        'description' => 'Updated Description',
        'status' => 'inactive',
    ]);
});

test('it can update carousel with new image', function () {
    $carousel = Carousel::factory()->create();
    $file = UploadedFile::fake()->image('new-carousel.jpg', 1920, 1080);

    $response = $this->put(route('carousels.update', $carousel), [
        'title' => $carousel->title,
        'description' => $carousel->description,
        'image' => $file,
        'button_text' => $carousel->button_text,
        'button_url' => $carousel->button_url,
        'order' => $carousel->order,
        'status' => $carousel->status,
    ]);

    $response->assertRedirect(route('carousels.index'));
});

test('it can delete carousel', function () {
    $carousel = Carousel::factory()->create();

    $response = $this->delete(route('carousels.destroy', $carousel));

    $response->assertRedirect(route('carousels.index'));
    $this->assertDatabaseMissing('carousels', ['id' => $carousel->id]);
});

test('it validates required fields when creating carousel', function () {
    $response = $this->post(route('carousels.store'), []);

    $response->assertSessionHasErrors(['title', 'image', 'status']);
});
