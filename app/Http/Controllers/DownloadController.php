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
            ->paginate(request('per_page', 15))
            ->withQueryString();

        return Inertia::render('Download/Index', [
            'downloads' => $downloads,
            'filters' => request()->all(),
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
        if (!$download->file_path) {
            abort(404, 'File not found.');
        }

        if (!Storage::disk('public')->exists($download->file_path)) {
            abort(404, 'File not found.');
        }

        // Increment download count
        $download->incrementDownloadCount();

        $originalExtension = pathinfo($download->file_path, PATHINFO_EXTENSION);
        $filename = $download->title . '.' . $originalExtension;

        return Storage::disk('public')->download($download->file_path, $filename);
    }

    // Public method for website downloads
    public function publicIndex(Request $request)
    {
        $downloads = Download::where('is_active', true)
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(request('per_page', 12))
            ->withQueryString()
            ->through(function ($download) {
                return [
                    'id' => $download->id,
                    'title' => $download->title,
                    'description' => $download->description,
                    'file_path' => $download->file_path,
                    'file_type' => $download->file_type,
                    'file_size_formatted' => $download->file_size_formatted,
                    'category' => $download->category,
                    'is_featured' => $download->is_featured,
                    'download_count' => $download->download_count,
                    'created_at' => $download->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('Rates/PublicDownloads', [
            'downloads' => $downloads,
        ]);
    }
}