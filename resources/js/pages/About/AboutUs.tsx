import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';

interface AboutUs {
    id: number;
    title: string;
    content: string;
    vision: string | null;
    mission: string | null;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    aboutUs: AboutUs | null;
}

export default function AboutUsPage({ aboutUs }: Props) {
    return (
        <WebsiteLayout title="About Us">
            <Head title="About Us - BAJK" />

            <div className="bg-white">
                <div className="container mx-auto px-4 py-16">
                    {aboutUs ? (
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{aboutUs.title}</h1>
                                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2">
                                    <div className="prose prose-lg max-w-none">
                                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {aboutUs.content}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {aboutUs.vision && (
                                        <div className="bg-blue-50 p-6 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Vision</h3>
                                            <div className="text-blue-800 leading-relaxed whitespace-pre-wrap">
                                                {aboutUs.vision}
                                            </div>
                                        </div>
                                    )}

                                    {aboutUs.mission && (
                                        <div className="bg-green-50 p-6 rounded-lg">
                                            <h3 className="text-xl font-semibold text-green-900 mb-4">Our Mission</h3>
                                            <div className="text-green-800 leading-relaxed whitespace-pre-wrap">
                                                {aboutUs.mission}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Stats Section */}
                            <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                    <div>
                                        <div className="text-3xl font-bold mb-2">87</div>
                                        <div className="text-blue-100">Branches</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2">2006</div>
                                        <div className="text-blue-100">Established</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold mb-2">AJK</div>
                                        <div className="text-blue-100">Serving All Districts</div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Features Section */}
                            <div className="mt-16">
                                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Key Services</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Microfinance</h3>
                                        <p className="text-sm text-gray-600">Supporting those with limited access to financial resources</p>
                                    </div>

                                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Digital Banking</h3>
                                        <p className="text-sm text-gray-600">Modern banking solutions for all your needs</p>
                                    </div>

                                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Home Remittance</h3>
                                        <p className="text-sm text-gray-600">Fast and secure money transfer services</p>
                                    </div>

                                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Branch Network</h3>
                                        <p className="text-sm text-gray-600">Extensive network across all districts of AJK</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
                            <p className="text-lg text-gray-600">About us content is currently being updated. Please check back soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </WebsiteLayout>
    );
}
