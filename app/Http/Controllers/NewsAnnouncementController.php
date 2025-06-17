<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsAnnouncementRequest;
use App\Http\Requests\UpdateNewsAnnouncementRequest;
use App\Models\NewsAnnouncement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class NewsAnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $newsAnnouncements = QueryBuilder::for(NewsAnnouncement::class)
            ->allowedFilters([
                'title',
                'category',
                AllowedFilter::exact('is_published'),
            ])
            ->allowedSorts(['id', 'title', 'published_date', 'category', 'created_at'])
            ->defaultSort('-created_at')
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('NewsAnnouncement/Index', [
            'newsAnnouncements' => $newsAnnouncements,
            'filters' => request()->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('NewsAnnouncement/Create');
    }

    public function store(StoreNewsAnnouncementRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('news-images', 'public');
        }

        NewsAnnouncement::create($data);

        return redirect()->route('news-announcements.index')
            ->with('success', 'News announcement created successfully.');
    }

    public function show(NewsAnnouncement $newsAnnouncement)
    {
        return Inertia::render('NewsAnnouncement/Show', [
            'newsAnnouncement' => $newsAnnouncement,
        ]);
    }

    public function edit(NewsAnnouncement $newsAnnouncement)
    {
        return Inertia::render('NewsAnnouncement/Edit', [
            'newsAnnouncement' => $newsAnnouncement,
        ]);
    }

    public function update(UpdateNewsAnnouncementRequest $request, NewsAnnouncement $newsAnnouncement)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($newsAnnouncement->image) {
                Storage::disk('public')->delete($newsAnnouncement->image);
            }
            $data['image'] = $request->file('image')->store('news-images', 'public');
        } else {
            // Remove image from update data to preserve existing value
            unset($data['image']);
        }

        $newsAnnouncement->update($data);

        return redirect()->route('news-announcements.index')
            ->with('success', 'News announcement updated successfully.');
    }

    public function destroy(NewsAnnouncement $newsAnnouncement)
    {
        // Delete image if exists
        if ($newsAnnouncement->image) {
            Storage::disk('public')->delete($newsAnnouncement->image);
        }

        $newsAnnouncement->delete();

        return redirect()->route('news-announcements.index')
            ->with('success', 'News announcement deleted successfully.');
    }
}
