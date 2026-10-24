<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGalleryAlbumRequest;
use App\Http\Requests\UpdateGalleryAlbumRequest;
use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\QueryBuilder;

class GalleryAlbumController extends Controller
{
    public function index(): Response
    {
        $albums = QueryBuilder::for(GalleryAlbum::class)
            ->withCount('photos')
            ->allowedFilters(GalleryAlbum::getAllowedFilters())
            ->allowedSorts(GalleryAlbum::getAllowedSorts())
            ->defaultSort('order', '-created_at')
            ->paginate($this->perPage(15))
            ->withQueryString();

        return Inertia::render('GalleryAlbum/Index', [
            'albums' => $albums,
            'filters' => request()->all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('GalleryAlbum/Create');
    }

    public function store(StoreGalleryAlbumRequest $request): RedirectResponse
    {
        $data = $request->safe()->except(['photos', 'cover_image']);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('gallery-covers', 'public');
        }

        $album = GalleryAlbum::create($data);

        $this->addPhotos($album, $request->file('photos', []));

        return redirect()->route('gallery-albums.index')
            ->with('success', 'Gallery album created successfully.');
    }

    public function show(GalleryAlbum $galleryAlbum): Response
    {
        return Inertia::render('GalleryAlbum/Show', [
            'album' => $galleryAlbum->load(['photos', 'creator:id,name', 'updater:id,name']),
        ]);
    }

    public function edit(GalleryAlbum $galleryAlbum): Response
    {
        return Inertia::render('GalleryAlbum/Edit', [
            'album' => $galleryAlbum->load('photos'),
        ]);
    }

    public function update(UpdateGalleryAlbumRequest $request, GalleryAlbum $galleryAlbum): RedirectResponse
    {
        $data = $request->safe()->except(['photos', 'cover_image', 'remove_photo_ids']);

        if ($request->hasFile('cover_image')) {
            $this->deleteFile($galleryAlbum->cover_image);
            $data['cover_image'] = $request->file('cover_image')->store('gallery-covers', 'public');
        }

        $galleryAlbum->update($data);

        $galleryAlbum->photos()
            ->whereIn('id', $request->input('remove_photo_ids', []))
            ->get()
            ->each(function ($photo) {
                $this->deleteFile($photo->image);
                $photo->delete();
            });

        $this->addPhotos($galleryAlbum, $request->file('photos', []));

        return redirect()->route('gallery-albums.index')
            ->with('success', 'Gallery album updated successfully.');
    }

    public function destroy(GalleryAlbum $galleryAlbum): RedirectResponse
    {
        $galleryAlbum->photos->each(fn ($photo) => $this->deleteFile($photo->image));
        $this->deleteFile($galleryAlbum->cover_image);

        $galleryAlbum->delete();

        return redirect()->route('gallery-albums.index')
            ->with('success', 'Gallery album deleted successfully.');
    }

    public function publicIndex(): Response
    {
        $albums = GalleryAlbum::active()
            ->withCount('photos')
            ->with(['photos' => fn ($query) => $query->limit(1)])
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn (GalleryAlbum $album) => [
                'id' => $album->id,
                'title' => $album->title,
                'slug' => $album->slug,
                'description' => $album->description,
                'photos_count' => $album->photos_count,
                'cover_url' => $album->cover_image_url ?? $album->photos->first()?->image_url,
            ]);

        return Inertia::render('Gallery/Index', [
            'albums' => $albums,
            'autoBreadcrumbs' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'Photo Gallery', 'isActive' => true],
            ],
        ]);
    }

    public function publicShow(string $slug): Response
    {
        $album = GalleryAlbum::active()->with('photos')->where('slug', $slug)->firstOrFail();

        return Inertia::render('Gallery/Show', [
            'album' => [
                'title' => $album->title,
                'slug' => $album->slug,
                'description' => $album->description,
                'photos' => $album->photos->map(fn ($photo) => [
                    'id' => $photo->id,
                    'caption' => $photo->caption,
                    'image_url' => $photo->image_url,
                ])->filter(fn ($photo) => $photo['image_url'])->values(),
            ],
            'autoBreadcrumbs' => [
                ['label' => 'Home', 'href' => '/'],
                ['label' => 'Photo Gallery', 'href' => route('gallery')],
                ['label' => $album->title, 'isActive' => true],
            ],
        ]);
    }

    /**
     * @param  array<int, UploadedFile>  $files
     */
    private function addPhotos(GalleryAlbum $album, array $files): void
    {
        $order = (int) GalleryPhoto::where('gallery_album_id', $album->id)->max('order');

        foreach ($files as $file) {
            $album->photos()->create([
                'image' => $file->store('gallery-photos', 'public'),
                'order' => ++$order,
            ]);
        }
    }

    private function deleteFile(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
