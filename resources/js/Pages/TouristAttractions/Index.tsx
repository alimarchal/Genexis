import SafeImage from '@/components/safe-image';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Attraction {
    title: string;
    slug: string;
    summary: string | null;
    image_url: string | null;
}

export default function TouristAttractionsIndex({ attractions }: { attractions: Attraction[] }) {
    return (
        <>
            <Head title="Tourist Attractions" />

            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">Tourist Attractions</h1>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">Discover the natural beauty of Azad Jammu & Kashmir</p>
                    </div>

                    {attractions.length === 0 ? (
                        <p className="py-16 text-center text-gray-500">No attractions have been published yet.</p>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2">
                            {attractions.map((attraction) => (
                                <Link
                                    key={attraction.slug}
                                    href={route('tourist-attractions.public.show', attraction.slug)}
                                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="h-56 overflow-hidden bg-gray-100">
                                        <SafeImage
                                            kind="generic"
                                            src={attraction.image_url}
                                            alt={attraction.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="mb-2 text-xl font-semibold text-gray-900">{attraction.title}</h2>
                                        {attraction.summary && <p className="line-clamp-3 text-sm text-gray-600">{attraction.summary}</p>}
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

TouristAttractionsIndex.layout = (page: React.ReactNode) => <WebsiteLayout title="Tourist Attractions">{page}</WebsiteLayout>;
