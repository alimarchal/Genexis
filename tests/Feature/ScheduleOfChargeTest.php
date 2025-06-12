<?php

use App\Models\ScheduleOfCharge;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
});

test('authenticated user can view schedule of charges index', function () {
    ScheduleOfCharge::factory(3)->create();

    $response = $this->actingAs($this->user)
        ->get(route('schedule-of-charges.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('ScheduleOfCharge/Index'));
});

test('authenticated user can view schedule of charges create form', function () {
    $response = $this->actingAs($this->user)
        ->get(route('schedule-of-charges.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('ScheduleOfCharge/Create'));
});

test('authenticated user can create schedule of charge', function () {
    $file = UploadedFile::fake()->create('schedule.pdf', 1000);

    $data = [
        'title' => 'Test Schedule of Charges',
        'from' => '2025-01-01',
        'to' => '2025-12-31',
        'description' => 'Test description',
        'attachment' => $file,
        'is_active' => true,
    ];

    $response = $this->actingAs($this->user)
        ->post(route('schedule-of-charges.store'), $data);

    $response->assertRedirect(route('schedule-of-charges.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('schedule_of_charges', [
        'title' => 'Test Schedule of Charges',
        'description' => 'Test description',
        'is_active' => true,
        'created_by' => $this->user->id,
    ]);

    Storage::disk('public')->assertExists('schedule_of_charges/'.$file->hashName());
});

test('authenticated user can view schedule of charge details', function () {
    $schedule = ScheduleOfCharge::factory()->create();

    $response = $this->actingAs($this->user)
        ->get(route('schedule-of-charges.show', $schedule));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('ScheduleOfCharge/Show'));
});

test('authenticated user can update schedule of charge', function () {
    $schedule = ScheduleOfCharge::factory()->create();

    $data = [
        'title' => 'Updated Schedule Title',
        'from' => '2025-02-01',
        'to' => '2025-11-30',
        'description' => 'Updated description',
        'is_active' => false,
    ];

    $response = $this->actingAs($this->user)
        ->put(route('schedule-of-charges.update', $schedule), $data);

    $response->assertRedirect(route('schedule-of-charges.index'));
    $response->assertSessionHas('success');

    $schedule->refresh();
    expect($schedule->title)->toBe('Updated Schedule Title');
    expect($schedule->updated_by)->toBe($this->user->id);
});

test('authenticated user can delete schedule of charge', function () {
    $schedule = ScheduleOfCharge::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete(route('schedule-of-charges.destroy', $schedule));

    $response->assertRedirect(route('schedule-of-charges.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('schedule_of_charges', [
        'id' => $schedule->id,
    ]);
});

test('guests cannot access schedule of charges routes', function () {
    $schedule = ScheduleOfCharge::factory()->create();

    $this->get(route('schedule-of-charges.index'))->assertRedirect(route('login'));
    $this->get(route('schedule-of-charges.create'))->assertRedirect(route('login'));
    $this->post(route('schedule-of-charges.store'))->assertRedirect(route('login'));
    $this->get(route('schedule-of-charges.show', $schedule))->assertRedirect(route('login'));
});
