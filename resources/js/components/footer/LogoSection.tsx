import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

interface LogoSectionProps {
    bankBranchesCount: number;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
        youtube: string;
    };
}

const LogoSection: React.FC<LogoSectionProps> = ({ bankBranchesCount, socialLinks }) => {
    return (
        <div className="space-y-6">
            <div>
                <img src="/logo.png" alt="BAJK Logo" className="h-16 w-auto" />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-100">
                A growing Bank in Azad Jammu & Kashmir with <strong className="text-[#F9B912]">{bankBranchesCount}</strong> branches, mobilizing
                savings, promoting economic development, and offering tailored banking solutions for equal access to resources.
            </p>
            <div className="flex space-x-4">
                {[
                    { Icon: FaFacebookF, label: 'Facebook', href: socialLinks.facebook },
                    { Icon: FaTwitter, label: 'Twitter', href: socialLinks.twitter },
                    { Icon: FaInstagram, label: 'Instagram', href: socialLinks.instagram },
                    { Icon: FaLinkedinIn, label: 'LinkedIn', href: socialLinks.linkedin },
                    { Icon: FaYoutube, label: 'YouTube', href: socialLinks.youtube },
                ].map(({ Icon, label, href }, i) => (
                    <a
                        key={i}
                        href={href}
                        aria-label={label}
                        target={href !== '#' ? '_blank' : undefined}
                        rel={href !== '#' ? 'noopener noreferrer' : undefined}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-[#F9B912] hover:text-[#195f1f]"
                    >
                        <Icon className="h-4 w-4" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default LogoSection;
