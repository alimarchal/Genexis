<?php

namespace App\Providers;

use Illuminate\Routing\PendingResourceRegistration;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Guard a resource route with one permission per action:
         * view (index, show), create (create, store), edit (edit, update), delete (destroy).
         */
        PendingResourceRegistration::macro('guardedBy', function (string $permission) {
            /** @var PendingResourceRegistration $this */
            return $this
                ->middlewareFor(['index', 'show'], "can:view {$permission}")
                ->middlewareFor(['create', 'store'], "can:create {$permission}")
                ->middlewareFor(['edit', 'update'], "can:edit {$permission}")
                ->middlewareFor('destroy', "can:delete {$permission}");
        });

        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-admin') ? true : null;
        });
    }
}
