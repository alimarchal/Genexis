<?php

use App\Models\Service;
use App\Models\ServiceAttribute;
use App\Models\User;

beforeEach(function () {
    $this->user = $this->createAdminUser();
    $this->actingAs($this->user);

    $this->service1 = Service::factory()->create(['name' => 'Test Service 1']);
    $this->service2 = Service::factory()->create(['name' => 'Test Service 2']);
});

test('it can view service attributes index page', function () {
    ServiceAttribute::factory()->count(3)->create(['service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('ServiceAttributes/Index')
            ->has('serviceAttributes.data', 3)
            ->has('services')
    );
});

test('it can filter by attribute name', function () {
    ServiceAttribute::factory()->create(['attribute_name' => 'Coverage Area', 'service_id' => $this->service1->id]);
    ServiceAttribute::factory()->create(['attribute_name' => 'Features', 'service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.index', ['filter[attribute_name]' => 'Coverage']));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->has('serviceAttributes.data', 1)
            ->where('serviceAttributes.data.0.attribute_name', 'Coverage Area')
    );
});

test('it can filter by service id', function () {
    ServiceAttribute::factory()->count(2)->create(['service_id' => $this->service1->id]);
    ServiceAttribute::factory()->count(3)->create(['service_id' => $this->service2->id]);

    $response = $this->get(route('service-attributes.index', ['filter[service_id]' => $this->service1->id]));

    $response->assertStatus(200);
    $response->assertInertia(fn($page) => $page->has('serviceAttributes.data', 2));
});

test('it can view create service attribute page', function () {
    $response = $this->get(route('service-attributes.create'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('ServiceAttributes/Create')
            ->has('services')
    );
});

test('it can create service attribute with valid data', function () {
    $response = $this->post(route('service-attributes.store'), [
        'service_id' => $this->service1->id,
        'attribute_name' => 'Test Attribute',
        'attribute_value' => 'Test attribute value with details',
        'sort_order' => 10,
    ]);

    $response->assertRedirect(route('service-attributes.index'));
    $this->assertDatabaseHas('service_attributes', [
        'service_id' => $this->service1->id,
        'attribute_name' => 'Test Attribute',
        'attribute_value' => 'Test attribute value with details',
        'sort_order' => 10,
    ]);
});

test('it validates required fields when creating', function () {
    $response = $this->post(route('service-attributes.store'), []);

    $response->assertSessionHasErrors(['service_id', 'attribute_name', 'attribute_value']);
});

test('it validates service exists when creating', function () {
    $response = $this->post(route('service-attributes.store'), [
        'service_id' => 99999,
        'attribute_name' => 'Test Attribute',
        'attribute_value' => 'Test value',
    ]);

    $response->assertSessionHasErrors(['service_id']);
});

test('it validates attribute name length', function () {
    $response = $this->post(route('service-attributes.store'), [
        'service_id' => $this->service1->id,
        'attribute_name' => str_repeat('a', 256),
        'attribute_value' => 'Test value',
    ]);

    $response->assertSessionHasErrors(['attribute_name']);
});

test('it validates attribute value length', function () {
    $response = $this->post(route('service-attributes.store'), [
        'service_id' => $this->service1->id,
        'attribute_name' => 'Test Attribute',
        'attribute_value' => str_repeat('a', 5001),
    ]);

    $response->assertSessionHasErrors(['attribute_value']);
});

test('it validates sort order range', function () {
    $response = $this->post(route('service-attributes.store'), [
        'service_id' => $this->service1->id,
        'attribute_name' => 'Test Attribute',
        'attribute_value' => 'Test value',
        'sort_order' => 1000,
    ]);

    $response->assertSessionHasErrors(['sort_order']);
});

test('it can view service attribute details', function () {
    $attribute = ServiceAttribute::factory()->create(['service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.show', $attribute));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('ServiceAttributes/Show')
            ->where('serviceAttribute.id', $attribute->id)
            ->has('serviceAttribute.service')
    );
});

test('it can view edit service attribute page', function () {
    $attribute = ServiceAttribute::factory()->create(['service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.edit', $attribute));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->component('ServiceAttributes/Edit')
            ->where('serviceAttribute.id', $attribute->id)
            ->has('services')
    );
});

test('it can update service attribute', function () {
    $attribute = ServiceAttribute::factory()->create([
        'service_id' => $this->service1->id,
        'attribute_name' => 'Original Name',
        'attribute_value' => 'Original value',
        'sort_order' => 5,
    ]);

    $response = $this->put(route('service-attributes.update', $attribute), [
        'service_id' => $this->service2->id,
        'attribute_name' => 'Updated Name',
        'attribute_value' => 'Updated value',
        'sort_order' => 10,
    ]);

    $response->assertRedirect(route('service-attributes.index'));
    $this->assertDatabaseHas('service_attributes', [
        'id' => $attribute->id,
        'service_id' => $this->service2->id,
        'attribute_name' => 'Updated Name',
        'attribute_value' => 'Updated value',
        'sort_order' => 10,
    ]);
});

test('it validates required fields when updating', function () {
    $attribute = ServiceAttribute::factory()->create(['service_id' => $this->service1->id]);

    $response = $this->put(route('service-attributes.update', $attribute), []);

    $response->assertSessionHasErrors(['service_id', 'attribute_name', 'attribute_value']);
});

test('it can delete service attribute', function () {
    $attribute = ServiceAttribute::factory()->create(['service_id' => $this->service1->id]);

    $response = $this->delete(route('service-attributes.destroy', $attribute));

    $response->assertRedirect(route('service-attributes.index'));
    $this->assertDatabaseMissing('service_attributes', ['id' => $attribute->id]);
});

test('it orders by sort order by default', function () {
    ServiceAttribute::factory()->create(['sort_order' => 20, 'service_id' => $this->service1->id]);
    ServiceAttribute::factory()->create(['sort_order' => 5, 'service_id' => $this->service1->id]);
    ServiceAttribute::factory()->create(['sort_order' => 15, 'service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->where('serviceAttributes.data.0.sort_order', 5)
            ->where('serviceAttributes.data.1.sort_order', 15)
            ->where('serviceAttributes.data.2.sort_order', 20)
    );
});

test('it can sort by attribute name', function () {
    ServiceAttribute::factory()->create(['attribute_name' => 'Z Attribute', 'service_id' => $this->service1->id]);
    ServiceAttribute::factory()->create(['attribute_name' => 'A Attribute', 'service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.index', ['sort' => 'attribute_name']));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->where('serviceAttributes.data.0.attribute_name', 'A Attribute')
            ->where('serviceAttributes.data.1.attribute_name', 'Z Attribute')
    );
});

test('it paginates results', function () {
    ServiceAttribute::factory()->count(15)->create(['service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.index', ['per_page' => 5]));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->has('serviceAttributes.data', 5)
            ->where('serviceAttributes.total', 15)
            ->where('serviceAttributes.per_page', 5)
    );
});

test('service relationship is loaded', function () {
    $attribute = ServiceAttribute::factory()->create(['service_id' => $this->service1->id]);

    $response = $this->get(route('service-attributes.index'));

    $response->assertStatus(200);
    $response->assertInertia(
        fn($page) =>
        $page->where('serviceAttributes.data.0.service.id', $this->service1->id)
            ->where('serviceAttributes.data.0.service.name', $this->service1->name)
    );
});