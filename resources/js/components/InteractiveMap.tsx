import { MapPin, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';

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

interface InteractiveMapProps {
    branches: Branch[];
    selectedRegion?: string;
    selectedDistrict?: string;
    selectedBranchType?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ branches, selectedRegion, selectedDistrict, selectedBranchType }) => {
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    // Filter branches based on selections
    const filteredBranches = useMemo(() => {
        return branches.filter((branch) => {
            if (selectedRegion && branch.region !== selectedRegion) return false;
            if (selectedDistrict && branch.city !== selectedDistrict) return false;
            if (selectedBranchType && branch.type !== selectedBranchType) return false;
            return true;
        });
    }, [branches, selectedRegion, selectedDistrict, selectedBranchType]);

    // Calculate position on the map (simplified projection)
    const getPosition = (lat: number, lng: number) => {
        const mapWidth = 800;
        const mapHeight = 600;

        // Simple linear projection for AJK region
        const minLat = 32.5,
            maxLat = 35.0;
        const minLng = 73.0,
            maxLng = 75.0;

        const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth * zoomLevel + (mapWidth * (1 - zoomLevel)) / 2;
        const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight * zoomLevel + (mapHeight * (1 - zoomLevel)) / 2;

        return { x, y };
    };

    const handleBranchClick = (branch: Branch) => {
        setSelectedBranch(branch);
    };

    const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2));
    const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Map Header */}
            <div className="border-b border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Interactive Branch Map</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={zoomOut} className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200" title="Zoom Out">
                            <span className="text-sm font-bold">-</span>
                        </button>
                        <span className="px-2 text-xs text-gray-500">{Math.round(zoomLevel * 100)}%</span>
                        <button onClick={zoomIn} className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200" title="Zoom In">
                            <span className="text-sm font-bold">+</span>
                        </button>
                    </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">Showing {filteredBranches.length} branches across Azad Jammu & Kashmir</p>
            </div>

            {/* Map Container */}
            <div className="relative h-96 w-full overflow-hidden">
                {/* Background Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-gray-100">
                    {/* Simplified AJK outline */}
                    <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 600" style={{ transform: `scale(${zoomLevel})` }}>
                        <path
                            d="M 200 150 L 350 100 L 500 120 L 600 200 L 580 350 L 450 400 L 300 380 L 250 300 Z"
                            fill="url(#mapGradient)"
                            stroke="#2563eb"
                            strokeWidth="2"
                        />
                        <defs>
                            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(20)].map((_, i) => (
                            <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 5}%` }} />
                        ))}
                        {[...Array(15)].map((_, i) => (
                            <div key={`h-${i}`} className="absolute h-px w-full bg-gray-400" style={{ top: `${i * 6.67}%` }} />
                        ))}
                    </div>
                </div>

                {/* Branch Markers */}
                <div className="absolute inset-0" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
                    {filteredBranches.map((branch) => {
                        if (!branch.latitude || !branch.longitude) return null;

                        const position = getPosition(branch.latitude, branch.longitude);
                        const isMainBranch = branch.type === 'main_branch';

                        return (
                            <div
                                key={branch.id}
                                className="group absolute -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
                                style={{
                                    left: `${position.x}px`,
                                    top: `${position.y}px`,
                                }}
                                onClick={() => handleBranchClick(branch)}
                            >
                                {/* Marker */}
                                <div
                                    className={`relative flex items-center justify-center rounded-full shadow-lg transition-all duration-200 ${isMainBranch
                                            ? 'h-4 w-4 border-2 border-white bg-blue-600 group-hover:h-5 group-hover:w-5'
                                            : 'h-3 w-3 border border-white bg-green-600 group-hover:h-4 group-hover:w-4'
                                        } ${selectedBranch?.id === branch.id ? 'ring-2 ring-yellow-400' : ''} `}
                                >
                                    {isMainBranch && <div className="h-1.5 w-1.5 rounded-full bg-white"></div>}
                                </div>

                                {/* Tooltip */}
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <div className="rounded-lg bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white">
                                        <div className="font-medium">{branch.name}</div>
                                        <div className="text-gray-300">{branch.city}</div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>

                                {/* Pulse animation for open branches */}
                                {branch.is_open && (
                                    <div
                                        className={`absolute inset-0 animate-ping rounded-full ${isMainBranch ? 'bg-blue-400' : 'bg-green-400'} `}
                                    ></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow"></div>
                            <span className="text-sm text-gray-600">Main Branch</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full border border-white bg-green-600 shadow"></div>
                            <span className="text-sm text-gray-600">Sub Branch</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 animate-ping rounded-full bg-green-400"></div>
                            <span className="text-sm text-gray-600">Currently Open</span>
                        </div>
                    </div>

                    {selectedBranch && <div className="text-sm font-medium text-blue-600">Click on any branch for details</div>}
                </div>
            </div>

            {/* Selected Branch Details Modal */}
            {selectedBranch && (
                <div className="bg-opacity-50 absolute inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div className="max-h-96 w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl">
                        <div className="p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedBranch.name}</h3>
                                    <p className="text-sm text-gray-600">Code: {selectedBranch.code}</p>
                                    <div
                                        className={`mt-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${selectedBranch.is_open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {selectedBranch.is_open ? 'Open' : 'Closed'}
                                        {selectedBranch.today_hours && <span className="ml-1">• {selectedBranch.today_hours}</span>}
                                    </div>
                                </div>
                                <button onClick={() => setSelectedBranch(null)} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-1 font-medium text-gray-900">Location</h4>
                                    <p className="text-sm text-gray-600">{selectedBranch.address}</p>
                                    <p className="text-sm text-gray-500">
                                        {selectedBranch.city}, {selectedBranch.region}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="mb-2 font-medium text-gray-900">Contact Information</h4>
                                    <div className="space-y-1">
                                        {selectedBranch.phone && <div className="text-sm text-gray-600">📞 {selectedBranch.phone}</div>}
                                        {selectedBranch.email && <div className="text-sm text-gray-600">✉️ {selectedBranch.email}</div>}
                                        {selectedBranch.fax && <div className="text-sm text-gray-600">📠 {selectedBranch.fax}</div>}
                                    </div>
                                </div>

                                {selectedBranch.services.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-900">Available Services</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedBranch.services.slice(0, 6).map((service, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                            {selectedBranch.services.length > 6 && (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                                                    +{selectedBranch.services.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {selectedBranch.facilities.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-900">Facilities</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedBranch.facilities.map((facility, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
                                                >
                                                    {facility}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedBranch.google_maps_url && (
                                    <div>
                                        <a
                                            href={selectedBranch.google_maps_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                        >
                                            <MapPin className="mr-2 h-4 w-4" />
                                            View on Google Maps
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;
