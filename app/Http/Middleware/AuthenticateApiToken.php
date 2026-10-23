<?php

namespace App\Http\Middleware;

use App\Models\ApiToken;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Authenticates data extraction requests with "Authorization: Bearer <token>".
 */
class AuthenticateApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $plain = $request->bearerToken();
        $token = $plain ? ApiToken::findUsable($plain) : null;

        if (! $token) {
            return response()->json(['message' => 'Unauthenticated. Send a valid API token as "Authorization: Bearer <token>".'], 401, ['WWW-Authenticate' => 'Bearer']);
        }

        if (! $token->last_used_at || $token->last_used_at->lt(now()->subMinute())) {
            $token->forceFill(['last_used_at' => now()])->saveQuietly();
        }

        Auth::setUser($token->user);
        $request->attributes->set('api_token', $token);

        return $next($request);
    }
}
