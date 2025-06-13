
// BottomBar.tsx
import { Link } from '@inertiajs/react';
import React from 'react';

const BottomBar: React.FC = () => {
    const links = [
        { text: 'Careers', href: route('public-careers') },
        { text: 'Downloads', href: route('public-downloads') },
        { text: 'Organogram', href: '#' },
    ];

    return (
        <div className="border-t border-white/20 bg-[#0d4a12]">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                    <span className="text-sm text-gray-300">
                        © {new Date().getFullYear()} Bank of Azad Jammu & Kashmir. All Rights Reserved.
                    </span>
                    <div className="flex flex-wrap items-center justify-center space-x-6">
                        {links.map((link, i) =>
                            link.href.startsWith('#') ? (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]"
                                >
                                    {link.text}
                                </a>
                            ) : (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-[#F9B912]"
                                >
                                    {link.text}
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