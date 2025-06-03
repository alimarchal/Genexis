import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Send } from 'lucide-react';
import { useState } from 'react';

interface RemittanceAttribute {
    id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
}

interface RemittanceService {
    id: number;
    name: string;
    description: string;
    attributes: RemittanceAttribute[];
}

const HomeRemittancePage = () => {
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Dummy data for remittance services
    const remittanceServices: RemittanceService[] = [
        {
            id: 1,
            name: 'MoneyGram',
            description: 'Fast and reliable money transfers worldwide',
            attributes: [
                { id: 1, attribute_name: 'Eligibility', attribute_value: 'Valid CNIC holders and account holders', sort_order: 1 },
                { id: 2, attribute_name: 'Feature 1', attribute_value: 'Send money to 200+ countries', sort_order: 2 },
                { id: 3, attribute_name: 'Feature 2', attribute_value: 'Receive money within minutes', sort_order: 3 },
                { id: 4, attribute_name: 'Feature 3', attribute_value: 'Competitive exchange rates', sort_order: 4 },
                { id: 5, attribute_name: 'Feature 4', attribute_value: '24/7 customer support', sort_order: 5 },
                { id: 6, attribute_name: 'Feature 5', attribute_value: 'Track your transfer online', sort_order: 6 },
                { id: 7, attribute_name: 'Transfer Limits', attribute_value: 'Minimum: USD 50\nMaximum: USD 10,000 per transaction', sort_order: 7 },
                { id: 8, attribute_name: 'Processing Time', attribute_value: 'Instant to 24 hours depending on destination', sort_order: 8 },
                { id: 9, attribute_name: 'Required Documents', attribute_value: 'CNIC, Source of income proof, Beneficiary details', sort_order: 9 },
            ],
        },
        {
            id: 2,
            name: 'Western Union',
            description: 'Trusted global money transfer service',
            attributes: [
                { id: 10, attribute_name: 'Eligibility', attribute_value: 'Pakistani nationals with valid identification', sort_order: 1 },
                { id: 11, attribute_name: 'Feature 1', attribute_value: 'Global network in 200+ countries', sort_order: 2 },
                { id: 12, attribute_name: 'Feature 2', attribute_value: 'Cash pickup available worldwide', sort_order: 3 },
                { id: 13, attribute_name: 'Feature 3', attribute_value: 'Direct bank account deposits', sort_order: 4 },
                { id: 14, attribute_name: 'Feature 4', attribute_value: 'Mobile wallet transfers', sort_order: 5 },
                { id: 15, attribute_name: 'Feature 5', attribute_value: 'Bill payment services', sort_order: 6 },
                { id: 16, attribute_name: 'Transfer Limits', attribute_value: 'Minimum: USD 25\nMaximum: USD 7,500 per transaction', sort_order: 7 },
                { id: 17, attribute_name: 'Exchange Rates', attribute_value: 'Updated real-time rates with transparent fees', sort_order: 8 },
                { id: 18, attribute_name: 'Service Hours', attribute_value: 'Monday to Saturday: 9:00 AM to 6:00 PM', sort_order: 9 },
            ],
        },
        {
            id: 3,
            name: 'RIA Money Transfer',
            description: 'Affordable international money transfers',
            attributes: [
                { id: 19, attribute_name: 'Eligibility', attribute_value: 'All residents of Pakistan with valid CNIC', sort_order: 1 },
                { id: 20, attribute_name: 'Feature 1', attribute_value: 'Low cost transfers to 160+ countries', sort_order: 2 },
                { id: 21, attribute_name: 'Feature 2', attribute_value: 'Same day delivery available', sort_order: 3 },
                { id: 22, attribute_name: 'Feature 3', attribute_value: 'Home delivery service', sort_order: 4 },
                { id: 23, attribute_name: 'Feature 4', attribute_value: 'SMS and email notifications', sort_order: 5 },
                { id: 24, attribute_name: 'Feature 5', attribute_value: 'Multi-language customer support', sort_order: 6 },
                { id: 25, attribute_name: 'Transfer Limits', attribute_value: 'Minimum: USD 30\nMaximum: USD 5,000 per transaction', sort_order: 7 },
                { id: 26, attribute_name: 'Special Offers', attribute_value: 'First-time customers get reduced fees', sort_order: 8 },
                { id: 27, attribute_name: 'Delivery Options', attribute_value: 'Bank account, Cash pickup, Home delivery', sort_order: 9 },
            ],
        },
    ];

    const activeService = remittanceServices[activeServiceIndex];

    const getAttributeValue = (attributeName: string): string => {
        const attr = activeService.attributes.find((a) => a.attribute_name.toLowerCase() === attributeName.toLowerCase());
        return attr?.attribute_value || '';
    };

    const getFeatures = (): string[] => {
        return activeService.attributes
            .filter((a) => a.attribute_name.toLowerCase().startsWith('feature'))
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((a) => a.attribute_value);
    };

    const eligibility = getAttributeValue('Eligibility');
    const features = getFeatures();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Send className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Home Remittance</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Send and receive money globally with our trusted remittance partners. Fast, secure, and affordable international money
                        transfers to your loved ones.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3 p-4">
                        {remittanceServices.map((service, index) => {
                            const getIcon = (name: string) => {
                                if (name.toLowerCase().includes('moneygram')) return '💰';
                                if (name.toLowerCase().includes('western')) return '🌍';
                                if (name.toLowerCase().includes('ria')) return '💸';
                                return '💱';
                            };

                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveServiceIndex(index)}
                                    className={`flex flex-shrink-0 items-center gap-2 rounded-lg border bg-white px-4 py-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${activeServiceIndex === index
                                            ? 'scale-105 border-[#4A7C59] shadow-lg'
                                            : 'border-gray-200 hover:border-[#4A7C59]/30'
                                        }`}
                                >
                                    <span className="text-lg">{getIcon(service.name)}</span>
                                    <span
                                        className={`text-sm font-medium sm:text-base ${activeServiceIndex === index ? 'text-[#4A7C59]' : 'text-gray-700'
                                            }`}
                                    >
                                        {service.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Service Details */}
                <div
                    className="transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6">
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                        <h1 className="relative z-10 text-3xl font-bold text-white">{activeService.name}</h1>
                        <p className="relative z-10 mt-2 text-white/90">{activeService.description}</p>
                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 transform rounded-full bg-gradient-to-bl from-[#F9B912]/20 to-transparent" />
                    </div>

                    <div className="p-8">
                        {/* Eligibility Section */}
                        {eligibility && (
                            <div className="mb-10">
                                <h2 className="mb-4 flex items-center text-xl font-semibold text-[#4A7C59]">
                                    <div className="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-[#4A7C59] to-[#F9B912]"></div>
                                    Eligibility
                                </h2>
                                <div className="rounded-xl border border-[#4A7C59]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#6B9B7A]/10 p-6 shadow-sm">
                                    <p className="leading-relaxed text-gray-700">{eligibility}</p>
                                </div>
                            </div>
                        )}

                        {/* Features Section */}
                        {features.length > 0 && (
                            <div className="mb-10">
                                <h2 className="mb-6 flex items-center text-xl font-semibold text-[#4A7C59]">
                                    <div className="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-[#F9B912] to-[#4A7C59]"></div>
                                    Features
                                </h2>
                                <div className="grid gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start rounded-xl border border-[#F9B912]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#F9B912]/40 hover:shadow-lg"
                                        >
                                            <div className="mt-2 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                            <p className="leading-relaxed font-medium text-gray-700">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Other Attributes */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {activeService.attributes
                                .filter(
                                    (attr) =>
                                        !attr.attribute_name.toLowerCase().includes('eligibility') &&
                                        !attr.attribute_name.toLowerCase().startsWith('feature'),
                                )
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((attr) => (
                                    <div
                                        key={attr.id}
                                        className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#4A7C59]/5 to-[#F9B912]/5 p-4"
                                    >
                                        <h3 className="mb-2 font-semibold text-[#4A7C59]">{attr.attribute_name}</h3>
                                        <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{attr.attribute_value}</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full bg-gradient-to-bl from-[#F9B912]/30 via-[#F9B912]/10 to-transparent transition-all duration-500 hover:scale-125 hover:opacity-60" />
                    <div className="absolute bottom-0 left-0 h-16 w-16 -translate-x-6 translate-y-6 transform rounded-full bg-gradient-to-tr from-[#4A7C59]/20 via-[#4A7C59]/5 to-transparent transition-all duration-500 hover:scale-125 hover:opacity-60" />
                </div>
            </div>
        </div>
    );
};

HomeRemittancePage.layout = (page: React.ReactNode) => <WebsiteLayout title="Home Remittance">{page}</WebsiteLayout>;

export default HomeRemittancePage;
