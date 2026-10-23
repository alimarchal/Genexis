<?php

use App\Models\Menu;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Cache;

return new class extends Migration
{
    /**
     * The About menu of a running site is edited in the admin panel, so a site that was set up before the
     * Organogram page existed has no link to it. Add one under About unless it is already there.
     */
    public function up(): void
    {
        if (Menu::where('route_name', 'about.organogram')->exists()) {
            return;
        }

        $about = Menu::where('slug', 'about-us')->whereNull('parent_id')->first();

        if (! $about) {
            return;
        }

        Menu::create([
            'title' => 'Organogram',
            'slug' => 'organogram',
            'route_name' => 'about.organogram',
            'parent_id' => $about->id,
            'sort_order' => (int) Menu::where('parent_id', $about->id)->max('sort_order') + 1,
            'is_active' => true,
        ]);

        Cache::forget('main_menu_v2');
    }

    public function down(): void
    {
        Menu::where('route_name', 'about.organogram')->where('slug', 'organogram')->delete();

        Cache::forget('main_menu_v2');
    }
};
