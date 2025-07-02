<?php

namespace App\Console\Commands;

use App\Models\Menu;
use App\Models\Service;
use App\Services\MenuService;
use Illuminate\Console\Command;

class SyncServiceMenusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'menu:sync-services
                            {--force : Force sync even if menus exist}
                            {--dry-run : Show what would be done without making changes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync services with navigation menu items';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        $force = $this->option('force');

        $this->info('Starting service menu synchronization...');

        // Find the Services parent menu
        $servicesParent = Menu::where('slug', 'services')->first();

        if (!$servicesParent) {
            $this->error('Services parent menu not found. Please run the MenuSeeder first.');
            return 1;
        }

        // Get all active services except hardcoded ones
        $services = Service::active()
            ->whereNotIn('slug', ['lockers-facility', 'utility-bills-collection', 'services-for-ajk-psc', 'home-remittance'])
            ->ordered()
            ->get();

        $this->info("Found {$services->count()} services to sync.");

        // Get existing service menu items
        $existingMenus = Menu::where('parent_id', $servicesParent->id)
            ->where('route_name', 'service-pages.show')
            ->get();

        $this->info("Found {$existingMenus->count()} existing service menu items.");

        $created = 0;
        $updated = 0;
        $deleted = 0;

        // Create or update menu items for active services
        foreach ($services as $index => $service) {
            $existingMenu = $existingMenus->firstWhere('route_params.slug', $service->slug);

            if ($existingMenu) {
                // Update existing menu
                if ($existingMenu->title !== $service->name || !$existingMenu->is_active) {
                    if (!$isDryRun) {
                        $existingMenu->update([
                            'title' => $service->name,
                            'slug' => $service->slug,
                            'is_active' => true,
                        ]);
                    }
                    $updated++;
                    $this->line("Updated menu item: {$service->name}");
                }
            } else {
                // Create new menu item
                if (!$isDryRun) {
                    $maxOrder = Menu::where('parent_id', $servicesParent->id)
                        ->where('route_name', 'service-pages.show')
                        ->max('sort_order') ?? 9;

                    Menu::create([
                        'title' => $service->name,
                        'slug' => $service->slug,
                        'route_name' => 'service-pages.show',
                        'route_params' => ['slug' => $service->slug],
                        'parent_id' => $servicesParent->id,
                        'sort_order' => $maxOrder + 1,
                        'is_active' => true,
                    ]);
                }
                $created++;
                $this->line("Created menu item: {$service->name}");
            }
        }

        // Remove menu items for services that no longer exist or are inactive
        $activeServiceSlugs = $services->pluck('slug')->toArray();
        $menusToDelete = $existingMenus->filter(function ($menu) use ($activeServiceSlugs) {
            return !in_array($menu->route_params['slug'] ?? '', $activeServiceSlugs);
        });

        foreach ($menusToDelete as $menu) {
            if (!$isDryRun) {
                $menu->delete();
            }
            $deleted++;
            $this->line("Deleted menu item: {$menu->title}");
        }

        // Clear menu cache
        if (!$isDryRun && ($created > 0 || $updated > 0 || $deleted > 0)) {
            app(MenuService::class)->clearMenuCache();
            $this->info('Menu cache cleared.');
        }

        if ($isDryRun) {
            $this->warn('DRY RUN - No changes were made.');
        }

        $this->info("Synchronization complete!");
        $this->table(['Action', 'Count'], [
            ['Created', $created],
            ['Updated', $updated],
            ['Deleted', $deleted],
        ]);

        return 0;
    }
}
