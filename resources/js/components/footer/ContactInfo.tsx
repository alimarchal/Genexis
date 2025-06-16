// ContactInfo.tsx
import { usePage } from '@inertiajs/react';
import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

interface ContactInfoProps {
    contact_phone?: string;
    contact_email?: string;
    contact_address?: string;
}

const ContactInfo: React.FC = () => {
    const { contact_phone, contact_email, contact_address } = usePage<ContactInfoProps>().props;

    return (
        <div className="space-y-6">
            <h3 className="inline-block border-b border-[#F9B912] pb-2 text-xl font-semibold text-white">Contact Us</h3>
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded bg-[#F9B912]/20">
                        <FaMapMarkerAlt className="h-4 w-4 text-[#F9B912]" />
                    </div>
                    <address className="text-sm leading-relaxed text-gray-200 not-italic">
                        {contact_address || 'Head Office, Bank Square, Chattar Domel, Muzaffarabad, AJK, Pakistan'}
                    </address>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F9B912]/20">
                        <FaPhoneAlt className="h-4 w-4 text-[#F9B912]" />
                    </div>
                    <a
                        href={`tel:${contact_phone?.replace(/[^\d+]/g, '') || ''}`}
                        className="text-sm text-gray-200 transition-colors duration-200 hover:text-[#F9B912]"
                    >
                        {contact_phone || '+92.300.8169925'}
                    </a>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F9B912]/20">
                        <FaEnvelope className="h-4 w-4 text-[#F9B912]" />
                    </div>
                    <a
                        href={`mailto:${contact_email || ''}`}
                        className="text-sm break-all text-gray-200 transition-colors duration-200 hover:text-[#F9B912]"
                    >
                        {contact_email || 'ali.marchal@bankajk.com'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
