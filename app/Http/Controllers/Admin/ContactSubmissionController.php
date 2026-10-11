<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Inbox for messages sent through the public contact form, so nothing is lost
 * when the notification e-mail cannot be delivered.
 */
class ContactSubmissionController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $category = $request->query('category');

        $submissions = ContactSubmission::query()
            ->when($search !== '', fn ($query) => $query->where(function ($inner) use ($search) {
                $like = '%'.str_replace(['%', '_'], ['\%', '\_'], $search).'%';
                $inner->where('name', 'like', $like)
                    ->orWhere('email', 'like', $like)
                    ->orWhere('subject', 'like', $like)
                    ->orWhere('message', 'like', $like);
            }))
            ->when(filled($category), fn ($query) => $query->where('category', $category))
            ->latest('submitted_at')
            ->latest('id')
            ->paginate($this->perPage(15))
            ->withQueryString();

        return Inertia::render('ContactSubmissions/Index', [
            'submissions' => $submissions,
            'categories' => ContactSubmission::query()->whereNotNull('category')->distinct()->orderBy('category')->pluck('category'),
            'filters' => ['search' => $search, 'category' => $category],
        ]);
    }

    public function show(ContactSubmission $contactSubmission): Response
    {
        return Inertia::render('ContactSubmissions/Show', [
            'submission' => $contactSubmission,
        ]);
    }

    public function destroy(ContactSubmission $contactSubmission): RedirectResponse
    {
        $contactSubmission->delete();

        return redirect()->route('admin.contact-submissions.index')->with('success', 'Message deleted.');
    }
}
