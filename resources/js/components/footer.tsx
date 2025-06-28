// Footer.tsx - Enhanced Corporate Layout
import React from 'react';
import BottomBar from './footer/BottomBar';
import ContactInfo from './footer/ContactInfo';
import LogoSection from './footer/LogoSection';
import QuickLinks from './footer/QuickLinks';
import RegulatoryLinks from './footer/RegulatoryLinks';

interface FooterProps {
    bankBranchesCount: number;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
        youtube: string;
    };
}

const Footer: React.FC<FooterProps> = ({ bankBranchesCount, socialLinks }) => (
    <footer className="w-full bg-[#0d4a12] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <LogoSection bankBranchesCount={bankBranchesCount} socialLinks={socialLinks} />
                <QuickLinks />
                {/* <ServicesLinks /> */}
                <ContactInfo />
            </div>
        </div>
        <RegulatoryLinks />
        <BottomBar />
    </footer>
);

export default Footer;
