<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class MenuService
{
    public function getMainMenu(): Collection
    {
        // For immediate updates, use very short cache in production
        $cacheKey = 'main_menu_v2'; 
        $cacheDuration = config('app.env') === 'production' ? now()->addSeconds(30) : now()->addMinutes(2);
        
        return Cache::remember($cacheKey, $cacheDuration, function () {
            \Log::info('Loading fresh menu data from database');
            return Menu::getMenuTree();
        });
    }

    public function clearMenuCache(): void
    {
        Cache::forget('main_menu');
        Cache::forget('main_menu_v2'); // Clear new cache key too
        
        // Clear any other menu-related cache keys
        $cacheKeys = [
            'formatted_menu',
            'navigation_menu', 
            'website_menu',
            'public_menu'
        ];
        
        foreach ($cacheKeys as $key) {
            Cache::forget($key);
        }
        
        \Log::info('All menu caches cleared');
    }

    public function formatMenuForFrontend($menus): array
    {
        // Convert to Collection if needed
        if (!$menus instanceof Collection) {
            $menus = collect($menus);
        }
        
        return $menus->map(function (Menu $menu) {
            return [
                'id' => $menu->id,
                'title' => $menu->title,
                'url' => $menu->url,
                'target' => $menu->target,
                'icon' => $menu->icon,
                'cssClass' => $menu->css_class,
                'isActive' => $menu->isActive(),
                'hasChildren' => $menu->hasChildren(),
                'isMegaMenu' => $menu->is_mega_menu,
                'children' => $menu->children->count() > 0
                    ? $this->formatMenuForFrontend($menu->children)
                    : [],
            ];
        })->toArray();
    }

    public function getBreadcrumbs(string $routeName, array $routeParams = []): array
    {
        $breadcrumbs = [];
        $menu = $this->findMenuByRoute($routeName, $routeParams);

        if ($menu) {
            $breadcrumbs = $this->buildBreadcrumbsFromMenu($menu);
        }

        return $breadcrumbs;
    }

    private function findMenuByRoute(string $routeName, array $routeParams = []): ?Menu
    {
        return Menu::where('route_name', $routeName)
            ->where('is_active', true)
            ->first();
    }

    private function buildBreadcrumbsFromMenu(Menu $menu): array
    {
        $breadcrumbs = [];
        $current = $menu;

        // Build breadcrumbs from bottom to top
        while ($current) {
            array_unshift($breadcrumbs, [
                'label' => $current->title,
                'href' => $current->url !== '#' ? $current->url : null,
                'isActive' => $current->id === $menu->id,
            ]);
            $current = $current->parent;
        }

        return $breadcrumbs;
    }
}
