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
        'subject' => 'Test Subject',
        'message' => 'This is a test message',
    ];

    $response = $this->postJson(route('contact.submit'), $formData);

    $response->assertStatus(200);
    $response->assertJson([
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!',
    ]);

    // Verify the contact submission was stored
    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+92 300 1234567',
        'district' => 'Muzaffarabad',
        'tehsil' => 'Muzaffarabad',
        'place' => 'City Center',
        'category' => 'general_inquiry',
        'subject' => 'Test Subject',
        'message' => 'This is a test message',
    ]);

    // Verify email was sent
    Mail::assertSent(ContactSubmissionMail::class);
});

test('contact form requires name and email', function () {
    $response = $this->postJson(route('contact.submit'), []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['name', 'email', 'subject', 'message']);
});

test('contact form validates email format', function () {
    $response = $this->postJson(route('contact.submit'), [
        'name' => 'John Doe',
        'email' => 'invalid-email',
        'subject' => 'Test Subject',
        'message' => 'Test message',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
});

test('contact form accepts optional fields', function () {
    Mail::fake();

    $formData = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Test Subject',
        'message' => 'Test message',
    ];

    $response = $this->postJson(route('contact.submit'), $formData);

    $response->assertStatus(200);
    $response->assertJson([
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!',
    ]);

    // Verify the contact submission was stored with null optional fields
    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'subject' => 'Test Subject',
        'message' => 'Test message',
        'phone' => null,
        'district' => null,
        'tehsil' => null,
        'place' => null,
        'category' => null,
    ]);
});
