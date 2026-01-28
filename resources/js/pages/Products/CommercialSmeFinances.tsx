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

export default function CommercialSmeFinances({ schemes }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Commercial / SME Finances</h1>
                    <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
                        Empower your business growth with our tailored commercial and SME financing solutions. From working capital to equipment
                        financing, we support your business ambitions.
                    </p>
                </div>

                {/* Loan Calculator Banner */}
                <LoanCalculatorBanner
                    title="Calculate Your Business Loan"
                    description="Plan your commercial financing needs with precision. Calculate EMIs for working capital, equipment loans, business expansion, and SME financing solutions."
                    className="mb-8"
                />

                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

CommercialSmeFinances.layout = (page: React.ReactNode) => <WebsiteLayout title="Commercial / SME Finances">{page}</WebsiteLayout>;
