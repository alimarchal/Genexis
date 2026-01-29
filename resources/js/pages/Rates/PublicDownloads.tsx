import WebsiteLayout from '@/layouts/WebsiteLayout';
import { router } from '@inertiajs/react';
import { Building2, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useMemo, useState } from 'react';

interface PublicDownload {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string | null;
    file_size_formatted: string;
    category: string;
    is_featured: boolean;
    download_count: number;
    created_at: string;
}

interface PaginatedPublicDownloads {
    data: PublicDownload[];
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

interface PublicDownloadsPublicProps {
    downloads: PaginatedPublicDownloads;
}

const PublicDownloadsPublic = ({ downloads }: PublicDownloadsPublicProps) => {
    const [search, setSearch] = useState('');
    const filteredDownloads = useMemo(
        () =>
            downloads.data.filter(
                (download) =>
                    download.title.toLowerCase().includes(search.toLowerCase()) || download.category.toLowerCase().includes(search.toLowerCase()),
            ),
        [search, downloads.data],
    );

    const getCategoryType = (category: string) => {
        if (category.toLowerCase().includes('form')) {
            return { color: 'bg-blue-100 text-blue-800', icon: '📋' };
        }
        if (category.toLowerCase().includes('report')) {
            return { color: 'bg-green-100 text-green-800', icon: '📊' };
        }
        if (category.toLowerCase().includes('brochure')) {
            return { color: 'bg-purple-100 text-purple-800', icon: '📄' };
        }
        if (category.toLowerCase().includes('policy')) {
            return { color: 'bg-red-100 text-red-800', icon: '📜' };
        }
        return { color: 'bg-gray-100 text-gray-800', icon: '📁' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Download className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Public Downloads</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Access important documents, forms, and resources from Bank of Azad Jammu & Kashmir. Download forms, reports, brochures, and
                        other essential documents.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search downloads..."
                        className="w-full rounded-lg border border-[#4A7C59] bg-green-50 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#4A7C59] focus:outline-none md:w-1/3"
                    />
                </div>

                {downloads.data.length === 0 ? (
                    <div className="py-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No Downloads Available</h3>
                        <p className="text-gray-600">Downloads will be updated here as they become available.</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
                        <table className="w-full min-w-[900px] table-fixed divide-y divide-gray-200 bg-white text-sm">
                            <colgroup>
                                <col className="w-[30%]" />
                                <col className="w-[15%]" />
                                <col className="w-[15%]" />
                                <col className="w-[10%]" />
                                <col className="w-[15%]" />
                                <col className="w-[15%]" />
                            </colgroup>
                            <thead className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        File Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Downloads
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase sm:text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {(filteredDownloads.length > 0 ? filteredDownloads : []).map((download) => {
                                    const type = getCategoryType(download.category);
                                    return (
                                        <tr key={download.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4">
                                                <div className="text-sm leading-relaxed font-medium break-words text-gray-900">{download.title}</div>
                                                <div>
                                                    {download.description && (
                                                        <div className="mt-1 text-xs leading-relaxed break-words text-gray-500">
                                                            {download.description}
                                                        </div>
                                                    )}
                                                    {download.is_featured && (
                                                        <span className="mt-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                            ⭐ Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}
                                                >
                                                    <span className="break-words">
                                                        {type.icon} {download.category.charAt(0).toUpperCase() + download.category.slice(1)}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-xs text-gray-900">
                                                    <div className="font-medium break-words">{download.file_size_formatted}</div>
                                                    <div className="break-words text-gray-500">{download.file_type || 'Unknown'}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-xs font-medium text-gray-900">{download.download_count}</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-xs break-words text-gray-900">
                                                    {new Date(download.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <a
                                                    href={route('public-downloads.download', download.id)}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg"
                                                >
                                                    <Download className="h-3 w-3" />
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {downloads.last_page > 1 && (
                    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="text-sm text-gray-600">
                            Showing {downloads.from} to {downloads.to} of {downloads.total} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.get(route('public-downloads'), { page: downloads.current_page - 1 })}
                                disabled={downloads.current_page === 1}
                                className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {downloads.links
                                    .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`rounded-md border px-3 py-2 text-sm ${
                                                link.active
                                                    ? 'border-[#4A7C59] bg-[#4A7C59] text-white'
                                                    : link.url
                                                      ? 'border-gray-300 bg-white hover:bg-gray-50'
                                                      : 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                            </div>

                            <button
                                onClick={() => router.get(route('public-downloads'), { page: downloads.current_page + 1 })}
                                disabled={downloads.current_page === downloads.last_page}
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
                    <h3 className="mb-4 text-xl font-semibold text-[#4A7C59]">About Public Downloads</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Available Categories</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Forms - Account opening and service request forms</li>
                                <li>• Reports - Financial statements and annual reports</li>
                                <li>• Brochures - Product information and service guides</li>
                                <li>• Policies - Terms, conditions and policy documents</li>
                                <li>• General - Other important documents and resources</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">Download Information</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• All documents are in PDF format unless specified</li>
                                <li>• Featured downloads are most commonly accessed</li>
                                <li>• Forms are updated regularly as per requirements</li>
                                <li>• Contact branch for assistance with any document</li>
                                <li>• Some forms may require branch submission</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PublicDownloadsPublic.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Public Downloads" breadcrumbs={[{ label: 'Resources', href: '/downloads' }]}>
        {page}
    </WebsiteLayout>
);

export default PublicDownloadsPublic;
