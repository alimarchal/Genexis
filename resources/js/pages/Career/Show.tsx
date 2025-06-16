import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Calendar, Download, Edit, Eye, FileText, MapPin, Star, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Careers',
        href: route('careers.index'),
    },
    {
        title: 'View',
        href: '',
    },
];

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    document: string | null;
    document_url: string | null;
    closing_date: string | null;
    benefits: string | null;
    is_featured: boolean;
    is_active: boolean;
    views_count: number;
    status: string;
    created_at: string;
    updated_at: string;
    creator?: {
        name: string;
    };
    updater?: {
        name: string;
    };
}

interface Props {
    career: Career;
}

export default function Show({ career }: Props) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No deadline';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isExpired = (closingDate: string | null) => {
        if (!closingDate) return false;
        return new Date(closingDate) < new Date();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Career - ${career.title}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="Career Details" description={career.title} breadcrumbs={breadcrumbs} />
                    <div className="flex gap-2">
                        {career.document_url && (
                            <Link href={route('careers.admin-download', career.id)}>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </Link>
                        )}
                        <Link href={route('careers.edit', career.id)}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Link href={route('careers.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 rounded-lg p-2">
                                            <Briefcase className="text-primary h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">{career.title}</CardTitle>
                                            <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {career.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Closing: {formatDate(career.closing_date)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {career.views_count} views
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {career.is_featured && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                                        <Badge
                                            variant={career.is_active ? 'default' : 'secondary'}
                                            className={isExpired(career.closing_date) ? 'bg-red-100 text-red-800' : ''}
                                        >
                                            {isExpired(career.closing_date) ? 'Expired' : career.status}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Job Description</h3>
                                    <div className="prose max-w-none">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{career.description}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Requirements</h3>
                                    <div className="prose max-w-none">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{career.requirements}</p>
                                    </div>
                                </div>

                                {career.benefits && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold">Benefits & Compensation</h3>
                                        <div className="prose max-w-none">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{career.benefits}</p>
                                        </div>
                                    </div>
                                )}

                                {career.document_url && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold">Additional Documents</h3>
                                        <div className="flex items-center gap-3 rounded-lg border p-4">
                                            <FileText className="h-8 w-8 text-red-600" />
                                            <div className="flex-1">
                                                <div className="font-medium">Job Description Document</div>
                                                <div className="text-muted-foreground text-sm">PDF document with detailed information</div>
                                            </div>
                                            <Link href={route('careers.admin-download', career.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Download className="mr-2 h-3 w-3" />
                                                    Download
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-primary text-2xl font-bold">{career.views_count}</div>
                                        <div className="text-muted-foreground text-xs">Total Views</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary text-2xl font-bold">{career.is_featured ? '★' : '☆'}</div>
                                        <div className="text-muted-foreground text-xs">Featured</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Status</div>
                                    <Badge variant={career.is_active ? 'default' : 'secondary'}>{career.status}</Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Location</div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-3 w-3" />
                                        {career.location}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Application Deadline</div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Calendar className="h-3 w-3" />
                                        <span className={isExpired(career.closing_date) ? 'text-red-600' : ''}>
                                            {formatDate(career.closing_date)}
                                        </span>
                                    </div>
                                </div>

                                {career.creator && (
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Created By</div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <User className="h-3 w-3" />
                                            {career.creator.name}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Created</div>
                                    <div className="text-muted-foreground text-sm">{formatDateTime(career.created_at)}</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Last Updated</div>
                                    <div className="text-muted-foreground text-sm">{formatDateTime(career.updated_at)}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
