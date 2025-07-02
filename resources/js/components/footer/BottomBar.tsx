// BottomBar.tsx - Clean Final Version with RegulatoryLinks Pattern
import { Link } from '@inertiajs/react';
import React from 'react';

const BottomBar: React.FC = () => {
    // Base64 encoded email URL for security obfuscation
    const encodedEmailUrl = 'aHR0cHM6Ly93d3cuYmFua2Fqay5jb206MjA5Ng=='; // https://www.bankajk.com:2096

    const links = [
        { label: 'Email Login', href: atob(encodedEmailUrl), isExternal: true },
        { label: 'Portal Login', href: '#', isExternal: false },
        { label: 'Organogram', href: 'https://genexis.test/about-us/organogram', isExternal: false },
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
            // Enhanced popup with hidden address bar
            const popup = window.open(
                url,
                'EmailLogin',
                'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no,addressbar=no,titlebar=no,directories=no',
            );

            if (!popup || popup.closed || typeof popup.closed == 'undefined') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        } catch {
            window.location.href = url;
        }
    };

    return (
        <div className="border-t border-white/20 bg-[#0d4a12]">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                    <span className="text-sm text-gray-300">
                        © {getYearRange()} Bank of Azad Jammu & Kashmir. All Rights Reserved. Digital Banking Solutions by Information Technology
                        Division.
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {links.map((link, i) => (
                            <React.Fragment key={i}>
                                {link.isExternal ? (
                                    <button
                                        onClick={(e) => handleExternalLink(e, link.href)}
                                        className="cursor-pointer border-none bg-transparent p-0 text-xs text-gray-400 transition-colors duration-200 hover:text-[#F9B912] sm:text-sm"
                                    >
                                        {link.label}
                                    </button>
                                ) : link.href.startsWith('#') ? (
                                    <a
                                        href={link.href}
                                        className="text-xs text-gray-400 transition-colors duration-200 hover:text-[#F9B912] sm:text-sm"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-xs text-gray-400 transition-colors duration-200 hover:text-[#F9B912] sm:text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                                {i < links.length - 1 && <span className="hidden text-gray-500 sm:inline">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
