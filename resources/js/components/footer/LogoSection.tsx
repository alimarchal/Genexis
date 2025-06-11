import { usePage } from '@inertiajs/react';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../../../../public/logo.png';

interface SharedProps {
    bankBranchesCount: number;
}

const LogoSection: React.FC = () => {
    // grab the shared prop
    const { bankBranchesCount } = usePage<SharedProps>().props;

    return (
        <div className="space-y-4">
            <img src={logo} alt="BAJK Logo" className="h-16 w-auto" />
            <p className="text-sm leading-relaxed opacity-90">
                A growing Bank in Azad Jammu & Kashmir with <strong>{bankBranchesCount}</strong> branches, mobilizing savings, promoting economic
                development, and offering tailored banking solutions for equal access to resources.
            </p>
            <div className="flex space-x-4 text-lg">
                {[
                    { Icon: FaFacebookF, label: 'Facebook' },
                    { Icon: FaTwitter, label: 'Twitter' },
                    { Icon: FaInstagram, label: 'Instagram' },
                    { Icon: FaLinkedinIn, label: 'LinkedIn' },
                    { Icon: FaYoutube, label: 'YouTube' },
                ].map(({ Icon, label }, i) => (
                    <a key={i} href="#" aria-label={label} className="text-white transition-colors hover:text-[#F9B912]">
                        <Icon />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default LogoSection;
