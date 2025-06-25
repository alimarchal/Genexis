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
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // now every Inertia page has `bankBranchesCount` in props
            'bankBranchesCount' => config('app.bank_branches_count'),
            'contact_phone' => config('app.contact_phone'),
            'contact_email' => config('app.contact_email'),
            'contact_address' => config('app.contact_address'),
            'socialLinks' => [
                'facebook' => env('SOCIAL_FACEBOOK_URL', '#'),
                'twitter' => env('SOCIAL_TWITTER_URL', '#'),
                'instagram' => env('SOCIAL_INSTAGRAM_URL', '#'),
                'linkedin' => env('SOCIAL_LINKEDIN_URL', '#'),
                'youtube' => env('SOCIAL_YOUTUBE_URL', '#'),
            ],
            // Footer Links - Available on all pages
            'footerLinks' => [
                'banking' => [
                    'portal_login' => env('PORTAL_LOGIN_URL', 'https://bankajk.com/portal-login'),
                    'branch_locator' => env('BRANCH_LOCATOR_URL', 'https://bankajk.com/branch-locator'),
                    'atm_locator' => env('ATM_LOCATOR_URL', 'https://bankajk.com/atm-locator'),
                    'exchange_rates' => env('EXCHANGE_RATES_URL', 'https://bankajk.com/exchange-rates'),
                    'interest_rates' => env('INTEREST_RATES_URL', 'https://bankajk.com/interest-rates'),
                    'forms' => env('FORMS_URL', 'https://bankajk.com/forms-applications'),
                    'tenders' => env('TENDERS_URL', 'https://bankajk.com/tenders-notices'),
                ],
                'regulatory' => [
                    'privacy_policy' => env('PRIVACY_POLICY_URL', 'https://bankajk.com/privacy-policy'),
                    'terms' => env('TERMS_URL', 'https://bankajk.com/terms-conditions'),
                    'cookie_policy' => env('COOKIE_POLICY_URL', 'https://bankajk.com/cookie-policy'),
                    'accessibility' => env('ACCESSIBILITY_URL', 'https://bankajk.com/accessibility'),
                    'regulatory_info' => env('REGULATORY_INFO_URL', 'https://bankajk.com/regulatory-information'),
                    'security_tips' => env('SECURITY_TIPS_URL', 'https://bankajk.com/security-tips'),
                    'fraud_prevention' => env('FRAUD_PREVENTION_URL', 'https://bankajk.com/fraud-prevention'),
                ],
            ],
            // Bank Rates - Available on all pages
            'bankRates' => [
                'loan' => [
                    'house' => (float) env('LOAN_RATE_HOUSE', 11.5),
                    'personal' => (float) env('LOAN_RATE_PERSONAL', 14.0),
                    'motorcycle' => (float) env('LOAN_RATE_MOTORCYCLE', 13.5),
                    'student' => (float) env('LOAN_RATE_STUDENT', 10.0),
                    'gold' => (float) env('LOAN_RATE_GOLD', 12.0),
                    'home_appliances' => (float) env('LOAN_RATE_HOME_APPLIANCES', 13.0),
                    'car' => (float) env('LOAN_RATE_CAR', 12.5),
                    'business' => (float) env('LOAN_RATE_BUSINESS', 13.5),
                    'agriculture' => (float) env('LOAN_RATE_AGRICULTURE', 11.0),
                    'salary' => (float) env('LOAN_RATE_SALARY', 15.0),
                ],
                'deposit' => [
                    'savings' => (float) env('DEPOSIT_RATE_SAVINGS', 7.0),
                    'current' => (float) env('DEPOSIT_RATE_CURRENT', 0.0),
                    'term_1year' => (float) env('DEPOSIT_RATE_TERM_1YEAR', 8.5),
                    'term_2year' => (float) env('DEPOSIT_RATE_TERM_2YEAR', 9.0),
                    'term_3year' => (float) env('DEPOSIT_RATE_TERM_3YEAR', 9.5),
                    'term_5year' => (float) env('DEPOSIT_RATE_TERM_5YEAR', 10.0),
                    'special_savings' => (float) env('DEPOSIT_RATE_SPECIAL_SAVINGS', 8.0),
                ],
            ],
        ];
    }
}