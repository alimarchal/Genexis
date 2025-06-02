import LoanSchemesComponent from '@/components/LoanSchemesComponent';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface ProductSchemeAttribute {
    id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
}

interface ProductScheme {
    id: number;
    name: string;
    description: string;
    attributes: ProductSchemeAttribute[];
}

interface Props {
    schemes: ProductScheme[];
}

export default function CommercialSmeFinances({ schemes }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Hero Section */}
                <div className="text-center mb-3">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Commercial / SME Finances</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Empower your business growth with our tailored commercial and SME financing solutions. From working capital to equipment financing, we support your business ambitions.
                    </p>
                </div>
                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

CommercialSmeFinances.layout = (page: any) => (
    <WebsiteLayout title="Commercial / SME Finances">
        {page}
    </WebsiteLayout>
);