import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';
import { Building2, Clock, CreditCard, Headphones, Mail, MapPin, Phone, Users, X, Check, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PopupState {
    show: boolean;
    type: 'processing' | 'success' | 'error';
    message: string;
}

interface ContactPageProps {
    bankBranchesCount: number;
    contact_phone: string;
    contact_email: string;
    contact_address: string;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function ContactPage() {
    const { bankBranchesCount, contact_phone, contact_email, contact_address, flash } = usePage().props as ContactPageProps;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        district: '',
        tehsil: '',
        place: '',
        category: '',
        subject: '',
        message: '',
    });

    const [popup, setPopup] = useState<PopupState>({
        show: false,
        type: 'processing',
        message: ''
    });

    const [rateLimited, setRateLimited] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Rate limiting countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (remainingTime > 0) {
            timer = setTimeout(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        } else if (rateLimited) {
            setRateLimited(false);
        }
        return () => clearTimeout(timer);
    }, [remainingTime, rateLimited]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear validation error when user starts typing
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rateLimited) {
            return;
        }

        // Show processing popup
        setPopup({
            show: true,
            type: 'processing',
            message: 'Submitting your message...'
        });

        try {
            const response = await axios.post(route('contact.submit'), formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });

            if (response.data.success) {
                // Show success popup
                setPopup({
                    show: true,
                    type: 'success',
                    message: response.data.message || 'Your message has been sent successfully!'
                });

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    district: '',
                    tehsil: '',
                    place: '',
                    category: '',
                    subject: '',
                    message: '',
                });
                setValidationErrors({});

                // Auto-hide success popup after 3 seconds
                setTimeout(() => {
                    setPopup(prev => ({ ...prev, show: false }));
                }, 3000);
            }
        } catch (error: any) {
            if (error.response?.status === 429) {
                // Rate limited
                const remainingSeconds = error.response.data.remaining_time || 30;
                setRateLimited(true);
                setRemainingTime(remainingSeconds);

                setPopup({
                    show: true,
                    type: 'error',
                    message: `Please wait ${remainingSeconds} seconds before submitting again.`
                });
            } else if (error.response?.status === 422) {
                // Validation errors
                setValidationErrors(error.response.data.errors || {});
                setPopup({
                    show: true,
                    type: 'error',
                    message: 'Please check the form for errors and try again.'
                });
            } else {
                // General error
                setPopup({
                    show: true,
                    type: 'error',
                    message: error.response?.data?.message || 'An error occurred. Please try again.'
                });
            }

            // Auto-hide error popup after 5 seconds
            setTimeout(() => {
                setPopup(prev => ({ ...prev, show: false }));
            }, 5000);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            {/* Hero Section */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-600">
                    Get in touch with Bank of Azad Jammu & Kashmir. We're here to help you with all your banking needs.
                </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="group relative transform cursor-pointer overflow-hidden rounded-2xl border border-green-200/20 bg-gradient-to-br from-[#195f1f] via-[#2d7a32] to-[#4a7c59] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(25,95,31,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F9B912]/20">
                            <Phone className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-[#F9B912]" />
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-white">Call Center</h3>
                        <p className="mb-1 text-xl font-bold text-[#F9B912]">{contact_phone}</p>
                        <p className="text-sm text-green-100">24/7 Support</p>
                    </div>
                </div>

                <div className="group relative transform cursor-pointer overflow-hidden rounded-2xl border border-blue-200/20 bg-gradient-to-br from-[#1565c0] via-[#1976d2] to-[#2196f3] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(21,101,192,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F9B912]/20">
                            <Mail className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-[#F9B912]" />
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-white">Email Support</h3>
                        <p className="mb-1 text-xl font-bold text-[#F9B912]">{contact_email}</p>
                        <p className="text-sm text-blue-100">Quick Response</p>
                    </div>
                </div>

                <div className="group relative transform cursor-pointer overflow-hidden rounded-2xl border border-orange-200/20 bg-gradient-to-br from-[#ef6c00] via-[#f57c00] to-[#ff9800] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(239,108,0,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F9B912]/20">
                            <CreditCard className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-[#F9B912]" />
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-white">Card Services</h3>
                        <p className="mb-1 text-xl font-bold text-[#F9B912]">+92-5822-920000</p>
                        <p className="text-sm text-orange-100">Card Support</p>
                    </div>
                </div>

                <div className="group relative transform cursor-pointer overflow-hidden rounded-2xl border border-purple-200/20 bg-gradient-to-br from-[#7b1fa2] via-[#8e24aa] to-[#9c27b0] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_60px_rgb(123,31,162,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F9B912]/20">
                            <Users className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-[#F9B912]" />
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-white">Customer Care</h3>
                        <p className="mb-1 text-xl font-bold text-[#F9B912]">111-BAJK-111</p>
                        <p className="text-sm text-purple-100">General Inquiries</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Contact Form */}
                <div className="relative transform overflow-hidden rounded-3xl border border-gray-100/50 bg-white shadow-[0_10px_40px_rgb(0,0,0,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#195f1f]/5 via-transparent to-[#F9B912]/5"></div>
                    <div className="relative p-8">
                        <h2 className="mb-8 flex items-center text-3xl font-bold text-gray-800">
                            <div className="mr-4 rounded-2xl bg-gradient-to-br from-[#195f1f] to-[#4a7c59] p-3 shadow-[0_8px_20px_rgb(25,95,31,0.3)]">
                                <Headphones className="h-6 w-6 text-white" />
                            </div>
                            Send us a Message
                        </h2>

                        {flash?.success && (
                            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                                <strong>Success!</strong> {flash.success}
                            </div>
                        )}

                        {/* Processing/Success/Error Popup */}
                        {popup.show && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className={`relative transform rounded-2xl border p-8 text-center shadow-2xl transition-all duration-500 ${popup.type === 'processing' ? 'bg-blue-50 border-blue-200' :
                                    popup.type === 'success' ? 'bg-green-50 border-green-200' :
                                        'bg-red-50 border-red-200'
                                    }`}>
                                    {popup.type === 'processing' && (
                                        <div className="mb-4">
                                            <Loader2 className="mx-auto h-16 w-16 animate-spin text-blue-600" />
                                        </div>
                                    )}
                                    {popup.type === 'success' && (
                                        <div className="mb-4">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                                <Check className="h-8 w-8 text-green-600 animate-pulse" />
                                            </div>
                                        </div>
                                    )}
                                    {popup.type === 'error' && (
                                        <div className="mb-4">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                                <X className="h-8 w-8 text-red-600" />
                                            </div>
                                        </div>
                                    )}
                                    <h3 className={`mb-2 text-xl font-bold ${popup.type === 'processing' ? 'text-blue-800' :
                                        popup.type === 'success' ? 'text-green-800' :
                                            'text-red-800'
                                        }`}>
                                        {popup.type === 'processing' ? 'Processing...' :
                                            popup.type === 'success' ? 'Success!' :
                                                'Error'}
                                    </h3>
                                    <p className={`${popup.type === 'processing' ? 'text-blue-600' :
                                        popup.type === 'success' ? 'text-green-600' :
                                            'text-red-600'
                                        }`}>
                                        {popup.message}
                                    </p>
                                    {popup.type !== 'processing' && (
                                        <button
                                            onClick={() => setPopup(prev => ({ ...prev, show: false }))}
                                            className="mt-4 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                                        >
                                            Close
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Rate Limiting Timer */}
                        {rateLimited && remainingTime > 0 && (
                            <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-4 text-orange-800">
                                <strong>Rate Limited:</strong> Please wait {remainingTime} seconds before submitting another message.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Enter your full name"
                                    required
                                />
                                {validationErrors.name && <p className="mt-2 text-sm text-red-600">{validationErrors.name}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    E-Mail <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="your.email@example.com"
                                    required
                                />
                                {validationErrors.email && <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>}
                            </div>

                            {/* Phone Number Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="+92 300 1234567"
                                />
                                {validationErrors.phone && <p className="mt-2 text-sm text-red-600">{validationErrors.phone}</p>}
                            </div>

                            {/* District Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    District
                                </label>
                                <input
                                    type="text"
                                    value={formData.district}
                                    onChange={(e) => handleInputChange('district', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Enter your district"
                                />
                                {validationErrors.district && <p className="mt-2 text-sm text-red-600">{validationErrors.district}</p>}
                            </div>

                            {/* Tehsil Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Tehsil
                                </label>
                                <input
                                    type="text"
                                    value={formData.tehsil}
                                    onChange={(e) => handleInputChange('tehsil', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Enter your tehsil"
                                />
                                {validationErrors.tehsil && <p className="mt-2 text-sm text-red-600">{validationErrors.tehsil}</p>}
                            </div>

                            {/* Place Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Place
                                </label>
                                <input
                                    type="text"
                                    value={formData.place}
                                    onChange={(e) => handleInputChange('place', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Enter your place"
                                />
                                {validationErrors.place && <p className="mt-2 text-sm text-red-600">{validationErrors.place}</p>}
                            </div>

                            {/* Category Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                >
                                    <option value="">Select a category</option>
                                    <option value="general_inquiry">General Inquiry</option>
                                    <option value="account_services">Account Services</option>
                                    <option value="card_services">Card Services</option>
                                    <option value="loan_services">Loan Services</option>
                                    <option value="complaint">Complaint</option>
                                    <option value="suggestion">Suggestion</option>
                                    <option value="other">Other</option>
                                </select>
                                {validationErrors.category && <p className="mt-2 text-sm text-red-600">{validationErrors.category}</p>}
                            </div>

                            {/* Subject Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Enter the subject of your message"
                                    required
                                />
                                {validationErrors.subject && <p className="mt-2 text-sm text-red-600">{validationErrors.subject}</p>}
                            </div>

                            {/* Message Field */}
                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    rows={6}
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Enter your detailed message here..."
                                    required
                                />
                                {validationErrors.message && <p className="mt-2 text-sm text-red-600">{validationErrors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={popup.show && popup.type === 'processing' || rateLimited}
                                className="group relative flex w-full transform items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#195f1f] via-[#2d7a32] to-[#4a7c59] px-8 py-4 text-lg font-bold text-white shadow-[0_8px_25px_rgb(25,95,31,0.4)] transition-all duration-300 hover:-translate-y-1 hover:from-[#0d4a12] hover:via-[#1b5e20] hover:to-[#2e7d32] hover:shadow-[0_15px_35px_rgb(25,95,31,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F9B912]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                <Mail className="relative z-10 mr-3 h-6 w-6" />
                                <span className="relative z-10">
                                    {popup.show && popup.type === 'processing' ? 'Submitting...' :
                                        rateLimited ? `Wait ${remainingTime}s` :
                                            'Submit Contact Form'}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    {/* Head Office */}
                    <div className="relative transform overflow-hidden rounded-3xl border border-gray-100/50 bg-white shadow-[0_10px_40px_rgb(0,0,0,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#195f1f]/5 via-transparent to-[#F9B912]/5"></div>
                        <div className="relative p-8">
                            <h2 className="mb-8 flex items-center text-3xl font-bold text-gray-800">
                                <div className="mr-4 rounded-2xl bg-gradient-to-br from-[#195f1f] to-[#4a7c59] p-3 shadow-[0_8px_20px_rgb(25,95,31,0.3)]">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                Head Office
                            </h2>

                            <div className="space-y-6">
                                <div className="group flex items-start rounded-2xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent">
                                    <div className="mr-4 rounded-xl bg-gradient-to-br from-[#195f1f] to-[#4a7c59] p-3 shadow-[0_6px_15px_rgb(25,95,31,0.3)] transition-transform duration-300 group-hover:scale-110">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="mb-2 text-lg font-bold text-gray-800">Address</p>
                                        <p className="leading-relaxed text-gray-600">
                                            {contact_address}
                                            {/* {contact_address?.split(',').map((line, index, arr) => (
                                                <React.Fragment key={index}>
                                                    {line.trim()}
                                                    {index < arr.length - 1 && <br />}
                                                </React.Fragment>
                                            ))} */}
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-center rounded-2xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent">
                                    <div className="mr-4 rounded-xl bg-gradient-to-br from-[#1565c0] to-[#2196f3] p-3 shadow-[0_6px_15px_rgb(21,101,192,0.3)] transition-transform duration-300 group-hover:scale-110">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-800">Phone</p>
                                        <p className="text-lg text-gray-600">{contact_phone}</p>
                                    </div>
                                </div>

                                <div className="group flex items-center rounded-2xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent">
                                    <div className="mr-4 rounded-xl bg-gradient-to-br from-[#ef6c00] to-[#ff9800] p-3 shadow-[0_6px_15px_rgb(239,108,0,0.3)] transition-transform duration-300 group-hover:scale-110">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-800">Email</p>
                                        <p className="text-lg text-gray-600">{contact_email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="relative transform overflow-hidden rounded-3xl border border-gray-100/50 bg-white shadow-[0_10px_40px_rgb(0,0,0,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#195f1f]/5 via-transparent to-[#F9B912]/5"></div>
                        <div className="relative p-8">
                            <h2 className="mb-8 flex items-center text-3xl font-bold text-gray-800">
                                <div className="mr-4 rounded-2xl bg-gradient-to-br from-[#7b1fa2] to-[#9c27b0] p-3 shadow-[0_8px_20px_rgb(123,31,162,0.3)]">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                Business Hours
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4 transition-all duration-300 hover:shadow-md">
                                    <span className="text-lg font-bold text-gray-700">Monday - Thursday</span>
                                    <span className="text-lg font-bold text-[#195f1f]">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4 transition-all duration-300 hover:shadow-md">
                                    <span className="text-lg font-bold text-gray-700">Friday</span>
                                    <span className="text-lg font-bold text-[#195f1f]">9:00 AM - 05:30 PM</span>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4 transition-all duration-300 hover:shadow-md">
                                    <span className="text-lg font-bold text-gray-700">Saturday</span>
                                    <span className="text-lg font-bold text-[#195f1f]">9:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 transition-all duration-300 hover:shadow-md">
                                    <span className="text-lg font-bold text-gray-700">Sunday</span>
                                    <span className="text-lg font-bold text-red-600">Closed</span>
                                </div>
                            </div>

                            <div className="mt-8 rounded-2xl border border-blue-200/50 bg-gradient-to-r from-[#1565c0]/10 to-[#2196f3]/10 p-6">
                                <p className="font-semibold text-blue-800">
                                    <strong>Note:</strong> Call Center support is available 24/7 for urgent banking needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branch Locator Section */}
            <div className="relative mt-20 transform overflow-hidden rounded-3xl shadow-[0_20px_60px_rgb(25,95,31,0.4)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_80px_rgb(25,95,31,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#195f1f] via-[#2d7a32] to-[#4a7c59]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-[#F9B912]/20"></div>
                <div className="relative p-12 text-center text-white">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 shadow-[0_10px_30px_rgb(0,0,0,0.3)] backdrop-blur-sm">
                            <MapPin className="h-10 w-10 text-[#F9B912]" />
                        </div>
                        <h2 className="mb-6 bg-gradient-to-r from-white to-[#F9B912] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                            Find Your Nearest Branch
                        </h2>
                        <p className="mb-10 text-xl leading-relaxed opacity-90 md:text-2xl">
                            With {bankBranchesCount}+ branches across Azad Jammu & Kashmir, we're always close to you.
                        </p>
                        <button className="group relative transform overflow-hidden rounded-2xl bg-white px-10 py-4 text-lg font-bold text-[#195f1f] shadow-[0_10px_30px_rgb(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F9B912] hover:text-white hover:shadow-[0_15px_40px_rgb(0,0,0,0.4)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F9B912]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <span className="relative z-10 flex items-center">
                                <MapPin className="mr-3 h-6 w-6" />
                                Branch Locator
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ContactPage.layout = (page: React.ReactNode) => <WebsiteLayout title="Contact Us">{page}</WebsiteLayout>;
