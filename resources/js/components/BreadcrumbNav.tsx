import GlobalSearch from '@/components/search/GlobalSearch';
import React, { useState } from 'react';
import { FaChevronRight, FaHome } from 'react-icons/fa';

interface BreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
}

interface BreadcrumbNavProps {
    items: BreadcrumbItem[];
    showHomeIcon?: boolean;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, showHomeIcon = true }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="border-b border-white/20 bg-[#195f1f] text-white shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-3">
                <div className="flex items-center justify-between">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2 text-sm">
                            {showHomeIcon && (
                                <>
                                    <li>
                                        <a
                                            href="/"
                                            className="flex items-center transition-colors duration-300 hover:text-[#F9B912]"
                                            aria-label="Home"
                                        >
                                            <FaHome className="h-4 w-4" />
                                        </a>
                                    </li>
                                    {items.length > 0 && (
                                        <li>
                                            <FaChevronRight className="h-3 w-3 opacity-60" />
                                        </li>
                                    )}
                                </>
                            )}

                            {items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li className="flex items-center">
                                        {item.href && !item.isActive ? (
                                            <a
                                                href={item.href}
                                                className="relative inline-block max-w-[120px] truncate after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full sm:max-w-none"
                                                title={item.label}
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <span
                                                className={`max-w-[120px] truncate sm:max-w-none ${item.isActive ? 'font-medium text-[#F9B912]' : 'opacity-80'} `}
                                                title={item.label}
                                            >
                                                {item.label}
                                            </span>
                                        )}
                                    </li>

                                    {index < items.length - 1 && (
                                        <li>
                                            <FaChevronRight className="h-3 w-3 opacity-60" />
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                        </ol>
                    </nav>

                    {/* Prominent Search Button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#F9B912] to-[#ffcc33] px-4 py-2 text-sm font-medium text-[#195f1f] shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-[#F9B912] focus:ring-offset-2 focus:ring-offset-[#195f1f] focus:outline-none"
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="hidden sm:inline">Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Global Search Component */}
            <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default BreadcrumbNav;

// Usage Examples:

// Basic usage
const breadcrumbItems = [
    { label: 'About Us', href: '/about' },
    { label: 'Management', href: '/about/management' },
    { label: 'Board of Directors', isActive: true },
];

// Example component showing how to use it
export const BreadcrumbNavExample: React.FC = () => (
    <div>
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Alternative without home icon */}
        <BreadcrumbNav items={breadcrumbItems} showHomeIcon={false} />

        {/* Simple breadcrumb */}
        <BreadcrumbNav
            items={[
                { label: 'Services', href: '/services' },
                { label: 'Personal Banking', isActive: true },
            ]}
        />
    </div>
);
