import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Download, Eye } from 'lucide-react';
import React from 'react';

interface Download {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_url: string | null;
    file_type: string | null;
    file_size: number | null;
    file_size_formatted: string;
    category: string;
    is_featured: boolean;
    download_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    downloads: {
        data: Download[];
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

export default function PublicDownloadsIndex({ downloads }: Props) {
    return (
        <>
            <Head title="Downloads" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
                        <div className="text-center">
                            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Downloads</h1>
                            <p className="mx-auto max-w-2xl text-base text-blue-100 sm:text-lg md:text-xl">
                                Access important documents, forms, and resources from Bank of Azad Jammu & Kashmir
                            </p>
                        </div>
                    </div>
                </div>

                {/* Downloads Table */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
                    {downloads.data.length > 0 ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-600">
                                    Showing {downloads.from || 0} to {downloads.to || 0} of {downloads.total} downloads
                                </p>
                            </div>

                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Title</Th>
                                        <Th className="hidden sm:table-cell">Category</Th>
                                        <Th className="hidden md:table-cell">File Type</Th>
                                        <Th className="hidden lg:table-cell">File Size</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {downloads.data.map((download) => (
                                        <Tr key={download.id}>
                                            <Td>
                                                <div className="min-w-[150px]">
                                                    <div className="font-medium text-gray-900">{download.title}</div>
                                                    <div className="mt-1 text-xs text-gray-500 sm:hidden">
                                                        {download.category}
                                                        {download.file_type && ` • ${download.file_type}`}
                                                        {download.file_size_formatted && ` • ${download.file_size_formatted}`}
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td className="hidden sm:table-cell">{download.category}</Td>
                                            <Td className="hidden md:table-cell">{download.file_type || 'N/A'}</Td>
                                            <Td className="hidden lg:table-cell">{download.file_size_formatted}</Td>
                                            <Td>
                                                <a
                                                    href={route('public-downloads.download', download.id)}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg sm:gap-2 sm:px-4 sm:text-sm"
                                                >
                                                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    <span className="hidden sm:inline">Download</span>
                                                </a>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            {/* Pagination */}
                            {downloads.links && downloads.links.length > 3 && (
                                <div className="mt-8 flex justify-center sm:mt-12">
                                    <nav className="flex flex-wrap items-center justify-center gap-2">
                                        {downloads.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="cursor-not-allowed rounded-lg px-3 py-2 text-xs font-medium text-gray-400 sm:px-4 sm:text-sm"
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
                                <Eye className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No Downloads Available</h3>
                                <p className="text-gray-600">There are currently no downloads to display.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

PublicDownloadsIndex.layout = (page: React.ReactNode) => <WebsiteLayout title="Downloads">{page}</WebsiteLayout>;
