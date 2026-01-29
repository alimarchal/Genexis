import LoanCalculatorBanner from '@/components/LoanCalculatorBanner';
import LoanSchemesComponent from '@/components/LoanSchemesComponent';
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

export default function MicroFinances({ schemes }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Micro Finances</h1>
                    <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
                        Empowering small entrepreneurs and fostering financial inclusion through our micro-financing solutions. Small loans, big
                        dreams, and sustainable growth for communities.
                    </p>
                </div>

                {/* Loan Calculator Banner */}
                <LoanCalculatorBanner
                    title="Calculate Your Micro Loan"
                    description="Plan your small business financing with our micro-loan calculator. Get instant EMI calculations for small business loans, startup funding, and community development financing."
                    className="mb-8"
                />

                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

MicroFinances.layout = (page: React.ReactNode) => <WebsiteLayout title="Micro Finances">{page}</WebsiteLayout>;
