import { useState } from 'react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Shield } from 'lucide-react';

interface ServiceAttribute {
    id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
}

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
    is_active: boolean;
    sort_order: number;
    attributes: ServiceAttribute[];
}

interface ServiceShowProps {
    service: Service;
}

const ServiceShow = ({ service }: ServiceShowProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const getAttributeValue = (attributeName: string): string => {
        const attr = service.attributes.find(a =>
            a.attribute_name.toLowerCase() === attributeName.toLowerCase()
        );
        return attr?.attribute_value || '';
    };

    const getFeatures = (): ServiceAttribute[] => {
        return service.attributes
            .filter(a => !['eligibility', 'required documents', 'annual charges', 'service charges'].includes(a.attribute_name.toLowerCase()))
            .sort((a, b) => a.sort_order - b.sort_order);
    };

    const getSpecialAttributes = (): ServiceAttribute[] => {
        return service.attributes
            .filter(attr =>
                ['required documents', 'annual charges', 'service charges'].includes(attr.attribute_name.toLowerCase())
            )
            .sort((a, b) => a.sort_order - b.sort_order);
    };

    const eligibility = getAttributeValue('Eligibility');
    const features = getFeatures();
    const specialAttributes = getSpecialAttributes();

    const breadcrumbs = [
        { label: 'Services', href: '/services' },
        { label: service.name, isActive: true }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] rounded-full">
                            <Shield className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        {service.description}
                    </p>
                </div>

                {/* Service Details */}
                <div
                    className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl border border-gray-100 relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header with Image */}
                    <div className="relative">
                        <div className="bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6 relative overflow-hidden">
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="text-white text-4xl">
                                    {service.icon}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{service.name}</h1>
                                    <p className="text-white/90 mt-2">Complete details and information</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F9B912]/20 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
                        </div>

                        {/* Service Image */}
                        {service.image && (
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        )}
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
                                    <p className="text-gray-700 leading-relaxed">{eligibility}</p>
                                </div>
                            </div>
                        )}

                        {/* Service Features */}
                        {features.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-[#4A7C59] mb-6 flex items-center">
                                    <div className="w-1 h-6 bg-gradient-to-b from-[#F9B912] to-[#4A7C59] rounded-full mr-3"></div>
                                    Service Details
                                </h2>
                                <div className="grid gap-4">
                                    {features.map((feature) => (
                                        <div
                                            key={feature.id}
                                            className="flex items-start p-4 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 rounded-xl border border-[#F9B912]/20 hover:shadow-lg hover:border-[#F9B912]/40 transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            <div className="flex-shrink-0 w-2 h-2 bg-[#F9B912] rounded-full mt-2 mr-4"></div>
                                            <div>
                                                <h4 className="font-semibold text-[#4A7C59] mb-1">{feature.attribute_name}</h4>
                                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{feature.attribute_value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Special Attributes */}
                        {specialAttributes.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {specialAttributes.map((attr) => (
                                    <div key={attr.id} className="bg-gradient-to-br from-[#4A7C59]/5 to-[#F9B912]/5 p-6 rounded-xl border border-gray-200">
                                        <h3 className="font-semibold text-[#4A7C59] mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-[#F9B912] rounded-full mr-2"></div>
                                            {attr.attribute_name}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {attr.attribute_value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Back to Services Button */}
                <div className="text-center mt-8">
                    <a
                        href="/services"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Services
                    </a>
                </div>
            </div>
        </div>
    );
};

ServiceShow.layout = (page: any) => (
    <WebsiteLayout title={`${page.props.service.name} - Services`} breadcrumbs={[
        { label: 'Services', href: '/services' },
        { label: page.props.service.name, isActive: true }
    ]}>
        {page}
    </WebsiteLayout>
);

export default ServiceShow;