import React from 'react';
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

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, showHomeIcon = true }) => (
    <div className="border-b border-white/20 bg-[#195f1f] text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-3">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                    {showHomeIcon && (
                        <>
                            <li>
                                <a href="/" className="flex items-center transition-colors duration-300 hover:text-[#F9B912]" aria-label="Home">
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
        </div>
    </div>
);

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
