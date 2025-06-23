import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Download, Edit, FileText, Hash } from 'lucide-react';

interface ScheduleOfCharge {
    id: number;
    title: string;
    from: string;
    to: string | null;
    attachment: string | null;
    attachment_url: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    scheduleOfCharge: ScheduleOfCharge;
}

export default function ShowScheduleOfCharge({ scheduleOfCharge }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Schedule of Charges', href: route('schedule-of-charges.index') },
        { title: scheduleOfCharge.title, href: route('schedule-of-charges.show', scheduleOfCharge.id) },
    ];

    const getStatusBadge = () => {
        if (!scheduleOfCharge.is_active) return <Badge variant="outline">Inactive</Badge>;

        const currentDate = new Date().toISOString().split('T')[0];
        const fromDate = scheduleOfCharge.from;
        const toDate = scheduleOfCharge.to;

        if (fromDate > currentDate) return <Badge variant="secondary">Upcoming</Badge>;
        if (toDate && toDate < currentDate) return <Badge variant="destructive">Expired</Badge>;
        return <Badge variant="default">Current</Badge>;
    };

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    const getFileExtension = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('.').pop()?.toUpperCase() || '';
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
            <Head title={`${scheduleOfCharge.title} - Schedule of Charges`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={scheduleOfCharge.title} description="Schedule of charges details" />
                    <Button asChild>
                        <Link href={route('schedule-of-charges.edit', scheduleOfCharge.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Schedule
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                                        <Calendar className="h-10 w-10 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{scheduleOfCharge.title}</CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">
                                                {formatDate(scheduleOfCharge.from)} -{' '}
                                                {scheduleOfCharge.to ? formatDate(scheduleOfCharge.to) : 'Ongoing'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge()}
                                            {scheduleOfCharge.attachment && <Badge variant="outline">Has Attachment</Badge>}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {scheduleOfCharge.description && (
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="text-lg">Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed text-gray-700">{scheduleOfCharge.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-indigo-500" />
                                        <div>
                                            <CardTitle className="text-lg">Attachment</CardTitle>
                                            <p className="mt-1 text-sm text-gray-500">Charges document or file</p>
                                        </div>
                                    </div>
                                    {scheduleOfCharge.attachment && scheduleOfCharge.attachment_url && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={scheduleOfCharge.attachment_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {scheduleOfCharge.attachment ? (
                                    <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
                                            <FileText className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{getCurrentFileName(scheduleOfCharge.attachment)}</div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>{getFileExtension(scheduleOfCharge.attachment)} File</span>
                                                <span>•</span>
                                                <span>Available for download</span>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            Uploaded
                                        </Badge>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 rounded-md border-2 border-dashed border-gray-200 p-6 text-center">
                                        <div className="flex-1">
                                            <FileText className="mx-auto h-8 w-8 text-gray-400" />
                                            <p className="mt-2 text-sm font-medium text-gray-900">No file attached</p>
                                            <p className="text-sm text-gray-500">No attachment has been uploaded for this schedule</p>
                                        </div>
                                    </div>
                                )}
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
                                        <p className="text-sm text-gray-600">#{scheduleOfCharge.id}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Start Date</p>
                                        <p className="text-sm text-gray-600">{formatDate(scheduleOfCharge.from)}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p className="text-sm text-gray-600">{scheduleOfCharge.to ? formatDate(scheduleOfCharge.to) : 'Ongoing'}</p>
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
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Active:</span>
                                    <span className="text-gray-600">{scheduleOfCharge.is_active ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Has Attachment:</span>
                                    <span className="text-gray-600">{scheduleOfCharge.attachment ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">File Type:</span>
                                    <span className="text-gray-600">
                                        {scheduleOfCharge.attachment ? getFileExtension(scheduleOfCharge.attachment) : 'N/A'}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Has Description:</span>
                                    <span className="text-gray-600">{scheduleOfCharge.description ? 'Yes' : 'No'}</span>
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
                                    <p className="text-gray-600">{new Date(scheduleOfCharge.created_at).toLocaleString()}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(scheduleOfCharge.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('schedule-of-charges.edit', scheduleOfCharge.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Schedule
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('schedule-of-charges.index')}>Back to List</Link>
                                </Button>
                                {scheduleOfCharge.attachment_url && (
                                    <div className="border-t pt-2">
                                        <Button asChild variant="outline" size="sm" className="w-full">
                                            <a href={scheduleOfCharge.attachment_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Attachment
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
