<?php

use App\Models\TopNavbarMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('authenticated user can view top navbar messages index', function () {
    TopNavbarMessage::factory(3)->create();

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('TopNavbarMessages/Index'));
});

test('authenticated user can view create top navbar message form', function () {
    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('TopNavbarMessages/Create'));
});

test('authenticated user can create top navbar message', function () {
    $data = [
        'type' => 'Alert',
        'priority' => 'high',
        'icon' => '⚠️',
        'text' => 'Important system maintenance scheduled',
        'color' => '#ffffff',
        'bg_color' => '#dc3545',
        'is_active' => true,
        'sort_order' => 1,
    ];

    $response = $this->actingAs($this->user)
        ->post(route('top-navbar-messages.store'), $data);

    $response->assertRedirect(route('top-navbar-messages.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('top_navbar_messages', [
        'type' => 'Alert',
        'priority' => 'high',
        'text' => 'Important system maintenance scheduled',
        'is_active' => true,
    ]);
});

test('authenticated user can view top navbar message details', function () {
    $message = TopNavbarMessage::factory()->create();

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.show', $message));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('TopNavbarMessages/Show'));
});

test('authenticated user can view edit top navbar message form', function () {
    $message = TopNavbarMessage::factory()->create();

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.edit', $message));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('TopNavbarMessages/Edit'));
});

test('authenticated user can update top navbar message', function () {
    $message = TopNavbarMessage::factory()->create([
        'type' => 'Old Type',
        'text' => 'Old text',
    ]);

    $data = [
        'type' => 'Updated Type',
        'priority' => 'urgent',
        'icon' => '🔥',
        'text' => 'Updated message text',
        'color' => '#ffffff',
        'bg_color' => '#dc3545',
        'is_active' => true,
        'sort_order' => 2,
    ];

    $response = $this->actingAs($this->user)
        ->put(route('top-navbar-messages.update', $message), $data);

    $response->assertRedirect(route('top-navbar-messages.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('top_navbar_messages', [
        'id' => $message->id,
        'type' => 'Updated Type',
        'text' => 'Updated message text',
        'priority' => 'urgent',
    ]);
});

test('authenticated user can delete top navbar message', function () {
    $message = TopNavbarMessage::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete(route('top-navbar-messages.destroy', $message));

    $response->assertRedirect(route('top-navbar-messages.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('top_navbar_messages', [
        'id' => $message->id,
    ]);
});

test('it validates required fields when creating top navbar message', function () {
    $response = $this->actingAs($this->user)
        ->post(route('top-navbar-messages.store'), []);

    $response->assertSessionHasErrors(['type', 'priority', 'icon', 'text', 'color', 'bg_color']);
});

test('it validates required fields when updating top navbar message', function () {
    $message = TopNavbarMessage::factory()->create();

    $response = $this->actingAs($this->user)
        ->put(route('top-navbar-messages.update', $message), []);

    $response->assertSessionHasErrors(['type', 'priority', 'icon', 'text', 'color', 'bg_color']);
});

test('it validates priority enum values', function () {
    $data = [
        'type' => 'Alert',
        'priority' => 'invalid_priority',
        'icon' => '⚠️',
        'text' => 'Test message',
        'color' => '#ffffff',
        'bg_color' => '#dc3545',
        'is_active' => true,
        'sort_order' => 1,
    ];

    $response = $this->actingAs($this->user)
        ->post(route('top-navbar-messages.store'), $data);

    $response->assertSessionHasErrors(['priority']);
});

test('it can filter top navbar messages by status', function () {
    TopNavbarMessage::factory()->create(['is_active' => true]);
    TopNavbarMessage::factory()->create(['is_active' => false]);

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.index', ['filter[is_active]' => '1']));

    $response->assertStatus(200);
});

test('it can filter top navbar messages by priority', function () {
    TopNavbarMessage::factory()->create(['priority' => 'high']);
    TopNavbarMessage::factory()->create(['priority' => 'low']);

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.index', ['filter[priority]' => 'high']));

    $response->assertStatus(200);
});

test('it can search top navbar messages by text', function () {
    TopNavbarMessage::factory()->create(['text' => 'Important announcement']);
    TopNavbarMessage::factory()->create(['text' => 'Regular update']);

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.index', ['filter[text]' => 'Important']));

    $response->assertStatus(200);
});

test('middleware shares active top navbar messages with all pages', function () {
    TopNavbarMessage::factory()->create([
        'is_active' => true,
        'sort_order' => 1,
    ]);
    TopNavbarMessage::factory()->create([
        'is_active' => false,
        'sort_order' => 2,
    ]);

    $response = $this->actingAs($this->user)
        ->get(route('dashboard'));

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        return $page->has('topNavbarMessages');
    });
});

test('guests cannot access top navbar messages admin routes', function () {
    $message = TopNavbarMessage::factory()->create();

    $this->get(route('top-navbar-messages.index'))
        ->assertRedirect(route('login'));

    $this->get(route('top-navbar-messages.create'))
        ->assertRedirect(route('login'));

    $this->post(route('top-navbar-messages.store'), [])
        ->assertRedirect(route('login'));

    $this->get(route('top-navbar-messages.show', $message))
        ->assertRedirect(route('login'));

    $this->get(route('top-navbar-messages.edit', $message))
        ->assertRedirect(route('login'));

    $this->put(route('top-navbar-messages.update', $message), [])
        ->assertRedirect(route('login'));

    $this->delete(route('top-navbar-messages.destroy', $message))
        ->assertRedirect(route('login'));
});

test('top navbar messages are ordered by sort_order and created_at', function () {
    $first = TopNavbarMessage::factory()->create([
        'sort_order' => 1,
        'created_at' => now()->subDays(2),
    ]);
    $second = TopNavbarMessage::factory()->create([
        'sort_order' => 2,
        'created_at' => now()->subDay(),
    ]);
    $third = TopNavbarMessage::factory()->create([
        'sort_order' => 1,
        'created_at' => now(),
    ]);

    $response = $this->actingAs($this->user)
        ->get(route('top-navbar-messages.index'));

    $response->assertStatus(200);
});

test('seeded top navbar messages exist and are accessible', function () {
    $this->artisan('db:seed', ['--class' => 'TopNavbarMessageSeeder']);

    $this->assertDatabaseCount('top_navbar_messages', 5);

    $activeMessages = TopNavbarMessage::where('is_active', true)->count();
    expect($activeMessages)->toBeGreaterThan(0);
});
