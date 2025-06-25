// footer/RegulatoryLinks.tsx - Using Inertia shared data
import { usePage } from '@inertiajs/react';
import React from 'react';

interface SharedProps {
    footerLinks: {
        regulatory: {
            privacy_policy: string;
            terms: string;
            cookie_policy: string;
            accessibility: string;
            regulatory_info: string;
            security_tips: string;
            fraud_prevention: string;
        };
    };
}

const RegulatoryLinks: React.FC = () => {
    const { footerLinks } = usePage<SharedProps>().props;

    const regulatoryLinks = [
        { label: 'State Bank Pakistan', href: footerLinks.regulatory.privacy_policy },
        { label: 'Banking Mohtasib', href: footerLinks.regulatory.terms },
        { label: 'SECP', href: footerLinks.regulatory.cookie_policy },
        { label: 'Govt. of AJK', href: footerLinks.regulatory.accessibility },
        { label: 'Govt. of Pakistan', href: footerLinks.regulatory.regulatory_info },
        { label: 'AJK Tourism', href: footerLinks.regulatory.security_tips },
        { label: 'Fraud Prevention', href: footerLinks.regulatory.fraud_prevention },
    ];

    return (
        <div className="border-t border-white/20 bg-[#0d4a12]">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex flex-wrap items-center justify-center gap-6">
                    {regulatoryLinks.map((link, index) => (
                        <React.Fragment key={index}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-400 transition-colors duration-200 hover:text-[#F9B912] sm:text-sm"
                            >
                                {link.label}
                            </a>
                            {index < regulatoryLinks.length - 1 && <span className="hidden text-gray-500 sm:inline">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegulatoryLinks;
