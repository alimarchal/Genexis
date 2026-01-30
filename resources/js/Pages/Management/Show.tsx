import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, FileText } from 'lucide-react';

interface Management {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    description: string | null;
    attachment: string | null;
    attachment_url: string | null;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    management: Management;
}

export default function ShowManagement({ management }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Management',
            href: route('managements.index'),
        },
        {
            title: management.full_name,
            href: route('managements.show', management.id),
        },
    ];

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
            <Head title={`${management.full_name} - Management`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={management.full_name} description="View management member details" />
                    <Button asChild>
                        <Link href={route('managements.edit', management.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Member
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">
                                            {management.title && `${management.title} `}
                                            {management.full_name}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={management.status === 'active' ? 'default' : 'secondary'}>{management.status}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Personal Information</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">Designation</label>
                                            <p className="mt-1 font-medium">{management.designation}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">Display Order</label>
                                            <p className="mt-1 font-medium">#{management.order}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                {management.description && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Description</h3>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{management.description}</p>
                                    </div>
                                )}

                                {/* Timestamps */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Timestamps</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">Created</label>
                                            <p className="mt-1">{formatDate(management.created_at)}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">Last Updated</label>
                                            <p className="mt-1">{formatDate(management.updated_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                    <Link href={route('managements.edit', management.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Member
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                    <Link href={route('managements.create')}>Create New Member</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Member Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Member Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-muted-foreground text-sm font-medium">Member ID</label>
                                    <p className="text-muted-foreground mt-1 font-mono text-xl font-bold">
                                        #{management.id.toString().padStart(4, '0')}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-muted-foreground text-sm font-medium">Status</label>
                                    <div className="mt-1">
                                        <Badge variant={management.status === 'active' ? 'default' : 'secondary'}>{management.status}</Badge>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-muted-foreground text-sm font-medium">Display Order</label>
                                    <p className="mt-1 font-medium">{management.order}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Attachment */}
                        {management.attachment_url && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Attachment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <p className="text-muted-foreground text-sm">Document attached to this profile</p>
                                        <Button variant="outline" className="w-full" asChild>
                                            <a href={management.attachment_url} target="_blank" rel="noopener noreferrer">
                                                <FileText className="mr-2 h-4 w-4" />
                                                View Attachment
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
