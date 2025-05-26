import React, { useEffect, useRef, useState } from 'react';

const Header: React.FC = () => {
    const toggleOpenRef = useRef<HTMLButtonElement>(null);
    const toggleCloseRef = useRef<HTMLButtonElement>(null);
    const collapseMenuRef = useRef<HTMLDivElement>(null);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

    const handleClick = () => {
        if (collapseMenuRef.current) {
            if (collapseMenuRef.current.style.display === 'block') {
                collapseMenuRef.current.style.display = 'none';
            } else {
                collapseMenuRef.current.style.display = 'block';
            }
        }
    };

    useEffect(() => {
        const toggleOpen = toggleOpenRef.current;
        const toggleClose = toggleCloseRef.current;

        if (toggleOpen) {
            toggleOpen.addEventListener('click', handleClick);
        }
        if (toggleClose) {
            toggleClose.addEventListener('click', handleClick);
        }

        return () => {
            if (toggleOpen) {
                toggleOpen.removeEventListener('click', handleClick);
            }
            if (toggleClose) {
                toggleClose.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <header className="flex border-b border-gray-300 min-h-[70px] tracking-wide relative z-50 shadow-[0_4px_12px_0_rgba(0,0,0,0.07)] bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6]">
            <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:px-10 px-6 py-0 relative">
                <div className="flex items-center absolute left-0 top-0 h-full pl-2">
                    <a href="javascript:void(0)">
                        <img src="/logo.png" alt="logo" className="h-[50px] w-auto object-contain m-[10px]" />
                    </a>
                </div>
                <div style={{ width: '70px' }} className="hidden sm:block" />

                <div id="collapseMenu" ref={collapseMenuRef}
                    className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50">
                    <div className="flex items-center">
                        <button id="toggleClose" ref={toggleCloseRef} className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>
                        <ul className="lg:flex lg:items-center lg:ml-10 lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 lg:bg-gradient-to-r lg:from-[#e9f7ef] lg:to-[#fff7e6] lg:rounded-xl lg:px-4 lg:py-1">
                            <li className="max-lg:pb-4 px-3 lg:hidden">
                                <a href="javascript:void(0)">
                                    <img src="/logo.png" alt="logo" className="h-[50px] w-auto object-contain drop-shadow-md m-[10px]" />
                                </a>
                            </li>
                            <li className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href='javascript:void(0)'
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 text-blue-700 font-medium text-[15px] block lg:px-2 lg:py-1">Home</a>
                            </li>

                            {/* Agencies Dropdown */}
                            <li className="text-[14px] max-lg:px-3 max-lg:py-2 lg:flex lg:items-center relative">
                                <div className="group lg:inline-block">
                                    <a href='javascript:void(0)'
                                        className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 hover:fill-[#007bff] text-slate-900 font-medium text-[15px] flex items-center justify-between lg:px-2 lg:py-1"
                                        onClick={e => {
                                            if (window.innerWidth < 1024) {
                                                e.preventDefault();
                                                setOpenMobileSubmenu(openMobileSubmenu === 'agencies' ? null : 'agencies');
                                            }
                                        }}
                                    >Agencies
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            className="ml-1 inline-block"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                                data-name="16"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </a>
                                    <div
                                        className={`absolute lg:top-full lg:left-0 max-lg:top-8 max-lg:left-0 z-50 lg:mt-1 shadow-lg bg-white transition-all duration-300 px-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] group-hover:pb-8 group-hover:pt-6
                                            ${openMobileSubmenu === 'agencies' ? 'max-lg:max-h-[700px] max-lg:pb-8 max-lg:pt-6 max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:overflow-hidden max-lg:opacity-0'}
                                        `}
                                    >
                                        <div className="lg:min-w-[180px] max-lg:min-w-[140px]">
                                            <h6 className="text-base text-blue-700 font-medium">USA</h6>
                                            <ul className="mt-3 pt-3 border-t border-gray-300 space-y-3">
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">New York</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">San Francisco</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Houston</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Dallas</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Philadelphia</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">San Diego</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Atlanta</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Austin</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Portland</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Denver</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href='javascript:void(0)'
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 text-slate-900 font-medium text-[15px] block lg:px-2 lg:py-1">Team</a>
                            </li>

                            {/* Contact Dropdown */}
                            <li className="text-[14px] max-lg:px-3 max-lg:py-2 lg:flex lg:items-center relative">
                                <div className="group lg:inline-block">
                                    <a href='javascript:void(0)'
                                        className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 text-slate-900 font-medium text-[15px] flex items-center justify-between lg:px-2 lg:py-1"
                                        onClick={e => {
                                            if (window.innerWidth < 1024) {
                                                e.preventDefault();
                                                setOpenMobileSubmenu(openMobileSubmenu === 'contact' ? null : 'contact');
                                            }
                                        }}
                                    >Contact
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            className="ml-1 inline-block"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                                data-name="16"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </a>
                                    <div
                                        className={`absolute lg:top-full lg:left-0 max-lg:top-8 max-lg:left-0 z-50 lg:mt-1 shadow-lg bg-white transition-all duration-300 px-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] group-hover:pb-8 group-hover:pt-6
                                            ${openMobileSubmenu === 'contact' ? 'max-lg:max-h-[700px] max-lg:pb-8 max-lg:pt-6 max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:overflow-hidden max-lg:opacity-0'}
                                        `}
                                    >
                                        <div className="lg:min-w-[180px] max-lg:min-w-[140px]">
                                            <h6 className="text-base text-blue-700 font-medium">UK</h6>
                                            <ul className="mt-3 pt-3 border-t border-gray-300 space-y-3">
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">London</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Bristol</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Birmingham</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Liverpool</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Manchester</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href='javascript:void(0)'
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 text-slate-900 font-medium text-[15px] block lg:px-2 lg:py-1">Source</a>
                            </li>

                            {/* Partner Dropdown */}
                            <li className="text-[14px] max-lg:px-3 max-lg:py-2 lg:flex lg:items-center relative">
                                <div className="group lg:inline-block">
                                    <a href='javascript:void(0)'
                                        className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 text-slate-900 font-medium text-[15px] flex items-center justify-between lg:px-2 lg:py-1"
                                        onClick={e => {
                                            if (window.innerWidth < 1024) {
                                                e.preventDefault();
                                                setOpenMobileSubmenu(openMobileSubmenu === 'partner' ? null : 'partner');
                                            }
                                        }}
                                    >Partner
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            className="ml-1 inline-block"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                                data-name="16"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </a>
                                    <div
                                        className={`absolute lg:top-full lg:left-0 max-lg:top-8 max-lg:left-0 z-50 lg:mt-1 shadow-lg bg-white transition-all duration-300 px-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] group-hover:pb-8 group-hover:pt-6
                                            ${openMobileSubmenu === 'partner' ? 'max-lg:max-h-[700px] max-lg:pb-8 max-lg:pt-6 max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:overflow-hidden max-lg:opacity-0'}
                                        `}
                                    >
                                        <div className="lg:min-w-[180px] max-lg:min-w-[140px]">
                                            <h6 className="text-base text-blue-700 font-medium">Canada</h6>
                                            <ul className="mt-3 pt-3 border-t border-gray-300 space-y-3">
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Toronto</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Calgary</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Ottawa</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Vancouver</a></li>
                                                <li className="py-1"><a href='javascript:void(0)'
                                                    className="hover:text-blue-700 text-slate-900 font-normal text-[15px] block">Montréal</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="max-lg:px-3 max-lg:py-2 lg:flex lg:items-center">
                                <a href='javascript:void(0)'
                                    className="max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 hover:text-blue-700 text-slate-900 font-medium text-[15px] block lg:px-2 lg:py-1">Feature</a>
                            </li>
                        </ul>
                        <div className="hidden lg:flex items-center ml-6 h-full">
                            <div className="flex items-center gap-3 px-5 py-2">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3a8d3a] to-[#f9a825] shadow text-white">
                                    <a href="tel:+925822924244">
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
                    <button id="toggleOpen" ref={toggleOpenRef} className="cursor-pointer">
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