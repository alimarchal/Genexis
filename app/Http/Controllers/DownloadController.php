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
            ->paginate($this->perPage(15))
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

        [$data, , $files] = $this->applyUploads($request, $data, 'downloads', ['file' => 'file_path']);

        if (isset($files['file'])) {
            $data['file_type'] = $files['file']['mime'];
            $data['file_size'] = $files['file']['size'];
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

        [$data, $obsolete, $files] = $this->applyUploads($request, $data, 'downloads', ['file' => 'file_path'], $download);

        if (isset($files['file'])) {
            $data['file_type'] = $files['file']['mime'];
            $data['file_size'] = $files['file']['size'];
        }

        $download->update($data);
        $this->deleteStoredFiles($obsolete);

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
        abort_unless($download->is_active || auth()->user()?->can('view downloads'), 404, 'File not found.');

        abort_if(blank($download->file_path) || ! Storage::disk('public')->exists($download->file_path), 404, 'File not found.');

        // A resumed (HTTP Range) request continues a download that was already counted.
        $range = request()->header('Range');
        if ($range === null || str_starts_with($range, 'bytes=0-')) {
            $download->incrementDownloadCount();
        }

        $originalExtension = pathinfo($download->file_path, PATHINFO_EXTENSION);
        $filename = $download->title.'.'.$originalExtension;

        return $this->sendPublicFile($download->file_path, $filename);
    }

    // Public method for website downloads
    public function publicIndex(Request $request)
    {
        $downloads = Download::where('is_active', true)
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($this->perPage(12))
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
