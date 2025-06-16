<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // now every Inertia page has `bankBranchesCount` in props
            'bankBranchesCount' => config('app.bank_branches_count'),
            'contact_phone' => config('app.contact_phone'),
            'contact_email' => config('app.contact_email'),
            'contact_address' => config('app.contact_address'), // Add this line
             'socialLinks' => [
                'facebook' => env('SOCIAL_FACEBOOK_URL', '#'),
                'twitter' => env('SOCIAL_TWITTER_URL', '#'),
                'instagram' => env('SOCIAL_INSTAGRAM_URL', '#'),
                'linkedin' => env('SOCIAL_LINKEDIN_URL', '#'),
                'youtube' => env('SOCIAL_YOUTUBE_URL', '#'),
            ],

        ];
    }
}
