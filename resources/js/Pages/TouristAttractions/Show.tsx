import SafeImage from '@/components/safe-image';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Attraction {
    title: string;
    slug: string;
    summary: string | null;
    content: string | null;
    image_url: string | null;
    route_map_image_url: string | null;
}

export default function TouristAttractionsShow({ attraction }: { attraction: Attraction }) {
    return (
        <>
            <Head title={`${attraction.title} - Tourist Attractions`} />

            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                <div className="mx-auto max-w-4xl px-6 py-8">
                    <Link href={route('tourist-attractions.public')} className="mb-6 inline-block text-sm text-[#4A7C59] hover:underline">
                        &larr; All attractions
                    </Link>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">{attraction.title}</h1>
                    {attraction.summary && <p className="mb-6 text-lg text-gray-600">{attraction.summary}</p>}

                    {attraction.image_url && (
                        <SafeImage kind="generic" src={attraction.image_url} alt={attraction.title} className="mb-8 max-h-[28rem] w-full rounded-xl object-cover shadow" />
                    )}

                    {attraction.content && <div className="mb-10 leading-relaxed whitespace-pre-line text-gray-800">{attraction.content}</div>}

                    {attraction.route_map_image_url && (
                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Route Map</h2>
                            <img src={attraction.route_map_image_url} alt={`Route map for ${attraction.title}`} className="w-full rounded-xl shadow" />
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

TouristAttractionsShow.layout = (page: React.ReactNode) => <WebsiteLayout title="Tourist Attractions">{page}</WebsiteLayout>;
