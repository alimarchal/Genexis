import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Eye, Star, Tag } from 'lucide-react';
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

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">News & Announcements</h1>
                            <p className="mx-auto max-w-2xl text-xl text-blue-100">
                                Stay updated with the latest news, announcements, and updates from Bank of Azad Jammu & Kashmir
                            </p>
                        </div>
                    </div>
                </div>

                {/* News Grid */}
                <div className="mx-auto max-w-7xl px-6 py-12">
                    {newsAnnouncements.data.length > 0 ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-600">
                                    Showing {newsAnnouncements.from || 0} to {newsAnnouncements.to || 0} of {newsAnnouncements.total} results
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {newsAnnouncements.data.map((news) => (
                                    <div
                                        key={news.id}
                                        className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Featured Badge */}
                                        {news.is_featured && (
                                            <div className="absolute top-4 right-4 z-10">
                                                <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    Featured
                                                </div>
                                            </div>
                                        )}

                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                            {news.image_url ? (
                                                <img
                                                    src={news.image_url}
                                                    alt={news.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <div className="text-center text-gray-400">
                                                        <Eye className="mx-auto mb-2 h-12 w-12" />
                                                        <span className="text-sm">No Image</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Category and Date */}
                                            <div className="mb-3 flex items-center justify-between">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(news.category)}`}
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
                                            <h3 className="mb-3 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                                                <Link href={`/news/${news.slug}`} className="hover:underline">
                                                    {news.title}
                                                </Link>
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="mb-4 text-sm leading-relaxed text-gray-600">{news.excerpt}</p>

                                            {/* Read More Link */}
                                            <Link
                                                href={`/news/${news.slug}`}
                                                className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                                            >
                                                Read More
                                                <svg
                                                    className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {newsAnnouncements.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="cursor-not-allowed rounded-lg px-4 py-2 text-sm font-medium text-gray-400"
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
                            <div className="mx-auto max-w-sm">
                                <Eye className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No News Available</h3>
                                <p className="text-gray-600">There are currently no news announcements to display.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

NewsIndex.layout = (page: React.ReactNode) => <WebsiteLayout title="News & Announcements">{page}</WebsiteLayout>;
