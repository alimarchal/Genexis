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
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                {/* Hero Section */}
                <div className="mb-2 text-center sm:mb-3">
                    <div className="mb-4 flex justify-center sm:mb-6">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-3 sm:p-4">
                            <TrendingUp className="h-10 w-10 text-white sm:h-12 sm:w-12" />
                        </div>
                    </div>
                    <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:mb-4 sm:text-4xl">Term Deposits</h1>
                    <p className="mx-auto mb-2 max-w-3xl px-4 text-base text-gray-600 sm:mb-3 sm:text-lg md:text-xl">
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
