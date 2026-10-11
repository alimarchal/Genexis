<?php

namespace App\Http\Middleware;

use App\Services\ChunkedUploadService;
use App\Services\MenuService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
                'permissions' => $request->user()?->getAllPermissions()->pluck('name') ?? [],
                'roles' => $request->user()?->getRoleNames() ?? [],
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // Dynamic navigation menu - always fresh with aggressive cache busting
            'menu' => function () {
                try {
                    $menuService = app(MenuService::class);

                    // Add timestamp to force fresh data in development
                    if (config('app.env') === 'local') {
                        Cache::forget('main_menu_v2');
                    }

                    return $menuService->formatMenuForFrontend($menuService->getMainMenu());
                } catch (\Exception $e) {
                    \Log::warning('Error loading main menu: '.$e->getMessage());

                    return [];
                }
            },
            // now every Inertia page has `bankBranchesCount` in props
            'uploadLimits' => fn () => $request->user() ? [
                'maxBytes' => app(ChunkedUploadService::class)->maxBytesFor($request->user()),
                'isSuperAdmin' => $request->user()->hasRole('super-admin'),
                'staffMaxBytes' => (int) config('bank.uploads.staff_max_bytes'),
            ] : null,
            'bankBranchesCount' => config('bank.stats.branches_count'),
            'contact_phone' => config('bank.contact.contact_phone'),
            'contact_email' => config('bank.contact.contact_email'),
            'contact_address' => config('bank.contact.contact_address'),
            'socialLinks' => [
                'facebook' => config('bank.social.facebook'),
                'twitter' => config('bank.social.twitter'),
                'instagram' => config('bank.social.instagram'),
                'linkedin' => config('bank.social.linkedin'),
                'youtube' => config('bank.social.youtube'),
            ],
            // Footer Links - Available on all pages
            'footerLinks' => [
                'banking' => [
                    'portal_login' => config('bank.footer.banking.portal_login'),
                    'branch_locator' => config('bank.footer.banking.branch_locator'),
                    'atm_locator' => config('bank.footer.banking.atm_locator'),
                    'exchange_rates' => config('bank.footer.banking.exchange_rates'),
                    'interest_rates' => config('bank.footer.banking.interest_rates'),
                    'forms' => config('bank.footer.banking.forms'),
                    'tenders' => config('bank.footer.banking.tenders'),
                ],
                'regulatory' => [
                    'privacy_policy' => config('bank.footer.regulatory.privacy_policy'),
                    'terms' => config('bank.footer.regulatory.terms'),
                    'cookie_policy' => config('bank.footer.regulatory.cookie_policy'),
                    'accessibility' => config('bank.footer.regulatory.accessibility'),
                    'regulatory_info' => config('bank.footer.regulatory.regulatory_info'),
                    'security_tips' => config('bank.footer.regulatory.security_tips'),
                    'fraud_prevention' => config('bank.footer.regulatory.fraud_prevention'),

                    'sbp' => config('bank.footer.regulatory.sbp'),
                    'banking_mohtasib' => config('bank.footer.regulatory.banking_mohtasib'),
                    'secp' => config('bank.footer.regulatory.secp'),
                    'goajk' => config('bank.footer.regulatory.goajk'),
                    'gopak' => config('bank.footer.regulatory.gopak'),
                    'ajk_tourism' => config('bank.footer.regulatory.ajk_tourism'),
                    'loan_calculator' => config('bank.loan_limits.calculator_url'),
                ],
            ],
            // Bank Rates - Available on all pages
            'bankRates' => [
                'loan' => [
                    'house' => config('bank.loan_rates.house'),
                    'personal' => config('bank.loan_rates.personal'),
                    'motorcycle' => config('bank.loan_rates.motorcycle'),
                    'student' => config('bank.loan_rates.student'),
                    'gold' => config('bank.loan_rates.gold'),
                    'home_appliances' => config('bank.loan_rates.home_appliances'),
                    'car' => config('bank.loan_rates.car'),
                    'business' => config('bank.loan_rates.business'),
                    'agriculture' => config('bank.loan_rates.agriculture'),
                    'salary' => config('bank.loan_rates.salary'),
                ],
                'deposit' => [
                    'savings' => config('bank.deposit_rates.savings'),
                    'current' => config('bank.deposit_rates.current'),
                    'term_1year' => config('bank.deposit_rates.term_1year'),
                    'term_2year' => config('bank.deposit_rates.term_2year'),
                    'term_3year' => config('bank.deposit_rates.term_3year'),
                    'term_5year' => config('bank.deposit_rates.term_5year'),
                    'special_savings' => config('bank.deposit_rates.special_savings'),
                ],
            ],
        ];
    }
}
