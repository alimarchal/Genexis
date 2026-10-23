<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ChangeRequestStatus;
use App\Exceptions\ChangeRequestException;
use App\Http\Controllers\Controller;
use App\Models\ChangeRequest;
use App\Services\ChangeRequestService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Maker-checker screen: checkers review, approve and reject; makers follow what happened to their own changes.
 */
class ChangeRequestController extends Controller
{
    public function __construct(private ChangeRequestService $changes) {}

    public function index(Request $request): Response
    {
        $this->authorizeAccess($request);

        $status = ChangeRequestStatus::tryFrom((string) $request->query('status', ChangeRequestStatus::Pending->value));

        $requests = ChangeRequest::with(['maker:id,name', 'checker:id,name'])
            ->when(! $this->isChecker($request), fn ($query) => $query->where('maker_id', $request->user()->id))
            ->when($status, fn ($query) => $query->where('status', $status))
            ->when($request->query('search'), fn ($query, $search) => $query->where('summary', 'like', '%'.$search.'%'))
            ->latest('id')
            ->paginate($this->perPage(20))
            ->withQueryString()
            ->through(fn (ChangeRequest $changeRequest) => $this->present($changeRequest, $request));

        return Inertia::render('ChangeRequests/Index', [
            'changeRequests' => $requests,
            'filters' => ['status' => $status?->value ?? 'all', 'search' => $request->query('search')],
            'statuses' => array_column(ChangeRequestStatus::cases(), 'value'),
            'isChecker' => $this->isChecker($request),
            'pendingCount' => ChangeRequest::pending()
                ->when(! $this->isChecker($request), fn ($query) => $query->where('maker_id', $request->user()->id))
                ->count(),
        ]);
    }

    public function show(Request $request, ChangeRequest $changeRequest): Response
    {
        $this->authorizeAccess($request, $changeRequest);

        $changeRequest->load(['maker:id,name,email', 'checker:id,name,email']);
        $proposed = Arr::except($changeRequest->payload ?? [], ['_token', '_method']);
        $subject = $changeRequest->subject();

        return Inertia::render('ChangeRequests/Show', [
            'changeRequest' => $this->present($changeRequest, $request) + [
                'payload' => $proposed,
                'current' => $subject ? Arr::only($subject->attributesToArray(), array_keys($proposed)) : null,
                'files' => collect($changeRequest->files ?? [])->map(fn (array $file) => ['key' => $file['key'], 'name' => $file['name']])->all(),
                'failure_reason' => $changeRequest->failure_reason,
                'rejection_reason' => $changeRequest->rejection_reason,
            ],
        ]);
    }

    public function approve(Request $request, ChangeRequest $changeRequest): RedirectResponse
    {
        abort_unless($this->isChecker($request), 403);

        try {
            $this->changes->approve($changeRequest, $request->user());
        } catch (ChangeRequestException $exception) {
            return back()->with('error', $exception->getMessage());
        }

        return redirect()->route('admin.change-requests.index')
            ->with('success', "Approved: {$changeRequest->summary} is now live.");
    }

    public function reject(Request $request, ChangeRequest $changeRequest): RedirectResponse
    {
        abort_unless($this->isChecker($request), 403);

        $validated = $request->validate([
            'reason' => ['required', 'string', 'min:3', 'max:1000'],
        ], [
            'reason.required' => 'Please give a reason for rejecting this change.',
            'reason.min' => 'The reason must be at least 3 characters.',
        ]);

        try {
            $this->changes->reject($changeRequest, $request->user(), $validated['reason']);
        } catch (ChangeRequestException $exception) {
            return back()->with('error', $exception->getMessage());
        }

        return redirect()->route('admin.change-requests.index')
            ->with('success', "Rejected: {$changeRequest->summary}.");
    }

    private function isChecker(Request $request): bool
    {
        return (bool) $request->user()?->can(config('bank.maker_checker.checker_permission'));
    }

    private function authorizeAccess(Request $request, ?ChangeRequest $changeRequest = null): void
    {
        $user = $request->user();
        $isMaker = $user?->can(config('bank.maker_checker.maker_permission'));

        abort_unless($this->isChecker($request) || $isMaker, 403);

        if ($changeRequest && ! $this->isChecker($request)) {
            abort_unless($changeRequest->maker_id === $user->id, 403);
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function present(ChangeRequest $changeRequest, Request $request): array
    {
        return [
            'id' => $changeRequest->id,
            'module' => $changeRequest->module_label,
            'action' => $changeRequest->action,
            'summary' => $changeRequest->summary,
            'status' => $changeRequest->status->value,
            'maker' => $changeRequest->maker?->only(['id', 'name']),
            'checker' => $changeRequest->checker?->only(['id', 'name']),
            'submitted_at' => $changeRequest->created_at?->toIso8601String(),
            'reviewed_at' => $changeRequest->reviewed_at?->toIso8601String(),
            'rejection_reason' => $changeRequest->rejection_reason,
            'can_decide' => $changeRequest->isPending() && $this->isChecker($request) && $changeRequest->maker_id !== $request->user()->id,
        ];
    }
}
