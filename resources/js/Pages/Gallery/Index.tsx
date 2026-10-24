import SafeImage from '@/components/safe-image';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Images } from 'lucide-react';
import React from 'react';

interface Album {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    photos_count: number;
    cover_url: string | null;
}

export default function GalleryIndex({ albums }: { albums: Album[] }) {
    return (
        <>
            <Head title="Photo Gallery" />

            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">Photo Gallery</h1>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Moments from the events, meetings and initiatives of Bank of Azad Jammu & Kashmir
                        </p>
                    </div>

                    {albums.length === 0 ? (
                        <p className="py-16 text-center text-gray-500">No albums have been published yet.</p>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {albums.map((album) => (
                                <Link
                                    key={album.id}
                                    href={route('gallery.show', album.slug)}
                                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="h-52 overflow-hidden bg-gray-100">
                                        <SafeImage
                                            kind="generic"
                                            src={album.cover_url}
                                            alt={album.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="mb-2 text-xl font-semibold text-gray-900">{album.title}</h2>
                                        {album.description && <p className="mb-3 line-clamp-2 text-sm text-gray-600">{album.description}</p>}
                                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                            <Images className="h-3 w-3" />
                                            {album.photos_count} {album.photos_count === 1 ? 'photo' : 'photos'}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

GalleryIndex.layout = (page: React.ReactNode) => <WebsiteLayout title="Photo Gallery">{page}</WebsiteLayout>;
