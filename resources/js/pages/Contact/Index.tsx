import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Building2, Clock, CreditCard, Headphones, Mail, MapPin, Phone, Users } from 'lucide-react';

export default function ContactPage() {
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
                        <p className="mb-1 text-xl font-bold text-[#F9B912]">+92-5822-924244</p>
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
                        <p className="mb-1 text-xl font-bold text-[#F9B912]">info@bankajk.com</p>
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

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="group">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="group">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="+92 300 1234567"
                                />
                            </div>

                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Subject
                                </label>
                                <select className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20">
                                    <option>Select inquiry type</option>
                                    <option>Account Services</option>
                                    <option>Loan Inquiry</option>
                                    <option>Card Services</option>
                                    <option>Digital Banking</option>
                                    <option>Investment Services</option>
                                    <option>Complaint</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="group">
                                <label className="mb-3 block text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#195f1f]">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-50/50 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:border-[#195f1f] focus:ring-4 focus:ring-[#195f1f]/20"
                                    placeholder="Please describe your inquiry in detail..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="group relative flex w-full transform items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#195f1f] via-[#2d7a32] to-[#4a7c59] px-8 py-4 text-lg font-bold text-white shadow-[0_8px_25px_rgb(25,95,31,0.4)] transition-all duration-300 hover:-translate-y-1 hover:from-[#0d4a12] hover:via-[#1b5e20] hover:to-[#2e7d32] hover:shadow-[0_15px_35px_rgb(25,95,31,0.6)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F9B912]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                <Mail className="relative z-10 mr-3 h-6 w-6" />
                                <span className="relative z-10">Send Message</span>
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
                                            Head Office, Bank Square
                                            <br />
                                            Chattar Domel, Muzaffarabad, 13100
                                            <br />
                                            Azad Jammu & Kashmir, Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-center rounded-2xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent">
                                    <div className="mr-4 rounded-xl bg-gradient-to-br from-[#1565c0] to-[#2196f3] p-3 shadow-[0_6px_15px_rgb(21,101,192,0.3)] transition-transform duration-300 group-hover:scale-110">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-800">Phone</p>
                                        <p className="text-lg text-gray-600">+92 (5822) 924244</p>
                                    </div>
                                </div>

                                <div className="group flex items-center rounded-2xl p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent">
                                    <div className="mr-4 rounded-xl bg-gradient-to-br from-[#ef6c00] to-[#ff9800] p-3 shadow-[0_6px_15px_rgb(239,108,0,0.3)] transition-transform duration-300 group-hover:scale-110">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-800">Email</p>
                                        <p className="text-lg text-gray-600">info@bankajk.com</p>
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
                            With 87+ branches across Azad Jammu & Kashmir, we're always close to you.
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

ContactPage.layout = (page: any) => <WebsiteLayout title="Contact Us">{page}</WebsiteLayout>;
