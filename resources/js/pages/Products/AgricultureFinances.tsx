import LoanSchemesComponent from '@/components/LoanSchemesComponent';
import LoanCalculatorBanner from '@/components/LoanCalculatorBanner';
import WebsiteLayout from '@/layouts/WebsiteLayout';

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

export default function AgricultureFinances({ schemes }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Agriculture Finances</h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Supporting the backbone of our economy with specialized agricultural financing solutions. From crop production to farm
                        development, we're here to help your agricultural ventures thrive.
                    </p>
                </div>
                
                {/* Loan Calculator Banner */}
                <LoanCalculatorBanner 
                    title="Calculate Your Agricultural Loan"
                    description="Plan your agricultural investments with our specialized calculator. Get EMI calculations for crop financing, farm equipment, livestock, and agricultural development loans."
                    className="mb-8"
                />
                
                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

AgricultureFinances.layout = (page: React.ReactNode) => <WebsiteLayout title="Agriculture Finances">{page}</WebsiteLayout>;
