import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Info } from 'lucide-react';
import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table';

interface ScheduleOfCharge {
    id: number;
    title: string;
    from: string;
    to: string | null;
    attachment_url: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    status: string; // Added from model accessor
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    scheduleOfCharges: {
        data: ScheduleOfCharge[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: Record<string, string>;
}

const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function PublicScheduleOfChargesIndex({ scheduleOfCharges }: Props) {
    return (
        <>
            <Head title="Schedule of Charges" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-900 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Schedule of Charges</h1>
                            <p className="mx-auto max-w-2xl text-xl text-sky-100">
                                Find detailed information about our service charges and fees.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Schedule of Charges Table */}
                <div className="mx-auto max-w-7xl px-6 py-12">
                    {scheduleOfCharges.data.length > 0 ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-600">
                                    Showing {scheduleOfCharges.from || 0} to {scheduleOfCharges.to || 0} of {scheduleOfCharges.total} entries.
                                </p>
                            </div>

                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Title</Th>
                                        <Th>Effective From</Th>
                                        <Th>Effective To</Th>
                                        <Th>Status</Th>
                                        <Th>Attachment</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {scheduleOfCharges.data.map((charge) => (
                                        <Tr key={charge.id}>
                                            <Td>{charge.title}</Td>
                                            <Td>{formatDate(charge.from)}</Td>
                                            <Td>{formatDate(charge.to)}</Td>
                                            <Td>
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${charge.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {charge.status}
                                                </span>
                                            </Td>
                                            <Td>
                                                {charge.attachment_url ? (
                                                    <a
                                                        href={charge.attachment_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-sky-700 hover:to-cyan-700 hover:shadow-lg"
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                        View
                                                    </a>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            {/* Pagination */}
                            {scheduleOfCharges.links && scheduleOfCharges.links.length > 3 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {scheduleOfCharges.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${link.active
                                                            ? 'bg-sky-600 text-white'
                                                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="cursor-not-allowed rounded-lg px-4 py-2 text-sm font-medium text-gray-400"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-16 text-center">
                            <div className="mx-auto max-w-sm">
                                <Info className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No Schedule of Charges Available</h3>
                                <p className="text-gray-600">There are currently no schedule of charges to display. Please check back later.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

PublicScheduleOfChargesIndex.layout = (page: React.ReactNode) => <WebsiteLayout title="Schedule of Charges">{page}</WebsiteLayout>;
