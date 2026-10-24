import WebsiteLayout from '@/layouts/WebsiteLayout';
import { router } from '@inertiajs/react';
import { Briefcase, CalendarDays, ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    closing_date: string | null;
    is_expired: boolean;
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
    const [search, setSearch] = useState('');

    const filteredCareers = useMemo(
        () =>
            careers.data.filter(
                (career) => career.title.toLowerCase().includes(search.toLowerCase()) || career.location.toLowerCase().includes(search.toLowerCase()),
            ),
        [search, careers.data],
    );

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No deadline';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Briefcase className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Career Opportunities</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-base text-gray-600 sm:text-xl">
                        Join our team and build your career with Bank of Azad Jammu & Kashmir. Explore exciting opportunities across various
                        departments and locations.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search careers..."
                        className="w-full rounded-lg border border-[#4A7C59] bg-green-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#4A7C59] focus:outline-none md:w-1/3"
                    />
                </div>

                {careers.data.length === 0 ? (
                    <div className="py-12 text-center">
                        <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No Career Opportunities Available</h3>
                        <p className="text-gray-600">Career opportunities will be updated here as they become available.</p>
                    </div>
                ) : (
                    <>
                        {/* Phones and tablets: one card per posting */}
                        <ul className="space-y-4 lg:hidden">
                            {filteredCareers.map((career) => (
                                <li
                                    key={career.id}
                                    className={`rounded-xl border border-gray-200 bg-white p-4 shadow ${career.is_expired ? 'opacity-75' : ''}`}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <h2 className="min-w-0 flex-1 text-base font-semibold break-words text-gray-900">{career.title}</h2>
                                        {career.is_expired ? (
                                            <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                                                Expired
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                Open
                                            </span>
                                        )}
                                    </div>
                                    {career.is_featured && (
                                        <span className="mt-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                            ⭐ Featured
                                        </span>
                                    )}
                                    {career.description && (
                                        <p className="mt-2 line-clamp-3 text-sm break-words text-gray-600">{career.description}</p>
                                    )}
                                    <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <dt className="text-xs text-gray-500 uppercase">Location</dt>
                                            <dd className="break-words text-gray-900">{career.location || '-'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs text-gray-500 uppercase">Expiry date</dt>
                                            <dd
                                                className={`inline-flex items-center gap-1.5 ${career.is_expired ? 'text-red-600' : 'text-gray-900'}`}
                                            >
                                                <CalendarDays className="h-4 w-4 shrink-0" />
                                                {formatDate(career.closing_date)}
                                            </dd>
                                        </div>
                                    </dl>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <a
                                            href={route('public-careers.detail', career.id)}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View
                                        </a>
                                        {career.document_url && (
                                            <a
                                                href={route('public-careers.download', career.id)}
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {filteredCareers.length === 0 && <li className="py-8 text-center text-gray-500">No careers match your search.</li>}
                        </ul>

                        {/* Large screens: table whose cells wrap instead of widening the page */}
                        <div className="hidden overflow-x-auto rounded-lg border border-gray-200 shadow-lg lg:block">
                            <table className="w-full table-fixed divide-y divide-gray-200 bg-white text-sm">
                                <colgroup>
                                    <col className="w-[34%]" />
                                    <col className="w-[14%]" />
                                    <col className="w-[15%]" />
                                    <col className="w-[9%]" />
                                    <col className="w-[7%]" />
                                    <col className="w-[21%]" />
                                </colgroup>
                                <thead className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                    <tr>
                                        {['Position', 'Location', 'Expiry Date', 'Status', 'Views', 'Actions'].map((heading) => (
                                            <th key={heading} className="px-4 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredCareers.map((career) => (
                                        <tr
                                            key={career.id}
                                            className={career.is_expired ? 'bg-gray-50/80 opacity-75 hover:bg-gray-100' : 'hover:bg-gray-50'}
                                        >
                                            <td className="px-4 py-4 align-top">
                                                <div className="font-medium break-words text-gray-900">{career.title}</div>
                                                {career.description && (
                                                    <p className="mt-1 line-clamp-2 text-sm break-words text-gray-500">{career.description}</p>
                                                )}
                                                {career.is_featured && (
                                                    <span className="mt-1 inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 align-top break-words text-gray-900">{career.location}</td>
                                            <td className="px-4 py-4 align-top">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 ${career.is_expired ? 'text-red-600' : 'text-gray-900'}`}
                                                >
                                                    <CalendarDays className="h-4 w-4 shrink-0" />
                                                    {formatDate(career.closing_date)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 align-top">
                                                {career.is_expired ? (
                                                    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                                                        Expired
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Open
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 align-top font-medium text-gray-900">{career.views_count}</td>
                                            <td className="px-4 py-4 align-top">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <a
                                                        href={route('public-careers.detail', career.id)}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </a>
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
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCareers.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-gray-500">
                                                No careers match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* Pagination */}
                {careers.last_page > 1 && (
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="text-sm text-gray-600">
                            Showing {careers.from} to {careers.to} of {careers.total} results
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                                onClick={() => router.get(route('public-careers'), { page: careers.current_page - 1 })}
                                disabled={careers.current_page === 1}
                                className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {careers.links
                                    .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`rounded-md border px-3 py-2 text-sm ${
                                                link.active
                                                    ? 'border-[#4A7C59] bg-[#4A7C59] text-white'
                                                    : 'border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                            </div>

                            <button
                                onClick={() => router.get(route('public-careers'), { page: careers.current_page + 1 })}
                                disabled={careers.current_page === careers.last_page}
                                className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Information Section */}
                <div className="mt-12 rounded-xl border border-gray-100 bg-white p-5 shadow-lg sm:p-8">
                    <h3 className="mb-4 text-xl font-semibold text-[#4A7C59]">About Career Opportunities</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Application Process</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Review position requirements carefully</li>
                                <li>• Download application forms if available</li>
                                <li>• Submit applications before deadline</li>
                                <li>• Follow up through proper channels</li>
                                <li>• Featured positions are high priority openings</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Employment Information</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Equal opportunity employer</li>
                                <li>• Competitive salary and benefits</li>
                                <li>• Professional development opportunities</li>
                                <li>• Various locations across AJK</li>
                                <li>• Contact HR for position inquiries</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PublicCareersIndex.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Career Opportunities" breadcrumbs={[{ label: 'Careers', href: '/join-the-bank' }]}>
        {page}
    </WebsiteLayout>
);
