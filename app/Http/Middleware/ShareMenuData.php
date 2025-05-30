<?php

namespace App\Http\Middleware;

use App\Services\MenuService;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareMenuData
{
    public function __construct(
        private MenuService $menuService
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share([
            'menu' => fn () => $this->menuService->formatMenuForFrontend(
                $this->menuService->getMainMenu()
            ),
        ]);

        return $next($request);
    }
}
