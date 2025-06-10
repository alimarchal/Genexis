import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Download, Edit, File, Trash2, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Financial Highlights',
        href: route('financial-highlights.index'),
    },
    {
        title: 'Details',
        href: '',
    },
];

interface FinancialHighlight {
    id: number;
    fiscal_year: number;
    file_path: string;
    file_name: string;
    file_size: number;
    created_at: string;
    updated_at: string;
    creator: {
        name: string;
        email: string;
    };
    updater: {
        name: string;
        email: string;
    };
    download_url: string;
    edit_url: string;
}

interface Props {
    financial_highlight: FinancialHighlight;
}

export default function Show({ financial_highlight }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this financial highlight? This action cannot be undone.')) {
            destroy(route('financial-highlights.destroy', financial_highlight.id), {
                onSuccess: () => {
                    // Redirect will be handled by the controller
                },
            });
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getFileIcon = () => {
        if (financial_highlight.file_name.toLowerCase().endsWith('.pdf')) {
            return (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-red-500">
                    <span className="text-lg font-bold text-white">PDF</span>
                </div>
            );
        } else {
            return (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-500">
                    <span className="text-lg font-bold text-white">IMG</span>
                </div>
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Financial Highlight - ${financial_highlight.fiscal_year}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('financial-highlights.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Financial Highlights
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Financial Highlight - {financial_highlight.fiscal_year}</h1>
                            <p className="mt-1 text-sm text-gray-600">View and manage this financial highlight document</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={() => window.open(financial_highlight.download_url, '_blank')} className="bg-blue-600 hover:bg-blue-700">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        <Link href={financial_highlight.edit_url}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {processing ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">File Information</h2>
                            <div className="flex items-start space-x-4">
                                {getFileIcon()}
                                <div className="flex-1">
                                    <h3 className="mb-2 text-lg font-medium text-gray-900">{financial_highlight.file_name}</h3>
                                    <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 sm:grid-cols-2">
                                        <div className="flex items-center">
                                            <File className="mr-2 h-4 w-4 text-gray-400" />
                                            <span>Size: {formatFileSize(financial_highlight.file_size)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                            <span>Fiscal Year: {financial_highlight.fiscal_year}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button onClick={() => window.open(financial_highlight.download_url, '_blank')} className="w-full sm:w-auto">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Financial Highlight
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Document Details</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-2 text-sm font-medium text-gray-900">Fiscal Year</h3>
                                    <p className="text-lg text-gray-600">{financial_highlight.fiscal_year}</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-sm font-medium text-gray-900">File Type</h3>
                                    <p className="text-lg text-gray-600">
                                        {financial_highlight.file_name.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Image File'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-sm font-medium text-gray-900">File Size</h3>
                                    <p className="text-lg text-gray-600">{formatFileSize(financial_highlight.file_size)}</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-sm font-medium text-gray-900">File Name</h3>
                                    <p className="text-lg break-all text-gray-600">{financial_highlight.file_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Created Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{formatDate(financial_highlight.created_at)}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <User className="mr-2 h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">{financial_highlight.creator?.name || 'N/A'}</p>
                                        <p className="text-xs text-gray-500">{financial_highlight.creator?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Last Updated</h2>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{formatDate(financial_highlight.updated_at)}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <User className="mr-2 h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">{financial_highlight.updater?.name || 'N/A'}</p>
                                        <p className="text-xs text-gray-500">{financial_highlight.updater?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
                            <div className="space-y-3">
                                <Button
                                    onClick={() => window.open(financial_highlight.download_url, '_blank')}
                                    className="w-full justify-start"
                                    variant="outline"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Document
                                </Button>
                                <Link href={financial_highlight.edit_url} className="block">
                                    <Button className="w-full justify-start" variant="outline">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Details
                                    </Button>
                                </Link>
                                <Button onClick={handleDelete} disabled={processing} className="w-full justify-start" variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {processing ? 'Deleting...' : 'Delete Document'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
