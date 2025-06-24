// footer/QuickLinks.tsx - Updated with existing structure + Organogram
import { Link } from '@inertiajs/react';
import React from 'react';

interface QuickLinkItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

const quickLinkItems: QuickLinkItem[] = [
    { label: 'About Us', href: route('about.board-directors') },
    { label: 'Branch Network', href: route('about.branch-network') },
    { label: 'News & Updates', href: route('news') },
    { label: 'Downloads', href: route('public-downloads') },
    { label: 'Careers', href: route('public-careers') },
    { label: 'Organogram', href: route('about.organogram') },
];

const QuickLinks: React.FC = () => {
    const handleExternalLink = (href: string) => {
        window.open(href, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="space-y-6">
            <h3 className="inline-block border-b border-[#F9B912] pb-2 text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
                {quickLinkItems.map((item, i) => (
                    <li key={i}>
                        {item.isExternal ? (
                            <button
                                onClick={() => handleExternalLink(item.href)}
                                className="text-sm text-gray-200 transition-colors duration-200 hover:text-[#F9B912]"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <Link href={item.href} className="text-sm text-gray-200 transition-colors duration-200 hover:text-[#F9B912]">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickLinks;
