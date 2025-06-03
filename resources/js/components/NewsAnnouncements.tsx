import { ArrowRight, Bell, Calendar, TrendingUp } from 'lucide-react';
import React from 'react';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: 'announcement' | 'rate-change' | 'service' | 'general';
    isNew?: boolean;
}

const NewsAnnouncements: React.FC = () => {
    const news: NewsItem[] = [
        {
            id: 1,
            title: 'Gold Loan Limit Enhanced to Rs. 2 Million',
            excerpt: 'BAJK has increased the gold loan limit from designated branches to help customers meet their financial needs.',
            date: '2024-12-31',
            category: 'announcement',
            isNew: true,
        },
        {
            id: 2,
            title: 'Advance Salary Loan Limit Increased',
            excerpt: 'Enhanced advance salary loan facility now available up to Rs. 3 million for eligible government employees.',
            date: '2024-12-30',
            category: 'service',
            isNew: true,
        },
        {
            id: 3,
            title: 'Operating Profit Exceeds Rs. 2 Billion',
            excerpt: 'BAJK achieves remarkable financial performance with operating profit over 2 billion rupees in 2024.',
            date: '2024-12-28',
            category: 'general',
        },
        {
            id: 4,
            title: 'New Branch Opening in Rawalakot',
            excerpt: 'Expanding our network to better serve customers with a new branch in Rawalakot city center.',
            date: '2024-12-25',
            category: 'announcement',
        },
        {
            id: 5,
            title: 'Updated Profit Rates for Term Deposits',
            excerpt: 'Competitive profit rates announced for various term deposit schemes effective January 2025.',
            date: '2024-12-20',
            category: 'rate-change',
        },
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'rate-change':
                return <TrendingUp className="h-4 w-4" />;
            case 'announcement':
                return <Bell className="h-4 w-4" />;
            default:
                return <Calendar className="h-4 w-4" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'rate-change':
                return 'bg-blue-100 text-blue-700';
            case 'announcement':
                return 'bg-green-100 text-green-700';
            case 'service':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Latest News & Updates</h2>
                        <p className="text-xl text-gray-600">Stay informed about BAJK's latest developments and announcements</p>
                    </div>
                    <a
                        href="/news"
                        className="hidden items-center rounded-lg bg-[#4A7C59] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#F9B912] md:inline-flex"
                    >
                        View All News
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((item, index) => (
                        <article
                            key={item.id}
                            className={`group transform rounded-xl border-2 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                            }`}
                        >
                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(item.category)}`}
                                    >
                                        {getCategoryIcon(item.category)}
                                        <span className="ml-1 capitalize">{item.category.replace('-', ' ')}</span>
                                    </span>
                                    {item.isNew && (
                                        <span className="animate-pulse rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">NEW</span>
                                    )}
                                </div>

                                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#4A7C59]">
                                    {item.title}
                                </h3>

                                <p className="mb-4 line-clamp-3 text-gray-600">{item.excerpt}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {new Date(item.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                    <button className="flex items-center font-semibold text-[#4A7C59] transition-colors hover:text-[#F9B912]">
                                        Read More
                                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <a
                        href="/news"
                        className="inline-flex items-center rounded-lg bg-[#4A7C59] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#F9B912]"
                    >
                        View All News
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NewsAnnouncements;
