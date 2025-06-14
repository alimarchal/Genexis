import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Calendar, Download, Edit, FileText, Hash, User } from 'lucide-react';

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
    managment: Management;
}

export default function ShowManagement({ managment }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Management',
            href: route('managments.index'),
        },
        {
            title: managment.full_name,
            href: route('managments.show', managment.id),
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
            <Head title={`${managment.full_name} - Management`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('managments.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Management
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('managments.edit', managment.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Member
                        </Link>
                    </Button>
                </div>

                <Heading title="Management Member Details" description="View complete information about this management member" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Full Name</p>
                                        <p className="font-medium">
                                            {managment.title && `${managment.title} `}
                                            {managment.full_name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Designation</p>
                                        <p className="font-medium">{managment.designation}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Display Order</p>
                                        <p className="flex items-center gap-1 font-medium">
                                            <Hash className="h-4 w-4" />
                                            {managment.order}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={managment.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {managment.status}
                                        </Badge>
                                    </div>
                                </div>

                                {managment.description && (
                                    <div className="border-t pt-4">
                                        <p className="text-muted-foreground mb-2 text-sm">Description</p>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{managment.description}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Created At</p>
                                        <p className="text-sm font-medium">{formatDate(managment.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(managment.updated_at)}</p>
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
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('managments.edit', managment.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Member
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('managments.index')}>View All Members</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Attachment */}
                        {managment.attachment_url && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Attachment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <p className="text-muted-foreground text-sm">Document attached to this profile</p>
                                        <Button variant="outline" className="w-full" asChild>
                                            <a href={managment.attachment_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                View Attachment
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Member ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Member ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-mono text-2xl font-bold">#{managment.id.toString().padStart(4, '0')}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
