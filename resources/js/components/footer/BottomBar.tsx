import React from 'react';

const BottomBar: React.FC = () => (
    <div className="border-t border-white/20 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
            <span className="opacity-80">
                © {new Date().getFullYear()} Bank of Azad Jammu & Kashmir. All Rights Reserved.
            </span>
            <div className="flex space-x-6 mt-2 sm:mt-0">
                {['Careers', 'Downloads', 'Organogram'].map((txt, i) => (
                    <a
                        key={i}
                        href="#"
                        className="
                            relative inline-block
                            hover:text-[#F9B912]
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full
                        "
                    >
                        {txt}
                    </a>
                ))}
            </div>
        </div>
    </div>
);

export default BottomBar; 