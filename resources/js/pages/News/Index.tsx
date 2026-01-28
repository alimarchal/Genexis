import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Eye, Newspaper, Star, Tag } from 'lucide-react';
import React from 'react';

interface NewsAnnouncement {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    image: string | null;
    image_url: string | null;
    published_date: string;
    is_featured: boolean;
    category: string;
    slug: string;
    is_published: boolean;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    newsAnnouncements: {
        data: NewsAnnouncement[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
}

const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
        banking: 'bg-blue-100 text-blue-800 border-blue-200',
        announcement: 'bg-purple-100 text-purple-800 border-purple-200',
        update: 'bg-green-100 text-green-800 border-green-200',
        alert: 'bg-red-100 text-red-800 border-red-200',
        promotion: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function NewsIndex({ newsAnnouncements }: Props) {
    return (
        <>
            <Head title="News & Announcements" />

            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                    {/* Hero Section */}
                    <div className="mb-8 text-center sm:mb-12">
                        <div className="mb-4 flex justify-center sm:mb-6">
                            <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-3 sm:p-4">
                                <Newspaper className="h-10 w-10 text-white sm:h-12 sm:w-12" />
                            </div>
                        </div>
                        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:mb-4 sm:text-4xl">News & Announcements</h1>
                        <p className="mx-auto mb-6 max-w-3xl px-4 text-base text-gray-600 sm:mb-8 sm:text-lg md:text-xl">
                            Stay updated with the latest news, announcements, and updates from Bank of Azad Jammu & Kashmir
                        </p>
                    </div>

                    {newsAnnouncements.data.length > 0 ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-600">
                                    Showing {newsAnnouncements.from || 0} to {newsAnnouncements.to || 0} of {newsAnnouncements.total} results
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {newsAnnouncements.data.map((news) => (
                                    <div
                                        key={news.id}
                                        className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Featured Badge */}
                                        {news.is_featured && (
                                            <div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
                                                <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    Featured
                                                </div>
                                            </div>
                                        )}

                                        {/* Image */}
                                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#e9f7ef] to-[#f0f9f3] sm:h-48">
                                            {news.image_url ? (
                                                <img
                                                    src={news.image_url}
                                                    alt={news.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <div className="text-center text-gray-400">
                                                        <Eye className="mx-auto mb-2 h-10 w-10 sm:h-12 sm:w-12" />
                                                        <span className="text-sm">No Image</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 sm:p-6">
                                            {/* Category and Date */}
                                            <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${getCategoryColor(news.category)}`}
                                                >
                                                    <Tag className="h-3 w-3" />
                                                    {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(news.published_date)}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="mb-2 text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#4A7C59] sm:mb-3 sm:text-lg">
                                                <Link href={`/news/${news.slug}`} className="hover:underline">
                                                    {news.title}
                                                </Link>
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="mb-3 text-sm leading-relaxed text-gray-600 sm:mb-4">{news.excerpt}</p>

                                            {/* Read More Link */}
                                            <Link
                                                href={`/news/${news.slug}`}
                                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg sm:px-4 sm:text-sm"
                                            >
                                                Read More
                                                <svg
                                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {newsAnnouncements.links && newsAnnouncements.links.length > 3 && (
                                <div className="mt-8 flex justify-center sm:mt-12">
                                    <nav className="flex flex-wrap items-center justify-center gap-2">
                                        {newsAnnouncements.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm ${
                                                            link.active
                                                                ? 'bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] text-white'
                                                                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="cursor-not-allowed rounded-lg px-3 py-2 text-xs font-medium text-gray-400 sm:px-4 sm:text-sm"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-16 text-center">
                            <div className="mx-auto max-w-sm rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
                                <Eye className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No News Available</h3>
                                <p className="text-gray-600">There are currently no news announcements to display.</p>
                            </div>
                        </div>
                    )}

                    {/* Information Section */}
                    <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:mt-12 sm:p-8">
                        <h3 className="mb-4 text-lg font-semibold text-[#4A7C59] sm:text-xl">About News & Announcements</h3>
                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-gray-900 sm:text-base">Stay Informed</h4>
                                <ul className="space-y-1 text-xs text-gray-600 sm:text-sm">
                                    <li>• Latest banking updates and policies</li>
                                    <li>• Important announcements and alerts</li>
                                    <li>• New services and product launches</li>
                                    <li>• Featured news for priority updates</li>
                                    <li>• Regular updates from management</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-gray-900 sm:text-base">Categories</h4>
                                <ul className="space-y-1 text-xs text-gray-600 sm:text-sm">
                                    <li>• Banking - Core banking services</li>
                                    <li>• Announcements - Official statements</li>
                                    <li>• Updates - System and service updates</li>
                                    <li>• Alerts - Important notifications</li>
                                    <li>• Promotions - Special offers and campaigns</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

NewsIndex.layout = (page: React.ReactNode) => <WebsiteLayout title="News & Announcements">{page}</WebsiteLayout>;
