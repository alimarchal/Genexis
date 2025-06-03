import React, { useState } from 'react';
import {
    LogIn,
    Calculator,
    MapPin,
    CreditCard,
    Phone,
    FileText,
    Search,
    Clock,
    Shield,
    Smartphone
} from 'lucide-react';

const QuickActionsHub: React.FC = () => {
    const [hoveredAction, setHoveredAction] = useState<number | null>(null);

    const quickActions = [
        {
            id: 1,
            title: "Account Login",
            description: "Access your account securely",
            icon: LogIn,
            link: "/login",
            color: "from-blue-600 to-blue-700",
            popular: true
        },
        {
            id: 2,
            title: "Loan Calculator",
            description: "Calculate EMI and eligibility",
            icon: Calculator,
            link: "/calculator",
            color: "from-green-600 to-green-700",
            popular: true
        },
        {
            id: 3,
            title: "Branch Locator",
            description: "Find nearest branch/ATM",
            icon: MapPin,
            link: "/branches",
            color: "from-purple-600 to-purple-700"
        },
        {
            id: 4,
            title: "Apply for Loan",
            description: "Start your loan application",
            icon: CreditCard,
            link: "/apply-loan",
            color: "from-amber-600 to-amber-700",
            popular: true
        },
        {
            id: 5,
            title: "Contact Support",
            description: "Get help from our team",
            icon: Phone,
            link: "/contact-us",
            color: "from-red-600 to-red-700"
        },
        {
            id: 6,
            title: "Rate Inquiry",
            description: "Check current profit rates",
            icon: FileText,
            link: "/rates/profit-rates",
            color: "from-teal-600 to-teal-700"
        }
    ];

    const serviceLinks = [
        { name: "Utility Bills", link: "/services/utility-bills-collection", icon: FileText },
        { name: "Home Remittance", link: "/services/home-remittance", icon: CreditCard },
        { name: "Locker Facility", link: "/services/lockers-facility", icon: Shield },
        { name: "Mobile Banking", link: "/services/all-services", icon: Smartphone }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <p className="text-xl text-gray-600">Access banking services instantly</p>
                </div>

                {/* Main Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {quickActions.map((action) => {
                        const IconComponent = action.icon;
                        const isHovered = hoveredAction === action.id;

                        return (
                            <a
                                key={action.id}
                                href={action.link}
                                className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 transform group overflow-hidden ${isHovered ? 'shadow-2xl -translate-y-3 scale-105' : 'hover:shadow-xl hover:-translate-y-2'
                                    }`}
                                onMouseEnter={() => setHoveredAction(action.id)}
                                onMouseLeave={() => setHoveredAction(null)}
                            >
                                {action.popular && (
                                    <div className="absolute top-4 right-4 bg-[#F9B912] text-white text-xs px-3 py-1 rounded-full font-bold">
                                        Popular
                                    </div>
                                )}

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4A7C59] transition-colors">
                                    {action.title}
                                </h3>

                                <p className="text-gray-600 mb-4">
                                    {action.description}
                                </p>

                                <div className="flex items-center text-[#4A7C59] font-semibold group-hover:text-[#F9B912] transition-colors">
                                    <span>Get Started</span>
                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Banking Hours & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] rounded-2xl p-8 text-white">
                        <div className="flex items-center mb-4">
                            <Clock className="w-6 h-6 mr-3" />
                            <h3 className="text-2xl font-bold">Banking Hours</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Monday - Thursday:</span>
                                <span className="font-semibold">9:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Friday:</span>
                                <span className="font-semibold">9:00 AM - 12:30 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday:</span>
                                <span className="font-semibold">9:00 AM - 1:00 PM</span>
                            </div>
                            <div className="text-yellow-200 text-sm mt-4">
                                * Hours may vary by branch
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                        <div className="flex items-center mb-4">
                            <Phone className="w-6 h-6 mr-3 text-[#4A7C59]" />
                            <h3 className="text-2xl font-bold text-gray-900">24/7 Support</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="font-semibold text-gray-900">Customer Care</div>
                                <a href="tel:+925822924244" className="text-[#4A7C59] hover:text-[#F9B912] font-bold text-lg">
                                    +92-5822-924244
                                </a>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Emergency Hotline</div>
                                <a href="tel:+925822924200" className="text-[#4A7C59] hover:text-[#F9B912] font-bold text-lg">
                                    +92-5822-924200
                                </a>
                            </div>
                            <div className="text-gray-600 text-sm">
                                Available 24/7 for urgent banking assistance
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Service Links */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {serviceLinks.map((service, index) => (
                            <a
                                key={index}
                                href={service.link}
                                className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-[#4A7C59] bg-opacity-10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#4A7C59] group-hover:bg-opacity-100 transition-all">
                                    <service.icon className="w-6 h-6 text-[#4A7C59] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#4A7C59] text-center">
                                    {service.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickActionsHub;