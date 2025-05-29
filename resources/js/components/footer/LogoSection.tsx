import React from 'react';
import { usePage } from '@inertiajs/react';
import logo from '../../../../public/logo.png';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa';

interface PageProps {
    bankBranchesCount: number;
}

const LogoSection: React.FC = () => {
    // grab the shared prop
    const { bankBranchesCount } = usePage<PageProps>().props;

    return (
        <div className="space-y-4">
            <img src={logo} alt="BAJK Logo" className="h-16 w-auto" />
            <p className="text-sm leading-relaxed opacity-90">
                A growing Bank in Azad Jammu & Kashmir with{' '}
                <strong>{bankBranchesCount}</strong> branches, mobilizing savings,
                promoting economic development, and offering tailored banking solutions
                for equal access to resources.
            </p>
            <div className="flex space-x-4 text-lg">
                {[
                    { Icon: FaFacebookF, label: 'Facebook' },
                    { Icon: FaTwitter, label: 'Twitter' },
                    { Icon: FaInstagram, label: 'Instagram' },
                    { Icon: FaLinkedinIn, label: 'LinkedIn' },
                    { Icon: FaYoutube, label: 'YouTube' },
                ].map(({ Icon, label }, i) => (
                    <a
                        key={i}
                        href="#"
                        aria-label={label}
                        className="text-white hover:text-[#F9B912] transition-colors"
                    >
                        <Icon />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default LogoSection;
