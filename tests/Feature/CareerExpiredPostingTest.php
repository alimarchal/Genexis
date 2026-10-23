<?php

use App\Models\Career;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->actingAs($this->createAdminUser());
    Storage::fake('public');

    $this->expired = Career::factory()->create([
        'title' => 'Old vacancy',
        'is_active' => true,
        'closing_date' => now()->subDays(10)->toDateString(),
    ]);

    $this->payload = fn (array $overrides = []) => array_merge([
        'title' => 'Old vacancy',
        'description' => 'Description',
        'requirements' => 'Requirements',
        'location' => 'Muzaffarabad',
        'is_active' => '1',
        'is_featured' => '0',
        'closing_date' => $this->expired->closing_date->toDateString(),
    ], $overrides);
});

it('lets an expired posting be edited without touching its closing date', function () {
    $this->put(route('careers.update', $this->expired), ($this->payload)(['title' => 'Corrected title']))
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('careers.index'));

    $career = $this->expired->fresh();
    expect($career->title)->toBe('Corrected title')
        ->and($career->closing_date->toDateString())->toBe(now()->subDays(10)->toDateString());
});

it('lets an expired posting be marked inactive', function () {
    $this->put(route('careers.update', $this->expired), ($this->payload)(['is_active' => '0']))
        ->assertSessionHasNoErrors();

    expect($this->expired->fresh()->is_active)->toBeFalse();
});

it('accepts the unchanged date in a timestamp format too', function () {
    $this->put(route('careers.update', $this->expired), ($this->payload)(['closing_date' => $this->expired->closing_date->toDateString().'T00:00:00.000000Z']))
        ->assertSessionHasNoErrors();
});

it('still requires a future date when the closing date is changed', function () {
    $this->put(route('careers.update', $this->expired), ($this->payload)(['closing_date' => now()->subDay()->toDateString()]))
        ->assertSessionHasErrors(['closing_date' => 'The closing date must be today or a future date.']);

    $this->put(route('careers.update', $this->expired), ($this->payload)(['closing_date' => now()->addDays(5)->toDateString()]))
        ->assertSessionHasNoErrors();

    expect($this->expired->fresh()->closing_date->toDateString())->toBe(now()->addDays(5)->toDateString());
});

it('still requires a future closing date when adding a new posting', function () {
    $new = ($this->payload)(['title' => 'New vacancy', 'closing_date' => now()->subDay()->toDateString()]);

    $this->post(route('careers.store'), $new)->assertSessionHasErrors('closing_date');
    expect(Career::where('title', 'New vacancy')->exists())->toBeFalse();

    $this->post(route('careers.store'), array_merge($new, ['closing_date' => now()->addDay()->toDateString()]))
        ->assertSessionHasNoErrors();
});

it('lets an open-ended posting keep having no closing date', function () {
    $this->put(route('careers.update', $this->expired), ($this->payload)(['closing_date' => null]))
        ->assertSessionHasNoErrors();

    expect($this->expired->fresh()->closing_date)->toBeNull();
});
