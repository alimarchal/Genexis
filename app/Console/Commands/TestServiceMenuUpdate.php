<?php

namespace App\Console\Commands;

use App\Models\Service;
use App\Services\MenuService;
use Illuminate\Console\Command;

class TestServiceMenuUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:service-menu {action=toggle} {slug=credit-card-services}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test automatic service menu updates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $slug = $this->argument('slug');
        $action = $this->argument('action');

        $service = Service::where('slug', $slug)->first();

        if (!$service) {
            $this->error("Service with slug '{$slug}' not found.");
            return 1;
        }

        $this->info("Testing automatic menu updates for: {$service->name}");
        $this->info("Current status: " . ($service->is_active ? 'ACTIVE' : 'INACTIVE'));

        if ($action === 'toggle') {
            $newStatus = !$service->is_active;
            $service->update(['is_active' => $newStatus]);
            $this->info("Status updated to: " . ($newStatus ? 'ACTIVE' : 'INACTIVE'));
        } elseif ($action === 'activate') {
            $service->update(['is_active' => true]);
            $this->info("Service activated");
        } elseif ($action === 'deactivate') {
            $service->update(['is_active' => false]);
            $this->info("Service deactivated");
        }

        // Check menu after update
        sleep(1); // Small delay to ensure cache is cleared
        
        $menuService = app(MenuService::class);
        $menuData = $menuService->formatMenuForFrontend($menuService->getMainMenu());
        
        $servicesMenu = collect($menuData)->firstWhere('title', 'Services');
        $serviceInMenu = false;
        
        if ($servicesMenu && isset($servicesMenu['children'])) {
            $serviceInMenu = collect($servicesMenu['children'])
                ->contains(function ($child) use ($slug) {
                    return isset($child['url']) && str_contains($child['url'], $slug);
                });
        }

        $this->info("Service appears in menu: " . ($serviceInMenu ? 'YES' : 'NO'));
        
        if ($service->is_active && !$serviceInMenu) {
            $this->warn("⚠️  Service is active but not in menu - cache may not have cleared");
        } elseif (!$service->is_active && $serviceInMenu) {
            $this->warn("⚠️  Service is inactive but still in menu - cache may not have cleared");
        } else {
            $this->info("✅ Menu status matches service status - auto-clear working!");
        }

        return 0;
    }
}
