<?php

use App\Mail\ContactSubmissionMail;
use App\Models\ContactSubmission;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

beforeEach(function () {
    RateLimiter::clear('contact-form:127.0.0.1');
});

describe('security headers', function () {
    it('sends hardening headers on public pages', function () {
        $response = $this->get(route('contact'));

        $response->assertOk()
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    });

    it('uses a nonce-based CSP and puts the same nonce on inline scripts', function () {
        $response = $this->get(route('contact'));
        $csp = $response->headers->get('Content-Security-Policy');

        expect($csp)->toContain("object-src 'none'")
            ->toContain("frame-ancestors 'self'")
            ->toContain("frame-src 'self' https://www.google.com;")
            ->not->toContain("script-src 'self' 'unsafe-inline'");

        preg_match("/'nonce-([^']+)'/", $csp, $matches);
        expect($matches[1] ?? null)->not->toBeNull();
        expect($response->getContent())->toContain('nonce="'.$matches[1].'"');
    });

    it('uses a fresh nonce for every response', function () {
        $first = $this->get(route('contact'))->headers->get('Content-Security-Policy');
        $second = $this->get(route('contact'))->headers->get('Content-Security-Policy');

        expect($first)->not->toBe($second);
    });

    it('can disable the CSP without dropping the other headers', function () {
        config(['bank.security.csp_enabled' => false]);

        $response = $this->get(route('contact'));

        expect($response->headers->has('Content-Security-Policy'))->toBeFalse();
        $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
    });

    it('sends HSTS only over https', function () {
        expect($this->get(route('contact'))->headers->has('Strict-Transport-Security'))->toBeFalse();

        $secure = $this->get('https://localhost/contact-us');
        expect($secure->headers->get('Strict-Transport-Security'))->toContain('max-age=31536000');
    });
});

describe('rate limiting', function () {
    it('throttles the public search API per IP', function () {
        config(['bank.security.api_rate_limit' => 3]);

        foreach (range(1, 3) as $ignored) {
            $this->getJson('/api/search?q=loan')->assertOk();
        }

        $this->getJson('/api/search?q=loan')->assertTooManyRequests();
    });

    it('gives a different IP its own allowance', function () {
        config(['bank.security.api_rate_limit' => 1]);

        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1'])->getJson('/api/search?q=loan')->assertOk();
        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1'])->getJson('/api/search?q=loan')->assertTooManyRequests();
        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.2'])->getJson('/api/search?q=loan')->assertOk();
    });

    it('throttles file downloads per IP', function () {
        config(['bank.security.download_rate_limit' => 2]);

        foreach (range(1, 2) as $ignored) {
            $this->get('/documents/999999/download')->assertNotFound();
        }

        $this->get('/documents/999999/download')->assertTooManyRequests();
    });

    it('limits contact form submissions per IP and reports the wait time', function () {
        Mail::fake();
        config(['bank.security.contact_rate_limit' => 2]);

        $payload = [
            'name' => 'Spammer',
            'email' => 'spam@example.test',
            'category' => 'general_inquiry',
            'subject' => 'Hello',
            'message' => 'Hello there',
        ];

        $this->postJson(route('contact.submit'), $payload)->assertOk();
        $this->postJson(route('contact.submit'), $payload)->assertOk();

        $this->postJson(route('contact.submit'), $payload)
            ->assertTooManyRequests()
            ->assertJsonPath('success', false)
            ->assertJsonStructure(['remaining_time']);

        expect(ContactSubmission::count())->toBe(2);
    });
});

describe('contact form resilience', function () {
    it('keeps the message and still succeeds when the mail server is down', function () {
        Mail::shouldReceive('to')->andThrow(new RuntimeException('SMTP connection refused'));

        $this->postJson(route('contact.submit'), [
            'name' => 'Customer',
            'email' => 'customer@example.test',
            'category' => 'general_inquiry',
            'subject' => 'Account question',
            'message' => 'Please call me back.',
        ])->assertOk()->assertJsonPath('success', true);

        $this->assertDatabaseHas('contact_submissions', ['email' => 'customer@example.test']);
    });

    it('does not write visitor details to the log', function () {
        Mail::fake();
        Log::spy();

        $this->postJson(route('contact.submit'), [
            'name' => 'Private Person',
            'email' => 'private@example.test',
            'category' => 'general_inquiry',
            'subject' => 'Private subject',
            'message' => 'Private message',
        ])->assertOk();

        Log::shouldNotHaveReceived('info');
    });

    it('emails the configured recipient after saving', function () {
        Mail::fake();
        config(['bank.contact.form_recipient' => 'desk@example.test']);

        $this->postJson(route('contact.submit'), [
            'name' => 'Customer',
            'email' => 'customer@example.test',
            'category' => 'general_inquiry',
            'subject' => 'Subject',
            'message' => 'Message',
        ])->assertOk();

        Mail::assertSent(ContactSubmissionMail::class, fn ($mail) => $mail->hasTo('desk@example.test'));
    });
});

describe('menu link validation', function () {
    beforeEach(function () {
        $this->seed(RoleAndPermissionSeeder::class);
        $this->admin = User::factory()->create();
        $this->admin->assignRole('super-admin');
    });

    function menuPayload(string $url): array
    {
        return [
            'title' => 'Test menu',
            'slug' => 'test-menu-'.md5($url),
            'url' => $url,
            'target' => '_self',
            'sort_order' => 1,
        ];
    }

    it('rejects script-bearing URLs', function (string $url) {
        $this->actingAs($this->admin)
            ->post(route('admin.menus.store'), menuPayload($url))
            ->assertSessionHasErrors('url');
    })->with([
        'javascript' => 'javascript:alert(1)',
        'JavaScript mixed case' => 'JaVaScRiPt:alert(1)',
        'data uri' => 'data:text/html;base64,PHNjcmlwdD4=',
        'protocol relative' => '//evil.example.test/phish',
    ]);

    it('accepts normal links', function (string $url) {
        $this->actingAs($this->admin)
            ->post(route('admin.menus.store'), menuPayload($url))
            ->assertSessionHasNoErrors();
    })->with([
        'relative path' => '/about-us',
        'anchor' => '#contact',
        'https' => 'https://www.sbp.org.pk',
        'mailto' => 'mailto:info@bankajk.com',
        'tel' => 'tel:+925822924244',
    ]);
});
