<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Career;
use App\Models\Carousel;
use App\Models\ContactSubmission;
use App\Models\Download;
use App\Models\NewsAnnouncement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private const CHART_DAYS = 14;

    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Dashboard', [
            'stats' => $this->stats($request),
            'attention' => $this->attention($request),
            'messages' => $user->can('view contact submissions') ? $this->messages() : null,
        ]);
    }

    /**
     * Headline numbers, limited to the areas the user is allowed to see.
     *
     * @return list<array{key: string, label: string, value: int, hint: string, href: string}>
     */
    private function stats(Request $request): array
    {
        $user = $request->user();

        $candidates = [
            ['permission' => 'view branches', 'key' => 'branches', 'label' => 'Active branches', 'href' => route('branches.index'),
                'value' => fn () => Branch::active()->count(),
                'hint' => fn () => Branch::count().' in total'],
            ['permission' => 'view news announcements', 'key' => 'news', 'label' => 'Published news', 'href' => route('news-announcements.index'),
                'value' => fn () => NewsAnnouncement::published()->recent()->count(),
                'hint' => fn () => NewsAnnouncement::count().' in total'],
            ['permission' => 'view careers', 'key' => 'careers', 'label' => 'Open vacancies', 'href' => route('careers.index'),
                'value' => fn () => Career::active()->open()->count(),
                'hint' => fn () => Career::count().' in total'],
            ['permission' => 'view downloads', 'key' => 'downloads', 'label' => 'Public downloads', 'href' => route('downloads.index'),
                'value' => fn () => Download::where('is_active', true)->count(),
                'hint' => fn () => number_format((int) Download::sum('download_count')).' total downloads'],
            ['permission' => 'view carousels', 'key' => 'carousels', 'label' => 'Homepage slides', 'href' => route('carousels.index'),
                'value' => fn () => Carousel::where('status', 'active')->count(),
                'hint' => fn () => Carousel::count().' in total'],
        ];

        return collect($candidates)
            ->filter(fn (array $item) => $user->can($item['permission']))
            ->map(fn (array $item) => [
                'key' => $item['key'],
                'label' => $item['label'],
                'value' => (int) $item['value'](),
                'hint' => $item['hint'](),
                'href' => $item['href'],
            ])
            ->values()
            ->all();
    }

    /**
     * Content that needs an editor's attention.
     *
     * @return list<array{key: string, label: string, count: int, href: string}>
     */
    private function attention(Request $request): array
    {
        $user = $request->user();
        $today = now()->toDateString();
        $inWeek = now()->addDays(7)->toDateString();

        $candidates = [
            ['permission' => 'view careers', 'key' => 'careers_closing', 'label' => 'Vacancies closing within 7 days', 'href' => route('careers.index'),
                'count' => fn () => Career::active()->whereBetween('closing_date', [$today, $inWeek])->count()],
            ['permission' => 'view news announcements', 'key' => 'news_drafts', 'label' => 'News drafts (not published)', 'href' => route('news-announcements.index'),
                'count' => fn () => NewsAnnouncement::where('is_published', false)->count()],
            ['permission' => 'view news announcements', 'key' => 'news_scheduled', 'label' => 'News scheduled for a future date', 'href' => route('news-announcements.index'),
                'count' => fn () => NewsAnnouncement::published()->where('published_date', '>', now())->count()],
            ['permission' => 'view branches', 'key' => 'branches_no_gps', 'label' => 'Active branches without map coordinates', 'href' => route('branches.index'),
                'count' => fn () => Branch::active()->where(fn ($query) => $query->whereNull('latitude')->orWhereNull('longitude'))->count()],
            ['permission' => 'view carousels', 'key' => 'slides_inactive', 'label' => 'Inactive homepage slides', 'href' => route('carousels.index'),
                'count' => fn () => Carousel::where('status', '!=', 'active')->count()],
        ];

        return collect($candidates)
            ->filter(fn (array $item) => $user->can($item['permission']))
            ->map(fn (array $item) => ['key' => $item['key'], 'label' => $item['label'], 'count' => (int) $item['count'](), 'href' => $item['href']])
            ->values()
            ->all();
    }

    /**
     * Contact-form activity: totals, a per-day series for the chart and the latest messages.
     *
     * @return array<string, mixed>
     */
    private function messages(): array
    {
        $since = now()->subDays(self::CHART_DAYS - 1)->startOfDay();

        $perDay = ContactSubmission::where('submitted_at', '>=', $since)
            ->get(['submitted_at'])
            ->countBy(fn (ContactSubmission $submission) => $submission->submitted_at->toDateString());

        $series = collect(range(0, self::CHART_DAYS - 1))->map(function (int $offset) use ($since, $perDay) {
            $date = $since->copy()->addDays($offset);

            return ['date' => $date->toDateString(), 'label' => $date->format('d M'), 'count' => (int) ($perDay[$date->toDateString()] ?? 0)];
        })->all();

        return [
            'total' => ContactSubmission::count(),
            'last_7_days' => ContactSubmission::where('submitted_at', '>=', now()->subDays(7))->count(),
            'last_30_days' => ContactSubmission::where('submitted_at', '>=', now()->subDays(30))->count(),
            'series' => $series,
            'recent' => ContactSubmission::latest('submitted_at')->latest('id')->limit(5)
                ->get(['id', 'name', 'subject', 'category', 'submitted_at'])
                ->map(fn (ContactSubmission $submission) => [
                    'id' => $submission->id,
                    'name' => $submission->name,
                    'subject' => $submission->subject,
                    'category' => $submission->category,
                    'submitted_at' => $submission->submitted_at?->toIso8601String(),
                    'href' => route('admin.contact-submissions.show', $submission),
                ])
                ->all(),
        ];
    }
}
