import BankingAccountComponent from '@/components/BankingAccountComponent';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
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
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Hero Section */}
                <div className="text-center mb-3">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] rounded-full">
                            <TrendingUp className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Term Deposits</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-3">
                        Maximize your returns with our competitive term deposit options. Lock in attractive rates and watch your investments grow with guaranteed returns over your chosen investment period.
                    </p>
                </div>

                <BankingAccountComponent schemes={schemes} />
            </div>
        </div>
    );
}

TermDeposit.layout = (page: any) => (
    <WebsiteLayout title="Term Deposit">
        {page}
    </WebsiteLayout>
);