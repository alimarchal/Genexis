<?php

use App\Models\AboutUs;
use App\Models\AnnualReport;
use App\Models\BankService;
use App\Models\BoardOfDirector;
use App\Models\BodCommittee;
use App\Models\Branch;
use App\Models\Career;
use App\Models\Carousel;
use App\Models\District;
use App\Models\Division;
use App\Models\Download;
use App\Models\FinancialHighlight;
use App\Models\FinancialReport;
use App\Models\Management;
use App\Models\NewsAnnouncement;
use App\Models\Product;
use App\Models\ProductScheme;
use App\Models\ProductType;
use App\Models\ProductTypeAccount;
use App\Models\ProfitRate;
use App\Models\Region;
use App\Models\ScheduleOfCharge;
use App\Models\Service;
use App\Models\TopNavbarMessage;
use App\Models\User;
use Illuminate\Support\Facades\Schema;

beforeEach(function () {
    $this->maker = $this->createAdminUser();
    $this->editor = User::factory()->create();
});

/**
 * One way to create a record of every admin module that has the tracking columns.
 *
 * @return array<string, Closure(): mixed>
 */
function trackedRecords(): array
{
    $division = fn () => Division::create(['name' => 'Test Division', 'short_name' => 'TD', 'is_active' => true]);
    $region = fn () => Region::factory()->create(['division_id' => $division()->id]);
    $account = function () {
        $product = Product::create(['name' => 'Product']);
        $type = ProductType::create(['product_id' => $product->id, 'name' => 'Type']);

        return ProductTypeAccount::create(['product_type_id' => $type->id, 'name' => 'Account']);
    };

    return [
        'about us' => fn () => AboutUs::factory()->create(),
        'annual report' => fn () => AnnualReport::factory()->create(),
        'bank service' => fn () => BankService::factory()->create(),
        'board of directors' => fn () => BoardOfDirector::factory()->create(),
        'bod committee' => fn () => BodCommittee::factory()->create(),
        'branch' => fn () => Branch::factory()->create(['region_id' => $region()->id, 'district_id' => District::factory()->create(['region_id' => $region()->id])->id]),
        'career' => fn () => Career::factory()->create(),
        'carousel' => fn () => Carousel::factory()->create(),
        'district' => fn () => District::factory()->create(['region_id' => $region()->id]),
        'download' => fn () => Download::factory()->create(),
        'financial highlight' => fn () => FinancialHighlight::factory()->create(),
        'financial report' => fn () => FinancialReport::factory()->create(),
        'management' => fn () => Management::factory()->create(),
        'news' => fn () => NewsAnnouncement::factory()->create(),
        'product' => fn () => Product::create(['name' => 'Product']),
        'product type' => fn () => ProductType::create(['product_id' => Product::create(['name' => 'P'])->id, 'name' => 'Type']),
        'product scheme' => fn () => ProductScheme::create(['product_type_account_id' => $account()->id, 'name' => 'Scheme']),
        'profit rate' => fn () => ProfitRate::factory()->create(),
        'region' => $region,
        'schedule of charge' => fn () => ScheduleOfCharge::factory()->create(),
        'service' => fn () => Service::factory()->create(),
        'top navbar message' => fn () => TopNavbarMessage::factory()->create(),
    ];
}

it('saves the logged-in user as creator and last updater for every admin module', function (string $module) {
    $this->actingAs($this->maker);
    $record = trackedRecords()[$module]();

    expect($record->fresh()->created_by)->toBe($this->maker->id)
        ->and($record->fresh()->updated_by)->toBe($this->maker->id);

    $this->actingAs($this->editor);
    $record->forceFill(['updated_at' => now()->addMinute()])->save();

    expect($record->fresh()->created_by)->toBe($this->maker->id)
        ->and($record->fresh()->updated_by)->toBe($this->editor->id)
        ->and($record->fresh()->creator->is($this->maker))->toBeTrue()
        ->and($record->fresh()->updater->is($this->editor))->toBeTrue();
})->with(array_keys(trackedRecords()));

it('keeps the recorded users when a change has no logged-in user', function () {
    $this->actingAs($this->maker);
    $record = Download::factory()->create();

    auth()->logout();
    $record->forceFill(['download_count' => 99])->save();

    expect($record->fresh()->created_by)->toBe($this->maker->id)
        ->and($record->fresh()->updated_by)->toBe($this->maker->id);
});

it('has the tracking columns on every table that holds admin-managed content', function (string $table) {
    expect(Schema::hasColumns($table, ['created_by', 'updated_by']))->toBeTrue();
})->with([
    'about_us', 'board_of_directors', 'divisions', 'news_announcements', 'product_schemes', 'product_scheme_attributes', 'product_types',
    'product_type_accounts', 'products', 'service_attributes', 'services', 'top_navbar_messages', 'managements', 'carousels',
]);

it('shows who created and last changed a record on the admin view page', function () {
    $this->actingAs($this->maker);
    $career = Career::factory()->create();
    $this->actingAs($this->editor);
    $career->forceFill(['title' => 'Edited title'])->save();

    $this->actingAs($this->maker)->get(route('careers.show', $career))
        ->assertInertia(fn ($page) => $page
            ->where('career.creator.name', $this->maker->name)
            ->where('career.updater.name', $this->editor->name));
});

it('does not record a visitor as the last updater when a page view or download is counted', function () {
    $this->actingAs($this->maker);
    $career = Career::factory()->create(['is_active' => true, 'closing_date' => null]);
    $download = Download::factory()->create(['is_active' => true]);

    $this->actingAs($this->editor);
    $career->incrementViews();
    $download->incrementDownloadCount();

    expect($career->fresh()->updated_by)->toBe($this->maker->id)
        ->and($career->updated_by)->toBe($this->maker->id)
        ->and($download->fresh()->updated_by)->toBe($this->maker->id)
        ->and($career->fresh()->views_count)->toBe($career->views_count);
});
