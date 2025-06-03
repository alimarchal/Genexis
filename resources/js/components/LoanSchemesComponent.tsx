import {
    Bike,
    Briefcase,
    Building,
    Car,
    Coins,
    CreditCard,
    Factory,
    GraduationCap,
    Home,
    Monitor,
    Sprout,
    Store,
    Tractor,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';

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

interface LoanSchemesComponentProps {
    schemes: ProductScheme[];
    defaultActiveIndex?: number;
}

const LoanSchemesComponent: React.FC<LoanSchemesComponentProps> = ({ schemes, defaultActiveIndex = 0 }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveIndex);

    if (!schemes.length) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] p-4">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-[#4A7C59]">No Loan Schemes Available</h2>
                    <p className="text-gray-600">Please provide scheme data to display.</p>
                </div>
            </div>
        );
    }

    const activeScheme = schemes[activeTab];

    // Get icon based on scheme name
    const getSchemeIcon = (schemeName: string) => {
        const name = schemeName.toLowerCase();
        if (name.includes('salary') || name.includes('advance')) return <CreditCard className="h-6 w-6" />;
        if (name.includes('car') || name.includes('auto')) return <Car className="h-6 w-6" />;
        if (name.includes('motorcycle') || name.includes('bike')) return <Bike className="h-6 w-6" />;
        if (name.includes('house') || name.includes('home')) return <Home className="h-6 w-6" />;
        if (name.includes('personal')) return <User className="h-6 w-6" />;
        if (name.includes('student') || name.includes('education')) return <GraduationCap className="h-6 w-6" />;
        if (name.includes('gold')) return <Coins className="h-6 w-6" />;
        if (name.includes('appliance') || name.includes('electronics')) return <Monitor className="h-6 w-6" />;
        if (name.includes('construction') || name.includes('building')) return <Building className="h-6 w-6" />;
        if (name.includes('running') || name.includes('working')) return <Factory className="h-6 w-6" />;
        if (name.includes('demand') || name.includes('machinery')) return <Briefcase className="h-6 w-6" />;
        if (name.includes('agriculture') || name.includes('farming')) return <Tractor className="h-6 w-6" />;
        if (name.includes('production') || name.includes('development')) return <Sprout className="h-6 w-6" />;
        if (name.includes('trade') || name.includes('business')) return <Store className="h-6 w-6" />;
        if (name.includes('micro') || name.includes('enterprise')) return <Users className="h-6 w-6" />;
        return <Briefcase className="h-6 w-6" />;
    };

    // Get color scheme based on index
    const getColorScheme = (index: number) => {
        const colors = [
            'from-[#4A7C59] to-[#5D8A6A]',
            'from-[#F9B912] to-[#F9B912]/80',
            'from-[#6B9B7A] to-[#5D8A6A]',
            'from-[#4A7C59] to-[#6B9B7A]',
            'from-[#F9B912] to-[#4A7C59]',
            'from-[#5D8A6A] to-[#F9B912]',
            'from-[#F9B912] to-[#6B9B7A]',
            'from-[#6B9B7A] to-[#F9B912]',
        ];
        return colors[index % colors.length];
    };

    // Get attribute value by name
    const getAttributeValue = (attributeName: string): string => {
        const attr = activeScheme.attributes.find((a) => a.attribute_name.toLowerCase() === attributeName.toLowerCase());
        return attr?.attribute_value || '';
    };

    // Render data row
    const renderDataRow = (label: string, value?: string) => {
        if (!value) return null;
        return (
            <div className="flex flex-col gap-2 border-b border-gray-100 py-3 last:border-b-0 sm:flex-row sm:items-start">
                <div className="min-w-[140px] text-sm font-semibold text-[#4A7C59]">{label}:</div>
                <div className="flex-1 text-sm leading-relaxed whitespace-pre-line text-gray-700">{value}</div>
            </div>
        );
    };

    const purpose = getAttributeValue('Purpose');
    const colorScheme = getColorScheme(activeTab);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] p-4">
            <div className="mx-auto max-w-7xl">
                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3 p-4">
                        {schemes.map((scheme, index) => (
                            <button
                                key={scheme.id}
                                onClick={() => setActiveTab(index)}
                                className={`flex flex-shrink-0 items-center gap-2 rounded-lg border bg-white px-4 py-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                    activeTab === index ? 'scale-105 border-[#4A7C59] shadow-lg' : 'border-gray-200 hover:border-[#4A7C59]/30'
                                }`}
                            >
                                {getSchemeIcon(scheme.name)}
                                <span className={`text-sm font-medium sm:text-base ${activeTab === index ? 'text-[#4A7C59]' : 'text-gray-700'}`}>
                                    {scheme.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className={`bg-gradient-to-r ${colorScheme} relative overflow-hidden p-6`}>
                        <div className="relative z-10 flex items-center gap-4 text-white">
                            <div className="rounded-lg bg-white/20 p-3">{getSchemeIcon(activeScheme.name)}</div>
                            <div>
                                <h2 className="text-2xl font-bold">{activeScheme.name}</h2>
                                <p className="mt-1 text-white/90">{activeScheme.description}</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 transform rounded-full bg-gradient-to-bl from-white/10 to-transparent" />
                    </div>

                    <div className="p-6">
                        {/* Purpose Section */}
                        {purpose && (
                            <div className="mb-8">
                                <h3 className="mb-4 flex items-center text-xl font-semibold text-[#4A7C59]">
                                    <div className="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-[#4A7C59] to-[#F9B912]"></div>
                                    Purpose
                                </h3>
                                <div className="rounded-xl border border-[#4A7C59]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 p-6">
                                    <p className="leading-relaxed text-gray-700">{purpose}</p>
                                </div>
                            </div>
                        )}

                        {/* Details in Single Column */}
                        <div className="space-y-1">
                            {activeScheme.attributes
                                .filter((attr) => attr.attribute_name.toLowerCase() !== 'purpose')
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((attr) => renderDataRow(attr.attribute_name, attr.attribute_value))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                        <h3 className="mb-2 text-xl font-semibold text-[#4A7C59]">Ready to Apply?</h3>
                        <p className="mb-4 text-gray-600">Contact us today to learn more about our loan schemes and start your application process</p>
                        <button
                            className={`bg-gradient-to-r ${colorScheme} transform rounded-lg px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanSchemesComponent;
