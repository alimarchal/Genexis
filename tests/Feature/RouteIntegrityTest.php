<?php

use App\Models\Menu;
use App\Models\User;
use Database\Seeders\MenuSeeder;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Support\Facades\Route;

/**
 * Names passed to route('...') in the React code.
 *
 * @return array<string, list<string>> route name => files using it
 */
function routeNamesUsedByFrontend(): array
{
    $used = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(resource_path('js')));

    foreach ($iterator as $file) {
        if (! $file->isFile() || ! preg_match('/\.tsx?$/', $file->getFilename())) {
            continue;
        }

        preg_match_all('/\broute\(\s*[\'"]([A-Za-z0-9_.\-]+)[\'"]/', file_get_contents($file->getPathname()), $matches);

        foreach ($matches[1] as $name) {
            $used[$name][] = str_replace(resource_path('js').'/', '', $file->getPathname());
        }
    }

    return $used;
}

it('has a backend route for every route() name used by the frontend', function () {
    $missing = collect(routeNamesUsedByFrontend())
        ->reject(fn ($files, $name) => Route::has($name))
        ->map(fn ($files, $name) => $name.' <- '.$files[0])
        ->values()
        ->all();

    expect($missing)->toBeEmpty();
});

it('only links to existing public pages from breadcrumbs', function () {
    $publicLinks = ['/join-the-bank', '/documents', '/financials', '/rates', '/about-us'];

    foreach ($publicLinks as $path) {
        $status = $this->get($path)->status();
        expect($status)->toBeIn([200, 301], "$path returned $status");
    }
});

it('redirects the section landing URLs to their first page', function () {
    $this->get('/financials')->assertRedirect('/financials/statements')->assertStatus(301);
    $this->get('/rates')->assertRedirect('/rates/profit-rates')->assertStatus(301);
});

describe('navigation menu', function () {
    it('only references routes that exist in the seeded menu', function () {
        $this->seed(MenuSeeder::class);

        $broken = Menu::query()->whereNotNull('route_name')->get()
            ->reject(fn (Menu $menu) => Route::has($menu->route_name))
            ->map(fn (Menu $menu) => "{$menu->title} -> {$menu->route_name}")
            ->all();

        expect($broken)->toBeEmpty();
    });

    it('turns every seeded menu entry into a usable link', function () {
        $this->seed(MenuSeeder::class);

        $leaves = Menu::query()->where('is_active', true)->doesntHave('children')->get();

        expect($leaves)->not->toBeEmpty();
        foreach ($leaves as $leaf) {
            expect($leaf->url)->not->toBe('#', "Leaf menu '{$leaf->title}' has no working link");
        }
    });

    it('shares the menu with every page', function () {
        $this->seed(MenuSeeder::class);

        $this->get(route('contact'))->assertInertia(fn ($page) => $page
            ->has('menu')
            ->where('menu.0.title', 'Home'));
    });
});

describe('product type administration', function () {
    beforeEach(fn () => $this->seed(RoleAndPermissionSeeder::class));

    it('is reachable with the matching permission and forbidden without', function (string $route, string $permission) {
        $viewer = User::factory()->create();
        $viewer->givePermissionTo($permission);

        $this->actingAs($viewer)->get(route($route))->assertOk();
        $this->actingAs(User::factory()->create())->get(route($route))->assertForbidden();
    })->with([
        'product types' => ['product-types.index', 'view product types'],
        'product type accounts' => ['product-type-accounts.index', 'view product type accounts'],
    ]);

    it('redirects guests to login', function () {
        $this->get(route('product-types.index'))->assertRedirect(route('login'));
    });
});
