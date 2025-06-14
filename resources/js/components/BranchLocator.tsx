import { CheckCircle, Clock, Globe, Mail, MapPin, Navigation, Phone, Search, XCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import InteractiveMap from './InteractiveMap';

interface Branch {
    id: number;
    name: string;
    code: string;
    type: string;
    address: string;
    city: string;
    region: string;
    full_address: string;
    latitude: number | null;
    longitude: number | null;
    phone: string;
    email: string;
    fax: string;
    services: string[];
    facilities: string[];
    operating_hours: Record<string, unknown>;
    is_24_hours: boolean;
    is_open: boolean;
    operating_status: string;
    today_hours: string;
    google_maps_url: string;
    has_atm: boolean;
}

interface Region {
    id: number;
    name: string;
    districts: District[];
}

interface District {
    id: number;
    name: string;
    region_id: number;
}

interface Props {
    branches: Branch[];
    regions: Region[];
    districts: District[];
}

const BranchLocator: React.FC<Props> = ({ branches = [], regions = [], districts = [] }) => {
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
    const [branchTypeFilter, setBranchTypeFilter] = useState('all');

    // Get unique cities/districts for filtering
    const cities = useMemo(() => [...new Set(branches.map((b) => b.city))].sort(), [branches]);
    const branchTypes = useMemo(() => [...new Set(branches.map((b) => b.type))].sort(), [branches]);

    // Get districts for selected region
    const availableDistricts = useMemo(() => {
        if (selectedRegion === 'all') return districts;
        const region = regions.find((r) => r.id.toString() === selectedRegion);
        return region ? region.districts : [];
    }, [selectedRegion, regions, districts]);

    // Filter branches based on search and filters
    const filteredBranches = useMemo(() => {
        return branches.filter((branch) => {
            const matchesRegion = selectedRegion === 'all' || branch.region === regions.find((r) => r.id.toString() === selectedRegion)?.name;
            const matchesDistrict =
                selectedDistrict === 'all' || branch.city === availableDistricts.find((d) => d.id.toString() === selectedDistrict)?.name;
            const matchesType = branchTypeFilter === 'all' || branch.type === branchTypeFilter;
            const matchesSearch =
                branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                branch.code.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesRegion && matchesDistrict && matchesType && matchesSearch;
        });
    }, [branches, selectedRegion, selectedDistrict, branchTypeFilter, searchTerm, regions, availableDistricts]);

    // Get stats
    const stats = useMemo(() => {
        const totalBranches = branches.length;
        const atmLocations = branches.filter((b) => b.has_atm).length;
        const citiesCovered = cities.length;
        const openNow = branches.filter((b) => b.is_open).length;

        return { totalBranches, atmLocations, citiesCovered, openNow };
    }, [branches, cities]);

    const getBranchTypeColor = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'head office':
            case 'main':
                return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
            case 'branch':
                return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
            case 'sub-branch':
                return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
            default:
                return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
        }
    };

    const getBranchTypeIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'head office':
            case 'main':
                return '🏢';
            case 'branch':
                return '🏪';
            case 'sub-branch':
                return '🏬';
            default:
                return '📍';
        }
    };

    // Fallback data if no branches are provided
    const displayBranches =
        filteredBranches.length > 0
            ? filteredBranches
            : [
                {
                    id: 1,
                    name: 'Head Office',
                    code: 'HO001',
                    type: 'Head Office',
                    address: 'Bank Square, Chattar Domel',
                    city: 'Muzaffarabad',
                    region: 'Muzaffarabad',
                    full_address: 'Bank Square, Chattar Domel, Muzaffarabad, AJK',
                    latitude: 34.3587,
                    longitude: 73.4713,
                    phone: '+92-5822-924244',
                    email: 'info@bankajk.com',
                    fax: '+92-5822-924245',
                    services: ['All Banking Services', 'Corporate Banking', 'Foreign Exchange'],
                    facilities: ['ATM', 'Parking', 'Wheelchair Access'],
                    operating_hours: {},
                    is_24_hours: false,
                    is_open: true,
                    operating_status: 'Open Now',
                    today_hours: '9:00 AM - 5:00 PM',
                    google_maps_url: 'https://www.google.com/maps?q=34.3587,73.4713',
                    has_atm: true,
                },
            ];

    const displayStats = branches.length > 0 ? stats : { totalBranches: 87, atmLocations: 150, citiesCovered: 25, openNow: 65 };

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#e9f7ef] via-white to-[#fff7e6] py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] bg-clip-text text-5xl font-bold text-transparent">
                        Find Our Branches
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        {displayStats.totalBranches}+ branches across Azad Jammu & Kashmir, serving you with comprehensive banking solutions
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {/* Search */}
                        <div className="relative lg:col-span-2">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by branch name, address, or code..."
                                className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-10 transition-all duration-200 outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Region Filter */}
                        <div className="relative">
                            <select
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20"
                                value={selectedRegion}
                                onChange={(e) => {
                                    setSelectedRegion(e.target.value);
                                    setSelectedDistrict('all');
                                }}
                            >
                                <option value="all">All Regions</option>
                                {regions.map((region) => (
                                    <option key={region.id} value={region.id}>
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* District Filter */}
                        <div className="relative">
                            <select
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                disabled={selectedRegion === 'all'}
                            >
                                <option value="all">All Districts</option>
                                {availableDistricts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Branch Type Filter */}
                        <div className="relative">
                            <select
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20"
                                value={branchTypeFilter}
                                onChange={(e) => setBranchTypeFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                {branchTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1).replace(/[-_]/g, ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {displayBranches.length} of {branches.length || 87} branches
                        {searchTerm && <span className="ml-2 font-medium text-[#4A7C59]">for "{searchTerm}"</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Branch List */}
                    <div className="space-y-6 lg:col-span-2">
                        {displayBranches.map((branch) => (
                            <div
                                key={branch.id}
                                className={`group cursor-pointer rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${selectedBranch === branch.id
                                    ? 'scale-[1.02] shadow-2xl ring-2 ring-[#4A7C59]/30'
                                    : 'hover:scale-[1.01] hover:shadow-xl'
                                    }`}
                                onClick={() => setSelectedBranch(selectedBranch === branch.id ? null : branch.id)}
                            >
                                {/* Branch Header */}
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-3 flex flex-wrap items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{getBranchTypeIcon(branch.type)}</span>
                                                <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#4A7C59]">
                                                    {branch.name}
                                                </h3>
                                            </div>
                                            {branch.code && (
                                                <span className="rounded-full bg-[#0d4a12] px-3 py-1 text-xs font-medium text-white">
                                                    Branch Code: {branch.code}
                                                </span>
                                            )}

                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getBranchTypeColor(branch.type)}`}>
                                                {branch.type.replace(/[-_]/g, ' ').toUpperCase()}
                                            </span>

                                        </div>

                                        {/* Status & ATM */}
                                        <div className="mb-3 flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                {branch.is_open ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-red-500" />
                                                )}
                                                <span className={`text-sm font-medium ${branch.is_open ? 'text-green-600' : 'text-red-600'}`}>
                                                    {branch.operating_status}
                                                </span>
                                            </div>
                                            {/* {branch.has_atm && (
                                                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                                                    💳 ATM Available
                                                </span>
                                            )} */}
                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-2">
                                            <div className="flex items-start text-gray-600">
                                                <MapPin className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
                                                <span className="text-sm">{branch.full_address || `${branch.address}, ${branch.city}`}</span>
                                            </div>

                                            {branch.phone && (
                                                <div className="flex items-center text-gray-600">
                                                    <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                                                    <a
                                                        href={`tel:${branch.phone}`}
                                                        className="text-sm transition-colors hover:text-[#4A7C59]"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {branch.phone}
                                                    </a>
                                                </div>
                                            )}

                                            {branch.email && (
                                                <div className="flex items-center text-gray-600">
                                                    <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                                                    <a
                                                        href={`mailto:${branch.email}`}
                                                        className="text-sm transition-colors hover:text-[#4A7C59]"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {branch.email}
                                                    </a>
                                                </div>
                                            )}

                                            <div className="flex items-center text-gray-600">
                                                <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                                                <span className="text-sm">
                                                    {branch.is_24_hours ? '24 Hours' : branch.today_hours || 'Mon-Thu: 9AM-5PM, Fri: 9AM-12:30PM'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-2">
                                        {branch.google_maps_url && (
                                            <a
                                                href={branch.google_maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-full bg-[#4A7C59] p-2 text-white transition-colors hover:bg-[#5D8A6A]"
                                                onClick={(e) => e.stopPropagation()}
                                                title="Get Directions"
                                            >
                                                <Navigation className="h-4 w-4" />
                                            </a>
                                        )}
                                        {branch.google_maps_url && (
                                            <a
                                                href={branch.google_maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                                                onClick={(e) => e.stopPropagation()}
                                                title="View on Map"
                                            >
                                                <Globe className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {selectedBranch === branch.id && (
                                    <div className="animate-fadeIn mt-4 space-y-4 border-t pt-4">
                                        {/* Services */}
                                        {branch.services.length > 0 && (
                                            <div>
                                                <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">🏦 Available Services</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {branch.services.map((service, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="rounded-full border border-[#4A7C59]/20 bg-[#4A7C59]/10 px-3 py-1 text-sm text-[#4A7C59]"
                                                        >
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Facilities */}
                                        {branch.facilities.length > 0 && (
                                            <div>
                                                <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">🏢 Facilities</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {branch.facilities.map((facility, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700"
                                                        >
                                                            {facility}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Additional Contact Info */}
                                        {branch.fax && (
                                            <div className="text-sm text-gray-600">
                                                <strong>Fax:</strong> {branch.fax}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {displayBranches.length === 0 && branches.length > 0 && (
                            <div className="py-12 text-center">
                                <div className="mb-4 text-6xl">🔍</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">No branches found</h3>
                                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">📊 Branch Network Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#4A7C59]/10 to-[#5D8A6A]/10 p-3">
                                    <span className="text-gray-700">Total Branches</span>
                                    <span className="text-2xl font-bold text-[#4A7C59]">{displayStats.totalBranches}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-3">
                                    <span className="text-gray-700">Open Now</span>
                                    <span className="text-xl font-bold text-green-600">{displayStats.openNow}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-3">
                                    <span className="text-gray-700">ATM Locations</span>
                                    <span className="text-xl font-bold text-blue-600">{displayStats.atmLocations}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 p-3">
                                    <span className="text-gray-700">Cities Covered</span>
                                    <span className="text-xl font-bold text-purple-600">{displayStats.citiesCovered}</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm">
                            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                    🗺️ Interactive Map
                                    <span className="text-sm font-normal text-gray-600">
                                        ({filteredBranches.filter((b) => b.latitude && b.longitude).length} locations)
                                    </span>
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">Click on any branch marker to view details</p>
                            </div>
                            <InteractiveMap
                                branches={filteredBranches}
                                selectedRegion={selectedRegion !== 'all' ? regions.find((r) => r.id.toString() === selectedRegion)?.name : undefined}
                                selectedDistrict={
                                    selectedDistrict !== 'all'
                                        ? availableDistricts.find((d) => d.id.toString() === selectedDistrict)?.name
                                        : undefined
                                }
                                selectedBranchType={branchTypeFilter !== 'all' ? branchTypeFilter : undefined}
                            />
                        </div>

                        {/* Help Card */}
                        <div className="rounded-2xl bg-gradient-to-br from-[#4A7C59] to-[#5D8A6A] p-6 text-white shadow-lg">
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">💬 Need Help?</h3>
                            <p className="mb-4 text-white/90">
                                Can't find what you're looking for? Our customer support team is here to help you 24/7.
                            </p>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="/contact-us"
                                    className="inline-block rounded-xl bg-white/20 px-4 py-2 text-center font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                                >
                                    Contact Support
                                </a>
                                <a
                                    href="tel:+92-5822-924244"
                                    className="inline-block rounded-xl bg-white px-4 py-2 text-center font-semibold text-[#4A7C59] transition-all duration-200 hover:bg-gray-100"
                                >
                                    Call Now: +92-5822-924244
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BranchLocator;
