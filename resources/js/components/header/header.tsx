import GlobalSearch from '@/components/search/GlobalSearch';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface MenuItem {
    id: number;
    title: string;
    url: string;
    target: string;
    icon?: string;
    cssClass?: string;
    isActive: boolean;
    hasChildren: boolean;
    isMegaMenu: boolean;
    children: MenuItem[];
}

interface HeaderProps {
    menuItems?: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({ menuItems = [] }) => {
    const { contact_phone } = usePage().props; // Get contact_phone from props
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenMobileSubmenu(null);
    };

    const handleSubmenuToggle = (menuId: string) => {
        setOpenMobileSubmenu(openMobileSubmenu === menuId ? null : menuId);
    };

    const renderMenuItem = (item: MenuItem, isMobile: boolean = false) => {
        const hasDropdown = item.hasChildren;
        const menuId = `menu-${item.id}`;

        if (hasDropdown) {
            return (
                <div
                    key={item.id}
                    className={`relative ${isMobile ? 'mb-2' : 'text-[13px] max-lg:px-3 max-lg:py-2 lg:flex lg:flex-shrink-0 lg:items-center'} ${item.cssClass || ''}`}
                >
                    <div className={isMobile ? '' : 'group lg:inline-block'}>
                        <button
                            className={
                                isMobile
                                    ? `flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 ${openMobileSubmenu === menuId ? 'bg-gray-100' : ''}`
                                    : `relative flex w-full min-w-fit flex-shrink-0 items-center justify-between text-left font-medium whitespace-nowrap text-slate-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 lg:px-1.5 lg:py-1 lg:text-[14px] xl:px-2 xl:text-[15px] 2xl:px-3 2xl:text-[16px] ${item.isActive ? 'text-blue-700' : ''}`
                            }
                            onClick={() => isMobile && handleSubmenuToggle(menuId)}
                            aria-expanded={openMobileSubmenu === menuId}
                            aria-haspopup="true"
                        >
                            {item.title}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16px"
                                height="16px"
                                className={`${isMobile ? 'h-5 w-5' : 'ml-1 inline-block'} transition-transform ${openMobileSubmenu === menuId ? 'rotate-180' : ''}`}
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
                            className={
                                isMobile
                                    ? `overflow-hidden transition-all duration-300 ${openMobileSubmenu === menuId ? 'mt-2 max-h-96' : 'max-h-0'}`
                                    : `absolute z-50 max-h-0 overflow-hidden bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] px-8 opacity-0 shadow-lg transition-all duration-300 group-hover:max-h-[700px] group-hover:pt-6 group-hover:pb-8 group-hover:opacity-100 max-lg:top-8 max-lg:left-0 lg:top-[53px] lg:left-0 ${item.isMegaMenu ? 'lg:grid lg:min-w-[400px] lg:grid-cols-2 lg:gap-6' : 'lg:min-w-[200px]'}`
                            }
                            role="menu"
                        >
                            {item.isMegaMenu ? renderMegaMenu(item.children) : renderSubmenu(item.children, isMobile)}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div key={item.id} className={isMobile ? 'mb-2' : 'max-lg:px-3 max-lg:py-2 lg:flex lg:min-w-fit lg:flex-shrink-0 lg:items-center'}>
                <a
                    href={item.url}
                    target={item.target}
                    className={
                        isMobile
                            ? `block rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 ${item.isActive ? 'bg-blue-50 text-blue-700' : ''}`
                            : `relative block min-w-fit flex-shrink-0 font-medium whitespace-nowrap after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full max-lg:border-b max-lg:border-gray-300 max-lg:pb-3 lg:px-1.5 lg:py-1 lg:text-[14px] xl:px-2 xl:text-[15px] 2xl:px-3 2xl:text-[16px] ${item.isActive ? 'text-blue-700' : 'text-slate-900'}`
                    }
                >
                    {item.title}
                </a>
            </div>
        );
    };

    const renderSubmenu = (children: MenuItem[], isMobile: boolean = false) => (
        <div className={isMobile ? 'ml-4 space-y-1' : 'max-lg:min-w-[160px] lg:min-w-[200px]'}>
            <ul className={isMobile ? 'space-y-1' : 'space-y-3'} role="none">
                {children.map((child) => (
                    <li key={child.id} className={isMobile ? '' : 'py-1'} role="none">
                        {child.hasChildren ? (
                            <div className={isMobile ? '' : 'group/nested relative'}>
                                <button
                                    className={
                                        isMobile
                                            ? 'ml-4 flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            : 'relative flex w-full items-center justify-between text-left text-[14px] font-normal text-slate-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[""] hover:text-[#F9B912] hover:after:w-full'
                                    }
                                >
                                    {child.title}
                                    <svg className="ml-1 h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6l-1.41-1.41z" />
                                    </svg>
                                </button>
                                {!isMobile && (
                                    <div className="invisible absolute top-0 left-full z-60 ml-2 min-w-[200px] bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] px-6 py-4 opacity-0 shadow-lg transition-all duration-300 group-hover/nested:visible group-hover/nested:opacity-100">
                                        <ul className="space-y-2">
                                            {child.children.map((grandchild) => (
                                                <li key={grandchild.id}>
                                                    <a
                                                        href={grandchild.url}
                                                        target={grandchild.target}
                                                        className="relative block text-[13px] font-normal text-slate-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                                                    >
                                                        {grandchild.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                href={child.url}
                                target={child.target}
                                className={
                                    isMobile
                                        ? 'ml-4 block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                        : 'relative block text-[14px] font-normal text-slate-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[""] hover:text-[#F9B912] hover:after:w-full'
                                }
                                role="menuitem"
                            >
                                {child.title}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderMegaMenu = (children: MenuItem[]) => (
        <>
            {children.map((section) => (
                <div key={section.id} className="space-y-3">
                    <h6 className="text-base font-medium text-blue-700">{section.title}</h6>
                    <ul className="space-y-2 border-t border-gray-300 pt-2">
                        {section.children.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.url}
                                    target={item.target}
                                    className="relative block text-[13px] font-normal text-slate-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );

    return (
        <>
            {/* Header */}
            <header className="relative flex min-h-[70px] border-b border-gray-300 bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] tracking-wide shadow-[0_4px_12px_0_rgba(0,0,0,0.07)]">
                <div className="relative flex w-full items-center px-6 py-0 sm:px-10">
                    {/* Logo Section - Responsive width */}
                    <div className="flex w-[15%] items-center justify-start sm:w-[12%] sm:justify-center lg:w-[15%]">
                        <a href="/">
                            <img src="/logo.png" alt="Company Logo" className="m-[10px] h-[40px] w-auto object-contain sm:h-[50px]" />
                        </a>
                    </div>

                    {/* Menu Section - Responsive width */}
                    <div className="flex flex-1 items-center justify-center lg:w-[65%]">
                        {/* Mobile Menu Backdrop */}
                        {isMobileMenuOpen && <div className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden" onClick={toggleMobileMenu} />}

                        {/* Desktop Menu */}
                        <nav className="hidden lg:flex lg:items-center lg:gap-x-1.5 lg:rounded-xl lg:bg-gradient-to-r lg:from-[#e9f7ef] lg:to-[#fff7e6] lg:px-2 lg:py-1.5 xl:gap-x-2.5 xl:px-3 xl:py-1.5 2xl:gap-x-4 2xl:px-4 2xl:py-2">
                            {menuItems.map((item) => renderMenuItem(item, false))}
                        </nav>

                        {/* Mobile Menu */}
                        <nav
                            className={`fixed top-0 left-0 z-50 h-full w-full max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
                                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                <a href="/" onClick={toggleMobileMenu}>
                                    <img src="/logo.png" alt="Company Logo" className="h-12 w-auto object-contain" />
                                </a>
                                <button
                                    onClick={toggleMobileMenu}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                                    aria-label="Close mobile menu"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-gray-600" viewBox="0 0 320.591 320.591">
                                        <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                                        <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Menu Content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">{menuItems.map((item) => renderMenuItem(item, true))}</div>
                            </div>

                            {/* Mobile Menu Footer */}
                            <div className="border-t border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <a
                                        href={`tel:${contact_phone}`}
                                        className="flex items-center space-x-3 rounded-lg bg-green-50 p-3 transition-colors hover:bg-green-100"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">Call Us</div>
                                            <div className="text-sm text-green-600">{contact_phone}</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* UAN and Search Section - Responsive width */}
                    <div className="flex w-[25%] items-center justify-end sm:w-[30%] lg:w-[20%]">
                        <div className="hidden h-full items-center lg:flex">
                            <div className="flex items-center gap-2 px-2 py-2 xl:gap-3 xl:px-4">
                                {/* Search Icon - Separate from UAN */}
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3a8d3a] to-[#f9a825] text-white shadow transition-all duration-200 hover:scale-105 hover:shadow-lg xl:h-10 xl:w-10"
                                    aria-label="Search"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 xl:h-6 xl:w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                {/* UAN Section - Now independent from search */}
                                <div className="flex min-w-0 flex-shrink flex-col">
                                    <span className="text-center text-[10px] font-bold tracking-wide whitespace-nowrap text-green-800 xl:text-xs">
                                        UAN
                                    </span>
                                    <a
                                        href={`tel:${contact_phone}`}
                                        className="overflow-hidden text-sm leading-tight font-bold text-ellipsis whitespace-nowrap text-green-800 transition-colors hover:text-orange-600 xl:text-lg"
                                        title={`Call ${contact_phone}`}
                                    >
                                        {contact_phone}
                                    </a>
                                    <span className="mt-1 overflow-hidden text-[9px] text-ellipsis whitespace-nowrap text-gray-500 xl:text-[11px]">
                                        We're here to help you 24/7
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile UAN and Search Section */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {/* Mobile Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#3a8d3a] to-[#f9a825] text-white shadow transition-all duration-200 hover:scale-105"
                                aria-label="Search"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {/* Mobile UAN */}
                            <a
                                href={`tel:${contact_phone}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white shadow transition-all duration-200 hover:scale-105"
                                aria-label={`Call ${contact_phone}`}
                                title={`Call ${contact_phone}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={toggleMobileMenu}
                                className="cursor-pointer rounded-md p-2 transition-colors hover:bg-gray-100"
                                aria-label="Open mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg className="h-7 w-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Global Search Component */}
            <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Header;
