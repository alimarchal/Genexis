import React from 'react';

const QuickLinks: React.FC = () => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Links</h3>
        <ul className="space-y-2 text-sm">
            {['About Us', 'Branch Network', 'News & Update', 'Gallery', 'Downloads', 'Contact'].map((txt, i) => (
                <li key={i}>
                    <a
                        href="#"
                        className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                    >
                        {txt}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

export default QuickLinks;
