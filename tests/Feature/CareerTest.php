<?php

use App\Models\Career;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

// =============================================================================
// ADMIN CRUD TESTS
// =============================================================================

test('it can view careers index page', function () {
    Career::factory()->count(3)->create();

    $response = $this->get(route('careers.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/Index'));
});

test('it can view create career page', function () {
    $response = $this->get(route('careers.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/Create'));
});

test('it can create career with valid data', function () {
    $file = UploadedFile::fake()->create('career.pdf', 1000, 'application/pdf');

    $response = $this->post(route('careers.store'), [
        'title' => 'Software Engineer',
        'description' => 'We are looking for a talented software engineer.',
        'requirements' => 'Bachelor degree in Computer Science',
        'location' => 'Muzaffarabad',
        'document' => $file,
        'is_active' => true,
        'is_featured' => false,
        'application_deadline' => now()->addDays(30)->format('Y-m-d'),
    ]);

    $response->assertRedirect(route('careers.index'));
    $this->assertDatabaseHas('careers', [
        'title' => 'Software Engineer',
        'location' => 'Muzaffarabad',
        'is_active' => 1,
    ]);
});

test('it can view career details', function () {
    $career = Career::factory()->create();

    $response = $this->get(route('careers.show', $career));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/Show'));
});

test('it can view edit career page', function () {
    $career = Career::factory()->create();

    $response = $this->get(route('careers.edit', $career));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/Edit'));
});

test('it can update career', function () {
    $career = Career::factory()->create();

    $response = $this->put(route('careers.update', $career), [
        'title' => 'Updated Title',
        'description' => 'Updated description',
        'requirements' => 'Updated requirements',
        'location' => 'Updated Location',
        'is_active' => false,
        'is_featured' => true,
        'application_deadline' => now()->addDays(60)->format('Y-m-d'),
    ]);

    $response->assertRedirect(route('careers.index'));
    $this->assertDatabaseHas('careers', [
        'id' => $career->id,
        'title' => 'Updated Title',
        'location' => 'Updated Location',
        'is_active' => 0,
    ]);
});

test('it can delete career', function () {
    $career = Career::factory()->create();

    $response = $this->delete(route('careers.destroy', $career));

    $response->assertRedirect(route('careers.index'));
    $this->assertDatabaseMissing('careers', ['id' => $career->id]);
});

test('it validates required fields when creating career', function () {
    $response = $this->post(route('careers.store'), []);

    $response->assertSessionHasErrors(['title', 'description', 'requirements', 'location']);
});

test('it can filter careers by active status', function () {
    Career::factory()->count(2)->create(['is_active' => true]);
    Career::factory()->count(1)->create(['is_active' => false]);

    $response = $this->get(route('careers.index', ['filter' => ['is_active' => '1']]));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/Index'));
});

test('it can search careers by title', function () {
    Career::factory()->create(['title' => 'Software Engineer']);
    Career::factory()->create(['title' => 'Data Analyst']);
    Career::factory()->create(['title' => 'Marketing Manager']);

    $response = $this->get(route('careers.index', ['filter' => ['title' => 'Engineer']]));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/Index'));
});

// =============================================================================
// PUBLIC ROUTES TESTS
// =============================================================================

test('guests can view public careers page', function () {
    auth()->logout();
    
    Career::factory()->count(3)->create(['is_active' => true]);

    $response = $this->get(route('public-careers'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/PublicCareers'));
});

test('guests can view public career detail page', function () {
    auth()->logout();
    
    $career = Career::factory()->create([
        'is_active' => true,
        'title' => 'Public Career Position',
    ]);

    $response = $this->get(route('public-careers.detail', $career));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('Careers/PublicCareerDetail'));
});

test('public careers page only shows active careers', function () {
    auth()->logout();
    
    Career::factory()->count(2)->create(['is_active' => true]);
    Career::factory()->count(1)->create(['is_active' => false]);

    $response = $this->get(route('public-careers'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page
        ->component('Careers/PublicCareers')
        ->where('careers.data', fn($careers) => count($careers) >= 2) // At least 2 active careers
    );
});

test('it returns 404 for inactive career on public page', function () {
    $career = Career::factory()->create(['is_active' => false]);

    $response = $this->get(route('public-careers.detail', $career));

    $response->assertStatus(404);
});

test('guests cannot access career admin routes', function () {
    auth()->logout();
    
    $career = Career::factory()->create();
    
    $this->get(route('careers.index'))->assertRedirect(route('login'));
    $this->get(route('careers.create'))->assertRedirect(route('login'));
    $this->get(route('careers.show', $career))->assertRedirect(route('login'));
    $this->get(route('careers.edit', $career))->assertRedirect(route('login'));
});

test('career model scopes work correctly', function () {
    Career::factory()->count(2)->create(['is_active' => true, 'is_featured' => false]);
    Career::factory()->count(1)->create(['is_active' => false, 'is_featured' => false]);
    Career::factory()->count(1)->create(['is_featured' => true, 'is_active' => true]);

    $activeCareers = Career::active()->get();
    $featuredCareers = Career::featured()->get();

    expect($activeCareers->count())->toBeGreaterThanOrEqual(3);
    expect($featuredCareers->count())->toBeGreaterThanOrEqual(1);
});

test('career status attribute works correctly', function () {
    $activeCareer = Career::factory()->create(['is_active' => true]);
    $inactiveCareer = Career::factory()->create(['is_active' => false]);

    expect($activeCareer->status)->toBe('open');
    expect($inactiveCareer->status)->toBe('inactive');
});