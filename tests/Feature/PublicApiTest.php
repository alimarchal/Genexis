<?php

use App\Models\Branch;
use App\Models\Career;
use App\Models\Contact;
use App\Models\District;
use App\Models\NewsAnnouncement;
use App\Models\Region;
use Database\Seeders\DivisionSeeder;

beforeEach(function () {
    $this->seed(DivisionSeeder::class);
});

function makeBranch(array $attributes = []): Branch
{
    return Branch::factory()->create(array_merge([
        'status' => 'active',
        'facilities' => 'ATM, Safe Deposit Boxes',
        'latitude' => 34.37,
        'longitude' => 73.47,
    ], $attributes));
}

describe('branches', function () {
    it('lists only active branches without internal columns', function () {
        $active = makeBranch(['code' => 'A001']);
        makeBranch(['code' => 'I001', 'status' => 'inactive']);

        $response = $this->getJson('/api/v1/branches')->assertOk();

        expect(collect($response->json('data'))->pluck('code')->all())->toBe(['A001']);
        expect($response->json('data.0'))->not->toHaveKeys(['id', 'created_by', 'updated_by', 'status', 'map_priority']);
        expect($response->json('data.0.facilities'))->toBe(['ATM', 'Safe Deposit Boxes']);
        expect($response->json('data.0.latitude'))->toBeFloat();
    });

    it('filters by region, district, type and name', function () {
        $region = Region::factory()->create();
        $district = District::factory()->create(['region_id' => $region->id]);
        makeBranch(['code' => 'M001', 'name' => 'Mirpur Main', 'region_id' => $region->id, 'district_id' => $district->id, 'type' => 'main_branch']);
        makeBranch(['code' => 'K001', 'name' => 'Kotli Branch', 'type' => 'sub_branch']);

        $codes = fn (string $query) => collect($this->getJson("/api/v1/branches?$query")->assertOk()->json('data'))->pluck('code')->all();

        expect($codes("filter[region_id]={$region->id}"))->toBe(['M001'])
            ->and($codes("filter[district_id]={$district->id}"))->toBe(['M001'])
            ->and($codes('filter[type]=sub_branch'))->toBe(['K001'])
            ->and($codes('filter[name]=Kotli'))->toBe(['K001']);
    });

    it('rejects unknown filters instead of exposing columns', function () {
        $this->getJson('/api/v1/branches?filter[created_by]=1')->assertBadRequest();
    });

    it('caps page size at 100', function () {
        makeBranch();

        $this->getJson('/api/v1/branches?per_page=5000')->assertOk()->assertJsonPath('meta.per_page', 100);
    });

    it('shows one branch by code with phones and emails, hiding inactive contacts', function () {
        $branch = makeBranch(['code' => 'M777']);
        Contact::factory()->create(['branch_id' => $branch->id, 'status' => 'active', 'phone' => '05822-111', 'email' => 'm777@bankajk.com']);
        Contact::factory()->create(['branch_id' => $branch->id, 'status' => 'inactive', 'phone' => '05822-999', 'email' => 'old@bankajk.com']);

        $this->getJson('/api/v1/branches/M777')
            ->assertOk()
            ->assertJsonPath('data.phones', ['05822-111'])
            ->assertJsonPath('data.emails', ['m777@bankajk.com']);
    });

    it('returns 404 JSON for unknown or inactive branches', function () {
        makeBranch(['code' => 'X001', 'status' => 'inactive']);

        $this->getJson('/api/v1/branches/X001')->assertNotFound();
        $this->getJson('/api/v1/branches/NOPE')->assertNotFound()->assertJsonStructure(['message']);
    });
});

describe('nearby branches', function () {
    it('returns branches inside the radius sorted by distance', function () {
        makeBranch(['code' => 'FAR', 'latitude' => 33.15, 'longitude' => 73.75]); // Mirpur, ~150 km away
        makeBranch(['code' => 'NEAR', 'latitude' => 34.38, 'longitude' => 73.48]);
        makeBranch(['code' => 'NEARER', 'latitude' => 34.371, 'longitude' => 73.471]);

        $response = $this->getJson('/api/v1/branches/nearby?lat=34.37&lng=73.47&radius_km=50')->assertOk();

        expect(collect($response->json('data'))->pluck('code')->all())->toBe(['NEARER', 'NEAR']);
        expect($response->json('data.0.distance_km'))->toBeLessThan(1);
        expect($response->json('data.1.distance_km'))->toBeBetween(1, 3);
    });

    it('computes a known distance correctly', function () {
        // Muzaffarabad (34.37, 73.47) to Mirpur (33.15, 73.75) is about 139 km.
        makeBranch(['code' => 'MIR', 'latitude' => 33.15, 'longitude' => 73.75]);

        $km = $this->getJson('/api/v1/branches/nearby?lat=34.37&lng=73.47&radius_km=200')->json('data.0.distance_km');

        expect($km)->toBeBetween(135, 143);
    });

    it('ignores inactive branches and branches without coordinates', function () {
        makeBranch(['code' => 'OFF', 'status' => 'inactive']);
        makeBranch(['code' => 'NOGPS', 'latitude' => null, 'longitude' => null]);

        $this->getJson('/api/v1/branches/nearby?lat=34.37&lng=73.47')->assertOk()->assertJsonCount(0, 'data');
    });

    it('validates coordinates', function (string $query) {
        $this->getJson("/api/v1/branches/nearby?$query")->assertUnprocessable();
    })->with([
        'missing both' => '',
        'lat too high' => 'lat=91&lng=10',
        'lng too low' => 'lat=10&lng=-181',
        'not numeric' => 'lat=abc&lng=10',
        'radius too big' => 'lat=10&lng=10&radius_km=5000',
    ]);
});

describe('regions and districts', function () {
    it('lists active regions with their active branch count', function () {
        $region = Region::factory()->create(['status' => 'active', 'name' => 'Muzaffarabad']);
        Region::factory()->create(['status' => 'inactive']);
        makeBranch(['region_id' => $region->id]);
        makeBranch(['region_id' => $region->id, 'status' => 'inactive']);

        $response = $this->getJson('/api/v1/regions')->assertOk();

        expect($response->json('data'))->toHaveCount(1);
        expect($response->json('data.0.branches_count'))->toBe(1);
    });

    it('narrows districts by region', function () {
        $region = Region::factory()->create();
        $mine = District::factory()->create(['region_id' => $region->id, 'status' => 'active']);
        District::factory()->create(['status' => 'active']);

        $ids = collect($this->getJson("/api/v1/districts?region_id={$region->id}")->assertOk()->json('data'))->pluck('id')->all();

        expect($ids)->toBe([$mine->id]);
    });
});

describe('bank info', function () {
    it('serves head-office contact details from config', function () {
        config(['bank.contact.contact_phone' => '+92 000', 'bank.contact.contact_email' => 'hello@bank.test']);

        $this->getJson('/api/v1/contact')
            ->assertOk()
            ->assertJsonPath('data.phone', '+92 000')
            ->assertJsonPath('data.email', 'hello@bank.test')
            ->assertJsonStructure(['data' => ['address', 'social']]);
    });

    it('serves rates from config', function () {
        config(['bank.loan_rates.personal' => 28.0, 'bank.deposit_rates.savings' => 7.5]);

        $this->getJson('/api/v1/rates')
            ->assertOk()
            ->assertJsonPath('data.loan.personal', 28)
            ->assertJsonPath('data.deposit.savings', 7.5);
    });
});

describe('news', function () {
    it('lists published, already-dated news and hides drafts and future items', function () {
        NewsAnnouncement::factory()->create(['title' => 'Live', 'slug' => 'live', 'is_published' => true, 'published_date' => now()->subDay()]);
        NewsAnnouncement::factory()->create(['title' => 'Draft', 'slug' => 'draft', 'is_published' => false, 'published_date' => now()->subDay()]);
        NewsAnnouncement::factory()->create(['title' => 'Future', 'slug' => 'future', 'is_published' => true, 'published_date' => now()->addWeek()]);

        $response = $this->getJson('/api/v1/news')->assertOk();

        expect(collect($response->json('data'))->pluck('slug')->all())->toBe(['live']);
        expect($response->json('data.0'))->not->toHaveKey('content');
    });

    it('shows full content on the detail endpoint only for published items', function () {
        NewsAnnouncement::factory()->create(['slug' => 'live', 'content' => 'Full body', 'is_published' => true, 'published_date' => now()->subDay()]);
        NewsAnnouncement::factory()->create(['slug' => 'draft', 'is_published' => false, 'published_date' => now()->subDay()]);

        $this->getJson('/api/v1/news/live')->assertOk()->assertJsonPath('data.content', 'Full body');
        $this->getJson('/api/v1/news/draft')->assertNotFound();
    });
});

describe('careers', function () {
    it('lists only open vacancies', function () {
        Career::factory()->create(['title' => 'Open no deadline', 'is_active' => true, 'closing_date' => null]);
        Career::factory()->create(['title' => 'Open future', 'is_active' => true, 'closing_date' => now()->addWeek()]);
        Career::factory()->create(['title' => 'Closed', 'is_active' => true, 'closing_date' => now()->subDay()]);
        Career::factory()->create(['title' => 'Inactive', 'is_active' => false, 'closing_date' => null]);

        $titles = collect($this->getJson('/api/v1/careers')->assertOk()->json('data'))->pluck('title')->all();

        expect($titles)->toEqualCanonicalizing(['Open no deadline', 'Open future']);
    });

    it('does not show closed or inactive vacancies by id', function () {
        $closed = Career::factory()->create(['is_active' => true, 'closing_date' => now()->subDay()]);
        $open = Career::factory()->create(['is_active' => true, 'closing_date' => null]);

        $this->getJson("/api/v1/careers/{$closed->id}")->assertNotFound();
        $this->getJson("/api/v1/careers/{$open->id}")->assertOk()->assertJsonStructure(['data' => ['description', 'requirements']]);
    });
});

describe('platform behaviour', function () {
    it('rate limits per IP and answers 429 as JSON', function () {
        config(['bank.security.api_rate_limit' => 2]);

        $this->getJson('/api/v1/rates')->assertOk();
        $this->getJson('/api/v1/rates')->assertOk();
        $this->getJson('/api/v1/rates')->assertTooManyRequests()->assertHeader('Retry-After');
    });

    it('sends cache headers and an ETag so CDNs and browsers can cache', function () {
        $response = $this->getJson('/api/v1/rates')->assertOk();

        expect($response->headers->get('Cache-Control'))->toContain('public')->toContain('max-age=300');
        expect($response->headers->get('ETag'))->not->toBeNull();
    });

    it('does not accept writes', function () {
        $this->postJson('/api/v1/branches', [])->assertStatus(405);
        $this->deleteJson('/api/v1/branches/A001')->assertStatus(405);
    });

    it('returns JSON errors even without an Accept header', function () {
        $this->get('/api/v1/branches/UNKNOWN')->assertNotFound()->assertHeader('Content-Type', 'application/json');
    });
});
