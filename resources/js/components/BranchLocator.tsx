import { Clock, Filter, MapPin, Navigation, Phone, Search } from 'lucide-react';
import React, { useState } from 'react';

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
            name: 'Head Office',
            address: 'Bank Square, Chattar Domel',
            city: 'Muzaffarabad',
            phone: '+92-5822-924244',
            type: 'main',
            services: ['All Banking Services', 'Corporate Banking', 'Foreign Exchange'],
            timings: 'Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM',
            hasAtm: true,
        },
        {
            id: 2,
            name: 'Rawalakot Branch',
            address: 'Main Bazaar, Rawalakot',
            city: 'Rawalakot',
            phone: '+92-5824-442233',
            type: 'branch',
            services: ['Personal Banking', 'Loans', 'Deposits'],
            timings: 'Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM',
            hasAtm: true,
        },
        {
            id: 3,
            name: 'Mirpur Branch',
            address: 'City Center, Mirpur',
            city: 'Mirpur',
            phone: '+92-5827-333444',
            type: 'branch',
            services: ['Personal Banking', 'Business Banking', 'Remittances'],
            timings: 'Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM',
            hasAtm: true,
        },
        {
            id: 4,
            name: 'Kotli Branch',
            address: 'Main Road, Kotli',
            city: 'Kotli',
            phone: '+92-5822-555666',
            type: 'branch',
            services: ['Personal Banking', 'Agriculture Loans'],
            timings: 'Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM',
            hasAtm: false,
        },
        {
            id: 5,
            name: 'Bhimber Branch',
            address: 'Commercial Area, Bhimber',
            city: 'Bhimber',
            phone: '+92-5829-777888',
            type: 'sub-branch',
            services: ['Basic Banking', 'Deposits'],
            timings: 'Mon-Thu: 9AM-4PM, Fri: 9AM-12PM',
            hasAtm: true,
        },
    ];

    const cities = [...new Set(branches.map((b) => b.city))];

    const filteredBranches = branches.filter((branch) => {
        const matchesCity = selectedCity === 'all' || branch.city === selectedCity;
        const matchesSearch =
            branch.name.toLowerCase().includes(searchTerm.toLowerCase()) || branch.address.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCity && matchesSearch;
    });

    const getBranchTypeColor = (type: string) => {
        switch (type) {
            case 'main':
                return 'bg-green-100 text-green-800';
            case 'branch':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <section className="bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-gray-900">Find Our Branches</h2>
                    <p className="text-xl text-gray-600">87+ branches across Azad Jammu & Kashmir</p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by branch name or address..."
                                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            <select
                                className="appearance-none rounded-lg border border-gray-300 bg-white py-3 pr-8 pl-10 outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="all">All Cities</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Branch List */}
                    <div className="space-y-4 lg:col-span-2">
                        {filteredBranches.map((branch) => (
                            <div
                                key={branch.id}
                                className={`cursor-pointer rounded-xl bg-white p-6 shadow-lg transition-all duration-300 ${
                                    selectedBranch === branch.id ? 'shadow-xl ring-2 ring-[#4A7C59]' : 'hover:shadow-xl'
                                }`}
                                onClick={() => setSelectedBranch(selectedBranch === branch.id ? null : branch.id)}
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getBranchTypeColor(branch.type)}`}>
                                                {branch.type.replace('-', ' ').toUpperCase()}
                                            </span>
                                            {branch.hasAtm && (
                                                <span className="rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">ATM</span>
                                            )}
                                        </div>
                                        <div className="mb-2 flex items-center text-gray-600">
                                            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                                            <span>
                                                {branch.address}, {branch.city}
                                            </span>
                                        </div>
                                        <div className="mb-2 flex items-center text-gray-600">
                                            <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                                            <a href={`tel:${branch.phone}`} className="hover:text-[#4A7C59]">
                                                {branch.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                                            <span>{branch.timings}</span>
                                        </div>
                                    </div>
                                    <button className="p-2 text-[#4A7C59] hover:text-[#F9B912]">
                                        <Navigation className="h-5 w-5" />
                                    </button>
                                </div>

                                {selectedBranch === branch.id && (
                                    <div className="border-t pt-4">
                                        <h4 className="mb-2 font-semibold text-gray-900">Available Services:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {branch.services.map((service, idx) => (
                                                <span key={idx} className="bg-opacity-10 rounded-full bg-[#4A7C59] px-3 py-1 text-sm text-[#4A7C59]">
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
                        <div className="rounded-xl bg-white p-6 shadow-lg">
                            <h3 className="mb-4 text-xl font-bold text-gray-900">Interactive Map</h3>
                            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                                <div className="text-center">
                                    <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-500">Map integration coming soon</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-lg">
                            <h3 className="mb-4 text-xl font-bold text-gray-900">Branch Network</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Total Branches</span>
                                    <span className="text-2xl font-bold text-[#4A7C59]">87+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">ATM Locations</span>
                                    <span className="text-xl font-bold text-gray-900">150+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Cities Covered</span>
                                    <span className="text-xl font-bold text-gray-900">25+</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] p-6 text-white">
                            <h3 className="mb-4 text-xl font-bold">Need Help?</h3>
                            <p className="mb-4">Can't find what you're looking for? Our customer support team is here to help.</p>
                            <a
                                href="/contact-us"
                                className="inline-block rounded-lg bg-white px-4 py-2 font-semibold text-[#4A7C59] transition-colors hover:bg-gray-100"
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
