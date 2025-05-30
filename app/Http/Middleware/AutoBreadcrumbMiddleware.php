<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AutoBreadcrumbMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Add auto breadcrumbs to Inertia shared data
        Inertia::share([
            'autoBreadcrumbs' => fn () => auto_breadcrumbs(),
        ]);

        return $next($request);
    }
}
