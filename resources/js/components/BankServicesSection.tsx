import { ArrowRight, Building2, CheckCircle, ChevronRight, CreditCard, Home, MapPin, Phone, Shield, TrendingUp, Users, Wheat } from 'lucide-react';
import React, { useState } from 'react';

interface ServiceCard {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    products: Array<{ name: string; description: string }>;
    ctaText: string;
    ctaLink: string;
    color: string;
    benefits: string[];
}

const InteractiveBAJKServices: React.FC = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const services: ServiceCard[] = [
        {
            id: 1,
            title: 'Consumer Finances',
            description: 'Personal financing solutions for individuals and families across AJK',
            icon: CreditCard,
            products: [
                { name: 'Advance Salary Scheme', description: 'Up to Rs. 30 Lac for salary earners' },
                { name: 'Car Finance', description: 'Up to Rs. 30 Lac for vehicle purchase' },
                { name: 'House Loan', description: 'Up to Rs. 10 Million for home construction' },
                { name: 'Personal Loan', description: 'Quick loans against deposits' },
                { name: 'Gold Loan', description: 'Up to Rs. 20 Lac against gold ornaments' },
                { name: 'Student Loan', description: 'Up to Rs. 10 Million for higher studies' },
            ],
            ctaText: 'Apply for Consumer Finance',
            ctaLink: '/products/consumer-finances',
            color: 'from-blue-600 to-blue-700',
            benefits: ['Quick Processing', 'Competitive Rates', 'Flexible Terms', 'Minimal Documentation'],
        },
        {
            id: 2,
            title: 'Commercial / SME Finances',
            description: 'Comprehensive business financing for enterprises in Kashmir',
            icon: Building2,
            products: [
                { name: 'Running Finance', description: 'Working capital for business operations' },
                { name: 'Auto Finance', description: 'Commercial vehicle financing' },
                { name: 'Demand Finance', description: 'Machinery and equipment purchase' },
                { name: 'Construction Finance', description: 'Commercial building projects' },
                { name: 'Tourism Finance', description: 'Tourism infrastructure development' },
                { name: 'Trade Finance', description: 'Small business working capital' },
            ],
            ctaText: 'Explore Business Solutions',
            ctaLink: '/products/commercial-sme-finances',
            color: 'from-green-600 to-green-700',
            benefits: ['Business Growth Support', 'Flexible Repayment', 'Expert Advisory', 'Sector Specific Solutions'],
        },
        {
            id: 3,
            title: 'Agriculture Finances',
            description: 'Supporting agricultural development and rural economy of AJK',
            icon: Wheat,
            products: [
                { name: 'Agriculture Production Loan', description: 'Short term loans for agri inputs' },
                { name: 'Agriculture Development Loan', description: 'Long term loans for farm assets' },
                { name: 'Farm Equipment Finance', description: 'Tractors and machinery financing' },
                { name: 'Livestock Finance', description: 'Dairy, poultry, and livestock development' },
            ],
            ctaText: 'Support Agriculture Growth',
            ctaLink: '/products/agriculture-finances',
            color: 'from-amber-600 to-amber-700',
            benefits: ['Farmer Friendly Terms', 'Seasonal Repayment', 'Low Interest Rates', 'Rural Development Focus'],
        },
        {
            id: 4,
            title: 'Micro Finances',
            description: 'Empowering small entrepreneurs and promoting self-employment',
            icon: Users,
            products: [
                { name: 'Micro Enterprise Loan', description: 'Up to Rs. 1 Lac for small businesses' },
                { name: 'Desi Murghbani Scheme', description: 'Poultry farming for women (Rs. 15-50K)' },
                { name: 'Small Business Support', description: 'Self-employment opportunities' },
                { name: 'Women Entrepreneurship', description: 'Special schemes for women' },
            ],
            ctaText: 'Start Your Enterprise',
            ctaLink: '/products/micro-finances',
            color: 'from-purple-600 to-purple-700',
            benefits: ['Easy Access', 'No Collateral Required', 'Community Development', 'Women Empowerment'],
        },
    ];

    const depositServices = [
        { name: 'Deposit Accounts', icon: Shield, link: '/products/deposit-accounts', description: 'Savings & Current Accounts' },
        { name: 'Term Deposits', icon: TrendingUp, link: '/products/term-deposit', description: 'Fixed Deposit Schemes' },
        { name: 'Digital Banking', icon: Building2, link: '/services/all-services', description: 'Online & Mobile Banking' },
        { name: 'Lockers Facility', icon: Home, link: '/services/lockers-facility', description: 'Safe Deposit Lockers' },
    ];

    const stats = [
        { number: '87+', label: 'Branches', icon: Building2, description: 'Across AJK' },
        { number: '500K+', label: 'Customers', icon: Users, description: 'Satisfied Clients' },
        { number: 'Rs 50B+', label: 'Assets', icon: TrendingUp, description: 'Total Assets' },
        { number: '50+', label: 'Years', icon: Shield, description: 'Banking Excellence' },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] pt-5 pb-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-[#4A7C59]"></div>
                <div className="absolute top-40 right-20 h-24 w-24 rounded-full bg-[#F9B912]"></div>
                <div className="absolute bottom-20 left-1/4 h-20 w-20 rounded-full bg-[#4A7C59]"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl">
                        Our Banking
                        <span className="block text-[#4A7C59]">Services</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700">
                        Bank of Azad Jammu & Kashmir - Your trusted financial partner offering comprehensive banking solutions designed for Kashmir's
                        prosperity.
                    </p>
                </div>

                {/* Stats with Animation */}
                <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer text-center"
                            onMouseEnter={() => setHoveredCard(100 + index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className={`transform rounded-2xl bg-white p-8 shadow-lg transition-all duration-500 ${hoveredCard === 100 + index ? '-translate-y-4 scale-105 shadow-2xl' : 'hover:-translate-y-2 hover:shadow-xl'
                                    }`}
                            >
                                <div
                                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] transition-all duration-300 ${hoveredCard === 100 + index ? 'scale-110' : ''
                                        }`}
                                >
                                    <stat.icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="mb-2 text-4xl font-bold text-gray-900">{stat.number}</div>
                                <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
                                <div className="mt-1 text-sm text-gray-500">{stat.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Services Grid */}
                <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        const isExpanded = expandedCard === service.id;
                        const isHovered = hoveredCard === service.id;

                        return (
                            <div
                                key={service.id}
                                className={`transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-700 ${isHovered ? '-translate-y-6 scale-105 shadow-2xl' : 'hover:-translate-y-3 hover:shadow-2xl'
                                    }`}
                                onMouseEnter={() => setHoveredCard(service.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Card Header */}
                                <div className={`bg-gradient-to-br ${service.color} relative overflow-hidden p-8`}>
                                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                                    <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>
                                    <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-white/5"></div>

                                    <div className="relative z-10">
                                        <div
                                            className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''
                                                }`}
                                        >
                                            <IconComponent className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="mb-4 text-3xl font-bold text-white">{service.title}</h3>
                                        <p className="text-lg leading-relaxed text-white/95">{service.description}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8">
                                    {/* Benefits */}
                                    <div className="mb-6">
                                        <h4 className="mb-4 flex items-center text-lg font-bold text-gray-900">
                                            <CheckCircle className="mr-2 h-5 w-5 text-[#4A7C59]" />
                                            Key Benefits
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {service.benefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-center text-gray-700">
                                                    <div className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                                    <span className="text-sm font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Products Preview */}
                                    <div className="mb-6">
                                        <button
                                            onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                                            className="mb-4 flex w-full items-center justify-between text-left text-lg font-bold text-gray-900 transition-colors hover:text-[#4A7C59]"
                                        >
                                            <span className="flex items-center">
                                                <TrendingUp className="mr-2 h-5 w-5 text-[#4A7C59]" />
                                                Available Products ({service.products.length})
                                            </span>
                                            <ChevronRight className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
                                                }`}
                                        >
                                            <div className="space-y-3">
                                                {service.products.slice(0, isExpanded ? service.products.length : 2).map((product, idx) => (
                                                    <div key={idx} className="rounded-lg border-l-4 border-[#4A7C59] bg-gray-50 p-4">
                                                        <div className="font-semibold text-gray-900">{product.name}</div>
                                                        <div className="mt-1 text-sm text-gray-600">{product.description}</div>
                                                    </div>
                                                ))}
                                                {!isExpanded && service.products.length > 2 && (
                                                    <div className="text-sm font-medium text-[#4A7C59]">
                                                        +{service.products.length - 2} more products...
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href={service.ctaLink}
                                        className={`group inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 ${isHovered
                                                ? 'scale-105 from-[#F9B912] to-[#E6A610] shadow-2xl'
                                                : 'hover:scale-105 hover:from-[#F9B912] hover:to-[#E6A610] hover:shadow-xl'
                                            }`}
                                    >
                                        {service.ctaText}
                                        <ArrowRight className="ml-3 h-5 w-5 transform transition-transform group-hover:translate-x-2" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Services */}
                <div className="mb-20">
                    <h3 className="mb-12 text-center text-4xl font-bold text-gray-900">Additional Banking Solutions</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {depositServices.map((service, index) => (
                            <a
                                key={index}
                                href={service.link}
                                className="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] transition-transform group-hover:scale-110">
                                    <service.icon className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="mb-3 text-lg font-bold text-gray-900">{service.name}</h4>
                                <p className="text-gray-600">{service.description}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="relative overflow-hidden rounded-3xl bg-white p-12 shadow-2xl">
                        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#4A7C59] via-[#F9B912] to-[#4A7C59]"></div>

                        <h3 className="mb-6 text-4xl font-bold text-gray-900">Ready to Experience BAJK Banking Excellence?</h3>
                        <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-700">
                            Join over 500,000 satisfied customers who trust Bank of Azad Jammu & Kashmir for their financial journey. Discover banking
                            solutions crafted for Kashmir's prosperity.
                        </p>

                        <div className="flex flex-col justify-center gap-6 sm:flex-row">
                            <a
                                href="/contact-us"
                                className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] px-10 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#F9B912] hover:to-[#E6A610] hover:shadow-2xl"
                            >
                                <MapPin className="mr-3 h-6 w-6" />
                                Find Nearest Branch
                            </a>
                            <a
                                href="tel:+925822924244"
                                className="inline-flex transform items-center rounded-xl border-3 border-[#4A7C59] px-10 py-5 text-lg font-bold text-[#4A7C59] transition-all duration-300 hover:scale-105 hover:bg-[#4A7C59] hover:text-white"
                            >
                                <Phone className="mr-3 h-6 w-6" />
                                Call: 05822-924244
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveBAJKServices;
