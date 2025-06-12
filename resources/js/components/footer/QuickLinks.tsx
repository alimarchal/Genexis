import { Link } from '@inertiajs/react';
import React from 'react';

interface QuickLinkItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

const quickLinkItems: QuickLinkItem[] = [
    { label: 'About Us', href: route('about.board-directors') }, // Assuming 'About Us' can map to board of directors or a general about page if you create one.
    { label: 'Branch Network', href: route('about.branch-network') },
    { label: 'News & Update', href: route('news') },
    { label: 'Email Login', href: 'https://www.bankajk.com:2096', isExternal: true }, // Opens in new window
    { label: 'Downloads', href: route('public-downloads') },
    { label: 'Contact', href: route('contact') },
];

const QuickLinks: React.FC = () => {
    const handleExternalLink = (url: string) => {
        window.open(url, 'EmailLogin', 'width=1200,height=800,scrollbars=yes,resizable=yes,status=yes,location=yes,menubar=yes,toolbar=yes');
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                {quickLinkItems.map((item, i) => (
                    <li key={i}>
                        {item.isExternal ? (
                            <button
                                onClick={() => handleExternalLink(item.href)}
                                className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full text-left"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <Link
                                href={item.href}
                                className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                            >
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
