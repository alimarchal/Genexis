<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\QueryBuilder\AllowedFilter;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'image',
        'is_active',
        'sort_order',
        'meta_data',
    ];

    protected $casts = [
        'meta_data' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function booted()
    {
        // When a service is created, add it to the menu
        static::created(function ($service) {
            $service->addToMenu();
        });

        // When a service is updated, update the menu
        static::updated(function ($service) {
            $service->updateMenu();
        });

        // When a service is deleted, remove from menu
        static::deleted(function ($service) {
            $service->removeFromMenu();
        });
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(ServiceAttribute::class)->orderBy('sort_order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
            AllowedFilter::partial('description'),
            AllowedFilter::exact('is_active'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'sort_order',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            return asset('storage/'.$this->image);
        }

        return null;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Add this service to the navigation menu
     */
    protected function addToMenu(): void
    {
        // Skip hardcoded services
        if (in_array($this->slug, ['lockers-facility', 'utility-bills-collection', 'services-for-ajk-psc', 'home-remittance'])) {
            return;
        }

        // Find the Services parent menu
        $servicesParent = \App\Models\Menu::where('slug', 'services')->first();
        
        if ($servicesParent && $this->is_active) {
            // Check if menu item already exists
            $existingMenu = \App\Models\Menu::where('parent_id', $servicesParent->id)
                ->where('route_name', 'service-pages.show')
                ->whereJsonContains('route_params->slug', $this->slug)
                ->first();

            if (!$existingMenu) {
                // Get the highest sort order for dynamic services
                $maxOrder = \App\Models\Menu::where('parent_id', $servicesParent->id)
                    ->where('route_name', 'service-pages.show')
                    ->max('sort_order') ?? 9;

                \App\Models\Menu::create([
                    'title' => $this->name,
                    'slug' => $this->slug,
                    'route_name' => 'service-pages.show',
                    'route_params' => ['slug' => $this->slug],
                    'parent_id' => $servicesParent->id,
                    'sort_order' => $maxOrder + 1,
                    'is_active' => true,
                ]);

                $this->clearMenuCache();
            }
        }
    }

    /**
     * Update the corresponding menu item
     */
    protected function updateMenu(): void
    {
        // Skip hardcoded services
        if (in_array($this->slug, ['lockers-facility', 'utility-bills-collection', 'services-for-ajk-psc', 'home-remittance'])) {
            return;
        }

        $servicesParent = \App\Models\Menu::where('slug', 'services')->first();
        
        if ($servicesParent) {
            $menuItem = \App\Models\Menu::where('parent_id', $servicesParent->id)
                ->where('route_name', 'service-pages.show')
                ->whereJsonContains('route_params->slug', $this->getOriginal('slug') ?? $this->slug)
                ->first();

            if ($menuItem) {
                if ($this->is_active) {
                    // Update the menu item
                    $menuItem->update([
                        'title' => $this->name,
                        'slug' => $this->slug,
                        'route_params' => ['slug' => $this->slug],
                        'is_active' => true,
                    ]);
                } else {
                    // Service is inactive, remove from menu
                    $menuItem->delete();
                }
                
                $this->clearMenuCache();
            } elseif ($this->is_active) {
                // Service was reactivated, add to menu
                $this->addToMenu();
            }
        }
    }

    /**
     * Remove the service from the navigation menu
     */
    protected function removeFromMenu(): void
    {
        // Skip hardcoded services
        if (in_array($this->slug, ['lockers-facility', 'utility-bills-collection', 'services-for-ajk-psc', 'home-remittance'])) {
            return;
        }

        $servicesParent = \App\Models\Menu::where('slug', 'services')->first();
        
        if ($servicesParent) {
            \App\Models\Menu::where('parent_id', $servicesParent->id)
                ->where('route_name', 'service-pages.show')
                ->whereJsonContains('route_params->slug', $this->slug)
                ->delete();

            $this->clearMenuCache();
        }
    }

    /**
     * Clear menu cache immediately and thoroughly
     */
    protected function clearMenuCache(): void
    {
        try {
            // Clear menu service cache
            if (app()->bound(\App\Services\MenuService::class)) {
                app(\App\Services\MenuService::class)->clearMenuCache();
            }

            // Also clear general Laravel cache that might contain menu data
            \Illuminate\Support\Facades\Cache::forget('main_menu');
            \Illuminate\Support\Facades\Cache::forget('main_menu_v2');
            
            // Clear any cache tags related to menus
            if (method_exists(\Illuminate\Support\Facades\Cache::class, 'tags')) {
                \Illuminate\Support\Facades\Cache::tags(['menu', 'navigation'])->flush();
            }

            \Log::info('Menu cache cleared due to service change: ' . $this->name);
            
        } catch (\Exception $e) {
            \Log::warning('Failed to clear menu cache: ' . $e->getMessage());
        }
    }
}
