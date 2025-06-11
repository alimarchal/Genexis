<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDownloadRequest;
use App\Http\Requests\UpdateDownloadRequest;
use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class DownloadController extends Controller
{
    public function index(Request $request)
    {
        $downloads = QueryBuilder::for(Download::class)
            ->allowedFilters(Download::getAllowedFilters())
            ->allowedSorts(Download::getAllowedSorts())
            ->defaultSort('-created_at')
            ->with(['creator', 'updater'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Download/Index', [
            'downloads' => $downloads,
            'filters' => $request->only(['filter']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Download/Create');
    }

    public function store(StoreDownloadRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $data['file_path'] = $file->store('downloads', 'public');
            $data['file_type'] = $file->getClientMimeType();
            $data['file_size'] = $file->getSize();
        }

        Download::create($data);

        return redirect()->route('downloads.index')
            ->with('success', 'Download created successfully.');
    }

    public function show(Download $download)
    {
        $download->load(['creator', 'updater']);

        return Inertia::render('Download/Show', [
            'download' => $download,
        ]);
    }

    public function edit(Download $download)
    {
        return Inertia::render('Download/Edit', [
            'download' => $download,
        ]);
    }

    public function update(UpdateDownloadRequest $request, Download $download)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            // Delete old file if it exists
            if ($download->file_path) {
                Storage::disk('public')->delete($download->file_path);
            }

            $file = $request->file('file');
            $data['file_path'] = $file->store('downloads', 'public');
            $data['file_type'] = $file->getClientMimeType();
            $data['file_size'] = $file->getSize();
        }

        $download->update($data);

        return redirect()->route('downloads.index')
            ->with('success', 'Download updated successfully.');
    }

    public function destroy(Download $download)
    {
        // Delete file if it exists
        if ($download->file_path) {
            Storage::disk('public')->delete($download->file_path);
        }

        $download->delete();

        return redirect()->route('downloads.index')
            ->with('success', 'Download deleted successfully.');
    }

    public function download(Download $download)
    {
        if (! $download->file_path) {
            abort(404, 'File not found.');
        }

        $filePath = storage_path('app/public/'.$download->file_path);

        if (! file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        // Increment download count
        $download->incrementDownloadCount();

        $originalExtension = pathinfo($download->file_path, PATHINFO_EXTENSION);
        $filename = $download->title.'.'.$originalExtension;

        return response()->download($filePath, $filename);
    }

    // Public method for website downloads
    public function publicIndex(Request $request)
    {
        $downloads = QueryBuilder::for(Download::class)
            ->allowedFilters(['category', 'is_featured'])
            ->allowedSorts(['title', 'created_at', 'download_count'])
            ->where('is_active', true)
            ->defaultSort('-created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('PublicDownloads/Index', [
            'downloads' => $downloads,
            'filters' => $request->only(['filter']),
        ]);
    }
}
