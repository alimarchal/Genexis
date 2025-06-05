import React, { useState, useMemo } from 'react';
import { MapPin, Info, X } from 'lucide-react';

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
    operating_hours: any;
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

const InteractiveMap: React.FC<InteractiveMapProps> = ({
    branches,
    selectedRegion,
    selectedDistrict,
    selectedBranchType
}) => {
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [mapCenter, setMapCenter] = useState({ lat: 33.5, lng: 73.8 }); // Center of AJK
    const [zoomLevel, setZoomLevel] = useState(1);

    // Filter branches based on selections
    const filteredBranches = useMemo(() => {
        return branches.filter(branch => {
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
        const minLat = 32.5, maxLat = 35.0;
        const minLng = 73.0, maxLng = 75.0;

        const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth * zoomLevel + (mapWidth * (1 - zoomLevel) / 2);
        const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight * zoomLevel + (mapHeight * (1 - zoomLevel) / 2);

        return { x, y };
    };

    const handleBranchClick = (branch: Branch) => {
        setSelectedBranch(branch);
        if (branch.latitude && branch.longitude) {
            const position = getPosition(branch.latitude, branch.longitude);
            setMapCenter({ lat: branch.latitude, lng: branch.longitude });
        }
    };

    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

    return (
        <div className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 overflow-hidden">
            {/* Map Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                            Interactive Branch Map
                        </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={zoomOut}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Zoom Out"
                        >
                            <span className="text-sm font-bold">-</span>
                        </button>
                        <span className="text-xs text-gray-500 px-2">
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                            onClick={zoomIn}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Zoom In"
                        >
                            <span className="text-sm font-bold">+</span>
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                    Showing {filteredBranches.length} branches across Azad Jammu & Kashmir
                </p>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-96 overflow-hidden">
                {/* Background Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-gray-100">
                    {/* Simplified AJK outline */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-20"
                        viewBox="0 0 800 600"
                        style={{ transform: `scale(${zoomLevel})` }}
                    >
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
                            <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 6.67}%` }} />
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
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                style={{
                                    left: `${position.x}px`,
                                    top: `${position.y}px`,
                                }}
                                onClick={() => handleBranchClick(branch)}
                            >
                                {/* Marker */}
                                <div className={`
                                    relative flex items-center justify-center rounded-full shadow-lg transition-all duration-200
                                    ${isMainBranch
                                        ? 'w-4 h-4 bg-blue-600 border-2 border-white group-hover:w-5 group-hover:h-5'
                                        : 'w-3 h-3 bg-green-600 border border-white group-hover:w-4 group-hover:h-4'
                                    }
                                    ${selectedBranch?.id === branch.id ? 'ring-2 ring-yellow-400' : ''}
                                `}>
                                    {isMainBranch && (
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    )}
                                </div>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                    <div className="bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                                        <div className="font-medium">{branch.name}</div>
                                        <div className="text-gray-300">{branch.city}</div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>

                                {/* Pulse animation for open branches */}
                                {branch.is_open && (
                                    <div className={`
                                        absolute inset-0 rounded-full animate-ping
                                        ${isMainBranch ? 'bg-blue-400' : 'bg-green-400'}
                                    `}></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
                            <span className="text-sm text-gray-600">Main Branch</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full border border-white shadow"></div>
                            <span className="text-sm text-gray-600">Sub Branch</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            <span className="text-sm text-gray-600">Currently Open</span>
                        </div>
                    </div>

                    {selectedBranch && (
                        <div className="text-sm text-blue-600 font-medium">
                            Click on any branch for details
                        </div>
                    )}
                </div>
            </div>

            {/* Selected Branch Details Modal */}
            {selectedBranch && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-96 overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {selectedBranch.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Code: {selectedBranch.code}
                                    </p>
                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${selectedBranch.is_open
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {selectedBranch.is_open ? 'Open' : 'Closed'}
                                        {selectedBranch.today_hours && (
                                            <span className="ml-1">• {selectedBranch.today_hours}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedBranch(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                                    <p className="text-sm text-gray-600">{selectedBranch.address}</p>
                                    <p className="text-sm text-gray-500">
                                        {selectedBranch.city}, {selectedBranch.region}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                                    <div className="space-y-1">
                                        {selectedBranch.phone && (
                                            <div className="text-sm text-gray-600">
                                                📞 {selectedBranch.phone}
                                            </div>
                                        )}
                                        {selectedBranch.email && (
                                            <div className="text-sm text-gray-600">
                                                ✉️ {selectedBranch.email}
                                            </div>
                                        )}
                                        {selectedBranch.fax && (
                                            <div className="text-sm text-gray-600">
                                                📠 {selectedBranch.fax}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedBranch.services.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Available Services</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedBranch.services.slice(0, 6).map((service, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                            {selectedBranch.services.length > 6 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                    +{selectedBranch.services.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {selectedBranch.facilities.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Facilities</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedBranch.facilities.map((facility, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
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
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
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
