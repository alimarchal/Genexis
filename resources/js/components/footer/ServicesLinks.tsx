// footer/ServicesLinks.tsx - Using Inertia shared data
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import React from 'react';

const ServicesLinks: React.FC = () => {
    const { footerLinks } = usePage<PageProps>().props;

    const services = [
        { label: 'Portal Login', href: footerLinks.banking.portal_login },
        { label: 'Branch Locator', href: footerLinks.banking.branch_locator },
        { label: 'ATM Locator', href: footerLinks.banking.atm_locator },
        { label: 'Exchange Rates', href: footerLinks.banking.exchange_rates },
        { label: 'Interest Rates', href: footerLinks.banking.interest_rates },
        { label: 'Forms & Applications', href: footerLinks.banking.forms },
        { label: 'Tenders & Notices', href: footerLinks.banking.tenders },
    ];

    return (
        <div className="space-y-6">
            <h3 className="inline-block border-b border-[#F9B912] pb-2 text-xl font-semibold text-white">Banking Services</h3>
            <ul className="space-y-3">
                {services.map((service, index) => (
                    <li key={index}>
                        <a
                            href={service.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-200 transition-colors duration-200 hover:text-[#F9B912]"
                        >
                            {service.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesLinks;
