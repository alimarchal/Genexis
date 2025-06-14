// BottomBar.tsx
import { Link } from '@inertiajs/react';
import React from 'react';

const BottomBar: React.FC = () => {
    const links = [
        { label: 'Email Login', href: 'https://www.bankajk.com:2096', isExternal: true },
        { label: 'Portal Login', href: '#', isExternal: false },
        { label: 'Organogram', href: '#', isExternal: false },
    ];

    const handleExternalLink = (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        try {
            // Try popup first
            const popup = window.open(url, 'EmailLogin', 'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no');
            
            // Fallback to new tab if popup fails
            if (!popup || popup.closed || typeof popup.closed == 'undefined') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        } catch (error) {
            // Final fallback - direct navigation
            window.location.href = url;
        }
    };

    return (
        <div className="border-t border-white/20 bg-[#0d4a12]">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                    <span className="text-sm text-gray-300">
                        © {new Date().getFullYear()} Bank of Azad Jammu & Kashmir. All Rights Reserved.
                    </span>
                    <div className="flex flex-wrap items-center justify-center space-x-6">
                        {links.map((link, i) => (
                            link.isExternal ? (
                                <button
                                    key={i}
                                    onClick={(e) => handleExternalLink(e, link.href)}
                                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912] cursor-pointer bg-transparent border-none p-0"
                                >
                                    {link.label}
                                </button>
                            ) : link.href.startsWith('#') ? (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;