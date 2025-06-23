import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
import { ReactElement, useState } from 'react';

interface AboutUs {
    id: number;
    title: string;
    content: string;
    vision: string | null;
    mission: string | null;
    is_active: boolean;
    sort_order: number;
}

interface OrganizationStats {
    branches: number;
    established: number;
    servingDistricts: string;
}

interface Props {
    aboutUs: AboutUs | null;
    organizationStats?: OrganizationStats;
}

interface ServiceCard {
    id: number;
    title: string;
    description: string;
    icon: ReactElement;
    color: string;
    bgColor: string;
    hoverColor: string;
}

export default function AboutUsPage({ aboutUs, organizationStats }: Props) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    // Default values for organization stats
    const stats = organizationStats || {
        branches: 87,
        established: 2006,
        servingDistricts: 'All Districts of AJK',
    };

    const serviceCards: ServiceCard[] = [
        {
            id: 1,
            title: 'Microfinance',
            description:
                'Supporting those with limited access to financial resources through tailored loan products and financial inclusion programs.',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            hoverColor: 'hover:bg-blue-100',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                </svg>
            ),
        },
        {
            id: 2,
            title: 'Digital Banking',
            description: 'Modern banking solutions including mobile apps, online banking, and digital payment systems for your convenience.',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            hoverColor: 'hover:bg-green-100',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                </svg>
            ),
        },
        {
            id: 3,
            title: 'Home Remittance',
            description: 'Fast, secure, and reliable money transfer services connecting families across borders with competitive exchange rates.',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            hoverColor: 'hover:bg-yellow-100',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
        },
        {
            id: 4,
            title: 'Branch Network',
            description:
                'Extensive network of branches and ATMs across all districts of AJK, ensuring accessibility and convenience for all customers.',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            hoverColor: 'hover:bg-purple-100',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            ),
        },
    ];
    return (
        <WebsiteLayout title="About Us">
            <Head title="About Us - BAJK" />

            <div className="bg-white">
                <div className="container mx-auto px-4 py-16">
                    {aboutUs ? (
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-12 text-center">
                                <h1 className="mb-4 text-4xl font-bold text-gray-900">{aboutUs.title}</h1>
                                <div className="mx-auto h-1 w-24 bg-blue-600"></div>
                            </div>

                            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                                <div className="lg:col-span-2">
                                    <div className="prose prose-lg max-w-none">
                                        <div className="leading-relaxed whitespace-pre-wrap text-gray-700">{aboutUs.content}</div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {aboutUs.vision && (
                                        <div className="rounded-lg bg-blue-50 p-6">
                                            <h3 className="mb-4 text-xl font-semibold text-blue-900">Our Vision</h3>
                                            <div className="leading-relaxed whitespace-pre-wrap text-blue-800">{aboutUs.vision}</div>
                                        </div>
                                    )}

                                    {aboutUs.mission && (
                                        <div className="rounded-lg bg-green-50 p-6">
                                            <h3 className="mb-4 text-xl font-semibold text-green-900">Our Mission</h3>
                                            <div className="leading-relaxed whitespace-pre-wrap text-green-800">{aboutUs.mission}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Stats Section */}
                            <div className="mt-16 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                                    <div>
                                        <div className="mb-2 text-3xl font-bold">{stats.branches}</div>
                                        <div className="text-blue-100">Branches</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-3xl font-bold">{stats.established}</div>
                                        <div className="text-blue-100">Established</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-3xl font-bold">AJK</div>
                                        <div className="text-blue-100">{stats.servingDistricts}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Features Section */}
                            <div className="mt-16">
                                <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Our Key Services</h2>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                    {serviceCards.map((card) => (
                                        <div
                                            key={card.id}
                                            className={`group relative transform cursor-pointer transition-all duration-300 ${
                                                hoveredCard === card.id ? 'scale-105' : 'scale-100'
                                            }`}
                                            onMouseEnter={() => setHoveredCard(card.id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >
                                            <div
                                                className={`h-full rounded-xl border border-gray-200 p-6 ${card.bgColor} ${card.hoverColor} shadow-sm transition-all duration-300 hover:shadow-xl`}
                                            >
                                                <div
                                                    className={`h-16 w-16 ${card.color} mx-auto mb-6 flex items-center justify-center rounded-full bg-white shadow-md transition-shadow duration-300 group-hover:shadow-lg`}
                                                >
                                                    {card.icon}
                                                </div>
                                                <h3 className="mb-3 text-center text-lg font-semibold text-gray-900">{card.title}</h3>
                                                <p
                                                    className={`text-center text-sm leading-relaxed text-gray-600 transition-all duration-300 ${
                                                        hoveredCard === card.id ? 'text-gray-700' : ''
                                                    }`}
                                                >
                                                    {card.description}
                                                </p>

                                                {/* Animated border effect on hover */}
                                                <div
                                                    className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
                                                        hoveredCard === card.id
                                                            ? card.id === 1
                                                                ? 'border-blue-300 opacity-100'
                                                                : card.id === 2
                                                                  ? 'border-green-300 opacity-100'
                                                                  : card.id === 3
                                                                    ? 'border-yellow-300 opacity-100'
                                                                    : 'border-purple-300 opacity-100'
                                                            : 'border-transparent opacity-0'
                                                    }`}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">About Us</h1>
                            <p className="text-lg text-gray-600">About us content is currently being updated. Please check back soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </WebsiteLayout>
    );
}
