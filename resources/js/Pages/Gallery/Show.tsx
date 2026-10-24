import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Photo {
    id: number;
    caption: string | null;
    image_url: string;
}

interface Album {
    title: string;
    slug: string;
    description: string | null;
    photos: Photo[];
}

export default function GalleryShow({ album }: { album: Album }) {
    const [active, setActive] = useState<number | null>(null);

    useEffect(() => {
        if (active === null) {
            return;
        }

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActive(null);
            } else if (event.key === 'ArrowRight') {
                setActive((index) => (index === null ? null : (index + 1) % album.photos.length));
            } else if (event.key === 'ArrowLeft') {
                setActive((index) => (index === null ? null : (index - 1 + album.photos.length) % album.photos.length));
            }
        };

        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, [active, album.photos.length]);

    const current = active === null ? null : album.photos[active];

    return (
        <>
            <Head title={`${album.title} - Photo Gallery`} />

            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <Link href={route('gallery')} className="mb-6 inline-block text-sm text-[#4A7C59] hover:underline">
                        &larr; All albums
                    </Link>
                    <h1 className="mb-2 text-4xl font-bold text-gray-900">{album.title}</h1>
                    {album.description && <p className="mb-8 max-w-3xl text-lg text-gray-600">{album.description}</p>}

                    {album.photos.length === 0 ? (
                        <p className="py-16 text-center text-gray-500">This album has no photos yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {album.photos.map((photo, index) => (
                                <button
                                    key={photo.id}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className="overflow-hidden rounded-lg bg-white shadow transition-transform hover:scale-[1.02]"
                                >
                                    <img src={photo.image_url} alt={photo.caption ?? album.title} loading="lazy" className="h-44 w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {current && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setActive(null)}>
                    <button type="button" aria-label="Close" className="absolute top-4 right-4 text-white" onClick={() => setActive(null)}>
                        <X className="h-8 w-8" />
                    </button>
                    <button
                        type="button"
                        aria-label="Previous photo"
                        className="absolute left-4 text-white"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActive((active! - 1 + album.photos.length) % album.photos.length);
                        }}
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </button>
                    <figure className="max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
                        <img src={current.image_url} alt={current.caption ?? album.title} className="max-h-[80vh] w-auto rounded-md object-contain" />
                        {current.caption && <figcaption className="mt-2 text-center text-sm text-white">{current.caption}</figcaption>}
                    </figure>
                    <button
                        type="button"
                        aria-label="Next photo"
                        className="absolute right-4 text-white"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActive((active! + 1) % album.photos.length);
                        }}
                    >
                        <ChevronRight className="h-10 w-10" />
                    </button>
                </div>
            )}
        </>
    );
}

GalleryShow.layout = (page: React.ReactNode) => <WebsiteLayout title="Photo Gallery">{page}</WebsiteLayout>;
