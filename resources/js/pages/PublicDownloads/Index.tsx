import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Download, Eye } from 'lucide-react';
import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Table';

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
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Downloads</h1>
                            <p className="mx-auto max-w-2xl text-xl text-blue-100">
                                Access important documents, forms, and resources from Bank of Azad Jammu & Kashmir
                            </p>
                        </div>
                    </div>
                </div>

                {/* Downloads Table */}
                <div className="mx-auto max-w-7xl px-6 py-12">
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
                                        <Th>Category</Th>
                                        <Th>File Type</Th>
                                        <Th>File Size</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {downloads.data.map((download) => (
                                        <Tr key={download.id}>
                                            <Td>{download.title}</Td>
                                            <Td>{download.category}</Td>
                                            <Td>{download.file_type || 'N/A'}</Td>
                                            <Td>{download.file_size_formatted}</Td>
                                            <Td>
                                                <a
                                                    href={route('downloads.download', download.id)}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </a>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            {/* Pagination */}
                            {downloads.links && downloads.links.length > 3 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {downloads.links.map((link, index) => (
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
