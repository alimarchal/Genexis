import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Share2, Star, Tag } from 'lucide-react';
import React from 'react';

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
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: news.title,
                    text: `Check out this news: ${news.title}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                alert('Unable to share or copy link');
            }
        }
    };

    return (
        <>
            <Head title={news.title} />

            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                {/* Article */}
                <article className="mx-auto max-w-7xl px-6 py-8">
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                        {/* Featured Image */}
                        {news.image_url && (
                            <div className="relative h-80 overflow-hidden md:h-96 lg:h-[750px]">
                                <img src={news.image_url} alt={news.title} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8">
                            {/* Meta Information */}
                            <div className="mb-6 flex flex-wrap items-center gap-4">
                                <span
                                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${getCategoryColor(news.category)}`}
                                >
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
                            <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">{news.title}</h1>

                            {/* Content */}
                            <div
                                className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#4A7C59] prose-a:no-underline hover:prose-a:underline max-w-none"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />

                            {/* Share Section */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">Published on {formatDate(news.published_date)}</div>
                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-[#4A7C59]"
                                    >
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
                    <section className="mx-auto max-w-7xl px-6 py-8">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Related News</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedNews.map((item) => (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(item.category)}`}
                                            >
                                                <Tag className="h-3 w-3" />
                                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                            </span>
                                            <span className="text-xs text-gray-500">{formatDate(item.published_date)}</span>
                                        </div>

                                        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#4A7C59]">
                                            <Link href={`/news/${item.slug}`} className="hover:underline">
                                                {item.title}
                                            </Link>
                                        </h3>

                                        <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.excerpt}</p>

                                        <Link
                                            href={`/news/${item.slug}`}
                                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69]"
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
                    </section>
                )}
            </div>
        </>
    );
}

NewsDetail.layout = (page: React.ReactNode) => <WebsiteLayout title="News Detail">{page}</WebsiteLayout>;
