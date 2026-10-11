<?php

use App\Models\BoardOfDirector;
use App\Models\Carousel;
use App\Support\PublicFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

describe('PublicFile::url', function () {
    it('returns null for empty values', function (?string $path) {
        expect(PublicFile::url($path))->toBeNull();
    })->with([null, '', '   ']);

    it('returns null instead of a dead link when the file does not exist', function () {
        expect(PublicFile::url('news-images/missing.jpg'))->toBeNull();
    });

    it('links files that exist on the public disk through /storage', function () {
        Storage::disk('public')->put('news-images/real.jpg', 'x');

        expect(PublicFile::url('news-images/real.jpg'))->toBe(asset('storage/news-images/real.jpg'))
            ->and(PublicFile::url('/news-images/real.jpg'))->toBe(asset('storage/news-images/real.jpg'));
    });

    it('falls back to files shipped inside /public', function () {
        // public/logo.png ships with the repository
        expect(PublicFile::url('logo.png'))->toBe(asset('logo.png'));
    });

    it('passes absolute URLs through untouched', function () {
        expect(PublicFile::url('https://cdn.example.test/a.jpg'))->toBe('https://cdn.example.test/a.jpg');
    });

    it('does not follow path traversal outside the public folder', function () {
        expect(PublicFile::url('../.env'))->toBeNull()
            ->and(PublicFile::url('../../composer.json'))->toBeNull();
    });
});

describe('model image accessors', function () {
    it('give a null image_url when the uploaded file is gone so the page shows the default image', function () {
        $carousel = new Carousel(['image' => 'carousel-images/gone.png']);
        $director = new BoardOfDirector(['image' => 'bod/gone.png']);

        expect($carousel->image_url)->toBeNull()
            ->and($director->image_url)->toBeNull();
    });

    it('give a real URL when the file exists', function () {
        Storage::disk('public')->put('carousel-images/here.png', 'x');

        expect((new Carousel(['image' => 'carousel-images/here.png']))->image_url)
            ->toBe(asset('storage/carousel-images/here.png'));
    });
});
