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
    const getAttributeValue = (attributeName: string): string => {
        const attr = service.attributes.find((a) => a.attribute_name.toLowerCase() === attributeName.toLowerCase());
        return attr?.attribute_value || '';
    };

    const getFeatures = (): ServiceAttribute[] => {
        return service.attributes
            .filter((a) => !['eligibility', 'required documents', 'annual charges', 'service charges'].includes(a.attribute_name.toLowerCase()))
            .sort((a, b) => a.sort_order - b.sort_order);
    };

    const getSpecialAttributes = (): ServiceAttribute[] => {
        return service.attributes
            .filter((attr) => ['required documents', 'annual charges', 'service charges'].includes(attr.attribute_name.toLowerCase()))
            .sort((a, b) => a.sort_order - b.sort_order);
    };

    const eligibility = getAttributeValue('Eligibility');
    const features = getFeatures();
    const specialAttributes = getSpecialAttributes();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Shield className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">{service.name}</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">{service.description}</p>
                </div>

                {/* Service Details */}
                <div className="relative transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl">
                    {/* Header with Image */}
                    <div className="relative">
                        <div className="relative overflow-hidden bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6">
                            <div className="relative z-10 flex items-center gap-6">
                                <div className="text-4xl text-white">{service.icon}</div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{service.name}</h1>
                                    <p className="mt-2 text-white/90">Complete details and information</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 transform rounded-full bg-gradient-to-bl from-[#F9B912]/20 to-transparent" />
                        </div>

                        {/* Service Image */}
                        {service.image && (
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        )}
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

                        {/* Service Features */}
                        {features.length > 0 && (
                            <div className="mb-10">
                                <h2 className="mb-6 flex items-center text-xl font-semibold text-[#4A7C59]">
                                    <div className="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-[#F9B912] to-[#4A7C59]"></div>
                                    Service Details
                                </h2>
                                <div className="grid gap-4">
                                    {features.map((feature) => (
                                        <div
                                            key={feature.id}
                                            className="flex items-start rounded-xl border border-[#F9B912]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#F9B912]/40 hover:shadow-lg"
                                        >
                                            <div className="mt-2 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                            <div>
                                                <h4 className="mb-1 font-semibold text-[#4A7C59]">{feature.attribute_name}</h4>
                                                <p className="leading-relaxed whitespace-pre-line text-gray-700">{feature.attribute_value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Special Attributes */}
                        {specialAttributes.length > 0 && (
                            <div className="grid gap-6 md:grid-cols-2">
                                {specialAttributes.map((attr) => (
                                    <div
                                        key={attr.id}
                                        className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#4A7C59]/5 to-[#F9B912]/5 p-6"
                                    >
                                        <h3 className="mb-3 flex items-center font-semibold text-[#4A7C59]">
                                            <div className="mr-2 h-2 w-2 rounded-full bg-[#F9B912]"></div>
                                            {attr.attribute_name}
                                        </h3>
                                        <p className="leading-relaxed whitespace-pre-line text-gray-700">{attr.attribute_value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Back to Services Button */}
                <div className="mt-8 text-center">
                    <a
                        href={route('services.index')}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Services
                    </a>
                </div>
            </div>
        </div>
    );
};

ServiceShow.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Service Details" breadcrumbs={[{ label: 'Services', href: '/services' }]}>
        {page}
    </WebsiteLayout>
);

export default ServiceShow;
