import React, { useState } from 'react';

// Database structure interfaces
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

interface BankingAccountComponentProps {
    schemes: ProductScheme[];
    defaultActiveIndex?: number;
}

const BankingAccountComponent: React.FC<BankingAccountComponentProps> = ({ schemes, defaultActiveIndex = 0 }) => {
    const [activeSchemeIndex, setActiveSchemeIndex] = useState(defaultActiveIndex);
    const [isHovered, setIsHovered] = useState(false);

    if (!schemes.length) {
        return (
            <div className="flex items-center justify-center px-4 py-8">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-[#4A7C59]">No Schemes Available</h2>
                    <p className="text-gray-600">Please provide scheme data to display.</p>
                </div>
            </div>
        );
    }

    const activeScheme = schemes[activeSchemeIndex];

    // Group attributes by type for better display
    const getAttributeValue = (attributeName: string): string => {
        const attr = activeScheme.attributes.find((a) => a.attribute_name.toLowerCase() === attributeName.toLowerCase());
        return attr?.attribute_value || '';
    };

    const getFeatures = (): string[] => {
        return activeScheme.attributes
            .filter((a) => a.attribute_name.toLowerCase().startsWith('feature'))
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((a) => a.attribute_value);
    };

    const eligibility = getAttributeValue('Eligibility');
    const features = getFeatures();

    return (
        <div className="px-4 py-8">
            <div className="mx-auto max-w-7xl">
                {/* Navigation Tabs - Responsive with icons */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3 p-4">
                        {schemes.map((scheme, index) => {
                            // Get appropriate icon for each scheme
                            const getIcon = (name: string) => {
                                const schemeName = name.toLowerCase();
                                if (schemeName.includes('current')) return '💳';
                                if (schemeName.includes('pls') || schemeName.includes('savings')) return '💰';
                                if (schemeName.includes('special') || schemeName.includes('deposit')) return '🏦';
                                if (schemeName.includes('bemisal') || schemeName.includes('bmba')) return '📊';
                                if (schemeName.includes('premium') || schemeName.includes('remittance')) return '💱';
                                return '💼';
                            };

                            return (
                                <button
                                    key={scheme.id}
                                    onClick={() => setActiveSchemeIndex(index)}
                                    className={`flex flex-shrink-0 items-center gap-2 rounded-lg border bg-white px-4 py-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                        activeSchemeIndex === index
                                            ? 'scale-105 border-[#4A7C59] shadow-lg'
                                            : 'border-gray-200 hover:border-[#4A7C59]/30'
                                    }`}
                                >
                                    <span className="text-lg">{getIcon(scheme.name)}</span>
                                    <span
                                        className={`text-sm font-medium sm:text-base ${
                                            activeSchemeIndex === index ? 'text-[#4A7C59]' : 'text-gray-700'
                                        }`}
                                    >
                                        {scheme.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Scheme Details */}
                <div
                    className="transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6">
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <h1 className="relative z-10 text-3xl font-bold text-white">{activeScheme.name}</h1>
                        {activeScheme.description && <p className="relative z-10 mt-2 text-white/90">{activeScheme.description}</p>}
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

                        {/* All Other Attributes */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {activeScheme.attributes
                                .filter(
                                    (attr) =>
                                        !attr.attribute_name.toLowerCase().includes('eligibility') &&
                                        !attr.attribute_name.toLowerCase().includes('feature') &&
                                        !attr.attribute_name.toLowerCase().includes('salient'),
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

export default BankingAccountComponent;
