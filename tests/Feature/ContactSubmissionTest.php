<?php

use App\Mail\ContactSubmissionMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;

uses(RefreshDatabase::class);

test('contact form can be submitted successfully', function () {
    Mail::fake();

    $formData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+92 300 1234567',
        'district' => 'Muzaffarabad',
        'tehsil' => 'Muzaffarabad',
        'place' => 'City Center',
        'category' => 'general_inquiry',
    ];

    $response = $this->post(route('contact.submit'), $formData);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    // Verify the contact submission was stored
    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+92 300 1234567',
        'district' => 'Muzaffarabad',
        'tehsil' => 'Muzaffarabad',
        'place' => 'City Center',
        'category' => 'general_inquiry',
    ]);

    // Verify email was sent
    Mail::assertSent(ContactSubmissionMail::class, function ($mail) {
        return $mail->hasTo(config('app.contact_email'));
    });
});

test('contact form requires name and email', function () {
    $response = $this->post(route('contact.submit'), []);

    $response->assertSessionHasErrors(['name', 'email']);
});

test('contact form validates email format', function () {
    $response = $this->post(route('contact.submit'), [
        'name' => 'John Doe',
        'email' => 'invalid-email',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('contact form accepts optional fields', function () {
    Mail::fake();

    $formData = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
    ];

    $response = $this->post(route('contact.submit'), $formData);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    // Verify the contact submission was stored with null optional fields
    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => null,
        'district' => null,
        'tehsil' => null,
        'place' => null,
        'category' => null,
    ]);
});
