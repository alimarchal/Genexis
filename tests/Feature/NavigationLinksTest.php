<?php

use App\Models\Menu;
use Database\Seeders\MenuSeeder;

it('shares the AJK PDO footer link and a Prime Minister portal link that appears once configured', function () {
    $this->get(route('contact'))
        ->assertInertia(fn ($page) => $page->where('footerLinks.regulatory.ajk_pdo', 'https://ajkpdo.com')->where('footerLinks.regulatory.ajk_pm_portal', null));

    config(['bank.footer.regulatory.ajk_pm_portal' => 'https://example.test/pm']);

    $this->get(route('contact'))
        ->assertInertia(fn ($page) => $page->where('footerLinks.regulatory.ajk_pm_portal', 'https://example.test/pm'));
});

it('links the organogram from the footer quick links and keeps its page reachable', function () {
    expect(file_get_contents(resource_path('js/components/footer/QuickLinks.tsx')))->toContain("route('about.organogram')");

    $this->get(route('about.organogram'))->assertOk();
});

describe('the organogram menu item migration', function () {
    $migration = fn () => require database_path('migrations/2026_10_26_000000_add_organogram_to_about_menu.php');

    it('adds the item under About on a site that does not have it', function () use ($migration) {
        $about = Menu::create(['title' => 'About', 'slug' => 'about-us', 'url' => '#', 'sort_order' => 2, 'is_active' => true]);
        Menu::create(['title' => 'Management', 'slug' => 'management', 'route_name' => 'about.management', 'parent_id' => $about->id, 'sort_order' => 4, 'is_active' => true]);

        $migration()->up();

        $item = Menu::where('route_name', 'about.organogram')->firstOrFail();
        expect($item->parent_id)->toBe($about->id)->and($item->sort_order)->toBe(5)->and($item->is_active)->toBeTrue();
    });

    it('does nothing when the item already exists, and can be repeated', function () use ($migration) {
        $this->seed(MenuSeeder::class);

        $migration()->up();
        $migration()->up();

        expect(Menu::where('route_name', 'about.organogram')->count())->toBe(1);
    });

    it('does nothing when there is no About menu', function () use ($migration) {
        $migration()->up();

        expect(Menu::where('route_name', 'about.organogram')->exists())->toBeFalse();
    });
});
