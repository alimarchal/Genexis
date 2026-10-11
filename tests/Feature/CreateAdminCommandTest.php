<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('creates a verified super-admin who can open the dashboard', function () {
    $this->artisan('bank:create-admin', ['email' => 'Boss@Bank.test', '--name' => 'The Boss', '--password' => 'Correct-horse-9battery'])
        ->assertSuccessful();

    $user = User::where('email', 'boss@bank.test')->firstOrFail();

    expect($user->name)->toBe('The Boss')
        ->and($user->hasRole('super-admin'))->toBeTrue()
        ->and($user->email_verified_at)->not->toBeNull()
        ->and(Hash::check('Correct-horse-9battery', $user->password))->toBeTrue();

    $this->actingAs($user)->get(route('dashboard'))->assertOk();
});

it('rejects weak passwords and invalid e-mails without creating anything', function (string $email, string $password) {
    $this->artisan('bank:create-admin', ['email' => $email, '--password' => $password])->assertFailed();

    expect(User::count())->toBe(0);
})->with([
    'short password' => ['a@bank.test', 'Short1'],
    'no digits' => ['a@bank.test', 'only-letters-here'],
    'bad email' => ['not-an-email', 'Correct-horse-9battery'],
]);

it('updates the password of an existing user instead of duplicating them', function () {
    $existing = User::factory()->create(['email' => 'boss@bank.test']);

    $this->artisan('bank:create-admin', ['email' => 'boss@bank.test', '--password' => 'Another-long-pass-7'])->assertSuccessful();

    expect(User::count())->toBe(1)
        ->and(Hash::check('Another-long-pass-7', $existing->fresh()->password))->toBeTrue()
        ->and($existing->fresh()->hasRole('super-admin'))->toBeTrue();
});
