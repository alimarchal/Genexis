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
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Commercial / SME Finances</h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Empower your business growth with our tailored commercial and SME financing solutions. From working capital to equipment
                        financing, we support your business ambitions.
                    </p>
                </div>
                <LoanSchemesComponent schemes={schemes} />
            </div>
        </div>
    );
}

CommercialSmeFinances.layout = (page: React.ReactNode) => <WebsiteLayout title="Commercial / SME Finances">{page}</WebsiteLayout>;
