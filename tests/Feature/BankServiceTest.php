<?php

use App\Models\BankService;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);
    Storage::fake('public');
});

test('it can view bank services index page', function () {
    BankService::factory()->count(3)->create();

    $response = $this->get(route('bank-services.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BankService/Index'));
});

test('it can view create bank service page', function () {
    $response = $this->get(route('bank-services.create'));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BankService/Create'));
});

test('it can create bank service with valid data', function () {
    $response = $this->post(route('bank-services.store'), [
        'title' => 'Test Service',
        'description' => 'Test Description',
        'icon' => 'User',
        'products' => ['Savings Account', 'Current Account'],
        'cta_text' => 'Learn More',
        'cta_link' => '/test',
        'color' => 'from-blue-600 to-blue-800',
        'benefits' => ['24/7 Support', 'Online Banking'],
        'order' => 1,
        'status' => true,
        'service_type' => 'service',
    ]);

    $response->assertRedirect(route('bank-services.index'));
    $this->assertDatabaseHas('bank_services', [
        'title' => 'Test Service',
        'description' => 'Test Description',
        'status' => true,
        'service_type' => 'service',
    ]);
});

test('it can view bank service details', function () {
    $bankService = BankService::factory()->create();

    $response = $this->get(route('bank-services.show', $bankService));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BankService/Show'));
});

test('it can view edit bank service page', function () {
    $bankService = BankService::factory()->create();

    $response = $this->get(route('bank-services.edit', $bankService));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->component('BankService/Edit'));
});

test('it can update bank service', function () {
    $bankService = BankService::factory()->create();

    $response = $this->put(route('bank-services.update', $bankService), [
        'title' => 'Updated Service',
        'description' => 'Updated Description',
        'icon' => 'Globe',
        'products' => ['Fixed Deposits', 'Term Deposits'],
        'cta_text' => 'Contact Us',
        'cta_link' => '/contact',
        'color' => 'from-green-600 to-green-800',
        'benefits' => ['Expert Advice', 'Secure Transactions'],
        'order' => 2,
        'status' => false,
        'service_type' => 'deposit',
    ]);

    $response->assertRedirect(route('bank-services.index'));
    $this->assertDatabaseHas('bank_services', [
        'id' => $bankService->id,
        'title' => 'Updated Service',
        'description' => 'Updated Description',
        'status' => false,
    ]);
});

test('it can delete bank service', function () {
    $bankService = BankService::factory()->create();

    $response = $this->delete(route('bank-services.destroy', $bankService));

    $response->assertRedirect(route('bank-services.index'));
    $this->assertDatabaseMissing('bank_services', ['id' => $bankService->id]);
});

test('it validates required fields when creating bank service', function () {
    $response = $this->post(route('bank-services.store'), []);

    $response->assertSessionHasErrors(['title', 'description', 'icon', 'cta_text', 'cta_link', 'color', 'status', 'service_type']);
});
