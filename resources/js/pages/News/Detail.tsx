import { ArrowLeft, Calendar, Eye, Share2, Star, Tag } from 'lucide-react';
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';

interface NewsAnnouncement {
    id: number;
    title: string;
    content: string;
    image: string | null;
    image_url: string | null;
    published_date: string;
    is_featured: boolean;
    category: string;
    slug: string;
    created_at: string;
}

interface RelatedNews {
    id: number;
    title: string;
    slug: string;
    category: string;
    published_date: string;
    excerpt: string;
}

interface Props {
    news: NewsAnnouncement;
    relatedNews: RelatedNews[];
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

export default function NewsDetail({ news, relatedNews }: Props) {
    return (
        <>
            <Head title={news.title} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <Link
                            href="/news"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back to News
                        </Link>
                    </div>
                </div>

                {/* Article */}
                <article className="mx-auto max-w-4xl px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Featured Image */}
                        {news.image_url && (
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <img
                                    src={news.image_url}
                                    alt={news.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8">
                            {/* Meta Information */}
                            <div className="mb-6 flex flex-wrap items-center gap-4">
                                <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${getCategoryColor(news.category)}`}>
                                    <Tag className="h-4 w-4" />
                                    {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                                </span>

                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(news.published_date)}
                                </span>

                                {news.is_featured && (
                                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                                        <Star className="h-4 w-4 fill-current" />
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                {news.title}
                            </h1>

                            {/* Content */}
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />

                            {/* Share Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Published on {formatDate(news.published_date)}
                                    </div>
                                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <section className="mx-auto max-w-4xl px-6 py-8">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Related News</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedNews.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(item.category)}`}>
                                                <Tag className="h-3 w-3" />
                                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(item.published_date)}
                                            </span>
                                        </div>

                                        <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                            <Link href={`/news/${item.slug}`} className="hover:underline">
                                                {item.title}
                                            </Link>
                                        </h3>

                                        <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                                            {item.excerpt}
                                        </p>

                                        <Link
                                            href={`/news/${item.slug}`}
                                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                        >
                                            Read More
                                            <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

NewsDetail.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="News Detail">
        {page}
    </WebsiteLayout>
);
