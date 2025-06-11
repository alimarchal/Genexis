import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download as DownloadIcon, Edit, File, Star } from 'lucide-react';

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
    is_active: boolean;
    download_count: number;
    created_at: string;
    updated_at: string;
    creator?: {
        id: number;
        name: string;
    };
    updater?: {
        id: number;
        name: string;
    };
}

interface Props {
    download: Download;
}

export default function Show({ download }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Downloads',
            href: route('downloads.index'),
        },
        {
            title: download.title,
            href: route('downloads.show', download.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getCategoryBadge = (category: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            forms: 'default',
            reports: 'secondary',
            brochures: 'outline',
            policies: 'destructive',
            general: 'secondary',
        };
        return (
            <Badge variant={variants[category] || 'default'} className="capitalize">
                {category}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${download.title} - Downloads`} />

            <div className="px-10 py-6">
                <div className="mb-6 flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('downloads.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex w-full items-center justify-between">
                        <Heading title={download.title} description="View download details" />
                        <Button asChild>
                            <Link href={route('downloads.edit', download.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Download
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">{download.title}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(download.is_active)}
                                            {download.is_featured && (
                                                <Badge variant="outline" className="gap-1">
                                                    <Star className="h-3 w-3" />
                                                    Featured
                                                </Badge>
                                            )}
                                            {getCategoryBadge(download.category)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Description */}
                                {download.description && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Description</h3>
                                        <div className="prose max-w-none">
                                            <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{download.description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* File Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">File Information</h3>
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <File className="h-8 w-8 text-gray-500" />
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{download.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {download.file_size_formatted} • {download.file_type} • Downloaded {download.download_count} times
                                                </div>
                                            </div>
                                            {download.file_url && (
                                                <Button asChild>
                                                    <Link href={route('downloads.admin-download', download.id)}>
                                                        <DownloadIcon className="mr-2 h-4 w-4" />
                                                        Download
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Status</span>
                                    {getStatusBadge(download.is_active)}
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Category</span>
                                    {getCategoryBadge(download.category)}
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Featured</span>
                                    <Badge variant={download.is_featured ? 'default' : 'outline'}>{download.is_featured ? 'Yes' : 'No'}</Badge>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <span className="text-sm font-medium">Downloads</span>
                                    <div className="text-primary text-2xl font-bold">{download.download_count}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* File Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">File Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="rounded-lg bg-blue-50 p-3">
                                        <div className="text-lg font-semibold text-blue-600">{download.file_size_formatted}</div>
                                        <div className="text-xs text-blue-500">File Size</div>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-3">
                                        <div className="text-lg font-semibold text-green-600">{download.download_count}</div>
                                        <div className="text-xs text-green-500">Downloads</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(download.created_at).toLocaleString()}</p>
                                    {download.creator && <p className="text-gray-500">by {download.creator.name}</p>}
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(download.updated_at).toLocaleString()}</p>
                                    {download.updater && <p className="text-gray-500">by {download.updater.name}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions Card */}
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
