import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Building2, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';

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
        () => downloads.data.filter(download =>
            download.title.toLowerCase().includes(search.toLowerCase()) ||
            download.category.toLowerCase().includes(search.toLowerCase())
        ),
        [search, downloads.data]
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

    const formatFileSize = (size: string) => {
        return size;
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
                        Access important documents, forms, and resources from Bank of Azad Jammu & Kashmir. Download forms, reports, brochures, and other essential documents.
                    </p>
                </div>

                {/* Search */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search downloads..."
                        className="w-full md:w-1/3 border border-[#4A7C59] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] bg-green-50 text-gray-700"
                    />
                </div>

                {downloads.data.length === 0 ? (
                    <div className="py-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No Downloads Available</h3>
                        <p className="text-gray-600">Downloads will be updated here as they become available.</p>
                    </div>
                ) : (
                    <div className="shadow-lg rounded-lg border border-gray-200 overflow-x-auto">
                        <table className="min-w-full table-auto w-full bg-white divide-y divide-gray-200 text-sm sm:text-base">
                            <thead className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider">File Info</th>
                                    <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider">Downloads</th>
                                    <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {(filteredDownloads.length > 0 ? filteredDownloads : []).map((download) => {
                                    const type = getCategoryType(download.category);
                                    return (
                                        <tr key={download.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{download.title}</div>
                                                {download.description && (
                                                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">{download.description}</div>
                                                )}
                                                {download.is_featured && (
                                                    <span className="inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${type.color}`}>
                                                    {type.icon} {download.category.charAt(0).toUpperCase() + download.category.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <div className="font-medium">{download.file_size_formatted}</div>
                                                    <div className="text-gray-500">{download.file_type || 'Unknown'}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium">{download.download_count}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a
                                                    href={route('public-downloads.download', download.id)}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[#3d6b4a] hover:to-[#5a8a69] hover:shadow-lg"
                                                >
                                                    <Download className="h-4 w-4" />
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
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Showing {downloads.from} to {downloads.to} of {downloads.total} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.get(route('public-downloads'), { page: downloads.current_page - 1 })}
                                disabled={downloads.current_page === 1}
                                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>

                            <div className="flex gap-1">
                                {downloads.links
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
                                onClick={() => router.get(route('public-downloads'), { page: downloads.current_page + 1 })}
                                disabled={downloads.current_page === downloads.last_page}
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
