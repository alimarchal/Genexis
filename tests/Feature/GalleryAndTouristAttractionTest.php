<?php

use App\Models\GalleryAlbum;
use App\Models\GalleryPhoto;
use App\Models\TouristAttraction;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

describe('gallery albums (admin)', function () {
    beforeEach(function () {
        $this->actingAs($this->createAdminUser());
    });

    it('lists, opens the create form and shows an album', function () {
        $album = GalleryAlbum::factory()->create();

        $this->get(route('gallery-albums.index'))->assertOk()->assertInertia(fn ($page) => $page->component('GalleryAlbum/Index'));
        $this->get(route('gallery-albums.create'))->assertOk()->assertInertia(fn ($page) => $page->component('GalleryAlbum/Create'));
        $this->get(route('gallery-albums.show', $album))->assertOk()->assertInertia(fn ($page) => $page->component('GalleryAlbum/Show'));
        $this->get(route('gallery-albums.edit', $album))->assertOk()->assertInertia(fn ($page) => $page->component('GalleryAlbum/Edit'));
    });

    it('creates an album with a cover and several photos and builds a unique slug', function () {
        GalleryAlbum::factory()->create(['title' => 'BOD Meetings']);

        $this->post(route('gallery-albums.store'), [
            'title' => 'BOD Meetings',
            'status' => 'active',
            'cover_image' => UploadedFile::fake()->image('cover.jpg'),
            'photos' => [UploadedFile::fake()->image('a.jpg'), UploadedFile::fake()->image('b.png')],
        ])->assertRedirect(route('gallery-albums.index'));

        $album = GalleryAlbum::where('slug', 'bod-meetings-2')->firstOrFail();

        expect($album->photos)->toHaveCount(2)->and($album->cover_image)->not->toBeNull();
        Storage::disk('public')->assertExists($album->cover_image);
        Storage::disk('public')->assertExists($album->photos->first()->image);
    });

    it('rejects a missing title, a bad status and non-image photos', function () {
        $this->post(route('gallery-albums.store'), [
            'status' => 'archived',
            'photos' => [UploadedFile::fake()->create('notes.pdf', 10, 'application/pdf')],
        ])->assertSessionHasErrors(['title', 'status', 'photos.0']);

        expect(GalleryAlbum::count())->toBe(0);
    });

    it('updates an album, removes chosen photos and adds new ones', function () {
        $album = GalleryAlbum::factory()->create(['title' => 'Old']);
        $keep = GalleryPhoto::factory()->for($album, 'album')->create();
        $drop = GalleryPhoto::factory()->for($album, 'album')->create();
        Storage::disk('public')->put($drop->image, 'x');

        $this->put(route('gallery-albums.update', $album), [
            'title' => 'New title',
            'status' => 'inactive',
            'remove_photo_ids' => [$drop->id],
            'photos' => [UploadedFile::fake()->image('c.jpg')],
        ])->assertRedirect(route('gallery-albums.index'));

        expect($album->fresh()->title)->toBe('New title')->and($album->fresh()->slug)->toBe('new-title');
        expect($album->photos()->count())->toBe(2)->and(GalleryPhoto::find($drop->id))->toBeNull()->and(GalleryPhoto::find($keep->id))->not->toBeNull();
        Storage::disk('public')->assertMissing($drop->image);
    });

    it('does not remove photos that belong to another album', function () {
        $album = GalleryAlbum::factory()->create();
        $foreign = GalleryPhoto::factory()->create();

        $this->put(route('gallery-albums.update', $album), [
            'title' => $album->title,
            'status' => 'active',
            'remove_photo_ids' => [$foreign->id],
        ])->assertRedirect();

        expect(GalleryPhoto::find($foreign->id))->not->toBeNull();
    });

    it('deletes an album together with its photos', function () {
        $album = GalleryAlbum::factory()->create();
        GalleryPhoto::factory()->count(2)->for($album, 'album')->create();

        $this->delete(route('gallery-albums.destroy', $album))->assertRedirect(route('gallery-albums.index'));

        expect(GalleryAlbum::count())->toBe(0)->and(GalleryPhoto::count())->toBe(0);
    });
});

describe('gallery (public)', function () {
    it('lists only active albums', function () {
        GalleryAlbum::factory()->create(['title' => 'Visible']);
        GalleryAlbum::factory()->inactive()->create(['title' => 'Hidden']);

        $this->get(route('gallery'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Gallery/Index')->has('albums', 1)->where('albums.0.title', 'Visible'));
    });

    it('shows an active album with its photos and hides an inactive one', function () {
        Storage::disk('public')->put('gallery-photos/one.jpg', 'x');
        $album = GalleryAlbum::factory()->create(['title' => 'Special Events']);
        GalleryPhoto::factory()->for($album, 'album')->create(['image' => 'gallery-photos/one.jpg']);
        $hidden = GalleryAlbum::factory()->inactive()->create();

        $this->get(route('gallery.show', $album->slug))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Gallery/Show')->has('album.photos', 1));

        $this->get(route('gallery.show', $hidden->slug))->assertNotFound();
        $this->get(route('gallery.show', 'missing'))->assertNotFound();
    });
});

describe('tourist attractions (admin)', function () {
    beforeEach(function () {
        $this->actingAs($this->createAdminUser());
    });

    it('creates an attraction with a photo and a route map', function () {
        $this->post(route('tourist-attractions.store'), [
            'title' => 'Neelum Valley',
            'summary' => 'A scenic valley.',
            'content' => 'Long description',
            'status' => 'active',
            'image' => UploadedFile::fake()->image('valley.jpg'),
            'route_map_image' => UploadedFile::fake()->image('map.png'),
        ])->assertRedirect(route('tourist-attractions.index'));

        $attraction = TouristAttraction::where('slug', 'neelum-valley')->firstOrFail();

        Storage::disk('public')->assertExists($attraction->image);
        Storage::disk('public')->assertExists($attraction->route_map_image);
    });

    it('rejects invalid input', function () {
        $this->post(route('tourist-attractions.store'), ['status' => 'x', 'image' => UploadedFile::fake()->create('a.pdf', 5, 'application/pdf')])
            ->assertSessionHasErrors(['title', 'status', 'image']);
    });

    it('replaces the old files when updating and removes them on delete', function () {
        $attraction = TouristAttraction::factory()->create(['image' => 'tourist-attractions/old.jpg']);
        Storage::disk('public')->put('tourist-attractions/old.jpg', 'x');

        $this->put(route('tourist-attractions.update', $attraction), [
            'title' => $attraction->title,
            'status' => 'active',
            'image' => UploadedFile::fake()->image('new.jpg'),
        ])->assertRedirect(route('tourist-attractions.index'));

        $attraction->refresh();
        Storage::disk('public')->assertMissing('tourist-attractions/old.jpg');
        Storage::disk('public')->assertExists($attraction->image);

        $this->delete(route('tourist-attractions.destroy', $attraction))->assertRedirect(route('tourist-attractions.index'));

        expect(TouristAttraction::count())->toBe(0);
        Storage::disk('public')->assertMissing($attraction->image);
    });
});

describe('tourist attractions (public)', function () {
    it('lists active attractions and opens one by slug', function () {
        $attraction = TouristAttraction::factory()->create(['title' => 'Banjosa Lake']);
        TouristAttraction::factory()->inactive()->create(['title' => 'Hidden Place']);

        $this->get(route('tourist-attractions.public'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('TouristAttractions/Index')->has('attractions', 1));

        $this->get(route('tourist-attractions.public.show', $attraction->slug))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('TouristAttractions/Show')->where('attraction.title', 'Banjosa Lake'));

        $this->get(route('tourist-attractions.public.show', 'hidden-place'))->assertNotFound();
    });
});

it('keeps the admin modules behind their permissions', function () {
    $this->get(route('gallery-albums.index'))->assertRedirect(route('login'));
    $this->get(route('tourist-attractions.index'))->assertRedirect(route('login'));
});
