<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestMenuHelpers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'menu:test-helpers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test menu helper functions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Menu Helper Functions...');

        // Test get_menu_tree
        $this->info('1. Testing get_menu_tree():');
        $menuTree = get_menu_tree();
        $this->line('Menu items found: '.count($menuTree));
        foreach ($menuTree as $item) {
            $this->line("  - {$item['title']} ({$item['url']})");
            if (! empty($item['children'])) {
                foreach ($item['children'] as $child) {
                    $this->line("    - {$child['title']} ({$child['url']})");
                }
            }
        }

        $this->newLine();

        // Test clear_menu_cache
        $this->info('2. Testing clear_menu_cache():');
        clear_menu_cache();
        $this->line('Menu cache cleared successfully');

        $this->newLine();

        // Test menu creation for breadcrumbs
        $this->info('3. Testing breadcrumb generation:');

        // Simulate route for testing
        app('router')->get('/test-about-management', function () {
            return 'test';
        })->name('about.management');

        // Mock the route
        request()->setRouteResolver(function () {
            $route = new \Illuminate\Routing\Route('GET', '/test-about-management', []);
            $route->name('about.management');

            return $route;
        });

        // Set current route name for testing
        app('router')->currentRouteNamed('about.management');

        $breadcrumbs = auto_breadcrumbs();

        if (empty($breadcrumbs)) {
            $this->warn('No breadcrumbs found. Make sure menu items exist with route_name "about.management"');
        } else {
            $this->line('Breadcrumbs generated:');
            foreach ($breadcrumbs as $breadcrumb) {
                $active = $breadcrumb['isActive'] ? ' (active)' : '';
                $this->line("  - {$breadcrumb['label']}{$active}");
            }
        }

        $this->newLine();
        $this->info('Menu helper tests completed!');
    }
}
