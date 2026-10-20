import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';
import { Building2, Crown, Landmark, MapPin, Network, Printer } from 'lucide-react';
import React from 'react';

interface Division {
    id: number;
    name: string;
    short_name: string;
    is_active: boolean;
}

interface Region {
    id: number;
    name: string;
    status: string;
    division_id: number;
}

interface RegionBranchCounts {
    [key: string]: number;
}

interface OrganogramPageProps {
    divisions: Division[];
    regions: Region[];
    regionBranchCounts: RegionBranchCounts;
}

const PRINT_STYLES = `
@page { size: A4 landscape; margin: 10mm; }
@media print {
    .public-site > .fixed,
    .public-site > footer { display: none !important; }
    .public-site > div { padding-top: 0 !important; }
    body, .public-site { background: #fff !important; }
    .organogram-page { min-height: 0 !important; background: #fff !important; zoom: 0.86; }
    .organogram-sheet { box-shadow: none !important; border: 1px solid #d1d5db !important; break-inside: avoid; }
    .organogram-sheet, .organogram-sheet * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

const TrunkLine = () => <div className="mx-auto h-7 w-0.5 bg-gray-400 print:h-4" aria-hidden="true" />;

export default function Organogram() {
    const { props } = usePage();
    const { divisions = [], regions = [], regionBranchCounts = {} } = props as unknown as OrganogramPageProps;

    const activeDivisions = divisions.filter((division) => division.is_active);
    const crbdDivision = activeDivisions.find((division) => division.short_name === 'CRBD');
    const otherDivisions = activeDivisions.filter((division) => division.short_name !== 'CRBD').sort((a, b) => a.name.localeCompare(b.name));

    const branchCountFor = (region: Region) => Number(regionBranchCounts[region.name] ?? 0);
    const totalBranches = regions.reduce((total, region) => total + branchCountFor(region), 0);
    const maxBranches = Math.max(1, ...regions.map(branchCountFor));
    const hasRegions = regions.length > 0;
    const hasNoData = activeDivisions.length === 0 && !hasRegions;

    const regionalNetwork = hasRegions && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-white/80 p-3 sm:p-4 print:mt-2 print:p-2">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-800 uppercase">
                <Network className="h-4 w-4" aria-hidden="true" />
                Regional Network
            </h4>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4 print:gap-2">
                {regions.map((region) => {
                    const count = branchCountFor(region);

                    return (
                        <li key={region.id} className="rounded-lg border border-amber-200 bg-amber-50 p-3 print:p-2">
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                                <MapPin className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                                {region.name}
                            </p>
                            <p className="mt-1 flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-amber-700 tabular-nums">{count}</span>
                                <span className="text-xs text-gray-600">{count === 1 ? 'branch' : 'branches'}</span>
                            </p>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-amber-200" role="presentation">
                                <div className="h-full rounded-full bg-amber-500" style={{ width: `${(count / maxBranches) * 100}%` }} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <div className="organogram-page min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <style>{PRINT_STYLES}</style>

            <div className="mx-auto max-w-6xl px-4 py-8 print:max-w-none print:p-0">
                <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left print:mb-3">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl print:text-2xl">Organization Structure</h1>
                        <p className="mt-2 max-w-2xl text-gray-600 print:mt-1 print:text-sm">
                            The organizational hierarchy of the Bank of Azad Jammu &amp; Kashmir.
                        </p>
                        <div className="mt-3 h-1 w-24 bg-gradient-to-r from-[#4A7C59] to-[#F9B912] max-sm:mx-auto" aria-hidden="true" />
                    </div>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#4A7C59] px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-[#3d6b4a] focus-visible:ring-2 focus-visible:ring-[#4A7C59] focus-visible:ring-offset-2 focus-visible:outline-none print:hidden"
                    >
                        <Printer className="h-4 w-4" aria-hidden="true" />
                        Print / Save as PDF
                    </button>
                </div>

                <div className="organogram-sheet rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-8 print:p-4">
                    {hasNoData && (
                        <p className="mb-6 rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800">
                            Divisional and regional data is not available yet. Only the top of the hierarchy is shown.
                        </p>
                    )}

                    <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] px-5 py-3 text-white shadow-md">
                        <Crown className="h-6 w-6 shrink-0 text-[#F9B912]" aria-hidden="true" />
                        <div>
                            <h2 className="text-base leading-tight font-bold">President &amp; CEO</h2>
                            <p className="text-xs opacity-90">Chief Executive Officer</p>
                        </div>
                    </div>

                    {(crbdDivision || otherDivisions.length > 0 || hasRegions) && (
                        <>
                            <TrunkLine />

                            <section
                                aria-label="Divisions"
                                className="relative rounded-xl border-2 border-dashed border-gray-300 p-4 pt-7 sm:p-6 sm:pt-8 print:p-3 print:pt-6"
                            >
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#4A7C59] px-4 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                                    Divisions
                                </span>

                                {(crbdDivision || hasRegions) && (
                                    <div className="mb-4 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-amber-50 p-4 print:mb-3 print:p-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="rounded-lg bg-red-600 p-2 text-white">
                                                <Landmark className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base font-bold text-gray-900">{crbdDivision?.name ?? 'Regional Operations'}</h3>
                                                <p className="text-xs text-gray-600">
                                                    {regions.length} regions · {totalBranches} branches
                                                </p>
                                            </div>
                                            {crbdDivision && (
                                                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                                                    {crbdDivision.short_name}
                                                </span>
                                            )}
                                        </div>
                                        {regionalNetwork}
                                    </div>
                                )}

                                {otherDivisions.length > 0 && (
                                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-4 print:gap-2">
                                        {otherDivisions.map((division) => (
                                            <li
                                                key={division.id}
                                                className="flex items-center gap-3 rounded-lg border border-l-4 border-gray-200 border-l-[#4A7C59] bg-gray-50 p-3 print:p-2"
                                            >
                                                <Building2 className="h-5 w-5 shrink-0 text-[#4A7C59]" aria-hidden="true" />
                                                <span className="min-w-0 flex-1 text-sm leading-snug font-medium text-gray-900">{division.name}</span>
                                                <span className="rounded-full bg-[#4A7C59] px-2 py-0.5 text-[11px] font-bold text-white">
                                                    {division.short_name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        </>
                    )}

                    <dl className="mt-6 grid grid-cols-3 gap-3 text-center print:mt-3">
                        <div className="rounded-lg bg-blue-50 p-3 print:p-2">
                            <dd className="text-2xl font-bold text-blue-700">{activeDivisions.length}</dd>
                            <dt className="text-xs text-gray-600">Active Divisions</dt>
                        </div>
                        <div className="rounded-lg bg-amber-50 p-3 print:p-2">
                            <dd className="text-2xl font-bold text-amber-700">{regions.length}</dd>
                            <dt className="text-xs text-gray-600">Regions</dt>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-3 print:p-2">
                            <dd className="text-2xl font-bold text-emerald-700">{totalBranches}</dd>
                            <dt className="text-xs text-gray-600">Total Branches</dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

Organogram.layout = (page: React.ReactNode) => <WebsiteLayout title="About Us - Organization Structure">{page}</WebsiteLayout>;
