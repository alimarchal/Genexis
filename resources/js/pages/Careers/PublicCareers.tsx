import WebsiteLayout from '@/layouts/WebsiteLayout';
import { router } from '@inertiajs/react';
import { Briefcase, ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';
import { useMemo, useState } from 'react';

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

    const isExpired = (closingDate: string | null) => {
        if (!closingDate) return false;
        return new Date(closingDate) < new Date();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Briefcase className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Career Opportunities</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
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
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
                        <table className="w-full min-w-full table-auto divide-y divide-gray-200 bg-white text-sm sm:text-base">
                            <colgroup>
                                <col className="w-[25%]" />
                                <col className="w-[20%]" />
                                <col className="w-[15%]" />
                                <col className="w-[15%]" />
                                <col className="w-[25%]" />
                            </colgroup>
                            <thead className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Position
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Deadline
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">Views</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {(filteredCareers.length > 0 ? filteredCareers : []).map((career) => (
                                    <tr key={career.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{career.title}</div>
                                            <div>
                                                {career.description && (
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        {career.description.match(/.{1,75}(\s|$)/g)?.map((line, index) => (
                                                            <div key={index} className="break-words hyphens-auto">
                                                                {line.trim()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {career.is_featured && (
                                                    <span className="mt-1 inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{career.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm ${isExpired(career.closing_date) ? 'text-red-600' : 'text-gray-900'}`}>
                                                {formatDate(career.closing_date)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{career.views_count}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={route('public-careers.detail', career.id)}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </a>
                                                {career.document_url && (
                                                    <a
                                                        href={route('public-careers.download', career.id)}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        Download
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {careers.last_page > 1 && (
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="text-sm text-gray-600">
                            Showing {careers.from} to {careers.to} of {careers.total} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.get(route('public-careers.index'), { page: careers.current_page - 1 })}
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
                                onClick={() => router.get(route('public-careers.index'), { page: careers.current_page + 1 })}
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
                <div className="mt-12 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
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
    <WebsiteLayout title="Career Opportunities" breadcrumbs={[{ label: 'Careers', href: '/careers' }]}>
        {page}
    </WebsiteLayout>
);
