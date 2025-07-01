import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

interface Division {
    id: number;
    name: string;
    short_name: string;
    is_active: boolean;
    regions?: Region[];
}

interface Region {
    id: number;
    name: string;
    status: string;
    division_id: number;
    branches?: Branch[];
}

interface Branch {
    id: number;
    name: string;
    region_id: number;
}

interface RegionBranchCounts {
    [key: string]: number;
}

// Custom styled component for organizational nodes
const StyledNode = ({ 
    title, 
    subtitle, 
    type = 'default',
    className = '',
    tooltip
}: { 
    title: string; 
    subtitle?: string; 
    type?: 'president' | 'assistant' | 'division' | 'crbd' | 'region' | 'branch' | 'default';
    className?: string;
    tooltip?: string;
}) => {
    const getNodeStyle = () => {
        switch (type) {
            case 'president':
                return 'bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white shadow-lg max-w-xs mx-auto';
            case 'assistant':
                return 'bg-gradient-to-r from-[#059669] to-[#047857] text-white shadow-md max-w-xs mx-auto';
            case 'crbd':
                return 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white shadow-md max-w-xs mx-auto';
            case 'division':
                return 'bg-gradient-to-r from-[#6b7280] to-[#4b5563] text-white shadow-md max-w-xs mx-auto';
            case 'region':
                return 'bg-gradient-to-r from-[#065F46] to-[#047857] text-white shadow-md w-48 mx-auto';
            case 'branch':
                return 'bg-gradient-to-r from-[#047857] to-[#059669] text-white shadow-sm w-40 mx-auto';
            default:
                return 'bg-white border-2 border-gray-300 text-gray-800 shadow-sm max-w-xs mx-auto';
        }
    };

    return (
        <div 
            className={`relative group rounded-lg p-3 text-center transition-transform hover:scale-105 ${getNodeStyle()} ${className}`}
            title={tooltip}
        >
            <h4 className="text-sm font-semibold">{title}</h4>
            {subtitle && <p className="text-xs opacity-90">{subtitle}</p>}
            
            {/* Beautiful Tooltip */}
            {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
                    {tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
};

export default function Organogram() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { divisions, regions, regionBranchCounts }: { 
        divisions: Division[], 
        regions: Region[], 
        regionBranchCounts: RegionBranchCounts 
    } = usePage<any>().props;

    // Find CRBD division for regions
    const crbd = divisions.find((div: Division) => div.short_name === 'CRBD');
    
    // Separate divisions into assistant (special) and regular divisions
    const regularDivisions = divisions.filter((div: Division) => div.is_active);
    
    // Separate CRBD from other divisions to position it in center
    const crbd_division = regularDivisions.find((div: Division) => div.short_name === 'CRBD');
    const otherDivisions = regularDivisions.filter((div: Division) => div.short_name !== 'CRBD');
    
    // Split other divisions into left and right groups
    const leftDivisions = otherDivisions.slice(0, Math.ceil(otherDivisions.length / 2));
    const rightDivisions = otherDivisions.slice(Math.ceil(otherDivisions.length / 2));

    return (
        <div className="mx-auto min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] px-2 py-8">
            {/* Page Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Organization Structure</h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-600">
                    Explore the organizational hierarchy and structure of the Bank of Azad Jammu & Kashmir.
                </p>
            </div>

            {/* Organogram Content */}
            <div className="mx-auto max-w-none w-full px-4">
                <div className="mb-8 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-[#4A7C59]">Organogram</h2>
                    <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#4A7C59] to-[#F9B912]"></div>
                </div>

                {/* Organogram Container */}
                <div className="rounded-lg bg-white p-12 shadow-lg overflow-x-auto min-w-full">
                    <div className="min-w-max mx-auto">
                        <Tree
                        lineWidth={'2px'}
                        lineColor={'#374151'}
                        lineBorderRadius={'10px'}
                        label={
                            <StyledNode 
                                title="President & CEO"
                                subtitle="Chief Executive Officer"
                                type="president"
                            />
                        }
                    >
                        {/* Left Divisions */}
                        {leftDivisions.map((division: Division) => (
                            <TreeNode
                                key={division.id}
                                label={
                                    <StyledNode 
                                        title={division.short_name}
                                        type="division"
                                        tooltip={division.name}
                                    />
                                }
                            />
                        ))}

                        {/* CRBD in Center with Regions */}
                        {crbd_division && (
                            <TreeNode
                                key={crbd_division.id}
                                label={
                                    <StyledNode 
                                        title={crbd_division.short_name}
                                        type="crbd"
                                        tooltip={crbd_division.name}
                                    />
                                }
                            >
                                {/* Show regions under CRBD */}
                                {regions.map((region: Region) => (
                                    <TreeNode
                                        key={region.id}
                                        label={
                                            <StyledNode 
                                                title={region.name}
                                                subtitle="Region"
                                                type="region"
                                                tooltip={`Region ${region.name}`}
                                            />
                                        }
                                    >
                                        {/* Branch count for each region */}
                                        <TreeNode
                                            label={
                                                <StyledNode 
                                                    title="Branches"
                                                    subtitle={`(${regionBranchCounts[region.name] || 0})`}
                                                    type="branch"
                                                    tooltip={`Total Branches in ${region.name}: ${regionBranchCounts[region.name] || 0}`}
                                                />
                                            }
                                        />
                                    </TreeNode>
                                ))}
                            </TreeNode>
                        )}

                        {/* Right Divisions */}
                        {rightDivisions.map((division: Division) => (
                            <TreeNode
                                key={division.id}
                                label={
                                    <StyledNode 
                                        title={division.short_name}
                                        type="division"
                                        tooltip={division.name}
                                    />
                                }
                            />
                        ))}
                    </Tree>
                    </div>
                </div>

                {/* Organization Statistics */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-4 text-center text-white shadow-md">
                        <h4 className="text-lg font-bold">{regularDivisions.length}</h4>
                        <p className="text-sm opacity-90">Active Divisions</p>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] p-4 text-center text-white shadow-md">
                        <h4 className="text-lg font-bold">{regions.length}</h4>
                        <p className="text-sm opacity-90">Regional Operations</p>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-[#06b6d4] to-[#0891b2] p-4 text-center text-white shadow-md">
                        <h4 className="text-lg font-bold">{Object.values(regionBranchCounts || {}).reduce((a: number, b: any) => a + Number(b), 0)}</h4>
                        <p className="text-sm opacity-90">Total Branches</p>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Divisional Structure */}
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-xl font-bold text-[#4A7C59]">Divisional Structure</h3>
                        <div className="space-y-3">
                            {regularDivisions
                                .sort((a, b) => a.short_name.localeCompare(b.short_name))
                                .map((division: Division) => (
                                <div key={division.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-sm font-medium text-gray-900">{division.name}</span>
                                    <span className="rounded-full bg-[#4A7C59] px-2 py-1 text-xs font-medium text-white">
                                        {division.short_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regional Operations */}
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-xl font-bold text-[#4A7C59]">Regional</h3>
                        <div className="space-y-3">
                            {regions.map((region: Region) => (
                                <div key={region.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-sm font-medium text-gray-900">{region.name}</span>
                                    <span className="rounded-full bg-[#F9B912] px-2 py-1 text-xs font-medium text-white">
                                        {regionBranchCounts[region.name] || 0} Branches
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Organogram.layout = (page: React.ReactNode) => <WebsiteLayout title="About Us - Organization Structure">{page}</WebsiteLayout>;