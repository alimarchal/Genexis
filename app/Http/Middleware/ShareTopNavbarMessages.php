<?php

namespace App\Http\Middleware;

use App\Models\TopNavbarMessage;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareTopNavbarMessages
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Share top navbar messages with all pages
        Inertia::share([
            'topNavbarMessages' => TopNavbarMessage::active()->ordered()->get(),
        ]);

        return $next($request);
    }
}
