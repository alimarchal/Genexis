import { Building2, ExternalLink, MapPin, Navigation, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface BranchLocation {
    id: number;
    name: string;
    type: string;
    address: string;
    region: string;
    latitude: number;
    longitude: number;
    google_maps_url: string;
}

interface Props {
    branches: BranchLocation[];
    headOfficeAddress: string;
}

type Tab = 'head-office' | 'branches';

const HEAD_OFFICE_QUERY = 'Bank of Azad Jammu and Kashmir Head Office, Chattar Domel, Muzaffarabad';

const embedUrl = (query: string) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

const directionsUrl = (destination: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

const typeLabel = (type: string) => type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export default function BranchLocationsMap({ branches, headOfficeAddress }: Props) {
    const [tab, setTab] = useState<Tab>('head-office');
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('all');
    const [selectedId, setSelectedId] = useState<number | null>(branches[0]?.id ?? null);

    const regions = useMemo(() => Array.from(new Set(branches.map((branch) => branch.region).filter(Boolean))).sort(), [branches]);

    const filteredBranches = useMemo(() => {
        const term = search.trim().toLowerCase();

        return branches.filter(
            (branch) =>
                (region === 'all' || branch.region === region) &&
                (term === '' || branch.name.toLowerCase().includes(term) || branch.address.toLowerCase().includes(term)),
        );
    }, [branches, search, region]);

    const selectedBranch = branches.find((branch) => branch.id === selectedId) ?? filteredBranches[0] ?? null;

    const mapSrc =
        tab === 'head-office' || !selectedBranch ? embedUrl(HEAD_OFFICE_QUERY) : embedUrl(`${selectedBranch.latitude},${selectedBranch.longitude}`);

    const destination = tab === 'head-office' || !selectedBranch ? HEAD_OFFICE_QUERY : `${selectedBranch.latitude},${selectedBranch.longitude}`;

    const tabClass = (active: boolean) =>
        `inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            active ? 'bg-[#4A7C59] text-white shadow' : 'bg-white text-gray-700 hover:bg-green-50'
        }`;

    return (
        <section id="locations" className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 md:text-3xl">
                        <span className="rounded bg-[#4A7C59] p-2">
                            <MapPin className="h-6 w-6 text-white" />
                        </span>
                        Our Locations
                    </h2>
                    <p className="mt-2 text-gray-600">Find the head office or any of our {branches.length} branches on the map.</p>
                </div>
                <div className="inline-flex gap-2 rounded-full bg-gray-100 p-1" role="tablist" aria-label="Location type">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'head-office'}
                        className={tabClass(tab === 'head-office')}
                        onClick={() => setTab('head-office')}
                    >
                        <Building2 className="h-4 w-4" />
                        Head Office
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'branches'}
                        className={tabClass(tab === 'branches')}
                        onClick={() => setTab('branches')}
                    >
                        <MapPin className="h-4 w-4" />
                        Branches
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="overflow-hidden rounded-xl border border-gray-200 lg:col-span-2">
                    <iframe
                        key={mapSrc}
                        title={tab === 'head-office' ? 'Head Office location' : `${selectedBranch?.name ?? 'Branch'} location`}
                        src={mapSrc}
                        className="h-[420px] w-full lg:h-[520px]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {tab === 'head-office' || !selectedBranch ? (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                            <p className="text-xs font-semibold tracking-wide text-[#4A7C59] uppercase">Head Office</p>
                            <p className="mt-1 text-lg font-bold text-gray-800">Bank of Azad Jammu & Kashmir</p>
                            <p className="mt-2 text-sm text-gray-600">{headOfficeAddress}</p>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                            <p className="text-xs font-semibold tracking-wide text-[#4A7C59] uppercase">
                                {typeLabel(selectedBranch.type)} · {selectedBranch.region}
                            </p>
                            <p className="mt-1 text-lg font-bold text-gray-800">{selectedBranch.name}</p>
                            <p className="mt-2 text-sm text-gray-600">{selectedBranch.address}</p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <a
                            href={directionsUrl(destination)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4A7C59] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d6b4a]"
                        >
                            <Navigation className="h-4 w-4" />
                            Get Directions
                        </a>
                        {tab === 'branches' && selectedBranch && (
                            <a
                                href={selectedBranch.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#4A7C59] px-4 py-2.5 text-sm font-semibold text-[#4A7C59] transition-colors hover:bg-green-50"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Open in Maps
                            </a>
                        )}
                    </div>

                    {tab === 'branches' && (
                        <>
                            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search branch or address"
                                        aria-label="Search branches"
                                        className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-9 text-sm focus:ring-2 focus:ring-[#4A7C59] focus:outline-none"
                                    />
                                </div>
                                <select
                                    value={region}
                                    onChange={(event) => setRegion(event.target.value)}
                                    aria-label="Filter by region"
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#4A7C59] focus:outline-none"
                                >
                                    <option value="all">All regions</option>
                                    {regions.map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <ul className="max-h-[300px] space-y-2 overflow-y-auto pr-1" aria-label="Branch list">
                                {filteredBranches.length === 0 && (
                                    <li className="py-6 text-center text-sm text-gray-500">No branches match your search.</li>
                                )}
                                {filteredBranches.map((branch) => (
                                    <li key={branch.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedId(branch.id)}
                                            aria-current={selectedBranch?.id === branch.id}
                                            className={`w-full rounded-lg border p-3 text-left transition-colors ${
                                                selectedBranch?.id === branch.id
                                                    ? 'border-[#4A7C59] bg-green-50'
                                                    : 'border-gray-200 hover:border-[#4A7C59] hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="block text-sm font-semibold text-gray-800">{branch.name}</span>
                                            <span className="block truncate text-xs text-gray-500">{branch.address}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
