<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;
use Illuminate\Routing\PendingResourceRegistration;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
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
        $this->configureProxiesAndScheme();
        $this->configureRateLimiting();

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

    /**
     * Trust the configured reverse proxies so the real visitor IP reaches the rate limiters.
     */
    protected function configureProxiesAndScheme(): void
    {
        $proxies = config('bank.security.trusted_proxies');

        if (filled($proxies)) {
            TrustProxies::at($proxies === '*' ? '*' : array_map('trim', explode(',', $proxies)));
        }

        if (config('bank.security.force_https')) {
            URL::forceHttps();
        }
    }

    /**
     * Per-IP limits: public pages, the public JSON API, file downloads.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('web-public', fn (Request $request) => Limit::perMinute(config('bank.security.web_rate_limit'))->by($request->ip()));
        RateLimiter::for('api', fn (Request $request) => Limit::perMinute(config('bank.security.api_rate_limit'))->by($request->ip()));
        RateLimiter::for('uploads', fn (Request $request) => Limit::perMinute(3000)->by($request->user()?->id ?: $request->ip()));
        RateLimiter::for('downloads', fn (Request $request) => Limit::perMinute(config('bank.security.download_rate_limit'))->by($request->ip()));
    }
}
