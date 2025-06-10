import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Download, Eye, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

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
        title: 'Edit',
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
    };
    updater: {
        name: string;
    };
    download_url: string;
    view_url: string;
}

interface Props {
    financial_highlight: FinancialHighlight;
}

export default function Edit({ financial_highlight }: Props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        fiscal_year: financial_highlight.fiscal_year,
        file: null as File | null,
        _method: 'PUT',
    });

    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('financial-highlights.update', financial_highlight.id));
    };

    const handleFileChange = (file: File | null) => {
        setData('file', file);

        if (file) {
            if (file.type === 'application/pdf') {
                setPreview('pdf');
            } else if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => setPreview(e.target?.result as string);
                reader.readAsDataURL(file);
            }
        } else {
            setPreview(null);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                handleFileChange(file);
            }
        }
    };

    const removeFile = () => {
        handleFileChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Financial Highlight - ${financial_highlight.fiscal_year}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('financial-highlights.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Financial Highlights
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Financial Highlight - {financial_highlight.fiscal_year}</h1>
                        <p className="mt-1 text-sm text-gray-600">Update the financial highlight document and its details</p>
                    </div>
                </div>

                <div className="rounded-lg bg-white shadow">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div>
                            <Label htmlFor="fiscal_year">Fiscal Year</Label>
                            <Input
                                id="fiscal_year"
                                type="number"
                                min="1900"
                                max="2100"
                                value={data.fiscal_year}
                                onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || financial_highlight.fiscal_year)}
                                className={errors.fiscal_year ? 'border-red-500' : ''}
                                required
                            />
                            {errors.fiscal_year && <p className="mt-1 text-sm text-red-600">{errors.fiscal_year}</p>}
                        </div>

                        <div>
                            <Label>Current File</Label>
                            <div className="mt-2 rounded-lg bg-gray-50 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            {financial_highlight.file_name.toLowerCase().endsWith('.pdf') ? (
                                                <div className="flex h-10 w-10 items-center justify-center rounded bg-red-500">
                                                    <span className="text-xs font-bold text-white">PDF</span>
                                                </div>
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-500">
                                                    <span className="text-xs font-bold text-white">IMG</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{financial_highlight.file_name}</p>
                                            <p className="text-xs text-gray-500">{formatFileSize(financial_highlight.file_size)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(financial_highlight.download_url, '_blank')}
                                            title="Download"
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Link href={financial_highlight.view_url}>
                                            <Button variant="ghost" size="sm" title="View">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="file">Replace File (Optional)</Label>
                            <p className="mb-2 text-sm text-gray-600">
                                Upload a new file to replace the current one, or leave empty to keep the existing file.
                            </p>
                            <div
                                className={`relative rounded-lg border-2 border-dashed p-6 transition-colors ${
                                    dragActive
                                        ? 'border-blue-400 bg-blue-50'
                                        : errors.file
                                          ? 'border-red-300 bg-red-50'
                                          : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={fileInputRef}
                                    id="file"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />

                                {!data.file ? (
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and
                                                drop
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    {data.file.type === 'application/pdf' ? (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500">
                                                            <span className="text-xs font-bold text-white">PDF</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500">
                                                            <span className="text-xs font-bold text-white">IMG</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">{data.file.name}</p>
                                                    <p className="text-xs text-gray-500">{formatFileSize(data.file.size)}</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={removeFile}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {preview && preview !== 'pdf' && (
                                            <div className="mt-4">
                                                <img src={preview} alt="Preview" className="mx-auto h-32 max-w-full rounded object-contain" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                        </div>

                        {progress && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Uploading...</span>
                                    <span>{Math.round(progress.percentage || 0)}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                        style={{ width: `${progress.percentage || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div className="border-t border-gray-200 pt-6">
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium">Created:</span> {formatDate(financial_highlight.created_at)} by{' '}
                                    {financial_highlight.creator?.name || 'N/A'}
                                </p>
                                <p>
                                    <span className="font-medium">Last Updated:</span> {formatDate(financial_highlight.updated_at)} by{' '}
                                    {financial_highlight.updater?.name || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
                            <Link href={route('financial-highlights.index')}>
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="min-w-[120px]">
                                {processing ? 'Updating...' : 'Update Financial Highlight'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
