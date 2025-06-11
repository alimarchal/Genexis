import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Building2, FileText, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';

interface ScheduleOfCharge {
    id: number;
    title: string;
    from: string;
    to: string | null;
    attachment_url: string | null;
    download_url: string | null;
    description: string | null;
    is_active: boolean;
    status: string;
    file_size: string | null;
}

interface PaginatedScheduleOfCharges {
    data: ScheduleOfCharge[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface ScheduleOfChargesPublicProps {
    scheduleOfCharges: PaginatedScheduleOfCharges;
}

const ScheduleOfChargesPublic = ({ scheduleOfCharges }: ScheduleOfChargesPublicProps) => {
    const [search, setSearch] = useState('');
    const filteredCharges = useMemo(
        () => scheduleOfCharges.data.filter(charge => charge.title.toLowerCase().includes(search.toLowerCase())),
        [search, scheduleOfCharges.data]
    );

    const getCategoryType = (title: string) => {
        if (title.toLowerCase().includes('current') || title.toLowerCase().includes('saving')) {
            return { color: 'bg-blue-100 text-blue-800', icon: '💰' };
        }
        if (title.toLowerCase().includes('corporate') || title.toLowerCase().includes('business')) {
            return { color: 'bg-green-100 text-green-800', icon: '🏢' };
        }
        if (title.toLowerCase().includes('atm') || title.toLowerCase().includes('digital')) {
            return { color: 'bg-purple-100 text-purple-800', icon: '💳' };
        }
        return { color: 'bg-gray-100 text-gray-800', icon: '📋' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <FileText className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Schedule of Charges</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Comprehensive schedule of charges for all banking services. Stay informed about our transparent fee structure across different service categories.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search schedule of charges..."
                                className="w-full border border-[#4A7C59] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] bg-green-50 text-gray-700"
                            />
                        </div>
                        <div className="text-sm text-gray-600">
                            {filteredCharges.length} of {scheduleOfCharges.total} documents
                        </div>
                    </div>
                </div>

                {scheduleOfCharges.data.length === 0 ? (
                    <div className="py-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No Schedule of Charges Available</h3>
                        <p className="text-gray-600">Schedule of charges will be updated here as they become available.</p>
                    </div>
                ) : (
                    <div className="shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                        {/* Mobile Cards View */}
                        <div className="block lg:hidden">
                            {(filteredCharges.length > 0 ? filteredCharges : []).map((charge) => {
                                const type = getCategoryType(charge.title);
                                return (
                                    <div key={charge.id} className="border-b border-gray-200 p-4 bg-white">
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-sm">{charge.title}</h3>
                                                {charge.description && (
                                                    <p className="text-sm text-gray-500 mt-1">{charge.description}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <div className="bg-gray-50 px-2 py-1 rounded">
                                                    <span className="text-gray-600">Period: </span>
                                                    <span className="font-medium">{charge.from} - {charge.to || 'Ongoing'}</span>
                                                </div>
                                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}>
                                                    {type.icon} {charge.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2">
                                                {charge.download_url && (
                                                    <a
                                                        href={charge.download_url}
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        Download
                                                        {charge.file_size && <span className="text-xs opacity-75">({charge.file_size})</span>}
                                                    </a>
                                                )}
                                                {charge.attachment_url && (
                                                    <a
                                                        href={charge.attachment_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#4A7C59] text-[#4A7C59] px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-[#4A7C59] hover:text-white"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        View Online
                                                    </a>
                                                )}
                                                {!charge.download_url && !charge.attachment_url && (
                                                    <span className="text-sm text-gray-500 py-2">No document available</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full table-auto w-full bg-white divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Effective Period</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(filteredCharges.length > 0 ? filteredCharges : []).map((charge) => {
                                        const type = getCategoryType(charge.title);
                                        return (
                                            <tr key={charge.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{charge.title}</div>
                                                    {charge.description && (
                                                        <div className="text-sm text-gray-500 mt-1">{charge.description}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {charge.from} - {charge.to || 'Ongoing'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}>
                                                        {type.icon} {charge.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {charge.download_url && (
                                                            <a
                                                                href={charge.download_url}
                                                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg"
                                                            >
                                                                <Download className="h-4 w-4" />
                                                                Download
                                                                {charge.file_size && <span className="text-xs opacity-75">({charge.file_size})</span>}
                                                            </a>
                                                        )}
                                                        {charge.attachment_url && (
                                                            <a
                                                                href={charge.attachment_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 rounded-lg border border-[#4A7C59] text-[#4A7C59] px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-[#4A7C59] hover:text-white"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                                View Online
                                                            </a>
                                                        )}
                                                        {!charge.download_url && !charge.attachment_url && (
                                                            <span className="text-sm text-gray-500">No document</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {scheduleOfCharges.last_page > 1 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Showing {scheduleOfCharges.from} to {scheduleOfCharges.to} of {scheduleOfCharges.total} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.get(route('rates.schedule-of-charges'), { page: scheduleOfCharges.current_page - 1 })}
                                disabled={scheduleOfCharges.current_page === 1}
                                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {scheduleOfCharges.links
                                    .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm border rounded-md ${link.active
                                                    ? 'bg-[#4A7C59] text-white border-[#4A7C59]'
                                                    : 'border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                            </div>

                            <button
                                onClick={() => router.get(route('rates.schedule-of-charges'), { page: scheduleOfCharges.current_page + 1 })}
                                disabled={scheduleOfCharges.current_page === scheduleOfCharges.last_page}
                                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Information Section */}
                <div className="mt-12 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-[#4A7C59]">About Schedule of Charges</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Service Categories</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Current Account - Transaction and maintenance charges</li>
                                <li>• Savings Account - Service charges and fees</li>
                                <li>• Corporate Banking - Business service charges</li>
                                <li>• ATM & Digital Banking - Electronic service fees</li>
                                <li>• Trade Finance - Import/Export related charges</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Important Information</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• All charges are as per SBP guidelines</li>
                                <li>• Charges may vary based on account type</li>
                                <li>• Updated regularly as per regulatory requirements</li>
                                <li>• Subject to change with prior notice</li>
                                <li>• Contact branch for detailed clarification</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ScheduleOfChargesPublic.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Schedule of Charges" breadcrumbs={[{ label: 'Rates', href: '/rates' }]}>
        {page}
    </WebsiteLayout>
);

export default ScheduleOfChargesPublic;
