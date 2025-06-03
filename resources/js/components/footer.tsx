// Footer.jsx
import React from 'react';
import BottomBar from './footer/BottomBar';
import ContactInfo from './footer/ContactInfo';
import LogoSection from './footer/LogoSection';
import QuickLinks from './footer/QuickLinks';

const Footer: React.FC = () => (
    <footer className="w-full bg-[#195f1f] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-3">
            <LogoSection />
            <QuickLinks />
            <ContactInfo />
        </div>
        <BottomBar />
    </footer>
);

export default Footer;
