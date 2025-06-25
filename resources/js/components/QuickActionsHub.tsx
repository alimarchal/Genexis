import { Calculator, Clock, CreditCard, FileText, LogIn, MapPin, Phone, Shield, Smartphone } from 'lucide-react';
import React, { useState } from 'react';

const QuickActionsHub: React.FC = () => {
    const [hoveredAction, setHoveredAction] = useState<number | null>(null);

    const quickActions = [
        {
            id: 1,
            title: 'Account Login',
            description: 'Access your account securely',
            icon: LogIn,
            link: '/login',
            color: 'from-blue-600 to-blue-700',
            popular: true,
        },
        {
            id: 2,
            title: 'Loan Calculator',
            description: 'Calculate EMI and eligibility',
            icon: Calculator,
            link: '/loan-calculator',
            color: 'from-green-600 to-green-700',
            popular: true,
        },
        {
            id: 3,
            title: 'Branch Locator',
            description: 'Find nearest branch/ATM',
            icon: MapPin,
            link: '/branches',
            color: 'from-purple-600 to-purple-700',
        },
        {
            id: 4,
            title: 'Apply for Loan',
            description: 'Start your loan application',
            icon: CreditCard,
            link: '/apply-loan',
            color: 'from-amber-600 to-amber-700',
            popular: true,
        },
        {
            id: 5,
            title: 'Contact Support',
            description: 'Get help from our team',
            icon: Phone,
            link: '/contact-us',
            color: 'from-red-600 to-red-700',
        },
        {
            id: 6,
            title: 'Rate Inquiry',
            description: 'Check current profit rates',
            icon: FileText,
            link: '/rates/profit-rates',
            color: 'from-teal-600 to-teal-700',
        },
    ];

    const serviceLinks = [
        { name: 'Utility Bills', link: '/services/utility-bills-collection', icon: FileText },
        { name: 'Home Remittance', link: '/services/home-remittance', icon: CreditCard },
        { name: 'Locker Facility', link: '/services/lockers-facility', icon: Shield },
        { name: 'Mobile Banking', link: '/services/all-services', icon: Smartphone },
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-gray-900">Quick Actions</h2>
                    <p className="text-xl text-gray-600">Access banking services instantly</p>
                </div>

                {/* Main Quick Actions */}
                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {quickActions.map((action) => {
                        const IconComponent = action.icon;
                        const isHovered = hoveredAction === action.id;

                        return (
                            <a
                                key={action.id}
                                href={action.link}
                                className={`group relative transform overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 ${
                                    isHovered ? '-translate-y-3 scale-105 shadow-2xl' : 'hover:-translate-y-2 hover:shadow-xl'
                                }`}
                                onMouseEnter={() => setHoveredAction(action.id)}
                                onMouseLeave={() => setHoveredAction(null)}
                            >
                                {action.popular && (
                                    <div className="absolute top-4 right-4 rounded-full bg-[#F9B912] px-3 py-1 text-xs font-bold text-white">
                                        Popular
                                    </div>
                                )}

                                <div
                                    className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${action.color} mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                                >
                                    <IconComponent className="h-8 w-8 text-white" />
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#4A7C59]">{action.title}</h3>

                                <p className="mb-4 text-gray-600">{action.description}</p>

                                <div className="flex items-center font-semibold text-[#4A7C59] transition-colors group-hover:text-[#F9B912]">
                                    <span>Get Started</span>
                                    <svg
                                        className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Banking Hours & Contact */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] p-8 text-white">
                        <div className="mb-4 flex items-center">
                            <Clock className="mr-3 h-6 w-6" />
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
                            <div className="mt-4 text-sm text-yellow-200">* Hours may vary by branch</div>
                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg">
                        <div className="mb-4 flex items-center">
                            <Phone className="mr-3 h-6 w-6 text-[#4A7C59]" />
                            <h3 className="text-2xl font-bold text-gray-900">24/7 Support</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="font-semibold text-gray-900">Customer Care</div>
                                <a href="tel:+925822924244" className="text-lg font-bold text-[#4A7C59] hover:text-[#F9B912]">
                                    +92-5822-924244
                                </a>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Emergency Hotline</div>
                                <a href="tel:+925822924200" className="text-lg font-bold text-[#4A7C59] hover:text-[#F9B912]">
                                    +92-5822-924200
                                </a>
                            </div>
                            <div className="text-sm text-gray-600">Available 24/7 for urgent banking assistance</div>
                        </div>
                    </div>
                </div>

                {/* Quick Service Links */}
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                    <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">Popular Services</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {serviceLinks.map((service, index) => (
                            <a
                                key={index}
                                href={service.link}
                                className="group flex flex-col items-center rounded-xl p-4 transition-colors hover:bg-gray-50"
                            >
                                <div className="bg-opacity-10 group-hover:bg-opacity-100 mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4A7C59] transition-all group-hover:bg-[#4A7C59]">
                                    <service.icon className="h-6 w-6 text-[#4A7C59] transition-colors group-hover:text-white" />
                                </div>
                                <span className="text-center text-sm font-semibold text-gray-700 group-hover:text-[#4A7C59]">{service.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickActionsHub;
