import React, { useState } from 'react';
import {
    CreditCard,
    Building2,
    Wheat,
    Users,
    ArrowRight,
    TrendingUp,
    Shield,
    Home,
    ChevronRight,
    Star,
    Clock,
    CheckCircle,
    Phone,
    MapPin
} from 'lucide-react';

interface ServiceCard {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    products: Array<{ name: string, description: string }>;
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
            title: "Consumer Finances",
            description: "Personal financing solutions for individuals and families across AJK",
            icon: CreditCard,
            products: [
                { name: "Advance Salary Scheme", description: "Up to Rs. 30 Lac for salary earners" },
                { name: "Car Finance", description: "Up to Rs. 30 Lac for vehicle purchase" },
                { name: "House Loan", description: "Up to Rs. 10 Million for home construction" },
                { name: "Personal Loan", description: "Quick loans against deposits" },
                { name: "Gold Loan", description: "Up to Rs. 20 Lac against gold ornaments" },
                { name: "Student Loan", description: "Up to Rs. 10 Million for higher studies" }
            ],
            ctaText: "Apply for Consumer Finance",
            ctaLink: "/products/consumer-finances",
            color: "from-blue-600 to-blue-700",
            benefits: ["Quick Processing", "Competitive Rates", "Flexible Terms", "Minimal Documentation"]
        },
        {
            id: 2,
            title: "Commercial / SME Finances",
            description: "Comprehensive business financing for enterprises in Kashmir",
            icon: Building2,
            products: [
                { name: "Running Finance", description: "Working capital for business operations" },
                { name: "Auto Finance", description: "Commercial vehicle financing" },
                { name: "Demand Finance", description: "Machinery and equipment purchase" },
                { name: "Construction Finance", description: "Commercial building projects" },
                { name: "Tourism Finance", description: "Tourism infrastructure development" },
                { name: "Trade Finance", description: "Small business working capital" }
            ],
            ctaText: "Explore Business Solutions",
            ctaLink: "/products/commercial-sme-finances",
            color: "from-green-600 to-green-700",
            benefits: ["Business Growth Support", "Flexible Repayment", "Expert Advisory", "Sector Specific Solutions"]
        },
        {
            id: 3,
            title: "Agriculture Finances",
            description: "Supporting agricultural development and rural economy of AJK",
            icon: Wheat,
            products: [
                { name: "Agriculture Production Loan", description: "Short term loans for agri inputs" },
                { name: "Agriculture Development Loan", description: "Long term loans for farm assets" },
                { name: "Farm Equipment Finance", description: "Tractors and machinery financing" },
                { name: "Livestock Finance", description: "Dairy, poultry, and livestock development" }
            ],
            ctaText: "Support Agriculture Growth",
            ctaLink: "/products/agriculture-finances",
            color: "from-amber-600 to-amber-700",
            benefits: ["Farmer Friendly Terms", "Seasonal Repayment", "Low Interest Rates", "Rural Development Focus"]
        },
        {
            id: 4,
            title: "Micro Finances",
            description: "Empowering small entrepreneurs and promoting self-employment",
            icon: Users,
            products: [
                { name: "Micro Enterprise Loan", description: "Up to Rs. 1 Lac for small businesses" },
                { name: "Desi Murghbani Scheme", description: "Poultry farming for women (Rs. 15-50K)" },
                { name: "Small Business Support", description: "Self-employment opportunities" },
                { name: "Women Entrepreneurship", description: "Special schemes for women" }
            ],
            ctaText: "Start Your Enterprise",
            ctaLink: "/products/micro-finances",
            color: "from-purple-600 to-purple-700",
            benefits: ["Easy Access", "No Collateral Required", "Community Development", "Women Empowerment"]
        }
    ];

    const depositServices = [
        { name: "Deposit Accounts", icon: Shield, link: "/products/deposit-accounts", description: "Savings & Current Accounts" },
        { name: "Term Deposits", icon: TrendingUp, link: "/products/term-deposit", description: "Fixed Deposit Schemes" },
        { name: "Digital Banking", icon: Building2, link: "/services/all-services", description: "Online & Mobile Banking" },
        { name: "Lockers Facility", icon: Home, link: "/services/lockers-facility", description: "Safe Deposit Lockers" }
    ];

    const stats = [
        { number: "87+", label: "Branches", icon: Building2, description: "Across AJK" },
        { number: "500K+", label: "Customers", icon: Users, description: "Satisfied Clients" },
        { number: "Rs 50B+", label: "Assets", icon: TrendingUp, description: "Total Assets" },
        { number: "50+", label: "Years", icon: Shield, description: "Banking Excellence" }
    ];

    return (
        <section className="pt-5 pb-20 bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#4A7C59] rounded-full"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-[#F9B912] rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#4A7C59] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">

                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Our Banking
                        <span className="text-[#4A7C59] block">Services</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Bank of Azad Jammu & Kashmir - Your trusted financial partner offering
                        comprehensive banking solutions designed for Kashmir's prosperity.
                    </p>
                </div>

                {/* Stats with Animation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group cursor-pointer"
                            onMouseEnter={() => setHoveredCard(100 + index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 transform ${hoveredCard === 100 + index ? 'shadow-2xl -translate-y-4 scale-105' : 'hover:shadow-xl hover:-translate-y-2'
                                }`}>
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] flex items-center justify-center transition-all duration-300 ${hoveredCard === 100 + index ? 'scale-110' : ''
                                    }`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
                                <div className="text-gray-500 text-sm mt-1">{stat.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        const isExpanded = expandedCard === service.id;
                        const isHovered = hoveredCard === service.id;

                        return (
                            <div
                                key={service.id}
                                className={`bg-white rounded-3xl shadow-xl transition-all duration-700 transform overflow-hidden ${isHovered ? 'shadow-2xl -translate-y-6 scale-105' : 'hover:shadow-2xl hover:-translate-y-3'
                                    }`}
                                onMouseEnter={() => setHoveredCard(service.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Card Header */}
                                <div className={`bg-gradient-to-br ${service.color} p-8 relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                                    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>

                                    <div className="relative z-10">
                                        <div className={`w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''
                                            }`}>
                                            <IconComponent className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                                        <p className="text-white/95 leading-relaxed text-lg">{service.description}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8">
                                    {/* Benefits */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                            <CheckCircle className="w-5 h-5 text-[#4A7C59] mr-2" />
                                            Key Benefits
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {service.benefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-center text-gray-700">
                                                    <div className="w-2 h-2 bg-[#F9B912] rounded-full mr-3 flex-shrink-0"></div>
                                                    <span className="font-medium text-sm">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Products Preview */}
                                    <div className="mb-6">
                                        <button
                                            onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                                            className="flex items-center justify-between w-full text-left text-lg font-bold text-gray-900 mb-4 hover:text-[#4A7C59] transition-colors"
                                        >
                                            <span className="flex items-center">
                                                <TrendingUp className="w-5 h-5 text-[#4A7C59] mr-2" />
                                                Available Products ({service.products.length})
                                            </span>
                                            <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                        </button>

                                        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
                                            }`}>
                                            <div className="space-y-3">
                                                {service.products.slice(0, isExpanded ? service.products.length : 2).map((product, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#4A7C59]">
                                                        <div className="font-semibold text-gray-900">{product.name}</div>
                                                        <div className="text-gray-600 text-sm mt-1">{product.description}</div>
                                                    </div>
                                                ))}
                                                {!isExpanded && service.products.length > 2 && (
                                                    <div className="text-[#4A7C59] text-sm font-medium">
                                                        +{service.products.length - 2} more products...
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href={service.ctaLink}
                                        className={`inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] text-white font-bold rounded-xl transition-all duration-300 shadow-lg group ${isHovered ? 'from-[#F9B912] to-[#E6A610] shadow-2xl scale-105' : 'hover:from-[#F9B912] hover:to-[#E6A610] hover:shadow-xl hover:scale-105'
                                            }`}
                                    >
                                        {service.ctaText}
                                        <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Services */}
                <div className="mb-20">
                    <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">Additional Banking Solutions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {depositServices.map((service, index) => (
                            <a
                                key={index}
                                href={service.link}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-3 text-lg">{service.name}</h4>
                                <p className="text-gray-600">{service.description}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4A7C59] via-[#F9B912] to-[#4A7C59]"></div>

                        <h3 className="text-4xl font-bold text-gray-900 mb-6">
                            Ready to Experience BAJK Banking Excellence?
                        </h3>
                        <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join over 500,000 satisfied customers who trust Bank of Azad Jammu & Kashmir
                            for their financial journey. Discover banking solutions crafted for Kashmir's prosperity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="/contact-us"
                                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] text-white font-bold text-lg rounded-xl hover:from-[#F9B912] hover:to-[#E6A610] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                            >
                                <MapPin className="mr-3 w-6 h-6" />
                                Find Nearest Branch
                            </a>
                            <a
                                href="tel:+925822924244"
                                className="inline-flex items-center px-10 py-5 border-3 border-[#4A7C59] text-[#4A7C59] font-bold text-lg rounded-xl hover:bg-[#4A7C59] hover:text-white transform hover:scale-105 transition-all duration-300"
                            >
                                <Phone className="mr-3 w-6 h-6" />
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