import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Download, Edit, FileText, Hash, Star, TrendingDown } from 'lucide-react';

interface DownloadItem {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string | null;
    file_size: number | null;
    category: string;
    is_featured: boolean;
    is_active: boolean;
    download_count: number;
    created_at: string;
    updated_at: string;
    file_size_formatted: string;
}

interface Props {
    download: DownloadItem;
}

export default function ShowDownload({ download }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Downloads', href: route('downloads.index') },
        { title: download.title, href: route('downloads.show', download.id) },
    ];

    const getStatusBadge = () => {
        return download.is_active ? <Badge variant="default">Active</Badge> : <Badge variant="outline">Inactive</Badge>;
    };

    const getCurrentFileName = (filePath: string): string => {
        return filePath.split('/').pop() || '';
    };

    const getFileExtension = (filePath: string): string => {
        return filePath.split('.').pop()?.toUpperCase() || '';
    };

    const getCategoryBadge = (category: string) => {
        const categoryColors: Record<string, string> = {
            document: 'bg-blue-100 text-blue-800',
            picture: 'bg-green-100 text-green-800',
            form: 'bg-purple-100 text-purple-800',
            general: 'bg-gray-100 text-gray-800',
        };

        return (
            <Badge variant="outline" className={categoryColors[category.toLowerCase()] || categoryColors.general}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${download.title} - Download`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={download.title} description="Download details and information" />
                    <Button asChild>
                        <Link href={route('downloads.edit', download.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Download
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                                        <FileText className="h-10 w-10 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{download.title}</CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">
                                                {download.file_size_formatted} • {download.download_count.toLocaleString()} downloads
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge()}
                                            {getCategoryBadge(download.category)}
                                            {download.is_featured && (
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                    <Star className="mr-1 h-3 w-3" />
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {download.description && (
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="text-lg">Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed text-gray-700">{download.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-indigo-500" />
                                        <div>
                                            <CardTitle className="text-lg">File Information</CardTitle>
                                            <p className="mt-1 text-sm text-gray-500">Downloadable file details</p>
                                        </div>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <a href={route('downloads.admin-download', download.id)} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
                                        <FileText className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{getCurrentFileName(download.file_path)}</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{getFileExtension(download.file_path)} File</span>
                                            <span>•</span>
                                            <span>{download.file_size_formatted}</span>
                                            <span>•</span>
                                            <span>{download.download_count.toLocaleString()} downloads</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge variant="outline" className="text-xs">
                                            Available
                                        </Badge>
                                        <span className="text-xs text-gray-500">{download.file_type}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">ID</p>
                                        <p className="text-sm text-gray-600">#{download.id}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Category</p>
                                        <div className="mt-1">{getCategoryBadge(download.category)}</div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <TrendingDown className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Download Count</p>
                                        <p className="text-sm text-gray-600">{download.download_count.toLocaleString()}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge()}</div>
                                    </div>
                                </div>
                                {download.is_featured && (
                                    <>
                                        <Separator />
                                        <div className="flex items-center gap-3">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <div>
                                                <p className="text-sm font-medium">Featured</p>
                                                <p className="text-sm text-gray-600">This item is featured</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">File Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">File Size:</span>
                                    <span className="text-gray-600">{download.file_size_formatted}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">File Type:</span>
                                    <span className="text-gray-600">{download.file_type || 'Unknown'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Extension:</span>
                                    <span className="text-gray-600">{getFileExtension(download.file_path)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Total Downloads:</span>
                                    <span className="text-gray-600">{download.download_count.toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(download.created_at).toLocaleString()}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(download.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('downloads.edit', download.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Download
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('downloads.index')}>Back to List</Link>
                                </Button>
                                <div className="border-t pt-2">
                                    <Button asChild variant="outline" size="sm" className="w-full">
                                        <a href={route('downloads.admin-download', download.id)} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download File
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
