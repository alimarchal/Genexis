<?php

use App\Models\Career;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
    Storage::fake('public');
});

describe('Career CRUD Operations', function () {
    test('can view careers index', function () {
        Career::factory(5)->create();

        $response = $this->get(route('careers.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Career/Index')
            ->has('careers.data', 5)
        );
    });

    test('can view create career form', function () {
        $response = $this->get(route('careers.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Career/Create')
        );
    });

    test('can create a new career', function () {
        $careerData = [
            'title' => 'Software Engineer',
            'description' => 'We are looking for a talented software engineer.',
            'requirements' => 'Bachelor degree in Computer Science.',
            'location' => 'Dhaka',
            'closing_date' => now()->addMonth()->format('Y-m-d'),
            'benefits' => 'Competitive salary and benefits.',
            'is_featured' => true,
            'is_active' => true,
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertRedirect(route('careers.index'));
        $response->assertSessionHas('success', 'Career created successfully.');

        $this->assertDatabaseHas('careers', [
            'title' => 'Software Engineer',
            'location' => 'Dhaka',
            'is_featured' => true,
            'is_active' => true,
        ]);
    });

    test('can create career with document upload', function () {
        $file = UploadedFile::fake()->create('job-description.pdf', 1000, 'application/pdf');

        $careerData = [
            'title' => 'Database Administrator',
            'description' => 'Manage our database systems.',
            'requirements' => 'Experience with SQL databases.',
            'location' => 'Chittagong',
            'document' => $file,
            'is_featured' => false,
            'is_active' => true,
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertRedirect(route('careers.index'));

        $career = Career::where('title', 'Database Administrator')->first();
        expect($career)->not->toBeNull();
        expect($career->document)->not->toBeNull();

        Storage::disk('public')->assertExists($career->document);
    });

    test('can view career details', function () {
        $career = Career::factory()->create();

        $response = $this->get(route('careers.show', $career));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Career/Show')
            ->has('career')
            ->where('career.id', $career->id)
        );
    });

    test('can view edit career form', function () {
        $career = Career::factory()->create();

        $response = $this->get(route('careers.edit', $career));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Career/Edit')
            ->has('career')
            ->where('career.id', $career->id)
        );
    });

    test('can update career', function () {
        $career = Career::factory()->create();

        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated description.',
            'requirements' => 'Updated requirements.',
            'location' => 'Sylhet',
            'closing_date' => now()->addWeeks(2)->format('Y-m-d'),
            'benefits' => 'Updated benefits.',
            'is_featured' => false,
            'is_active' => true,
        ];

        $response = $this->put(route('careers.update', $career), $updateData);

        $response->assertRedirect(route('careers.index'));
        $response->assertSessionHas('success', 'Career updated successfully.');

        $career->refresh();
        expect($career->title)->toBe('Updated Title');
        expect($career->location)->toBe('Sylhet');
    });

    test('can update career with new document', function () {
        $career = Career::factory()->create(['document' => 'careers/old-document.pdf']);

        // Create old file
        Storage::disk('public')->put('careers/old-document.pdf', 'old content');

        $newFile = UploadedFile::fake()->create('new-document.pdf', 1500, 'application/pdf');

        $updateData = [
            'title' => $career->title,
            'description' => $career->description,
            'requirements' => $career->requirements,
            'location' => $career->location,
            'document' => $newFile,
            'is_featured' => $career->is_featured,
            'is_active' => $career->is_active,
        ];

        $response = $this->put(route('careers.update', $career), $updateData);

        $response->assertRedirect(route('careers.index'));

        $career->refresh();
        expect($career->document)->not->toBe('careers/old-document.pdf');

        // Old file should be deleted
        Storage::disk('public')->assertMissing('careers/old-document.pdf');
        // New file should exist
        Storage::disk('public')->assertExists($career->document);
    });

    test('can delete career', function () {
        $career = Career::factory()->create(['document' => 'careers/test-document.pdf']);

        // Create document file
        Storage::disk('public')->put('careers/test-document.pdf', 'test content');

        $response = $this->delete(route('careers.destroy', $career));

        $response->assertRedirect(route('careers.index'));
        $response->assertSessionHas('success', 'Career deleted successfully.');

        $this->assertDatabaseMissing('careers', ['id' => $career->id]);

        // Document should be deleted
        Storage::disk('public')->assertMissing('careers/test-document.pdf');
    });

    test('can download career document', function () {
        $career = Career::factory()->create(['document' => 'careers/test-document.pdf']);

        Storage::disk('public')->put('careers/test-document.pdf', 'PDF content here');

        $response = $this->get(route('careers.admin-download', $career));

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/pdf');
    });
});

describe('Career Validation', function () {
    test('requires title for career creation', function () {
        $careerData = [
            'description' => 'Job description.',
            'requirements' => 'Job requirements.',
            'location' => 'Dhaka',
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('title');
    });

    test('requires description for career creation', function () {
        $careerData = [
            'title' => 'Software Engineer',
            'requirements' => 'Job requirements.',
            'location' => 'Dhaka',
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('description');
    });

    test('requires requirements for career creation', function () {
        $careerData = [
            'title' => 'Software Engineer',
            'description' => 'Job description.',
            'location' => 'Dhaka',
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('requirements');
    });

    test('requires location for career creation', function () {
        $careerData = [
            'title' => 'Software Engineer',
            'description' => 'Job description.',
            'requirements' => 'Job requirements.',
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('location');
    });

    test('validates document file type', function () {
        $file = UploadedFile::fake()->create('document.txt', 1000, 'text/plain');

        $careerData = [
            'title' => 'Software Engineer',
            'description' => 'Job description.',
            'requirements' => 'Job requirements.',
            'location' => 'Dhaka',
            'document' => $file,
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('document');
    });

    test('validates document file size', function () {
        $file = UploadedFile::fake()->create('large-document.pdf', 15000, 'application/pdf'); // 15MB

        $careerData = [
            'title' => 'Software Engineer',
            'description' => 'Job description.',
            'requirements' => 'Job requirements.',
            'location' => 'Dhaka',
            'document' => $file,
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('document');
    });

    test('validates closing date is in future', function () {
        $careerData = [
            'title' => 'Software Engineer',
            'description' => 'Job description.',
            'requirements' => 'Job requirements.',
            'location' => 'Dhaka',
            'closing_date' => now()->subDay()->format('Y-m-d'), // Yesterday
        ];

        $response = $this->post(route('careers.store'), $careerData);

        $response->assertSessionHasErrors('closing_date');
    });
});

describe('Public Career Pages', function () {
    test('can view public careers index', function () {
        Career::factory(3)->create(['is_active' => true]);
        Career::factory(2)->create(['is_active' => false]); // Should not appear

        $response = $this->get(route('public-careers'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Careers/PublicCareers')
            ->has('careers.data', 3) // Only active careers
        );
    });

    test('can view public career detail', function () {
        $career = Career::factory()->create(['is_active' => true]);

        $response = $this->get(route('public-careers.show', $career));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Careers/PublicCareerDetail')
            ->has('career')
            ->where('career.id', $career->id)
        );
    });

    test('increments views count when viewing public career detail', function () {
        $career = Career::factory()->create(['is_active' => true, 'views_count' => 5]);

        $this->get(route('public-careers.show', $career));

        $career->refresh();
        expect($career->views_count)->toBe(6);
    });

    test('cannot view inactive career on public page', function () {
        $career = Career::factory()->create(['is_active' => false]);

        $response = $this->get(route('public-careers.show', $career));

        $response->assertStatus(404);
    });

    test('cannot view expired career on public page', function () {
        $career = Career::factory()->create([
            'is_active' => true,
            'closing_date' => now()->subDay()->format('Y-m-d'),
        ]);

        $response = $this->get(route('public-careers.show', $career));

        $response->assertStatus(404);
    });

    test('can download career document from public page', function () {
        $career = Career::factory()->create([
            'is_active' => true,
            'document' => 'careers/public-document.pdf',
        ]);

        Storage::disk('public')->put('careers/public-document.pdf', 'PDF content');

        $response = $this->get(route('public-careers.download', $career));

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/pdf');
    });
});

describe('Career Query Builder', function () {
    test('can filter careers by location', function () {
        Career::factory()->create(['location' => 'Dhaka']);
        Career::factory()->create(['location' => 'Chittagong']);

        $response = $this->get(route('careers.index', ['filter[location]' => 'Dhaka']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('careers.data', 1)
            ->where('careers.data.0.location', 'Dhaka')
        );
    });

    test('can filter careers by active status', function () {
        Career::factory(2)->create(['is_active' => true]);
        Career::factory(1)->create(['is_active' => false]);

        $response = $this->get(route('careers.index', ['filter[is_active]' => '1']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('careers.data', 2)
        );
    });

    test('can search careers by title', function () {
        Career::factory()->create(['title' => 'Software Engineer']);
        Career::factory()->create(['title' => 'Database Administrator']);

        $response = $this->get(route('careers.index', ['filter[title]' => 'Software']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('careers.data', 1)
            ->where('careers.data.0.title', 'Software Engineer')
        );
    });

    test('can sort careers by closing date', function () {
        $career1 = Career::factory()->create(['closing_date' => now()->addWeek()]);
        $career2 = Career::factory()->create(['closing_date' => now()->addMonth()]);

        $response = $this->get(route('careers.index', ['sort' => 'closing_date']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('careers.data', 2)
            ->where('careers.data.0.id', $career1->id) // Earlier date first
        );
    });
});
