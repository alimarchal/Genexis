import { Link } from '@inertiajs/react';
import React from 'react';

const quickLinkItems = [
    { label: 'About Us', href: route('about.board-directors') }, // Assuming 'About Us' can map to board of directors or a general about page if you create one.
    { label: 'Branch Network', href: route('about.branch-network') },
    { label: 'News & Update', href: route('news') },
    { label: 'Gallery', href: '#' }, // No route for Gallery yet
    { label: 'Downloads', href: route('public-downloads') },
    { label: 'Contact', href: route('contact') },
];

const QuickLinks: React.FC = () => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Links</h3>
        <ul className="space-y-2 text-sm">
            {quickLinkItems.map((item, i) => (
                <li key={i}>
                    <Link
                        href={item.href}
                        className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default QuickLinks;
