<?php

it('renders the configured bank name as the page title and application name, never Laravel', function () {
    config(['app.name' => 'Bank of AJK']);

    $html = $this->get('/')->assertOk()->getContent();

    expect($html)
        ->toContain('<meta name="application-name" content="Bank of AJK">')
        ->toContain('Bank of AJK</title>')
        ->not->toContain('- Laravel');
});

it('falls back to the bank name instead of Laravel when APP_NAME is not set', function () {
    expect(file_get_contents(config_path('app.php')))
        ->toContain("env('APP_NAME', 'Bank of AJK')")
        ->not->toContain("'Laravel'");

    expect(file_get_contents(resource_path('views/app.blade.php')))->not->toContain("'Laravel'");
});

it('takes the title suffix from the server, not from a build-time variable', function () {
    $entry = file_get_contents(resource_path('js/app.tsx'));

    expect($entry)
        ->toContain('meta[name="application-name"]')
        ->not->toContain("|| 'Laravel'");
});
