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
        <div className="px-4 py-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
                {/* Navigation Tabs - Responsive with icons */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-wrap justify-center gap-2 p-2 sm:gap-3 sm:p-4">
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
                                    className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg border bg-white px-3 py-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:gap-2 sm:px-4 sm:py-3 ${
                                        activeSchemeIndex === index
                                            ? 'scale-105 border-[#4A7C59] shadow-lg'
                                            : 'border-gray-200 hover:border-[#4A7C59]/30'
                                    }`}
                                >
                                    <span className="text-base sm:text-lg">{getIcon(scheme.name)}</span>
                                    <span
                                        className={`text-xs font-medium sm:text-sm md:text-base ${
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
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <h1 className="relative z-10 text-xl font-bold text-white sm:text-2xl md:text-3xl">{activeScheme.name}</h1>
                        {activeScheme.description && (
                            <p className="relative z-10 mt-2 text-sm text-white/90 sm:text-base">{activeScheme.description}</p>
                        )}
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 transform rounded-full bg-gradient-to-bl from-[#F9B912]/20 to-transparent sm:h-32 sm:w-32 sm:translate-x-16 sm:-translate-y-16" />
                    </div>

                    <div className="p-4 sm:p-6 md:p-8">
                        {/* Eligibility Section */}
                        {eligibility && (
                            <div className="mb-6 sm:mb-8 md:mb-10">
                                <h2 className="mb-3 flex items-center text-lg font-semibold text-[#4A7C59] sm:mb-4 sm:text-xl">
                                    <div className="mr-2 h-5 w-1 rounded-full bg-gradient-to-b from-[#4A7C59] to-[#F9B912] sm:mr-3 sm:h-6"></div>
                                    Eligibility
                                </h2>
                                <div className="rounded-xl border border-[#4A7C59]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#6B9B7A]/10 p-4 shadow-sm sm:p-6">
                                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{eligibility}</p>
                                </div>
                            </div>
                        )}

                        {/* Features Section */}
                        {features.length > 0 && (
                            <div className="mb-6 sm:mb-8 md:mb-10">
                                <h2 className="mb-4 flex items-center text-lg font-semibold text-[#4A7C59] sm:mb-6 sm:text-xl">
                                    <div className="mr-2 h-5 w-1 rounded-full bg-gradient-to-b from-[#F9B912] to-[#4A7C59] sm:mr-3 sm:h-6"></div>
                                    Features
                                </h2>
                                <div className="grid gap-3 sm:gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start rounded-xl border border-[#F9B912]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 p-3 transition-all duration-300 hover:scale-[1.02] hover:border-[#F9B912]/40 hover:shadow-lg sm:p-4"
                                        >
                                            <div className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912] sm:mr-4 sm:mt-2"></div>
                                            <p className="text-sm font-medium leading-relaxed text-gray-700 sm:text-base">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Other Attributes */}
                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
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
                                        className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#4A7C59]/5 to-[#F9B912]/5 p-3 sm:p-4"
                                    >
                                        <h3 className="mb-2 text-sm font-semibold text-[#4A7C59] sm:text-base">{attr.attribute_name}</h3>
                                        <p className="whitespace-pre-line text-xs leading-relaxed text-gray-700 sm:text-sm">{attr.attribute_value}</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 h-16 w-16 translate-x-6 -translate-y-6 transform rounded-full bg-gradient-to-bl from-[#F9B912]/30 via-[#F9B912]/10 to-transparent transition-all duration-500 hover:scale-125 hover:opacity-60 sm:h-20 sm:w-20 sm:translate-x-8 sm:-translate-y-8" />
                    <div className="absolute bottom-0 left-0 h-12 w-12 -translate-x-4 translate-y-4 transform rounded-full bg-gradient-to-tr from-[#4A7C59]/20 via-[#4A7C59]/5 to-transparent transition-all duration-500 hover:scale-125 hover:opacity-60 sm:h-16 sm:w-16 sm:-translate-x-6 sm:translate-y-6" />
                </div>
            </div>
        </div>
    );
};

export default BankingAccountComponent;
