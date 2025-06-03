import React from 'react';
import { Calendar, ArrowRight, Bell, TrendingUp } from 'lucide-react';

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
            title: "Gold Loan Limit Enhanced to Rs. 2 Million",
            excerpt: "BAJK has increased the gold loan limit from designated branches to help customers meet their financial needs.",
            date: "2024-12-31",
            category: "announcement",
            isNew: true
        },
        {
            id: 2,
            title: "Advance Salary Loan Limit Increased",
            excerpt: "Enhanced advance salary loan facility now available up to Rs. 3 million for eligible government employees.",
            date: "2024-12-30",
            category: "service",
            isNew: true
        },
        {
            id: 3,
            title: "Operating Profit Exceeds Rs. 2 Billion",
            excerpt: "BAJK achieves remarkable financial performance with operating profit over 2 billion rupees in 2024.",
            date: "2024-12-28",
            category: "general"
        },
        {
            id: 4,
            title: "New Branch Opening in Rawalakot",
            excerpt: "Expanding our network to better serve customers with a new branch in Rawalakot city center.",
            date: "2024-12-25",
            category: "announcement"
        },
        {
            id: 5,
            title: "Updated Profit Rates for Term Deposits",
            excerpt: "Competitive profit rates announced for various term deposit schemes effective January 2025.",
            date: "2024-12-20",
            category: "rate-change"
        }
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'rate-change': return <TrendingUp className="w-4 h-4" />;
            case 'announcement': return <Bell className="w-4 h-4" />;
            default: return <Calendar className="w-4 h-4" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'rate-change': return 'bg-blue-100 text-blue-700';
            case 'announcement': return 'bg-green-100 text-green-700';
            case 'service': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
                        <p className="text-xl text-gray-600">Stay informed about BAJK's latest developments and announcements</p>
                    </div>
                    <a
                        href="/news"
                        className="hidden md:inline-flex items-center px-6 py-3 bg-[#4A7C59] text-white font-semibold rounded-lg hover:bg-[#F9B912] transition-colors"
                    >
                        View All News
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <article
                            key={item.id}
                            className={`bg-white rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                                }`}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                                        {getCategoryIcon(item.category)}
                                        <span className="ml-1 capitalize">{item.category.replace('-', ' ')}</span>
                                    </span>
                                    {item.isNew && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                                            NEW
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4A7C59] transition-colors line-clamp-2">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(item.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <button className="text-[#4A7C59] hover:text-[#F9B912] font-semibold flex items-center transition-colors">
                                        Read More
                                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center mt-12 md:hidden">
                    <a
                        href="/news"
                        className="inline-flex items-center px-8 py-4 bg-[#4A7C59] text-white font-semibold rounded-lg hover:bg-[#F9B912] transition-colors"
                    >
                        View All News
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NewsAnnouncements;