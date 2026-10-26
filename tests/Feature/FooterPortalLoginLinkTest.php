<?php

test('the portal login link is not shared until a portal address is configured', function () {
    config(['bank.footer.banking.portal_login' => null]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where('footerLinks.banking.portal_login', null));
});

test('the configured portal address is shared with the footer', function () {
    config(['bank.footer.banking.portal_login' => 'https://portal.example.test/login']);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where('footerLinks.banking.portal_login', 'https://portal.example.test/login'));
});
