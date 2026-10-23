<?php

namespace App\Http\Middleware;

use App\Services\ChangeRequestService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Maker-checker: instead of running a maker's add / edit / delete, store it as a pending change request.
 */
class HoldChangesForApproval
{
    public function __construct(private ChangeRequestService $changes) {}

    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->changes->mustHold($request)) {
            return $next($request);
        }

        $this->changes->hold($request, $request->user());

        return redirect()->route('admin.change-requests.index')
            ->with('success', 'Your change was sent for approval. It will appear on the website once a checker approves it.');
    }
}
