// BottomBar.tsx - Updated with IT Division text and dynamic year
import { Link } from '@inertiajs/react';
import React from 'react';

const BottomBar: React.FC = () => {
    const links = [
        { label: 'Email Login', href: 'https://www.bankajk.com:2096', isExternal: true },
        { label: 'Portal Login', href: '#', isExternal: false },
        { label: 'Organogram', href: '#', isExternal: false },
    ];

    const getYearRange = () => {
        const currentYear = new Date().getFullYear();
        if (currentYear === 2025) {
            return '2025';
        } else {
            return `25-${currentYear}`;
        }
    };

    const handleExternalLink = (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        try {
            // Try popup first
            const popup = window.open(
                url,
                'EmailLogin',
                'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no',
            );

            // Fallback to new tab if popup fails
            if (!popup || popup.closed || typeof popup.closed == 'undefined') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        } catch {
            // Final fallback - direct navigation
            window.location.href = url;
        }
    };

    return (
        <div className="border-t border-white/20 bg-[#0d4a12]">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                    <span className="text-sm text-gray-300">
                        © {getYearRange()} Bank of Azad Jammu & Kashmir. All Rights Reserved. Developed & Maintained by Information Technology Division
                    </span>
                    <div className="flex flex-wrap items-center justify-center space-x-6">
                        {links.map((link, i) =>
                            link.isExternal ? (
                                <button
                                    key={i}
                                    onClick={(e) => handleExternalLink(e, link.href)}
                                    className="cursor-pointer border-none bg-transparent p-0 text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]"
                                >
                                    {link.label}
                                </button>
                            ) : link.href.startsWith('#') ? (
                                <a key={i} href={link.href} className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]">
                                    {link.label}
                                </a>
                            ) : (
                                <Link key={i} href={link.href} className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]">
                                    {link.label}
                                </Link>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;