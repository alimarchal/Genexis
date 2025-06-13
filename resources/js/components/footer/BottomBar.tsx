import { Link } from '@inertiajs/react';
import React from 'react';

const BottomBar: React.FC = () => {
    const links = [
        { text: 'Careers', href: route('public-careers') },
        { text: 'Downloads', href: route('public-downloads') },
        { text: 'Organogram', href: '#' },
    ];

    return (
        <div className="mt-8 border-t border-white/20">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-4 text-sm sm:flex-row">
                <span className="opacity-80">© {new Date().getFullYear()} Bank of Azad Jammu & Kashmir. All Rights Reserved.</span>
                <div className="mt-2 flex space-x-6 sm:mt-0">
                    {links.map((link, i) =>
                        link.href.startsWith('#') ? (
                            <a
                                key={i}
                                href={link.href}
                                className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                            >
                                {link.text}
                            </a>
                        ) : (
                            <Link
                                key={i}
                                href={link.href}
                                className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                            >
                                {link.text}
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
