import WebsiteLayout from '@/layouts/WebsiteLayout';
import { router } from '@inertiajs/react';
import { Building2, ChevronLeft, ChevronRight, Download, ExternalLink, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';

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
        () => scheduleOfCharges.data.filter((charge) => charge.title.toLowerCase().includes(search.toLowerCase())),
        [search, scheduleOfCharges.data],
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
                        Comprehensive schedule of charges for all banking services. Stay informed about our transparent fee structure across different
                        service categories.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="max-w-md flex-1">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search schedule of charges..."
                                className="w-full rounded-lg border border-[#4A7C59] bg-green-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#4A7C59] focus:outline-none"
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
                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                        {/* Mobile Cards View */}
                        <div className="block lg:hidden">
                            {(filteredCharges.length > 0 ? filteredCharges : []).map((charge) => {
                                const type = getCategoryType(charge.title);
                                return (
                                    <div key={charge.id} className="border-b border-gray-200 bg-white p-4">
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">{charge.title}</h3>
                                                {charge.description && <p className="mt-1 text-sm text-gray-500">{charge.description}</p>}
                                            </div>

                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <div className="rounded bg-gray-50 px-2 py-1">
                                                    <span className="text-gray-600">Period: </span>
                                                    <span className="font-medium">
                                                        {charge.from} - {charge.to || 'Ongoing'}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}
                                                >
                                                    {type.icon} {charge.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-2 sm:flex-row">
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
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#4A7C59] px-3 py-2 text-sm font-medium text-[#4A7C59] transition-all duration-200 hover:bg-[#4A7C59] hover:text-white"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        View Online
                                                    </a>
                                                )}
                                                {!charge.download_url && !charge.attachment_url && (
                                                    <span className="py-2 text-sm text-gray-500">No document available</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto lg:block">
                            <table className="w-full min-w-full table-fixed divide-y divide-gray-200 bg-white">
                                <colgroup>
                                    <col className="w-[30%]" />
                                    <col className="w-[20%]" />
                                    <col className="w-[20%]" />
                                    <col className="w-[30%]" />
                                </colgroup>
                                <thead className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium tracking-wider text-white uppercase">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium tracking-wider text-white uppercase">
                                            Effective Period
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium tracking-wider text-white uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium tracking-wider text-white uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {(filteredCharges.length > 0 ? filteredCharges : []).map((charge) => {
                                        const type = getCategoryType(charge.title);
                                        return (
                                            <tr key={charge.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{charge.title}</div>
                                                    {charge.description && <div className="mt-1 text-sm text-gray-500">{charge.description}</div>}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {charge.from} - {charge.to || 'Ongoing'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}
                                                    >
                                                        {type.icon} {charge.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
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
                                                                className="inline-flex items-center gap-2 rounded-lg border border-[#4A7C59] px-4 py-2 text-sm font-medium text-[#4A7C59] transition-all duration-200 hover:bg-[#4A7C59] hover:text-white"
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
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="text-sm text-gray-600">
                            Showing {scheduleOfCharges.from} to {scheduleOfCharges.to} of {scheduleOfCharges.total} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.get(route('rates.schedule-of-charges'), { page: scheduleOfCharges.current_page - 1 })}
                                disabled={scheduleOfCharges.current_page === 1}
                                className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {scheduleOfCharges.links
                                    .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`rounded-md border px-3 py-2 text-sm ${link.active
                                                ? 'border-[#4A7C59] bg-[#4A7C59] text-white'
                                                : 'border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                            </div>

                            <button
                                onClick={() => router.get(route('rates.schedule-of-charges'), { page: scheduleOfCharges.current_page + 1 })}
                                disabled={scheduleOfCharges.current_page === scheduleOfCharges.last_page}
                                className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
