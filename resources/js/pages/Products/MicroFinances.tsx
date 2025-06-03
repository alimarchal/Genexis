import LoanSchemesComponent from '@/components/LoanSchemesComponent';
import WebsiteLayout from '@/layouts/WebsiteLayout';
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

export default function MicroFinances({ schemes }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Micro Finances</h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Empowering small entrepreneurs and fostering financial inclusion through our micro-financing solutions. Small loans, big
                        dreams, and sustainable growth for communities.
                    </p>
                </div>
                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

MicroFinances.layout = (page: any) => <WebsiteLayout title="Micro Finances">{page}</WebsiteLayout>;
