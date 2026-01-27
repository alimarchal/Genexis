<?php

use App\Models\NewsAnnouncement;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view news announcements index page', function () {
    NewsAnnouncement::factory()->count(3)->create();

    $response = $this->get(route('news-announcements.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('NewsAnnouncement/Index'));
});

test('it can view create news announcement page', function () {
    $response = $this->get(route('news-announcements.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('NewsAnnouncement/Create'));
});

test('it can create news announcement with valid data', function () {
    $file = UploadedFile::fake()->image('news.jpg', 800, 600);

    $response = $this->post(route('news-announcements.store'), [
        'title' => 'Test News',
        'slug' => 'test-news',
        'content' => 'Test content',
        'image' => $file,
        'published_date' => now()->format('Y-m-d'),
        'is_featured' => true,
        'category' => 'general',
        'is_published' => true,
    ]);

    $response->assertRedirect(route('news-announcements.index'));
    $this->assertDatabaseHas('news_announcements', [
        'title' => 'Test News',
        'slug' => 'test-news',
        'is_featured' => true,
        'category' => 'general',
        'is_published' => true,
    ]);
});

test('it cannot create news announcement with invalid file type', function () {
    $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');

    $response = $this->post(route('news-announcements.store'), [
        'title' => 'Test News',
        'slug' => 'test-news',
        'content' => 'Test content',
        'image' => $file,
        'published_date' => now()->format('Y-m-d'),
        'is_featured' => true,
        'category' => 'general',
        'is_published' => true,
    ]);

    $response->assertSessionHasErrors('image');
});

test('it cannot create news announcement with file too large', function () {
    $file = UploadedFile::fake()->create('large-image.jpg', 350000, 'image/jpeg'); // 350MB

    $response = $this->post(route('news-announcements.store'), [
        'title' => 'Test News',
        'slug' => 'test-news',
        'content' => 'Test content',
        'image' => $file,
        'published_date' => now()->format('Y-m-d'),
        'is_featured' => true,
        'category' => 'general',
        'is_published' => true,
    ]);

    $response->assertSessionHasErrors('image');
});

test('it can view news announcement details', function () {
    $news = NewsAnnouncement::factory()->create();

    $response = $this->get(route('news-announcements.show', $news));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('NewsAnnouncement/Show'));
});

test('it can view edit news announcement page', function () {
    $news = NewsAnnouncement::factory()->create();

    $response = $this->get(route('news-announcements.edit', $news));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('NewsAnnouncement/Edit'));
});

test('it can update news announcement', function () {
    $news = NewsAnnouncement::factory()->create();

    $response = $this->put(route('news-announcements.update', $news), [
        'title' => 'Updated News',
        'slug' => 'updated-news',
        'content' => 'Updated content',
        'published_date' => now()->format('Y-m-d'),
        'is_featured' => false,
        'category' => 'announcements',
        'is_published' => false,
    ]);

    $response->assertRedirect(route('news-announcements.index'));
    $this->assertDatabaseHas('news_announcements', [
        'id' => $news->id,
        'title' => 'Updated News',
        'slug' => 'updated-news',
        'is_featured' => false,
        'category' => 'announcements',
        'is_published' => false,
    ]);
});

test('it can delete news announcement', function () {
    $news = NewsAnnouncement::factory()->create();

    $response = $this->delete(route('news-announcements.destroy', $news));

    $response->assertRedirect(route('news-announcements.index'));
    $this->assertDatabaseMissing('news_announcements', ['id' => $news->id]);
});

test('it validates required fields when creating news announcement', function () {
    $response = $this->post(route('news-announcements.store'), []);

    $response->assertSessionHasErrors(['title', 'content', 'published_date', 'category']);
});
