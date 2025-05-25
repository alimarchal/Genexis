// Footer.jsx
import React from 'react';
import LogoSection from './footer/LogoSection';
import QuickLinks from './footer/QuickLinks';
import ContactInfo from './footer/ContactInfo';
import BottomBar from './footer/BottomBar';

const Footer: React.FC = () => (
    <footer className="bg-[#195f1f] text-white w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <LogoSection />
            <QuickLinks />
            <ContactInfo />
        </div>
        <BottomBar />
    </footer>
);

export default Footer;
