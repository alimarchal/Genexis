<?php

use App\Models\BankService;
use App\Models\Career;
use App\Models\GalleryAlbum;
use App\Models\Menu;
use App\Models\NewsAnnouncement;
use App\Models\Service;
use App\Models\TouristAttraction;

function searchTitles(string $term): array
{
    return collect(test()->getJson('/api/search?q='.urlencode($term))->assertOk()->json('results'))->pluck('title')->all();
}

function news(string $title, array $attributes = []): NewsAnnouncement
{
    return NewsAnnouncement::factory()->create(array_merge([
        'title' => $title,
        'slug' => str($title)->slug()->toString(),
        'content' => "<p>$title body</p>",
        'is_published' => true,
        'published_date' => now()->subDay(),
    ], $attributes));
}

it('ignores queries shorter than two characters', function () {
    news('Zeta announcement');

    expect(searchTitles('z'))->toBe([])
        ->and(searchTitles('  '))->toBe([]);
});

it('only finds published news that is already visible', function () {
    news('Zeta live');
    news('Zeta draft', ['is_published' => false]);
    news('Zeta scheduled', ['published_date' => now()->addWeek()]);

    expect(searchTitles('zeta'))->toBe(['Zeta live']);
});

it('matches case-insensitively', function () {
    news('Branch Opening Ceremony');

    expect(searchTitles('BRANCH opening'))->toBe(['Branch Opening Ceremony']);
});

it('treats % and _ typed by the visitor literally instead of as wildcards', function () {
    news('Plain title one');
    news('Discount 100% offer');
    news('Under_score title');

    expect(searchTitles('%%'))->toBe([])
        ->and(searchTitles('100%'))->toBe(['Discount 100% offer'])
        ->and(searchTitles('n_t'))->toBe([])
        ->and(searchTitles('Under_score'))->toBe(['Under_score title']);
});

it('cuts excerpts on character boundaries so Urdu text never breaks the JSON response', function () {
    $urdu = str_repeat('بینک آف آزاد جموں و کشمیر ', 20);
    news('Urdu announcement', ['content' => "<p>$urdu</p>"]);

    $response = $this->getJson('/api/search?q=urdu');

    $response->assertOk();
    $excerpt = $response->json('results.0.excerpt');
    expect(mb_check_encoding($excerpt, 'UTF-8'))->toBeTrue()
        ->and(mb_strlen($excerpt))->toBeLessThanOrEqual(153)
        ->and($excerpt)->toEndWith('...');
});

it('strips markup from excerpts and does not leave half-open tags', function () {
    news('Markup test', ['content' => '<p>Hello <strong>world</strong> '.str_repeat('x', 200).'</p>']);

    $excerpt = $this->getJson('/api/search?q=markup')->json('results.0.excerpt');

    expect($excerpt)->not->toContain('<')->and($excerpt)->toStartWith('Hello world');
});

it('does not add an ellipsis to short text', function () {
    news('Short one', ['content' => 'Tiny body']);

    expect($this->getJson('/api/search?q=short')->json('results.0.excerpt'))->toBe('Tiny body');
});

it('links bank services to working pages', function () {
    BankService::factory()->create(['title' => 'Quartz service', 'status' => true, 'cta_link' => '/contact-us']);
    Service::factory()->create(['name' => 'Quartz locker', 'is_active' => true, 'slug' => 'quartz-locker']);

    $results = collect($this->getJson('/api/search?q=quartz')->assertOk()->json('results'));

    expect($results)->not->toBeEmpty();
    foreach ($results->pluck('url')->unique() as $url) {
        if ($url !== '#') {
            $this->get($url)->assertSuccessful();
        }
    }
});

it('caps very long queries', function () {
    $this->getJson('/api/search?q='.str_repeat('a', 5000))->assertOk();
});

describe('searching the rest of the site', function () {
    it('finds open career postings but not inactive ones', function () {
        Career::factory()->create(['title' => 'Quokka Analyst', 'is_active' => true]);
        Career::factory()->create(['title' => 'Quokka Hidden', 'is_active' => false]);

        expect(searchTitles('quokka'))->toBe(['Quokka Analyst']);
    });

    it('finds active gallery albums and tourist attractions and links to their pages', function () {
        $album = GalleryAlbum::factory()->create(['title' => 'Zephyr Meetings']);
        GalleryAlbum::factory()->inactive()->create(['title' => 'Zephyr Secret']);
        $place = TouristAttraction::factory()->create(['title' => 'Zephyr Lake']);

        $results = collect($this->getJson('/api/search?q=zephyr')->assertOk()->json('results'));

        expect($results->pluck('title')->all())->toBe(['Zephyr Meetings', 'Zephyr Lake'])
            ->and($results->firstWhere('type', 'Photo Gallery')['url'])->toBe(route('gallery.show', $album->slug))
            ->and($results->firstWhere('type', 'Tourist Attraction')['url'])->toBe(route('tourist-attractions.public.show', $place->slug));
    });

    it('finds the static pages that have no database record', function (string $term, string $title) {
        expect(searchTitles($term))->toContain($title);
    })->with([
        'loan calculator' => ['calculator', 'Loan Calculator'],
        'contact' => ['helpline', 'Contact Us'],
        'organogram' => ['hierarchy', 'Organogram'],
        'careers' => ['internship', 'Careers'],
        'gallery' => ['pictures', 'Photo Gallery'],
        'tourism' => ['tourism', 'Tourist Attractions'],
        'annual reports' => ['yearly', 'Annual Reports'],
    ]);

    it('finds visible menu items and skips parents without a link', function () {
        Menu::create(['title' => 'Quasar Corner', 'slug' => 'quasar', 'url' => '/quasar', 'sort_order' => 1, 'is_active' => true]);
        Menu::create(['title' => 'Quasar Parent', 'slug' => 'quasar-parent', 'url' => '#', 'sort_order' => 2, 'is_active' => true]);
        Menu::create(['title' => 'Quasar Off', 'slug' => 'quasar-off', 'url' => '/off', 'sort_order' => 3, 'is_active' => false]);

        expect(searchTitles('quasar'))->toBe(['Quasar Corner']);
    });
});
