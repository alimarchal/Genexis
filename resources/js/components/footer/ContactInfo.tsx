import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactInfo: React.FC = () => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <ul className="space-y-3 text-sm">
            <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-[#F9B912]" />
                <address className="leading-relaxed not-italic">
                    Head Office, Bank Square,
                    <br />
                    Chattar Domel, Muzaffarabad, 13100
                    <br />
                    Azad Jammu & Kashmir, Pakistan
                </address>
            </li>
            <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-[#F9B912]" />
                <a
                    href="tel:+925822924244"
                    className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                >
                    +92 (5822) 924244
                </a>
            </li>
            <li className="flex items-center">
                <FaEnvelope className="mr-2 text-[#F9B912]" />
                <a
                    href="mailto:info@bankajk.com"
                    className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F9B912] after:transition-all after:duration-300 after:content-[''] hover:text-[#F9B912] hover:after:w-full"
                >
                    info@bankajk.com
                </a>
            </li>
        </ul>
    </div>
);

export default ContactInfo;
