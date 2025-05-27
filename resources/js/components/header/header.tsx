import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenMobileSubmenu(null); // Close any open submenus when toggling main menu
    };

    const handleSubmenuToggle = (menuName: string) => {
        setOpenMobileSubmenu(openMobileSubmenu === menuName ? null : menuName);
    };

    return (
        <header className="flex border-b border-gray-300 min-h-[70px] tracking-wide relative z-50 shadow-[0_4px_12px_0_rgba(0,0,0,0.07)] bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6]">
            <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:px-10 px-6 py-0 relative">
                <div className="flex items-center absolute left-0 top-0 h-full pl-2">
                    <a href="/">
                        <img src="/logo.png" alt="Company Logo" className="h-[50px] w-auto object-contain m-[10px]" />
                    </a>
                </div>
                <div className="hidden sm:block w-[70px]" />

                <div className={`max-lg:fixed max-lg:inset-0 max-lg:bg-black max-lg:bg-opacity-40 max-lg:z-40 ${isMobileMenuOpen ? 'max-lg:block' : 'max-lg:hidden'} lg:block`}>
                    <div className="flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                            aria-label="Close mobile menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                            </svg>
                        </button>
                        <nav
                            className="lg:flex lg:items-center lg:ml-10 lg:gap-x-8 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-[85%] max-lg:min-w-[280px] max-lg:max-w-[350px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 lg:bg-gradient-to-r lg:from-[#e9f7ef] lg:to-[#fff7e6] lg:rounded-xl lg:px-4 lg:py-1"
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            <div className="max-lg:pb-4 px-3 lg:hidden">
                                <a href="/">
                                    <img src="/logo.png" alt="Company Logo" className="h-[50px] w-auto object-contain drop-shadow-md m-[10px]" />
                                </a>
                            </div>

                            {/* Home */}
                            <div className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href="/"
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] text-blue-700 font-medium text-[15px] block lg:px-2 lg:py-1 relative
            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
            after:h-[2px] after:w-0 after:bg-[#F9B912]
            after:transition-all after:duration-300
            hover:after:w-full">
                                    Home
                                </a>
                            </div>

                            {/* About */}
                            <div className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href="/about"
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] text-slate-900 font-medium text-[15px] block lg:px-2 lg:py-1 relative
            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
            after:h-[2px] after:w-0 after:bg-[#F9B912]
            after:transition-all after:duration-300
            hover:after:w-full">
                                    About Us
                                </a>
                            </div>


                            <div className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href="/team"
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] text-slate-900 font-medium text-[15px] block lg:px-2 lg:py-1 relative
            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
            after:h-[2px] after:w-0 after:bg-[#F9B912]
            after:transition-all after:duration-300
            hover:after:w-full">
                                    Financials
                                </a>
                            </div>

                            {/* Services Dropdown */}
                            <div className="text-[14px] max-lg:px-3 max-lg:py-2 lg:flex lg:items-center relative">
                                <div className="group lg:inline-block">
                                    <button
                                        className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] hover:fill-[#007bff] text-slate-900 font-medium text-[15px] flex items-center justify-between lg:px-2 lg:py-1 w-full text-left relative
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                after:h-[2px] after:w-0 after:bg-[#F9B912]
                after:transition-all after:duration-300
                hover:after:w-full"
                                        onClick={() => handleSubmenuToggle('services')}
                                        aria-expanded={openMobileSubmenu === 'services'}
                                        aria-haspopup="true"
                                    >
                                        Services
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            className={`ml-1 inline-block transition-transform ${openMobileSubmenu === 'services' ? 'max-lg:rotate-180' : ''}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                                data-name="16"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        className={`absolute lg:top-[53px] lg:left-0 max-lg:top-8 max-lg:left-0 z-50 shadow-lg bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] transition-all duration-300 px-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] group-hover:pb-8 group-hover:pt-6
                    ${openMobileSubmenu === 'services' ? 'max-lg:max-h-[700px] max-lg:pb-8 max-lg:pt-6 max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:overflow-hidden max-lg:opacity-0'}
                `}
                                        role="menu"
                                    >
                                        <div className="lg:min-w-[200px] max-lg:min-w-[160px]">
                                            <h6 className="text-base text-blue-700 font-medium">Our Services</h6>
                                            <ul className="mt-3 pt-3 border-t border-gray-300 space-y-3" role="none">
                                                <li className="py-1" role="none">
                                                    <a href="/services/web-development" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Web Development
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/services/mobile-apps" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Mobile Apps
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/services/digital-marketing" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Digital Marketing
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/services/consulting" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Consulting
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/services/design" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        UI/UX Design
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Team */}


                            {/* Portfolio Dropdown */}
                            <div className="text-[14px] max-lg:px-3 max-lg:py-2 lg:flex lg:items-center relative">
                                <div className="group lg:inline-block">
                                    <button
                                        className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] text-slate-900 font-medium text-[15px] flex items-center justify-between lg:px-2 lg:py-1 w-full text-left relative
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                after:h-[2px] after:w-0 after:bg-[#F9B912]
                after:transition-all after:duration-300
                hover:after:w-full"
                                        onClick={() => handleSubmenuToggle('portfolio')}
                                        aria-expanded={openMobileSubmenu === 'portfolio'}
                                        aria-haspopup="true"
                                    >
                                        Rate & Charges
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            className={`ml-1 inline-block transition-transform ${openMobileSubmenu === 'portfolio' ? 'max-lg:rotate-180' : ''}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                                data-name="16"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        className={`absolute lg:top-[53px] lg:left-0 max-lg:top-8 max-lg:left-0 z-50 shadow-lg bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] transition-all duration-300 px-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] group-hover:pb-8 group-hover:pt-6
                    ${openMobileSubmenu === 'portfolio' ? 'max-lg:max-h-[700px] max-lg:pb-8 max-lg:pt-6 max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:overflow-hidden max-lg:opacity-0'}
                `}
                                        role="menu"
                                    >
                                        <div className="lg:min-w-[200px] max-lg:min-w-[160px]">
                                            <h6 className="text-base text-blue-700 font-medium">Our Work</h6>
                                            <ul className="mt-3 pt-3 border-t border-gray-300 space-y-3" role="none">
                                                <li className="py-1" role="none">
                                                    <a href="/portfolio/websites" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Websites
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/portfolio/mobile-apps" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Mobile Apps
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/portfolio/branding" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Branding
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/portfolio/ecommerce" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        E-commerce
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Resources Dropdown */}
                            <div className="text-[14px] max-lg:px-3 max-lg:py-2 lg:flex lg:items-center relative">
                                <div className="group lg:inline-block">
                                    <button
                                        className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] text-slate-900 font-medium text-[15px] flex items-center justify-between lg:px-2 lg:py-1 w-full text-left relative
                after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                after:h-[2px] after:w-0 after:bg-[#F9B912]
                after:transition-all after:duration-300
                hover:after:w-full"
                                        onClick={() => handleSubmenuToggle('resources')}
                                        aria-expanded={openMobileSubmenu === 'resources'}
                                        aria-haspopup="true"
                                    >
                                        Branch Network
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            className={`ml-1 inline-block transition-transform ${openMobileSubmenu === 'resources' ? 'max-lg:rotate-180' : ''}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                                data-name="16"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        className={`absolute lg:top-[53px] lg:left-0 max-lg:top-8 max-lg:left-0 z-50 shadow-lg bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] transition-all duration-300 px-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] group-hover:pb-8 group-hover:pt-6
                    ${openMobileSubmenu === 'resources' ? 'max-lg:max-h-[700px] max-lg:pb-8 max-lg:pt-6 max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:overflow-hidden max-lg:opacity-0'}
                `}
                                        role="menu"
                                    >
                                        <div className="lg:min-w-[200px] max-lg:min-w-[160px]">
                                            <h6 className="text-base text-blue-700 font-medium">Learn & Explore</h6>
                                            <ul className="mt-3 pt-3 border-t border-gray-300 space-y-3" role="none">
                                                <li className="py-1" role="none">
                                                    <a href="/blog" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Blog
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/case-studies" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Case Studies
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/downloads" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Downloads
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/documentation" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        Documentation
                                                    </a>
                                                </li>
                                                <li className="py-1" role="none">
                                                    <a href="/faq" className="hover:text-[#F9B912] text-slate-900 font-normal text-[15px] block relative
                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                            after:h-[2px] after:w-0 after:bg-[#F9B912]
                            after:transition-all after:duration-300
                            hover:after:w-full" role="menuitem">
                                                        FAQ
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href="/contact"
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-[#F9B912] text-slate-900 font-medium text-[15px] block lg:px-2 lg:py-1 relative
            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
            after:h-[2px] after:w-0 after:bg-[#F9B912]
            after:transition-all after:duration-300
            hover:after:w-full">
                                    Contact
                                </a>
                            </div>
                        </nav>

                        <div className="hidden lg:flex items-center ml-4 h-full">
                            <div className="flex items-center gap-3 px-4 py-2">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3a8d3a] to-[#f9a825] shadow text-white">
                                    <a href="tel:+925822924244" aria-label="Call us">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </a>
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-xs text-green-800 font-bold tracking-wide text-center">UAN</span>
                                    <a href="tel:+925822924244" className="text-green-800 font-bold text-lg leading-tight hover:text-orange-600 transition-colors">+92-5822-924244</a>
                                    <span className="text-[11px] text-gray-500 mt-1">We're here to help you 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center ml-auto lg:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors"
                        aria-label="Open mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;