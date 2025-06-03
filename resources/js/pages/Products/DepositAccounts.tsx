import BankingAccountComponent from '@/components/BankingAccountComponent';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Banknote } from 'lucide-react';

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

export default function DepositAccountsPage({ schemes }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-3 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Banknote className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Deposit Accounts</h1>
                    <p className="mx-auto mb-2 max-w-3xl text-xl text-gray-600">
                        Secure your savings and grow your wealth with our comprehensive range of deposit account solutions. From current accounts to
                        specialized savings options, we have the perfect account for your financial goals.
                    </p>
                </div>

                <BankingAccountComponent schemes={schemes} />
            </div>
        </div>
    );
}

DepositAccountsPage.layout = (page: any) => <WebsiteLayout title="Deposit Accounts">{page}</WebsiteLayout>;
