import React from 'react';
import BottomBar from './footer/BottomBar';
import ContactInfo from './footer/ContactInfo';
import LogoSection from './footer/LogoSection';
import QuickLinks from './footer/QuickLinks';

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
                <ContactInfo />
            </div>
        </div>
        <BottomBar />
    </footer>
);

export default Footer;
