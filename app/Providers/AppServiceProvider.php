<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;
use Illuminate\Routing\PendingResourceRegistration;
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
         * A maker's store / update / destroy is held for approval instead of being executed (see ChangeRequestService).
         */
        PendingResourceRegistration::macro('guardedBy', function (string $permission) {
            /** @var PendingResourceRegistration $this */
            return $this
                ->middlewareFor(['index', 'show'], "permission:view {$permission}")
                ->middlewareFor('create', "permission:create {$permission}")
                ->middlewareFor('store', ["permission:create {$permission}", 'maker.checker'])
                ->middlewareFor('edit', "permission:edit {$permission}")
                ->middlewareFor('update', ["permission:edit {$permission}", 'maker.checker'])
                ->middlewareFor('destroy', ["permission:delete {$permission}", 'maker.checker']);
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
     * Per-IP limits: public pages, the public JSON API, file downloads; per-token limit for the extraction API.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('web-public', fn (Request $request) => Limit::perMinute(config('bank.security.web_rate_limit'))->by($request->ip()));
        RateLimiter::for('api', fn (Request $request) => Limit::perMinute(config('bank.security.api_rate_limit'))->by($request->ip()));
        RateLimiter::for('uploads', fn (Request $request) => Limit::perMinute(3000)->by($request->user()?->id ?: $request->ip()));
        RateLimiter::for('extract-ip', fn (Request $request) => Limit::perMinute(config('bank.extraction.rate_limit') * 4)->by($request->ip()));
        RateLimiter::for('extract', fn (Request $request) => Limit::perMinute(config('bank.extraction.rate_limit'))->by($request->bearerToken() ? hash('sha256', $request->bearerToken()) : $request->ip()));
        RateLimiter::for('downloads', fn (Request $request) => Limit::perMinute(config('bank.security.download_rate_limit'))->by($request->ip()));
    }
}
