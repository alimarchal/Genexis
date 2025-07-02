<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Route;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'url',
        'route_name',
        'route_params',
        'target',
        'icon',
        'parent_id',
        'sort_order',
        'is_active',
        'is_mega_menu',
        'css_class',
    ];

    protected $casts = [
        'route_params' => 'array',
        'is_active' => 'boolean',
        'is_mega_menu' => 'boolean',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id')
            ->where('is_active', true)
            ->orderBy('sort_order');
    }

    public function allChildren(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id')
            ->orderBy('sort_order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeMainMenu($query)
    {
        return $query->whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('sort_order');
    }

    public function getUrlAttribute($value): string
    {
        // If URL is set directly, return it
        if ($value) {
            return $value;
        }

        // If route name is set, generate URL from route
        if ($this->route_name) {
            try {
                $routeParams = $this->route_params ?? [];

                return route($this->route_name, $routeParams);
            } catch (\Exception $e) {
                return '#';
            }
        }

        return '#';
    }

    public function isActive(): bool
    {
        $currentUrl = request()->url();
        $menuUrl = $this->url;

        // Exact match
        if ($currentUrl === $menuUrl) {
            return true;
        }

        // Check if any child is active
        if ($this->children->count() > 0) {
            foreach ($this->children as $child) {
                if ($child->isActive()) {
                    return true;
                }
            }
        }

        // Check if current route matches
        if ($this->route_name && Route::currentRouteName() === $this->route_name) {
            return true;
        }

        return false;
    }

    public function hasChildren(): bool
    {
        return $this->children->count() > 0;
    }

    public static function getMenuTree(): \Illuminate\Support\Collection
    {
        return static::with(['children' => function ($query) {
            $query->where('is_active', true)
                  ->with(['children' => function ($subQuery) {
                      $subQuery->where('is_active', true)->orderBy('sort_order');
                  }])->orderBy('sort_order');
        }])
            ->mainMenu() // This already filters by is_active = true and parent_id = null
            ->get();
    }
}
