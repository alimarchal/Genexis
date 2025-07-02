<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class MenuService
{
    public function getMainMenu(): Collection
    {
        return Cache::remember('main_menu', now()->addMinutes(5), function () {
            return Menu::getMenuTree();
        });
    }

    public function clearMenuCache(): void
    {
        Cache::forget('main_menu');
    }

    public function formatMenuForFrontend(Collection $menus): array
    {
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
                'children' => $menu->children->isNotEmpty()
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
