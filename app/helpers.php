<?php

// app/helpers.php

use App\Models\Menu;
use App\Services\MenuService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

if (! function_exists('auto_breadcrumbs')) {
    /**
     * Generate breadcrumbs automatically based on current route
     */
    function auto_breadcrumbs(): array
    {
        try {
            $menuService = app(MenuService::class);
            $routeName = Route::currentRouteName();
            $routeParams = request()->route()?->parameters() ?? [];

            if ($routeName) {
                return $menuService->getBreadcrumbs($routeName, $routeParams);
            }
        } catch (\Exception $e) {
            // Log error but don't break the application
            \Log::warning('Error generating auto breadcrumbs: '.$e->getMessage());
        }

        return [];
    }
}

if (! function_exists('get_active_menu_item')) {
    /**
     * Get the currently active menu item
     */
    function get_active_menu_item(): ?\App\Models\Menu
    {
        try {
            $routeName = Route::currentRouteName();

            if ($routeName) {
                return \App\Models\Menu::where('route_name', $routeName)
                    ->where('is_active', true)
                    ->first();
            }
        } catch (\Exception $e) {
            \Log::warning('Error getting active menu item: '.$e->getMessage());
        }

        return null;
    }
}

if (! function_exists('clear_menu_cache')) {
    /**
     * Clear menu cache - useful for admin operations
     */
    function clear_menu_cache(): void
    {
        try {
            app(MenuService::class)->clearMenuCache();
        } catch (\Exception $e) {
            \Log::warning('Error clearing menu cache: '.$e->getMessage());
        }
    }
}

if (! function_exists('get_menu_tree')) {
    /**
     * Get formatted menu tree for frontend
     */
    function get_menu_tree(): array
    {
        try {
            $menuService = app(MenuService::class);

            return $menuService->formatMenuForFrontend(
                $menuService->getMainMenu()
            );
        } catch (\Exception $e) {
            \Log::warning('Error getting menu tree: '.$e->getMessage());

            return [];
        }
    }
}
