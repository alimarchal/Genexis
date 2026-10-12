<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

function runCheck(array $options = []): array
{
    $code = Artisan::call('bank:check', $options);

    return [$code, Artisan::output()];
}

beforeEach(function () {
    config(['app.key' => 'base64:'.base64_encode(random_bytes(32))]);
});

it('fails when debug is on in production', function () {
    app()['env'] = 'production';
    config(['app.debug' => true]);

    [$code, $output] = runCheck();

    expect($code)->toBe(1)->and($output)->toContain('APP_DEBUG is true in production');
});

it('fails when the application key is missing', function () {
    config(['app.key' => '']);

    [$code, $output] = runCheck();

    expect($code)->toBe(1)->and($output)->toContain('APP_KEY is not set');
});

it('passes with warnings only when the setup is safe but incomplete, and fails them under --strict', function () {
    app()['env'] = 'production';
    config(['app.debug' => false, 'app.url' => 'https://bank.example', 'session.secure' => true, 'mail.default' => 'log']);

    [$code, $output] = runCheck();
    expect($code)->toBe(0)->and($output)->toContain('notification e-mails are NOT delivered');

    [$strict] = runCheck(['--strict' => true]);
    expect($strict)->toBe(1);
});

it('warns about a development mail host and insecure cookies in production', function () {
    app()['env'] = 'production';
    config([
        'app.debug' => false,
        'app.url' => 'http://bank.example',
        'session.secure' => false,
        'mail.default' => 'smtp',
        'mail.mailers.smtp.host' => 'mailpit',
    ]);

    [, $output] = runCheck();

    expect($output)->toContain('development mail catcher')
        ->toContain('SESSION_SECURE_COOKIE')
        ->toContain('APP_URL is not https');
});

it('reports a database that cannot be reached', function () {
    config(['database.connections.broken' => ['driver' => 'mysql', 'host' => '127.0.0.1', 'port' => 1, 'database' => 'x', 'username' => 'x', 'password' => 'x']]);
    config(['database.default' => 'broken']);

    [$code, $output] = runCheck();

    config(['database.default' => 'sqlite']);
    DB::purge('broken');

    expect($code)->toBe(1)->and($output)->toContain('Database connection failed');
});

it('warns when the disk could not hold the largest allowed upload', function () {
    app()['env'] = 'production';
    config(['app.debug' => false, 'bank.uploads.super_admin_max_bytes' => PHP_INT_MAX / 2]);

    [, $output] = runCheck();

    expect($output)->toContain('disk space is free but a super-admin may upload');
});
