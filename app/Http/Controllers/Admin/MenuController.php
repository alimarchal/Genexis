<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MenuController extends Controller
{
    public function __construct(
        private MenuService $menuService
    ) {}

    public function index()
    {
        $menus = QueryBuilder::for(Menu::class)
            ->allowedFilters([
                AllowedFilter::partial('title'),
                AllowedFilter::exact('parent_id'),
                AllowedFilter::exact('is_active'),
            ])
            ->allowedSorts(['title', 'sort_order', 'created_at'])
            ->with(['parent', 'children'])
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Menu/Index', [
            'menus' => $menus,
            'filters' => request()->only(['filter']),
        ]);
    }

    public function create()
    {
        $parentMenus = Menu::whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Menu/Create', [
            'parentMenus' => $parentMenus,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menus,slug',
            'url' => 'nullable|string|max:500',
            'route_name' => 'nullable|string|max:255',
            'route_params' => 'nullable|array',
            'target' => 'required|in:_self,_blank',
            'icon' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:menus,id',
            'sort_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'is_mega_menu' => 'boolean',
            'css_class' => 'nullable|string|max:255',
        ]);

        // Handle boolean values
        $validated['is_active'] = $request->boolean('is_active');
        $validated['is_mega_menu'] = $request->boolean('is_mega_menu');

        Menu::create($validated);

        // Clear menu cache
        $this->menuService->clearMenuCache();

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu created successfully.');
    }

    public function show(Menu $menu)
    {
        $menu->load(['parent', 'children.children']);

        return Inertia::render('Admin/Menu/Show', [
            'menu' => $menu,
        ]);
    }

    public function edit(Menu $menu)
    {
        $parentMenus = Menu::whereNull('parent_id')
            ->where('is_active', true)
            ->where('id', '!=', $menu->id)
            ->orderBy('sort_order')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Menu/Edit', [
            'menu' => $menu,
            'parentMenus' => $parentMenus,
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:menus,slug,'.$menu->id,
            'url' => 'nullable|string|max:500',
            'route_name' => 'nullable|string|max:255',
            'route_params' => 'nullable|array',
            'target' => 'required|in:_self,_blank',
            'icon' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:menus,id',
            'sort_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'is_mega_menu' => 'boolean',
            'css_class' => 'nullable|string|max:255',
        ]);

        $menu->update($validated);

        // Clear menu cache
        $this->menuService->clearMenuCache();

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu updated successfully.');
    }

    public function destroy(Menu $menu)
    {
        // Check if menu has children
        if ($menu->children()->count() > 0) {
            return back()->with('error', 'Cannot delete menu item that has children.');
        }

        $menu->delete();

        // Clear menu cache
        $this->menuService->clearMenuCache();

        return redirect()->route('admin.menus.index')
            ->with('success', 'Menu deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:menus,id',
            'items.*.sort_order' => 'required|integer|min:0',
            'items.*.parent_id' => 'nullable|exists:menus,id',
        ]);

        foreach ($validated['items'] as $item) {
            Menu::where('id', $item['id'])->update([
                'sort_order' => $item['sort_order'],
                'parent_id' => $item['parent_id'],
            ]);
        }

        // Clear menu cache
        $this->menuService->clearMenuCache();

        return response()->json(['message' => 'Menu order updated successfully.']);
    }

    /**
     * Clear menu cache
     */
    public function clearCache()
    {
        $this->menuService->clearMenuCache();

        return response()->json(['message' => 'Menu cache cleared successfully.']);
    }
}
