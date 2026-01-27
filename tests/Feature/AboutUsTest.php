<?php

use App\Models\AboutUs;
use App\Models\User;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
});

test('it can view about us index page', function () {
    AboutUs::factory()->count(3)->create();

    $response = $this->get(route('about-us.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('AboutUs/Index')
            ->has('aboutUsList.data', 3)
    );
});

test('it can view create about us page', function () {
    $response = $this->get(route('about-us.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('AboutUs/Create'));
});

test('it can create about us with valid data', function () {
    $data = [
        'title' => 'About BAJK',
        'content' => 'This is the about us content.',
        'vision' => 'Our vision statement',
        'mission' => 'Our mission statement',
        'is_active' => true,
        'sort_order' => 1,
    ];

    $response = $this->post(route('about-us.store'), $data);

    $response->assertRedirect(route('about-us.index'));
    $response->assertSessionHas('success', 'About Us content created successfully.');

    $this->assertDatabaseHas('about_us', [
        'title' => 'About BAJK',
        'content' => 'This is the about us content.',
        'vision' => 'Our vision statement',
        'mission' => 'Our mission statement',
        'is_active' => true,
        'sort_order' => 1,
    ]);
});

test('it can view about us details', function () {
    $aboutUs = AboutUs::factory()->create();

    $response = $this->get(route('about-us.show', $aboutUs));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('AboutUs/Show')
            ->where('aboutUs.id', $aboutUs->id)
    );
});

test('it can view edit about us page', function () {
    $aboutUs = AboutUs::factory()->create();

    $response = $this->get(route('about-us.edit', $aboutUs));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('AboutUs/Edit')
            ->where('aboutUs.id', $aboutUs->id)
    );
});

test('it can update about us', function () {
    $aboutUs = AboutUs::factory()->create();

    $updateData = [
        'title' => 'Updated About BAJK',
        'content' => 'Updated content.',
        'vision' => 'Updated vision',
        'mission' => 'Updated mission',
        'is_active' => false,
        'sort_order' => 2,
    ];

    $response = $this->put(route('about-us.update', $aboutUs), $updateData);

    $response->assertRedirect(route('about-us.index'));
    $response->assertSessionHas('success', 'About Us content updated successfully.');

    $this->assertDatabaseHas('about_us', [
        'id' => $aboutUs->id,
        'title' => 'Updated About BAJK',
        'content' => 'Updated content.',
        'vision' => 'Updated vision',
        'mission' => 'Updated mission',
        'is_active' => false,
        'sort_order' => 2,
    ]);
});

test('it can delete about us', function () {
    $aboutUs = AboutUs::factory()->create();

    $response = $this->delete(route('about-us.destroy', $aboutUs));

    $response->assertRedirect(route('about-us.index'));
    $response->assertSessionHas('success', 'About Us content deleted successfully.');
    $this->assertDatabaseMissing('about_us', ['id' => $aboutUs->id]);
});

test('it can filter about us by status', function () {
    AboutUs::factory()->create(['is_active' => true]);
    AboutUs::factory()->create(['is_active' => false]);

    $response = $this->get(route('about-us.index', ['filter[is_active]' => '1']));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->has('aboutUsList.data', 1)
            ->where('aboutUsList.data.0.is_active', true)
    );
});

test('it can search about us by title', function () {
    AboutUs::factory()->create(['title' => 'About BAJK Bank']);
    AboutUs::factory()->create(['title' => 'Company History']);

    $response = $this->get(route('about-us.index', ['filter[title]' => 'BAJK']));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->has('aboutUsList.data', 1)
            ->where('aboutUsList.data.0.title', 'About BAJK Bank')
    );
});

test('it can view public about us page', function () {
    $aboutUs = AboutUs::factory()->create(['is_active' => true]);

    $response = $this->get(route('about.about-us'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('About/AboutUs')
            ->where('aboutUs.id', $aboutUs->id)
    );
});

test('public about us page shows only active content', function () {
    AboutUs::factory()->create(['is_active' => false, 'sort_order' => 1]);
    $activeAboutUs = AboutUs::factory()->create(['is_active' => true, 'sort_order' => 2]);

    $response = $this->get(route('about.about-us'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('About/AboutUs')
            ->where('aboutUs.id', $activeAboutUs->id)
    );
});

test('it validates required fields when creating about us', function () {
    $response = $this->post(route('about-us.store'), []);

    $response->assertSessionHasErrors(['title', 'content']);
});

test('it validates required fields when updating about us', function () {
    $aboutUs = AboutUs::factory()->create();

    $response = $this->put(route('about-us.update', $aboutUs), [
        'title' => '',
        'content' => '',
    ]);

    $response->assertSessionHasErrors(['title', 'content']);
});

test('seeded about us content exists and is accessible', function () {
    $this->artisan('db:seed', ['--class' => 'AboutUsSeeder']);

    $aboutUs = AboutUs::where('title', 'About BAJK')->first();

    expect($aboutUs)->not->toBeNull();
    expect($aboutUs->is_active)->toBeTrue();
    expect($aboutUs->vision)->toContain('premier financial institution');

    $response = $this->get(route('about.about-us'));
    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) => $page
            ->component('About/AboutUs')
            ->where('aboutUs.title', 'About BAJK')
    );
});

test('guests cannot access about us admin routes', function () {
    auth()->logout();

    $aboutUs = AboutUs::factory()->create();

    $this->get(route('about-us.index'))->assertRedirect(route('login'));
    $this->get(route('about-us.create'))->assertRedirect(route('login'));
    $this->post(route('about-us.store'))->assertRedirect(route('login'));
    $this->get(route('about-us.show', $aboutUs))->assertRedirect(route('login'));
    $this->get(route('about-us.edit', $aboutUs))->assertRedirect(route('login'));
    $this->put(route('about-us.update', $aboutUs))->assertRedirect(route('login'));
    $this->delete(route('about-us.destroy', $aboutUs))->assertRedirect(route('login'));
});

test('guests can access public about us page', function () {
    auth()->logout();

    AboutUs::factory()->create(['is_active' => true]);

    $response = $this->get(route('about.about-us'));

    $response->assertStatus(200);
});
