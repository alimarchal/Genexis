import { ArrowRight, Bell, Calendar, ExternalLink, Star, TrendingUp } from 'lucide-react';
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
    is_published: boolean;
    created_at: string;
}

interface Props {
    newsAnnouncements?: NewsAnnouncement[];
    showAllLink?: string;
    maxItems?: number;
}

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'updates':
            return <TrendingUp className="h-4 w-4" />;
        case 'announcements':
            return <Bell className="h-4 w-4" />;
        case 'banking':
            return <Calendar className="h-4 w-4" />;
        case 'services':
            return <ExternalLink className="h-4 w-4" />;
        default:
            return <Calendar className="h-4 w-4" />;
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'updates':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'announcements':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'services':
            return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'banking':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

const NewsAnnouncements: React.FC<Props> = ({ newsAnnouncements = [], showAllLink = '/news', maxItems = 6 }) => {
    // Fallback static data if no props provided
    const fallbackNews = [
        {
            id: 1,
            title: 'Gold Loan Limit Enhanced to Rs. 2 Million',
            content:
                'BAJK has increased the gold loan limit from designated branches to help customers meet their financial needs with enhanced facility and better terms.',
            image: null,
            image_url: null,
            published_date: '2024-12-31',
            is_featured: true,
            category: 'banking',
            slug: 'gold-loan-limit-enhanced',
            is_published: true,
            created_at: '2024-12-31T10:00:00Z',
        },
        {
            id: 2,
            title: 'Advance Salary Loan Limit Increased',
            content:
                'Enhanced advance salary loan facility now available up to Rs. 3 million for eligible government employees with competitive rates.',
            image: null,
            image_url: null,
            published_date: '2024-12-30',
            is_featured: true,
            category: 'services',
            slug: 'advance-salary-loan-limit-increased',
            is_published: true,
            created_at: '2024-12-30T09:00:00Z',
        },
        {
            id: 3,
            title: 'Operating Profit Exceeds Rs. 2 Billion',
            content:
                'BAJK achieves remarkable financial performance with operating profit over 2 billion rupees in 2024, showing strong growth trajectory.',
            image: null,
            image_url: null,
            published_date: '2024-12-28',
            is_featured: false,
            category: 'general',
            slug: 'operating-profit-exceeds-2-billion',
            is_published: true,
            created_at: '2024-12-28T08:00:00Z',
        },
        {
            id: 4,
            title: 'New Branch Opening in Rawalakot',
            content: 'Expanding our network to better serve customers with a new branch in Rawalakot city center, offering full banking services.',
            image: null,
            image_url: null,
            published_date: '2024-12-25',
            is_featured: false,
            category: 'announcements',
            slug: 'new-branch-opening-rawalakot',
            is_published: true,
            created_at: '2024-12-25T07:00:00Z',
        },
        {
            id: 5,
            title: 'Updated Profit Rates for Term Deposits',
            content: 'Competitive profit rates announced for various term deposit schemes effective January 2025 with attractive returns.',
            image: null,
            image_url: null,
            published_date: '2024-12-20',
            is_featured: false,
            category: 'updates',
            slug: 'updated-profit-rates-term-deposits',
            is_published: true,
            created_at: '2024-12-20T06:00:00Z',
        },
        {
            id: 6,
            title: 'Digital Banking Services Launch',
            content:
                'New digital banking platform launched with enhanced security features and user-friendly interface for better customer experience.',
            image: null,
            image_url: null,
            published_date: '2024-12-15',
            is_featured: true,
            category: 'banking',
            slug: 'digital-banking-services-launch',
            is_published: true,
            created_at: '2024-12-15T05:00:00Z',
        },
    ];

    // Use provided data or fallback, filter published, sort by featured then date, limit items
    const displayNews = (newsAnnouncements.length > 0 ? newsAnnouncements : fallbackNews)
        .filter((item) => item.is_published)
        .sort((a, b) => {
            // Featured items first
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            // Then by published date (newest first)
            return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
        })
        .slice(0, maxItems);

    const isRecentNews = (date: string) => {
        const newsDate = new Date(date);
        const now = new Date();
        const diffInDays = (now.getTime() - newsDate.getTime()) / (1000 * 3600 * 24);
        return diffInDays <= 7; // Consider news from last 7 days as recent
    };

    const formatExcerpt = (content: string, maxLength: number = 120) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength).trim() + '...';
    };

    return (
        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4A7C59] to-[#F9B912]">
                        <Bell className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mb-4 bg-gradient-to-r from-[#4A7C59] to-[#2E5266] bg-clip-text text-4xl font-bold text-transparent">
                        Latest News & Updates
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        Stay informed about BAJK's latest developments, announcements, and banking innovations
                    </p>
                </div>

                {displayNews.length === 0 ? (
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <Bell className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-gray-900">No News Available</h3>
                        <p className="text-gray-500">Check back later for the latest updates and announcements.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {displayNews.map((item, index) => (
                            <article
                                key={item.id}
                                className={`group transform rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-100 ${
                                    item.is_featured ? 'ring-opacity-50 ring-2 ring-[#F9B912]' : ''
                                } ${index === 0 && item.is_featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                            >
                                {/* Image Section */}
                                {item.image_url && (
                                    <div className="relative overflow-hidden rounded-t-2xl">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {item.is_featured && (
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center rounded-full bg-[#F9B912] px-3 py-1 text-xs font-bold text-white shadow-lg">
                                                    <Star className="mr-1 h-3 w-3 fill-current" />
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                        {isRecentNews(item.published_date) && (
                                            <div className="absolute top-4 right-4">
                                                <span className="animate-pulse rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                                                    NEW
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getCategoryColor(item.category)}`}
                                        >
                                            {getCategoryIcon(item.category)}
                                            <span className="ml-1 capitalize">{item.category}</span>
                                        </span>
                                        {!item.image_url && item.is_featured && (
                                            <span className="inline-flex items-center rounded-full bg-[#F9B912] px-2 py-1 text-xs font-bold text-white">
                                                <Star className="mr-1 h-3 w-3 fill-current" />
                                                Featured
                                            </span>
                                        )}
                                        {!item.image_url && isRecentNews(item.published_date) && !item.is_featured && (
                                            <span className="animate-pulse rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">NEW</span>
                                        )}
                                    </div>

                                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#4A7C59]">
                                        {item.title}
                                    </h3>

                                    <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">{formatExcerpt(item.content)}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {new Date(item.published_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                        <a
                                            href={`/news/${item.slug}`}
                                            className="flex items-center font-semibold text-[#4A7C59] transition-all duration-300 hover:translate-x-1 hover:text-[#F9B912]"
                                        >
                                            Read More
                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {displayNews.length > 0 && (
                    <div className="mt-16 text-center">
                        <a
                            href={showAllLink}
                            className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#4A7C59] to-[#2E5266] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-100 focus:ring-4 focus:ring-green-200 focus:outline-none"
                        >
                            View All News & Updates
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsAnnouncements;
