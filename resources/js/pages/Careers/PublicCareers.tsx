import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Calendar, Download, Eye, MapPin } from 'lucide-react';
import React from 'react';

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    closing_date: string | null;
    benefits: string | null;
    is_featured: boolean;
    views_count: number;
    document_url: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    careers: {
        data: Career[];
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

export default function PublicCareersIndex({ careers }: Props) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No deadline';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isExpired = (closingDate: string | null) => {
        if (!closingDate) return false;
        return new Date(closingDate) < new Date();
    };

    return (
        <>
            <Head title="Career Opportunities" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Career Opportunities</h1>
                            <p className="mx-auto max-w-2xl text-xl text-blue-100">
                                Join our team and build your career with Bank of Azad Jammu & Kashmir. Explore exciting opportunities across various departments and locations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Careers Table */}
                <div className="mx-auto max-w-7xl px-6 py-12">
                    {careers.data.length > 0 ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-600">
                                    Showing {careers.from || 0} to {careers.to || 0} of {careers.total} career opportunities
                                </p>
                            </div>

                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Position</Th>
                                        <Th>Location</Th>
                                        <Th>Deadline</Th>
                                        <Th>Views</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {careers.data.map((career) => (
                                        <Tr key={career.id}>
                                            <Td>
                                                <div className="flex items-start gap-3">
                                                    <Briefcase className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{career.title}</div>
                                                        {career.description && (
                                                            <div className="text-sm text-gray-500 mt-1">
                                                                {career.description.length > 100
                                                                    ? career.description.substring(0, 100) + '...'
                                                                    : career.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                    <span>{career.location}</span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <span className={isExpired(career.closing_date) ? 'text-red-600' : 'text-gray-900'}>
                                                        {formatDate(career.closing_date)}
                                                    </span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                    <span>{career.views_count}</span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('public-careers.show', career.id)}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View Details
                                                    </Link>
                                                    {career.document_url && (
                                                        <a
                                                            href={route('public-careers.download', career.id)}
                                                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            Download
                                                        </a>
                                                    )}
                                                </div>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            {/* Pagination */}
                            {careers.links && careers.links.length > 3 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {careers.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${link.active
                                                            ? 'bg-blue-600 text-white'
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
                                <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No Career Opportunities Available</h3>
                                <p className="text-gray-600">There are currently no open positions. Please check back later for new opportunities.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

PublicCareersIndex.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Career Opportunities" breadcrumbs={[{ label: 'Careers', href: '/careers' }]}>
        {page}
    </WebsiteLayout>
);