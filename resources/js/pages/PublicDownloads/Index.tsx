import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { Download, Eye, File, Star } from 'lucide-react';
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

const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
        forms: 'bg-blue-100 text-blue-800 border-blue-200',
        reports: 'bg-green-100 text-green-800 border-green-200',
        brochures: 'bg-purple-100 text-purple-800 border-purple-200',
        policies: 'bg-red-100 text-red-800 border-red-200',
        general: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

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

                {/* Downloads Grid */}
                <div className="mx-auto max-w-7xl px-6 py-12">
                    {downloads.data.length > 0 ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-600">
                                    Showing {downloads.from || 0} to {downloads.to || 0} of {downloads.total} downloads
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {downloads.data.map((download) => (
                                    <div
                                        key={download.id}
                                        className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Featured Badge */}
                                        {download.is_featured && (
                                            <div className="absolute top-4 right-4 z-10">
                                                <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    Featured
                                                </div>
                                            </div>
                                        )}

                                        {/* File Icon */}
                                        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100">
                                            <div className="flex h-full items-center justify-center">
                                                <div className="text-center text-blue-600">
                                                    <File className="mx-auto mb-2 h-16 w-16" />
                                                    <span className="text-sm font-medium">{download.file_type}</span>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Category and Date */}
                                            <div className="mb-3 flex items-center justify-between">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(download.category)}`}
                                                >
                                                    {download.category.charAt(0).toUpperCase() + download.category.slice(1)}
                                                </span>
                                                <span className="text-xs text-gray-500">{formatDate(download.created_at)}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="mb-3 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                                                {download.title}
                                            </h3>

                                            {/* Description */}
                                            {download.description && (
                                                <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
                                                    {download.description}
                                                </p>
                                            )}

                                            {/* File Stats */}
                                            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                                                <span>{download.file_size_formatted}</span>
                                                <span>{download.download_count} downloads</span>
                                            </div>

                                            {/* Download Button */}
                                            <a
                                                href={route('downloads.download', download.id)}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download File
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

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
