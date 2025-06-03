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

export default function ConsumerFinances({ schemes }: Props) {
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
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Consumer Finances</h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Discover our comprehensive range of personal financing solutions designed to meet your everyday needs, from home purchases to
                        education and everything in between.
                    </p>
                </div>
                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

ConsumerFinances.layout = (page: any) => <WebsiteLayout title="Consumer Finances">{page}</WebsiteLayout>;
