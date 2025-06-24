<?php

use App\Models\BoardOfDirector;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view board of directors index page', function () {
    BoardOfDirector::factory()->count(3)->create();

    $response = $this->get(route('board-of-directors.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BoardOfDirector/Index'));
});

test('it can view create board of director page', function () {
    $response = $this->get(route('board-of-directors.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BoardOfDirector/Create'));
});

test('it can create board of director with valid data', function () {
    $file = UploadedFile::fake()->image('director.jpg', 400, 400);

    $response = $this->post(route('board-of-directors.store'), [
        'full_name' => 'John Doe',
        'designation' => 'Chairman',
        'short_description' => 'Test biography',
        'image' => $file,
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $response->assertRedirect(route('board-of-directors.index'));
    $this->assertDatabaseHas('board_of_directors', [
        'full_name' => 'John Doe',
        'designation' => 'Chairman',
        'short_description' => 'Test biography',
        'is_active' => true,
    ]);
});

test('it cannot create board of director with invalid file type', function () {
    $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

    $response = $this->post(route('board-of-directors.store'), [
        'full_name' => 'John Doe',
        'designation' => 'Chairman',
        'short_description' => 'Test biography',
        'image' => $file,
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors('image');
});

test('it can view board of director details', function () {
    $director = BoardOfDirector::factory()->create();

    $response = $this->get(route('board-of-directors.show', $director));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BoardOfDirector/Show'));
});

test('it can view edit board of director page', function () {
    $director = BoardOfDirector::factory()->create();

    $response = $this->get(route('board-of-directors.edit', $director));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BoardOfDirector/Edit'));
});

test('it can update board of director', function () {
    $director = BoardOfDirector::factory()->create();

    $response = $this->put(route('board-of-directors.update', $director), [
        'full_name' => 'Jane Smith',
        'designation' => 'Vice Chairman',
        'short_description' => 'Updated biography',
        'sort_order' => 2,
        'is_active' => false,
    ]);

    $response->assertRedirect(route('board-of-directors.index'));
    $this->assertDatabaseHas('board_of_directors', [
        'id' => $director->id,
        'full_name' => 'Jane Smith',
        'designation' => 'Vice Chairman',
        'short_description' => 'Updated biography',
        'is_active' => false,
    ]);
});

test('it can delete board of director', function () {
    $director = BoardOfDirector::factory()->create();

    $response = $this->delete(route('board-of-directors.destroy', $director));

    $response->assertRedirect(route('board-of-directors.index'));
    $this->assertDatabaseMissing('board_of_directors', ['id' => $director->id]);
});

test('it validates required fields when creating board of director', function () {
    $response = $this->post(route('board-of-directors.store'), []);

    $response->assertSessionHasErrors(['full_name', 'designation']);
});
