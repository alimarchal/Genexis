// Footer.tsx
import React from 'react';
import BottomBar from './footer/BottomBar';
import ContactInfo from './footer/ContactInfo';
import LogoSection from './footer/LogoSection';
import QuickLinks from './footer/QuickLinks';

const Footer: React.FC = () => (
    <footer className="w-full bg-[#195f1f] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                <LogoSection />
                <QuickLinks />
                <ContactInfo />
            </div>
        </div>
        <BottomBar />
    </footer>
);

export default Footer;