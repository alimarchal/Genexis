import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Building2, Calendar, Percent } from 'lucide-react';
import { useState, useMemo } from 'react';

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
    const [search, setSearch] = useState('');
    const filteredRates = useMemo(
        () => profitRates.filter(r => r.category.toLowerCase().includes(search.toLowerCase())),
        [search, profitRates]
    );
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
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full md:w-1/3 border border-[#4A7C59] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] bg-green-50 text-gray-700"
                    />
                </div>
                {profitRates.length === 0 ? (
                    <div className="py-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No Profit Rates Available</h3>
                        <p className="text-gray-600">Profit rates will be updated here as they become available.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="min-w-full bg-white shadow rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(filteredRates.length > 0 ? filteredRates : []).map((rate) => {
                                        const type = getCategoryType(rate.category);
                                        return (
                                            <tr key={rate.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{rate.category}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{formatRate(rate.rate)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{rate.valid_from} - {rate.valid_to || 'Ongoing'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}>
                                                        {type.icon} {rate.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
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
