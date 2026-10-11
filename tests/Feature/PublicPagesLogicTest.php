<?php

use App\Models\Career;
use App\Models\Download;
use App\Models\NewsAnnouncement;
use App\Models\Product;
use App\Models\ProductScheme;
use App\Models\ProductType;
use App\Models\ProductTypeAccount;
use App\Models\ScheduleOfCharge;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

describe('product pages', function () {
    it('renders every product page with no schemes when the account type is missing', function (string $route) {
        $this->get(route($route))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->where('schemes', []));
    })->with([
        'deposit accounts' => 'products.deposit-accounts',
        'term deposit' => 'products.term-deposit',
        'consumer' => 'products.consumer-finances',
        'commercial' => 'products.commercial-sme-finances',
        'agriculture' => 'products.agriculture-finances',
        'micro' => 'products.micro-finances',
    ]);

    it('lists only active schemes of the matching account type', function () {
        $product = Product::create(['name' => 'Banking', 'is_active' => true]);
        $type = ProductType::create(['product_id' => $product->id, 'name' => 'Deposits', 'is_active' => true]);
        $deposit = ProductTypeAccount::create(['product_type_id' => $type->id, 'name' => 'Deposit Accounts', 'is_active' => true]);
        $other = ProductTypeAccount::create(['product_type_id' => $type->id, 'name' => 'Term Deposit', 'is_active' => true]);
        ProductScheme::create(['product_type_account_id' => $deposit->id, 'name' => 'Savings Plus', 'is_active' => true]);
        ProductScheme::create(['product_type_account_id' => $deposit->id, 'name' => 'Retired Plan', 'is_active' => false]);
        ProductScheme::create(['product_type_account_id' => $other->id, 'name' => 'Fixed 1Y', 'is_active' => true]);

        $this->get(route('products.deposit-accounts'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('schemes', 1)
                ->where('schemes.0.name', 'Savings Plus'));
    });
});

describe('news visibility', function () {
    beforeEach(function () {
        NewsAnnouncement::factory()->create(['slug' => 'live', 'title' => 'Live', 'category' => 'general', 'is_published' => true, 'published_date' => now()->subDay()]);
        NewsAnnouncement::factory()->create(['slug' => 'scheduled', 'title' => 'Scheduled', 'category' => 'general', 'is_published' => true, 'published_date' => now()->addWeek()]);
        NewsAnnouncement::factory()->create(['slug' => 'draft', 'title' => 'Draft', 'category' => 'general', 'is_published' => false, 'published_date' => now()->subDay()]);
    });

    it('keeps scheduled news off the news index', function () {
        $this->get(route('news'))->assertOk()->assertInertia(fn ($page) => $page
            ->has('newsAnnouncements.data', 1)
            ->where('newsAnnouncements.data.0.slug', 'live'));
    });

    it('does not open a scheduled or draft article by direct link', function () {
        $this->get(route('news.detail', 'scheduled'))->assertNotFound();
        $this->get(route('news.detail', 'draft'))->assertNotFound();
        $this->get(route('news.detail', 'live'))->assertOk();
    });

    it('does not suggest scheduled articles as related news', function () {
        $this->get(route('news.detail', 'live'))->assertInertia(fn ($page) => $page->has('relatedNews', 0));
    });
});

describe('careers', function () {
    it('treats a vacancy closing today as still open on the list and the detail page', function () {
        $career = Career::factory()->create(['is_active' => true, 'closing_date' => now()->toDateString()]);

        $this->get(route('public-careers'))->assertInertia(fn ($page) => $page->has('careers.data', 1));
        $this->get(route('public-careers.detail', $career))->assertOk();
    });

    it('hides a vacancy that closed yesterday everywhere', function () {
        $career = Career::factory()->create(['is_active' => true, 'closing_date' => now()->subDay()->toDateString()]);

        $this->get(route('public-careers'))->assertInertia(fn ($page) => $page->has('careers.data', 0));
        $this->get(route('public-careers.detail', $career))->assertNotFound();
    });

    it('does not let visitors download documents of closed or inactive vacancies', function () {
        Storage::disk('public')->put('careers/job.pdf', 'pdf');
        $inactive = Career::factory()->create(['is_active' => false, 'closing_date' => null, 'document' => 'careers/job.pdf']);
        $closed = Career::factory()->create(['is_active' => true, 'closing_date' => now()->subDay()->toDateString(), 'document' => 'careers/job.pdf']);
        $open = Career::factory()->create(['is_active' => true, 'closing_date' => null, 'document' => 'careers/job.pdf']);

        $this->get(route('public-careers.download', $inactive))->assertNotFound();
        $this->get(route('public-careers.download', $closed))->assertNotFound();
        $this->get(route('public-careers.download', $open))->assertOk();
    });

    it('answers 404 rather than 500 for a vacancy without a document', function () {
        $career = Career::factory()->create(['is_active' => true, 'closing_date' => null, 'document' => null]);

        $this->get(route('public-careers.download', $career))->assertNotFound();
    });
});

describe('document downloads', function () {
    it('serves active downloads and counts them', function () {
        Storage::disk('public')->put('downloads/form.pdf', 'pdf');
        $download = Download::factory()->create(['is_active' => true, 'file_path' => 'downloads/form.pdf', 'download_count' => 0, 'created_by' => null, 'updated_by' => null]);

        $this->get(route('public-downloads.download', $download))->assertOk();

        expect($download->fresh()->download_count)->toBe(1);
    });

    it('hides inactive downloads from visitors on both download URLs', function () {
        Storage::disk('public')->put('downloads/secret.pdf', 'pdf');
        $download = Download::factory()->create(['is_active' => false, 'file_path' => 'downloads/secret.pdf', 'created_by' => null, 'updated_by' => null]);

        $this->get(route('public-downloads.download', $download))->assertNotFound();
        $this->get(route('downloads.admin-download', $download))->assertNotFound();
        expect($download->fresh()->download_count)->toBe($download->download_count);
    });

    it('still lets permitted staff download an inactive file for review', function () {
        $this->seed(RoleAndPermissionSeeder::class);
        $staff = User::factory()->create();
        $staff->givePermissionTo('view downloads');
        Storage::disk('public')->put('downloads/draft.pdf', 'pdf');
        $download = Download::factory()->create(['is_active' => false, 'file_path' => 'downloads/draft.pdf', 'created_by' => null, 'updated_by' => null]);

        $this->actingAs($staff)->get(route('downloads.admin-download', $download))->assertOk();
    });

    it('hides inactive schedule of charges from visitors', function () {
        Storage::disk('public')->put('schedule-of-charges/old.pdf', 'pdf');
        $charge = ScheduleOfCharge::factory()->create(['is_active' => false, 'attachment' => 'schedule-of-charges/old.pdf', 'created_by' => null, 'updated_by' => null]);

        $this->get(route('rates.schedule-of-charges.download', $charge))->assertNotFound();
        $this->get(route('schedule-of-charges.admin-download', $charge))->assertNotFound();
    });
});

describe('pagination limits', function () {
    it('caps per_page on public lists so a visitor cannot dump a whole table', function () {
        Download::factory()->count(3)->create(['is_active' => true, 'created_by' => null, 'updated_by' => null]);

        $this->get(route('public-downloads', ['per_page' => 100000]))
            ->assertInertia(fn ($page) => $page->where('downloads.per_page', 100));
    });

    it('falls back to a sane size for nonsense values', function (mixed $value) {
        Download::factory()->count(2)->create(['is_active' => true, 'created_by' => null, 'updated_by' => null]);

        $this->get(route('public-downloads', ['per_page' => $value]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->where('downloads.per_page', 1));
    })->with(['zero' => 0, 'negative' => -5]);
});
