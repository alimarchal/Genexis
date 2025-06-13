import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Building2, Check, Clock, Headphones, Loader2, Mail, MapPin, Phone, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
        message: '',
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
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear validation error when user starts typing
        if (validationErrors[field]) {
            setValidationErrors((prev) => ({ ...prev, [field]: '' }));
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
            message: 'Submitting your message...',
        });

        try {
            const response = await axios.post(route('contact.submit'), formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (response.data.success) {
                // Show success popup
                setPopup({
                    show: true,
                    type: 'success',
                    message: response.data.message || 'Your message has been sent successfully!',
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
                    setPopup((prev) => ({ ...prev, show: false }));
                }, 3000);
            }
        } catch (error: unknown) {
            const axiosError = error as {
                response?: {
                    status?: number;
                    data?: {
                        remaining_time?: number;
                        errors?: Record<string, string[]>;
                        message?: string;
                    };
                };
            };
            if (axiosError.response?.status === 429) {
                // Rate limited
                const remainingSeconds = axiosError.response.data?.remaining_time || 30;
                setRateLimited(true);
                setRemainingTime(remainingSeconds);

                setPopup({
                    show: true,
                    type: 'error',
                    message: `Please wait ${remainingSeconds} seconds before submitting again.`,
                });
            } else if (axiosError.response?.status === 422) {
                // Validation errors - convert array format to string format
                const errors = axiosError.response.data?.errors || {};
                const convertedErrors: Record<string, string> = {};
                Object.keys(errors).forEach((key) => {
                    const errorArray = errors[key];
                    if (Array.isArray(errorArray) && errorArray.length > 0) {
                        convertedErrors[key] = errorArray[0]; // Take the first error message
                    }
                });
                setValidationErrors(convertedErrors);
                setPopup({
                    show: true,
                    type: 'error',
                    message: 'Please check the form for errors and try again.',
                });
            } else {
                // General error
                setPopup({
                    show: true,
                    type: 'error',
                    message: axiosError.response?.data?.message || 'An error occurred. Please try again.',
                });
            }

            // Auto-hide error popup after 5 seconds
            setTimeout(() => {
                setPopup((prev) => ({ ...prev, show: false }));
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Processing/Success/Error Popup */}
                {popup.show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div
                            className={`max-w-sm rounded-lg border p-6 text-center shadow-lg ${
                                popup.type === 'processing'
                                    ? 'border-blue-200 bg-blue-50'
                                    : popup.type === 'success'
                                      ? 'border-green-200 bg-green-50'
                                      : 'border-red-200 bg-red-50'
                            }`}
                        >
                            {popup.type === 'processing' && (
                                <div className="mb-4">
                                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
                                </div>
                            )}
                            {popup.type === 'success' && (
                                <div className="mb-4">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <Check className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            )}
                            {popup.type === 'error' && (
                                <div className="mb-4">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                        <X className="h-6 w-6 text-red-600" />
                                    </div>
                                </div>
                            )}
                            <h3
                                className={`mb-2 text-lg font-semibold ${
                                    popup.type === 'processing' ? 'text-blue-800' : popup.type === 'success' ? 'text-green-800' : 'text-red-800'
                                }`}
                            >
                                {popup.type === 'processing' ? 'Processing...' : popup.type === 'success' ? 'Success!' : 'Error'}
                            </h3>
                            <p
                                className={`text-sm ${
                                    popup.type === 'processing' ? 'text-blue-600' : popup.type === 'success' ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {popup.message}
                            </p>
                            {popup.type !== 'processing' && (
                                <button
                                    onClick={() => setPopup((prev) => ({ ...prev, show: false }))}
                                    className="mt-4 rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Headphones className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Get in touch with Bank of Azad Jammu & Kashmir. We're here to help you with all your banking needs.
                    </p>
                </div>

                {/* Quick Contact Cards */}
                <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-green-100 bg-gradient-to-br from-[#4A7C59] to-[#6B9B7A] p-6 text-center text-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">Call Center</h3>
                        <p className="mb-1 text-lg font-bold text-[#F9B912]">{contact_phone}</p>
                        <p className="text-sm text-green-100">24/7 Support</p>
                    </div>

                    <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-[#1565c0] to-[#2196f3] p-6 text-center text-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">Email Support</h3>
                        <p className="mb-1 text-lg font-bold text-[#F9B912]">{contact_email}</p>
                        <p className="text-sm text-blue-100">Quick Response</p>
                    </div>

                    <div className="rounded-lg border border-orange-100 bg-gradient-to-br from-[#ef6c00] to-[#ff9800] p-6 text-center text-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">Operations</h3>
                        <p className="mb-1 text-lg font-bold text-[#F9B912]">+92-5822-920000</p>
                        <p className="text-sm text-orange-100">Banking Operations</p>
                    </div>

                    <div className="rounded-lg border border-purple-100 bg-gradient-to-br from-[#7b1fa2] to-[#9c27b0] p-6 text-center text-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                            <Headphones className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">HRMD</h3>
                        <p className="mb-1 text-lg font-bold text-[#F9B912]">+92-5822-923138</p>
                        <p className="text-sm text-purple-100">General Inquiries HR</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="p-8">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
                                <div className="mr-3 rounded bg-[#4A7C59] p-2">
                                    <Headphones className="h-5 w-5 text-white" />
                                </div>
                                Send us a Message
                            </h2>

                            {flash?.success && (
                                <div className="mb-6 rounded border border-green-200 bg-green-50 p-4 text-green-800">
                                    <strong>Success!</strong> {flash.success}
                                </div>
                            )}

                            {/* Rate Limiting Timer */}
                            {rateLimited && remainingTime > 0 && (
                                <div className="mb-6 rounded border border-orange-200 bg-orange-50 p-4 text-orange-800">
                                    <strong>Rate Limited:</strong> Please wait {remainingTime} seconds before submitting another message.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        E-Mail <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
                                </div>

                                {/* Phone Number Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="+92 300 1234567"
                                    />
                                    {validationErrors.phone && <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>}
                                </div>

                                {/* District Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">District</label>
                                    <input
                                        type="text"
                                        value={formData.district}
                                        onChange={(e) => handleInputChange('district', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="Enter your district"
                                    />
                                    {validationErrors.district && <p className="mt-1 text-sm text-red-600">{validationErrors.district}</p>}
                                </div>

                                {/* Tehsil Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Tehsil</label>
                                    <input
                                        type="text"
                                        value={formData.tehsil}
                                        onChange={(e) => handleInputChange('tehsil', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="Enter your tehsil"
                                    />
                                    {validationErrors.tehsil && <p className="mt-1 text-sm text-red-600">{validationErrors.tehsil}</p>}
                                </div>

                                {/* Place Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Place</label>
                                    <input
                                        type="text"
                                        value={formData.place}
                                        onChange={(e) => handleInputChange('place', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="Enter your place"
                                    />
                                    {validationErrors.place && <p className="mt-1 text-sm text-red-600">{validationErrors.place}</p>}
                                </div>

                                {/* Category Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
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
                                    {validationErrors.category && <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="Enter the subject of your message"
                                        required
                                    />
                                    {validationErrors.subject && <p className="mt-1 text-sm text-red-600">{validationErrors.subject}</p>}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        rows={5}
                                        className="w-full rounded border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        placeholder="Enter your detailed message here..."
                                        required
                                    />
                                    {validationErrors.message && <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={(popup.show && popup.type === 'processing') || rateLimited}
                                    className="flex w-full items-center justify-center rounded bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-3 text-white font-medium hover:from-[#3d6b4a] hover:to-[#5a8a69] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    {popup.show && popup.type === 'processing'
                                        ? 'Submitting...'
                                        : rateLimited
                                          ? `Wait ${remainingTime}s`
                                          : 'Submit Contact Form'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Head Office */}
                        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="p-6">
                                <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                    <div className="mr-3 rounded bg-[#4A7C59] p-2">
                                        <Building2 className="h-5 w-5 text-white" />
                                    </div>
                                    Head Office
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="mr-3 rounded bg-gray-100 p-2">
                                            <MapPin className="h-5 w-5 text-[#4A7C59]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Address</p>
                                            <p className="text-gray-600">{contact_address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="mr-3 rounded bg-gray-100 p-2">
                                            <Phone className="h-5 w-5 text-[#4A7C59]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Phone</p>
                                            <p className="text-gray-600">{contact_phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="mr-3 rounded bg-gray-100 p-2">
                                            <Mail className="h-5 w-5 text-[#4A7C59]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Email</p>
                                            <p className="text-gray-600">{contact_email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="p-6">
                                <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                    <div className="mr-3 rounded bg-purple-600 p-2">
                                        <Clock className="h-5 w-5 text-white" />
                                    </div>
                                    Business Hours
                                </h2>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded border border-gray-100 bg-gray-50 px-4 py-3">
                                        <span className="font-medium text-gray-700">Monday - Thursday</span>
                                        <span className="font-medium text-[#4A7C59]">9:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded border border-gray-100 bg-gray-50 px-4 py-3">
                                        <span className="font-medium text-gray-700">Friday</span>
                                        <span className="font-medium text-[#4A7C59]">9:00 AM - 05:30 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded border border-gray-100 bg-gray-50 px-4 py-3">
                                        <span className="font-medium text-gray-700">Saturday</span>
                                        <span className="font-medium text-[#4A7C59]">9:00 AM - 2:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded border border-red-200 bg-red-50 px-4 py-3">
                                        <span className="font-medium text-gray-700">Sunday</span>
                                        <span className="font-medium text-red-600">Closed</span>
                                    </div>
                                </div>

                                <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Note:</strong> Call Center support is available 24/7 for urgent banking needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branch Locator Section */}
                <div className="relative mt-16 overflow-hidden rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] shadow-lg">
                    <div className="p-12 text-center text-white">
                        <div className="mx-auto max-w-4xl">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Find Your Nearest Branch</h2>
                            <p className="mb-8 text-lg opacity-90 md:text-xl">
                                With {bankBranchesCount}+ branches across Azad Jammu & Kashmir, we're always close to you.
                            </p>
                            <a
                                href={route('about.branch-network')}
                                className="inline-flex items-center rounded bg-white px-8 py-3 font-medium text-[#4A7C59] hover:bg-[#F9B912] hover:text-white transition-colors"
                            >
                                <MapPin className="mr-2 h-5 w-5" />
                                Branch Locator
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ContactPage.layout = (page: React.ReactNode) => <WebsiteLayout title="Contact Us">{page}</WebsiteLayout>;