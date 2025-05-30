import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
import { MapPin, Phone, Mail, Clock, Building2, Headphones, CreditCard, Users } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Get in touch with Bank of Azad Jammu & Kashmir. We're here to help you with all your banking needs.
                </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="group relative bg-gradient-to-br from-[#195f1f] via-[#2d7a32] to-[#4a7c59] p-8 rounded-2xl text-center cursor-pointer
                              shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(25,95,31,0.4)]
                              transform hover:-translate-y-3 transition-all duration-500 ease-out
                              border border-green-200/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 
                                      group-hover:scale-110 group-hover:bg-[#F9B912]/20 transition-all duration-300">
                            <Phone className="h-8 w-8 text-white group-hover:text-[#F9B912] transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-white mb-3 text-lg">Call Center</h3>
                        <p className="text-[#F9B912] font-bold text-xl mb-1">+92-5822-924244</p>
                        <p className="text-green-100 text-sm">24/7 Support</p>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-[#1565c0] via-[#1976d2] to-[#2196f3] p-8 rounded-2xl text-center cursor-pointer
                              shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(21,101,192,0.4)]
                              transform hover:-translate-y-3 transition-all duration-500 ease-out
                              border border-blue-200/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 
                                      group-hover:scale-110 group-hover:bg-[#F9B912]/20 transition-all duration-300">
                            <Mail className="h-8 w-8 text-white group-hover:text-[#F9B912] transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-white mb-3 text-lg">Email Support</h3>
                        <p className="text-[#F9B912] font-bold text-xl mb-1">info@bankajk.com</p>
                        <p className="text-blue-100 text-sm">Quick Response</p>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-[#ef6c00] via-[#f57c00] to-[#ff9800] p-8 rounded-2xl text-center cursor-pointer
                              shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(239,108,0,0.4)]
                              transform hover:-translate-y-3 transition-all duration-500 ease-out
                              border border-orange-200/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 
                                      group-hover:scale-110 group-hover:bg-[#F9B912]/20 transition-all duration-300">
                            <CreditCard className="h-8 w-8 text-white group-hover:text-[#F9B912] transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-white mb-3 text-lg">Card Services</h3>
                        <p className="text-[#F9B912] font-bold text-xl mb-1">+92-5822-920000</p>
                        <p className="text-orange-100 text-sm">Card Support</p>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-[#7b1fa2] via-[#8e24aa] to-[#9c27b0] p-8 rounded-2xl text-center cursor-pointer
                              shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(123,31,162,0.4)]
                              transform hover:-translate-y-3 transition-all duration-500 ease-out
                              border border-purple-200/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 
                                      group-hover:scale-110 group-hover:bg-[#F9B912]/20 transition-all duration-300">
                            <Users className="h-8 w-8 text-white group-hover:text-[#F9B912] transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-white mb-3 text-lg">Customer Care</h3>
                        <p className="text-[#F9B912] font-bold text-xl mb-1">111-BAJK-111</p>
                        <p className="text-purple-100 text-sm">General Inquiries</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="relative bg-white rounded-3xl overflow-hidden 
                              shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]
                              transform hover:-translate-y-1 transition-all duration-500 ease-out
                              border border-gray-100/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#195f1f]/5 via-transparent to-[#F9B912]/5"></div>
                    <div className="relative p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                            <div className="bg-gradient-to-br from-[#195f1f] to-[#4a7c59] p-3 rounded-2xl mr-4 
                                          shadow-[0_8px_20px_rgb(25,95,31,0.3)]">
                                <Headphones className="h-6 w-6 text-white" />
                            </div>
                            Send us a Message
                        </h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-[#195f1f] transition-colors">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                                                 focus:ring-4 focus:ring-[#195f1f]/20 focus:border-[#195f1f] 
                                                 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm
                                                 hover:border-gray-300 hover:shadow-md"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-[#195f1f] transition-colors">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                                                 focus:ring-4 focus:ring-[#195f1f]/20 focus:border-[#195f1f] 
                                                 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm
                                                 hover:border-gray-300 hover:shadow-md"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-[#195f1f] transition-colors">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                                             focus:ring-4 focus:ring-[#195f1f]/20 focus:border-[#195f1f] 
                                             transition-all duration-300 bg-gray-50/50 backdrop-blur-sm
                                             hover:border-gray-300 hover:shadow-md"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-[#195f1f] transition-colors">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                                             focus:ring-4 focus:ring-[#195f1f]/20 focus:border-[#195f1f] 
                                             transition-all duration-300 bg-gray-50/50 backdrop-blur-sm
                                             hover:border-gray-300 hover:shadow-md"
                                    placeholder="+92 300 1234567"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-[#195f1f] transition-colors">Subject</label>
                                <select className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                                                 focus:ring-4 focus:ring-[#195f1f]/20 focus:border-[#195f1f] 
                                                 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm
                                                 hover:border-gray-300 hover:shadow-md">
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
                                <label className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-[#195f1f] transition-colors">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                                             focus:ring-4 focus:ring-[#195f1f]/20 focus:border-[#195f1f] 
                                             transition-all duration-300 bg-gray-50/50 backdrop-blur-sm
                                             hover:border-gray-300 hover:shadow-md resize-none"
                                    placeholder="Please describe your inquiry in detail..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="group w-full bg-gradient-to-r from-[#195f1f] via-[#2d7a32] to-[#4a7c59] 
                                         text-white py-4 px-8 rounded-xl font-bold text-lg
                                         hover:from-[#0d4a12] hover:via-[#1b5e20] hover:to-[#2e7d32]
                                         transform hover:-translate-y-1 transition-all duration-300
                                         shadow-[0_8px_25px_rgb(25,95,31,0.4)] hover:shadow-[0_15px_35px_rgb(25,95,31,0.6)]
                                         flex items-center justify-center relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F9B912]/20 to-transparent 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Mail className="h-6 w-6 mr-3 relative z-10" />
                                <span className="relative z-10">Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    {/* Head Office */}
                    <div className="relative bg-white rounded-3xl overflow-hidden
                                  shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]
                                  transform hover:-translate-y-1 transition-all duration-500 ease-out
                                  border border-gray-100/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#195f1f]/5 via-transparent to-[#F9B912]/5"></div>
                        <div className="relative p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                                <div className="bg-gradient-to-br from-[#195f1f] to-[#4a7c59] p-3 rounded-2xl mr-4 
                                              shadow-[0_8px_20px_rgb(25,95,31,0.3)]">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                Head Office
                            </h2>

                            <div className="space-y-6">
                                <div className="group flex items-start p-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent transition-all duration-300">
                                    <div className="bg-gradient-to-br from-[#195f1f] to-[#4a7c59] p-3 rounded-xl mr-4 
                                                  shadow-[0_6px_15px_rgb(25,95,31,0.3)] group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg mb-2">Address</p>
                                        <p className="text-gray-600 leading-relaxed">
                                            Head Office, Bank Square<br />
                                            Chattar Domel, Muzaffarabad, 13100<br />
                                            Azad Jammu & Kashmir, Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-center p-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent transition-all duration-300">
                                    <div className="bg-gradient-to-br from-[#1565c0] to-[#2196f3] p-3 rounded-xl mr-4 
                                                  shadow-[0_6px_15px_rgb(21,101,192,0.3)] group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">Phone</p>
                                        <p className="text-gray-600 text-lg">+92 (5822) 924244</p>
                                    </div>
                                </div>

                                <div className="group flex items-center p-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#195f1f]/5 hover:to-transparent transition-all duration-300">
                                    <div className="bg-gradient-to-br from-[#ef6c00] to-[#ff9800] p-3 rounded-xl mr-4 
                                                  shadow-[0_6px_15px_rgb(239,108,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">Email</p>
                                        <p className="text-gray-600 text-lg">info@bankajk.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="relative bg-white rounded-3xl overflow-hidden
                                  shadow-[0_10px_40px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)]
                                  transform hover:-translate-y-1 transition-all duration-500 ease-out
                                  border border-gray-100/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#195f1f]/5 via-transparent to-[#F9B912]/5"></div>
                        <div className="relative p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                                <div className="bg-gradient-to-br from-[#7b1fa2] to-[#9c27b0] p-3 rounded-2xl mr-4 
                                              shadow-[0_8px_20px_rgb(123,31,162,0.3)]">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                Business Hours
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-4 px-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300">
                                    <span className="font-bold text-gray-700 text-lg">Monday - Thursday</span>
                                    <span className="text-[#195f1f] font-bold text-lg">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-4 px-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300">
                                    <span className="font-bold text-gray-700 text-lg">Friday</span>
                                    <span className="text-[#195f1f] font-bold text-lg">9:00 AM - 05:30 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-4 px-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300">
                                    <span className="font-bold text-gray-700 text-lg">Saturday</span>
                                    <span className="text-[#195f1f] font-bold text-lg">9:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-4 px-6 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:shadow-md transition-all duration-300">
                                    <span className="font-bold text-gray-700 text-lg">Sunday</span>
                                    <span className="text-red-600 font-bold text-lg">Closed</span>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-[#1565c0]/10 to-[#2196f3]/10 rounded-2xl border border-blue-200/50">
                                <p className="text-blue-800 font-semibold">
                                    <strong>Note:</strong> Call Center support is available 24/7 for urgent banking needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branch Locator Section */}
            <div className="mt-20 relative overflow-hidden rounded-3xl
                          shadow-[0_20px_60px_rgb(25,95,31,0.4)] hover:shadow-[0_30px_80px_rgb(25,95,31,0.6)]
                          transform hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="absolute inset-0 bg-gradient-to-r from-[#195f1f] via-[#2d7a32] to-[#4a7c59]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-[#F9B912]/20"></div>
                <div className="relative p-12 text-white text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8
                                      shadow-[0_10px_30px_rgb(0,0,0,0.3)]">
                            <MapPin className="h-10 w-10 text-[#F9B912]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#F9B912] bg-clip-text text-transparent">
                            Find Your Nearest Branch
                        </h2>
                        <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
                            With 87+ branches across Azad Jammu & Kashmir, we're always close to you.
                        </p>
                        <button className="group relative bg-white text-[#195f1f] px-10 py-4 rounded-2xl font-bold text-lg
                                         hover:bg-[#F9B912] hover:text-white transition-all duration-300
                                         shadow-[0_10px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.4)]
                                         transform hover:-translate-y-1 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F9B912]/20 to-transparent 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center">
                                <MapPin className="h-6 w-6 mr-3" />
                                Branch Locator
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ContactPage.layout = (page: any) => (
    <WebsiteLayout
        title="Contact Us"
    >
        {page}
    </WebsiteLayout>
);