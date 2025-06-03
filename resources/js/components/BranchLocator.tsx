import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, Filter } from 'lucide-react';

interface Branch {
    id: number;
    name: string;
    address: string;
    city: string;
    phone: string;
    type: 'main' | 'branch' | 'sub-branch';
    services: string[];
    timings: string;
    hasAtm: boolean;
}

const BranchLocator: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState<number | null>(null);

    const branches: Branch[] = [
        {
            id: 1,
            name: "Head Office",
            address: "Bank Square, Chattar Domel",
            city: "Muzaffarabad",
            phone: "+92-5822-924244",
            type: "main",
            services: ["All Banking Services", "Corporate Banking", "Foreign Exchange"],
            timings: "Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM",
            hasAtm: true
        },
        {
            id: 2,
            name: "Rawalakot Branch",
            address: "Main Bazaar, Rawalakot",
            city: "Rawalakot",
            phone: "+92-5824-442233",
            type: "branch",
            services: ["Personal Banking", "Loans", "Deposits"],
            timings: "Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM",
            hasAtm: true
        },
        {
            id: 3,
            name: "Mirpur Branch",
            address: "City Center, Mirpur",
            city: "Mirpur",
            phone: "+92-5827-333444",
            type: "branch",
            services: ["Personal Banking", "Business Banking", "Remittances"],
            timings: "Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM",
            hasAtm: true
        },
        {
            id: 4,
            name: "Kotli Branch",
            address: "Main Road, Kotli",
            city: "Kotli",
            phone: "+92-5822-555666",
            type: "branch",
            services: ["Personal Banking", "Agriculture Loans"],
            timings: "Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM",
            hasAtm: false
        },
        {
            id: 5,
            name: "Bhimber Branch",
            address: "Commercial Area, Bhimber",
            city: "Bhimber",
            phone: "+92-5829-777888",
            type: "sub-branch",
            services: ["Basic Banking", "Deposits"],
            timings: "Mon-Thu: 9AM-4PM, Fri: 9AM-12PM",
            hasAtm: true
        }
    ];

    const cities = [...new Set(branches.map(b => b.city))];

    const filteredBranches = branches.filter(branch => {
        const matchesCity = selectedCity === 'all' || branch.city === selectedCity;
        const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.address.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCity && matchesSearch;
    });

    const getBranchTypeColor = (type: string) => {
        switch (type) {
            case 'main': return 'bg-green-100 text-green-800';
            case 'branch': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Our Branches</h2>
                    <p className="text-xl text-gray-600">87+ branches across Azad Jammu & Kashmir</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by branch name or address..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59] outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59] outline-none appearance-none bg-white"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="all">All Cities</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Branch List */}
                    <div className="lg:col-span-2 space-y-4">
                        {filteredBranches.map((branch) => (
                            <div
                                key={branch.id}
                                className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${selectedBranch === branch.id ? 'ring-2 ring-[#4A7C59] shadow-xl' : 'hover:shadow-xl'
                                    }`}
                                onClick={() => setSelectedBranch(selectedBranch === branch.id ? null : branch.id)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBranchTypeColor(branch.type)}`}>
                                                {branch.type.replace('-', ' ').toUpperCase()}
                                            </span>
                                            {branch.hasAtm && (
                                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                    ATM
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>{branch.address}, {branch.city}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <a href={`tel:${branch.phone}`} className="hover:text-[#4A7C59]">
                                                {branch.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>{branch.timings}</span>
                                        </div>
                                    </div>
                                    <button className="text-[#4A7C59] hover:text-[#F9B912] p-2">
                                        <Navigation className="w-5 h-5" />
                                    </button>
                                </div>

                                {selectedBranch === branch.id && (
                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Available Services:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {branch.services.map((service, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-[#4A7C59] bg-opacity-10 text-[#4A7C59] px-3 py-1 rounded-full text-sm"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Map Placeholder & Stats */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Map</h3>
                            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">Map integration coming soon</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Branch Network</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Branches</span>
                                    <span className="font-bold text-2xl text-[#4A7C59]">87+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">ATM Locations</span>
                                    <span className="font-bold text-xl text-gray-900">150+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Cities Covered</span>
                                    <span className="font-bold text-xl text-gray-900">25+</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] rounded-xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                            <p className="mb-4">Can't find what you're looking for? Our customer support team is here to help.</p>
                            <a
                                href="/contact-us"
                                className="bg-white text-[#4A7C59] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BranchLocator;