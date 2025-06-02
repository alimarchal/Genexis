import ServicesPage from '@/components/Service';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';



export default function AgricultureFinances() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-6 py-8">
                <ServicesPage />
            </div>
        </div>
    );
}

AgricultureFinances.layout = (page: any) => (
    <WebsiteLayout title="Services">
        {page}
    </WebsiteLayout>
);