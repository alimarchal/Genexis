import BankingAccountComponent from '@/components/BankingAccountComponent';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { TrendingUp } from 'lucide-react';

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

export default function TermDeposit({ schemes }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <TrendingUp className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Term Deposits</h1>
                    <p className="mx-auto mb-3 max-w-3xl text-xl text-gray-600">
                        Maximize your returns with our competitive term deposit options. Lock in attractive rates and watch your investments grow with
                        guaranteed returns over your chosen investment period.
                    </p>
                </div>

                <BankingAccountComponent schemes={schemes} />
            </div>
        </div>
    );
}

TermDeposit.layout = (page: React.ReactNode) => <WebsiteLayout title="Term Deposit">{page}</WebsiteLayout>;
