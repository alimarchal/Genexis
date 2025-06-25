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
            sbp: string;
            banking_mohtasib: string;
            secp: string;
            goajk: string;
            gopak: string;
            ajk_tourism: string;
            loan_calculator: string;
        };
    };
}

const RegulatoryLinks: React.FC = () => {
    const { footerLinks } = usePage<SharedProps>().props;

    const regulatoryLinks = [
        { label: 'State Bank Pakistan', href: footerLinks.regulatory.sbp },
        { label: 'Banking Mohtasib', href: footerLinks.regulatory.banking_mohtasib },
        { label: 'SECP', href: footerLinks.regulatory.secp },
        { label: 'Govt. of AJK', href: footerLinks.regulatory.goajk },
        { label: 'Govt. of Pakistan', href: footerLinks.regulatory.gopak },
        { label: 'AJK Tourism', href: footerLinks.regulatory.ajk_tourism },
        { label: 'Loan Calculator', href: footerLinks.regulatory.loan_calculator },
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
