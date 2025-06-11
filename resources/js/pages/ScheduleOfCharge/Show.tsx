import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Download, Edit, FileText, User } from 'lucide-react';

interface Creator {
    id: number;
    name: string;
    email: string;
}

interface ScheduleOfCharge {
    id: number;
    title: string;
    from: string;
    to: string | null;
    attachment: string | null;
    attachment_url: string | null;
    description: string | null;
    is_active: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    creator?: Creator;
    updater?: Creator;
}

interface Props {
    scheduleOfCharge: ScheduleOfCharge;
}

export default function Show({ scheduleOfCharge }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Schedule of Charges',
            href: route('schedule-of-charges.index'),
        },
        {
            title: scheduleOfCharge.title,
            href: route('schedule-of-charges.show', scheduleOfCharge.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${scheduleOfCharge.title} - Schedule of Charges`} />

            <div className="px-10 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title={scheduleOfCharge.title} description="Schedule of charges details" />
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('schedule-of-charges.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to List
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('schedule-of-charges.edit', scheduleOfCharge.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
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
                                        <CardTitle className="text-2xl">{scheduleOfCharge.title}</CardTitle>
                                        <div className="flex items-center gap-2">{getStatusBadge(scheduleOfCharge.is_active)}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Period */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Effective Period</h3>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span className="font-medium">From:</span>
                                            <span>{formatDate(scheduleOfCharge.from)}</span>
                                        </div>
                                        {scheduleOfCharge.to && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">To:</span>
                                                <span>{formatDate(scheduleOfCharge.to)}</span>
                                            </div>
                                        )}
                                        {!scheduleOfCharge.to && <Badge variant="outline">Ongoing</Badge>}
                                    </div>
                                </div>

                                {/* Description */}
                                {scheduleOfCharge.description && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Description</h3>
                                        <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{scheduleOfCharge.description}</p>
                                    </div>
                                )}

                                {/* Attachment */}
                                {scheduleOfCharge.attachment_url && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Attachment</h3>
                                        <div className="flex items-center gap-4 rounded-lg border p-4">
                                            <FileText className="h-8 w-8 text-blue-500" />
                                            <div className="flex-1">
                                                <p className="font-medium">Schedule Document</p>
                                                <p className="text-sm text-gray-500">Click to download the document</p>
                                            </div>
                                            <Button variant="outline" asChild>
                                                <Link href={route('schedule-of-charges.download', scheduleOfCharge.id)}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                )}
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
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(scheduleOfCharge.is_active)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Attachment</p>
                                        <p className="text-sm text-gray-600">{scheduleOfCharge.attachment_url ? 'Available' : 'Not available'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Tracking */}
                        {(scheduleOfCharge.creator || scheduleOfCharge.updater) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">User Tracking</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {scheduleOfCharge.creator && (
                                        <div className="flex items-center gap-3">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm font-medium">Created by</p>
                                                <p className="text-sm text-gray-600">{scheduleOfCharge.creator.name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {scheduleOfCharge.updater && (
                                        <div className="flex items-center gap-3">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm font-medium">Updated by</p>
                                                <p className="text-sm text-gray-600">{scheduleOfCharge.updater.name}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Timestamps Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{formatDateTime(scheduleOfCharge.created_at)}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{formatDateTime(scheduleOfCharge.updated_at)}</p>
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
                                    <Link href={route('schedule-of-charges.edit', scheduleOfCharge.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Schedule
                                    </Link>
                                </Button>

                                {scheduleOfCharge.attachment_url && (
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href={route('schedule-of-charges.download', scheduleOfCharge.id)}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download File
                                        </Link>
                                    </Button>
                                )}

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('schedule-of-charges.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
