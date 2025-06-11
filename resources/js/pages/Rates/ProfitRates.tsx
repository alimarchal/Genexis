import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Building2, Calendar, Percent } from 'lucide-react';

interface ProfitRate {
    id: number;
    category: string;
    rate: number;
    valid_from: string;
    valid_to: string | null;
    is_active: boolean;
    status: string;
}

interface ProfitRatesPublicProps {
    profitRates: ProfitRate[];
}

const ProfitRatesPublic = ({ profitRates }: ProfitRatesPublicProps) => {
    const formatRate = (rate: number) => {
        return `${rate}%`;
    };

    const getCategoryType = (category: string) => {
        if (category.toLowerCase().includes('saving') || category.toLowerCase().includes('pls') || category.toLowerCase().includes('remittance')) {
            return { color: 'bg-blue-100 text-blue-800', icon: '💰' };
        }
        if (category.toLowerCase().includes('sda')) {
            return { color: 'bg-green-100 text-green-800', icon: '🏦' };
        }
        if (category.toLowerCase().includes('tdr') || category.toLowerCase().includes('deposit')) {
            return { color: 'bg-purple-100 text-purple-800', icon: '📈' };
        }
        return { color: 'bg-gray-100 text-gray-800', icon: '💼' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Percent className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Current Profit Rates</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Stay informed with our latest profit rates across all product categories. All rates are effective as of today and subject to change as per market conditions.
                    </p>
                </div>

                {/* Rates Grid */}
                {profitRates.length === 0 ? (
                    <div className="py-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No Profit Rates Available</h3>
                        <p className="text-gray-600">Profit rates will be updated here as they become available.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {profitRates.map((rate) => {
                            const categoryType = getCategoryType(rate.category);
                            return (
                                <div
                                    key={rate.id}
                                    className="group relative transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-white/20 p-2">
                                                <Percent className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white">{formatRate(rate.rate)}</div>
                                                <p className="text-white/90">Annual Return</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {/* Category */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{rate.category}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${categoryType.color}`}>
                                                        <span>{categoryType.icon}</span>
                                                        {rate.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Validity Period */}
                                            <div className="border-t pt-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                    <Calendar className="h-4 w-4" />
                                                    <span className="font-medium">Validity Period</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">From:</span>
                                                        <span className="font-medium text-gray-900">{rate.valid_from}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">To:</span>
                                                        <span className="font-medium text-gray-900">
                                                            {rate.valid_to || 'Ongoing'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Information Section */}
                <div className="mt-12 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-[#4A7C59]">About Profit Rates</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Product Categories</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• PLS Saving Deposits - Profit & Loss Sharing accounts</li>
                                <li>• BMBA - Basic Banking accounts with competitive rates</li>
                                <li>• SDA - Special Deposit Accounts with tiered rates</li>
                                <li>• TDR - Term Deposit Receipts for fixed periods</li>
                                <li>• Notice Deposits - Flexible withdrawal options</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Important Information</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Rates are calculated on annual basis</li>
                                <li>• Subject to Islamic banking principles</li>
                                <li>• Rates may vary based on deposit amount</li>
                                <li>• Updated regularly as per market conditions</li>
                                <li>• Contact our branch for detailed terms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfitRatesPublic.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Profit Rates" breadcrumbs={[{ label: 'Rates', href: '/rates' }]}>
        {page}
    </WebsiteLayout>
);

export default ProfitRatesPublic;
