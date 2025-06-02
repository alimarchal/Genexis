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

const BankingAccountComponent: React.FC<BankingAccountComponentProps> = ({
    schemes,
    defaultActiveIndex = 0
}) => {
    const [activeSchemeIndex, setActiveSchemeIndex] = useState(defaultActiveIndex);
    const [isHovered, setIsHovered] = useState(false);

    if (!schemes.length) {
        return (
            <div className="py-8 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#4A7C59] mb-4">No Schemes Available</h2>
                    <p className="text-gray-600">Please provide scheme data to display.</p>
                </div>
            </div>
        );
    }

    const activeScheme = schemes[activeSchemeIndex];

    // Group attributes by type for better display
    const getAttributeValue = (attributeName: string): string => {
        const attr = activeScheme.attributes.find(a =>
            a.attribute_name.toLowerCase() === attributeName.toLowerCase()
        );
        return attr?.attribute_value || '';
    };

    const getFeatures = (): string[] => {
        return activeScheme.attributes
            .filter(a => a.attribute_name.toLowerCase().startsWith('feature'))
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(a => a.attribute_value);
    };

    const eligibility = getAttributeValue('Eligibility');
    const features = getFeatures();

    return (
        <div className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
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
                                    className={`flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border flex-shrink-0 ${activeSchemeIndex === index
                                        ? 'border-[#4A7C59] shadow-lg scale-105'
                                        : 'border-gray-200 hover:border-[#4A7C59]/30'
                                        }`}
                                >
                                    <span className="text-lg">{getIcon(scheme.name)}</span>
                                    <span className={`font-medium text-sm sm:text-base ${activeSchemeIndex === index ? 'text-[#4A7C59]' : 'text-gray-700'
                                        }`}>
                                        {scheme.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Scheme Details */}
                <div
                    className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl border border-gray-100"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6 relative overflow-hidden">
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                        <h1 className="text-3xl font-bold text-white relative z-10">{activeScheme.name}</h1>
                        {activeScheme.description && (
                            <p className="text-white/90 mt-2 relative z-10">{activeScheme.description}</p>
                        )}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F9B912]/20 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
                    </div>

                    <div className="p-8">
                        {/* Eligibility Section */}
                        {eligibility && (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-[#4A7C59] mb-4 flex items-center">
                                    <div className="w-1 h-6 bg-gradient-to-b from-[#4A7C59] to-[#F9B912] rounded-full mr-3"></div>
                                    Eligibility
                                </h2>
                                <div className="bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#6B9B7A]/10 rounded-xl p-6 border border-[#4A7C59]/20 shadow-sm">
                                    <p className="text-gray-700 leading-relaxed">
                                        {eligibility}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Features Section */}
                        {features.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-[#4A7C59] mb-6 flex items-center">
                                    <div className="w-1 h-6 bg-gradient-to-b from-[#F9B912] to-[#4A7C59] rounded-full mr-3"></div>
                                    Features
                                </h2>
                                <div className="grid gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start p-4 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 rounded-xl border border-[#F9B912]/20 hover:shadow-lg hover:border-[#F9B912]/40 transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            <div className="flex-shrink-0 w-2 h-2 bg-[#F9B912] rounded-full mt-2 mr-4"></div>
                                            <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Other Attributes */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {activeScheme.attributes
                                .filter(attr =>
                                    !attr.attribute_name.toLowerCase().includes('eligibility') &&
                                    !attr.attribute_name.toLowerCase().includes('feature') &&
                                    !attr.attribute_name.toLowerCase().includes('salient')
                                )
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((attr, index) => (
                                    <div key={attr.id} className="bg-gradient-to-br from-[#4A7C59]/5 to-[#F9B912]/5 p-4 rounded-xl border border-gray-200">
                                        <h3 className="font-semibold text-[#4A7C59] mb-2">{attr.attribute_name}</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                            {attr.attribute_value}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#F9B912]/30 via-[#F9B912]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8 transition-all duration-500 hover:opacity-60 hover:scale-125" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#4A7C59]/20 via-[#4A7C59]/5 to-transparent rounded-full transform -translate-x-6 translate-y-6 transition-all duration-500 hover:opacity-60 hover:scale-125" />
                </div>
            </div>
        </div>
    );
};

export default BankingAccountComponent;