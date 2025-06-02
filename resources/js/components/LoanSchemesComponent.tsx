import { useState } from 'react';
import {
    CreditCard,
    Car,
    Bike,
    Home,
    User,
    GraduationCap,
    Coins,
    Monitor,
    Building,
    Factory,
    Briefcase,
    Tractor,
    Sprout,
    Store,
    Users
} from 'lucide-react';

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

const LoanSchemesComponent: React.FC<LoanSchemesComponentProps> = ({
    schemes,
    defaultActiveIndex = 0
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveIndex);

    if (!schemes.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] p-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#4A7C59] mb-4">No Loan Schemes Available</h2>
                    <p className="text-gray-600">Please provide scheme data to display.</p>
                </div>
            </div>
        );
    }

    const activeScheme = schemes[activeTab];

    // Get icon based on scheme name
    const getSchemeIcon = (schemeName: string) => {
        const name = schemeName.toLowerCase();
        if (name.includes('salary') || name.includes('advance')) return <CreditCard className="w-6 h-6" />;
        if (name.includes('car') || name.includes('auto')) return <Car className="w-6 h-6" />;
        if (name.includes('motorcycle') || name.includes('bike')) return <Bike className="w-6 h-6" />;
        if (name.includes('house') || name.includes('home')) return <Home className="w-6 h-6" />;
        if (name.includes('personal')) return <User className="w-6 h-6" />;
        if (name.includes('student') || name.includes('education')) return <GraduationCap className="w-6 h-6" />;
        if (name.includes('gold')) return <Coins className="w-6 h-6" />;
        if (name.includes('appliance') || name.includes('electronics')) return <Monitor className="w-6 h-6" />;
        if (name.includes('construction') || name.includes('building')) return <Building className="w-6 h-6" />;
        if (name.includes('running') || name.includes('working')) return <Factory className="w-6 h-6" />;
        if (name.includes('demand') || name.includes('machinery')) return <Briefcase className="w-6 h-6" />;
        if (name.includes('agriculture') || name.includes('farming')) return <Tractor className="w-6 h-6" />;
        if (name.includes('production') || name.includes('development')) return <Sprout className="w-6 h-6" />;
        if (name.includes('trade') || name.includes('business')) return <Store className="w-6 h-6" />;
        if (name.includes('micro') || name.includes('enterprise')) return <Users className="w-6 h-6" />;
        return <Briefcase className="w-6 h-6" />;
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
            'from-[#6B9B7A] to-[#F9B912]'
        ];
        return colors[index % colors.length];
    };

    // Get attribute value by name
    const getAttributeValue = (attributeName: string): string => {
        const attr = activeScheme.attributes.find(a =>
            a.attribute_name.toLowerCase() === attributeName.toLowerCase()
        );
        return attr?.attribute_value || '';
    };

    // Render data row
    const renderDataRow = (label: string, value?: string) => {
        if (!value) return null;
        return (
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 py-3 border-b border-gray-100 last:border-b-0">
                <div className="font-semibold text-[#4A7C59] min-w-[140px] text-sm">
                    {label}:
                </div>
                <div className="text-gray-700 text-sm flex-1 leading-relaxed whitespace-pre-line">
                    {value}
                </div>
            </div>
        );
    };

    const purpose = getAttributeValue('Purpose');
    const colorScheme = getColorScheme(activeTab);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] p-4">
            <div className="max-w-7xl mx-auto">


                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3 p-4">
                        {schemes.map((scheme, index) => (
                            <button
                                key={scheme.id}
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border flex-shrink-0 ${activeTab === index
                                    ? 'border-[#4A7C59] shadow-lg scale-105'
                                    : 'border-gray-200 hover:border-[#4A7C59]/30'
                                    }`}
                            >
                                {getSchemeIcon(scheme.name)}
                                <span className={`font-medium text-sm sm:text-base ${activeTab === index ? 'text-[#4A7C59]' : 'text-gray-700'
                                    }`}>
                                    {scheme.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className={`bg-gradient-to-r ${colorScheme} p-6 relative overflow-hidden`}>
                        <div className="flex items-center gap-4 text-white relative z-10">
                            <div className="p-3 bg-white/20 rounded-lg">
                                {getSchemeIcon(activeScheme.name)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{activeScheme.name}</h2>
                                <p className="text-white/90 mt-1">{activeScheme.description}</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
                    </div>

                    <div className="p-6">
                        {/* Purpose Section */}
                        {purpose && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-[#4A7C59] mb-4 flex items-center">
                                    <div className="w-1 h-6 bg-gradient-to-b from-[#4A7C59] to-[#F9B912] rounded-full mr-3"></div>
                                    Purpose
                                </h3>
                                <div className="bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 rounded-xl p-6 border border-[#4A7C59]/20">
                                    <p className="text-gray-700 leading-relaxed">
                                        {purpose}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Details in Single Column */}
                        <div className="space-y-1">
                            {activeScheme.attributes
                                .filter(attr => attr.attribute_name.toLowerCase() !== 'purpose')
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((attr) => renderDataRow(attr.attribute_name, attr.attribute_value))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-[#4A7C59] mb-2">
                            Ready to Apply?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Contact us today to learn more about our loan schemes and start your application process
                        </p>
                        <button className={`bg-gradient-to-r ${colorScheme} text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanSchemesComponent;