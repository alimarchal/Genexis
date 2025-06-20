import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Calendar, Download, Edit, Eye, FileText, Gift, Hash, MapPin, Star, Users } from 'lucide-react';

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    document: string | null;
    document_url: string | null;
    closing_date: string | null;
    is_active: boolean;
    is_featured: boolean;
    views_count: number;
    benefits: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    career: Career;
}

export default function ShowCareer({ career }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Careers', href: route('careers.index') },
        { title: career.title, href: route('careers.show', career.id) },
    ];

    const getStatusBadge = () => {
        if (!career.is_active) return <Badge variant="outline">Inactive</Badge>;

        const currentDate = new Date().toISOString().split('T')[0];
        if (career.closing_date && career.closing_date < currentDate) {
            return <Badge variant="destructive">Closed</Badge>;
        }
        return <Badge variant="default">Open</Badge>;
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
            <Head title={`${career.title} - Career`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={career.title} description="Job posting details" />
                    <Button asChild>
                        <Link href={route('careers.edit', career.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Career
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                                        <Briefcase className="h-10 w-10 text-blue-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-2xl">
                                                {career.title}
                                                {career.is_featured && <Star className="h-6 w-6 fill-current text-yellow-500" />}
                                            </CardTitle>
                                            <p className="mt-1 flex items-center gap-2 text-lg text-gray-600">
                                                <MapPin className="h-4 w-4" />
                                                {career.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge()}
                                            {career.is_featured && <Badge variant="secondary">Featured</Badge>}
                                            <Badge variant="outline" className="gap-1">
                                                <Eye className="h-3 w-3" />
                                                {career.views_count} views
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Job Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{career.description}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{career.requirements}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {career.benefits && (
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Gift className="h-5 w-5" />
                                        Benefits & Compensation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{career.benefits}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <CardTitle className="text-lg">Job Document</CardTitle>
                                            <p className="mt-1 text-sm text-gray-500">Detailed job description or application form</p>
                                        </div>
                                    </div>
                                    {career.document && career.document_url && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={career.document_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {career.document ? (
                                    <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
                                            <FileText className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{getCurrentFileName(career.document)}</div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>{getFileExtension(career.document)} File</span>
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
                                            <p className="mt-2 text-sm font-medium text-gray-900">No document attached</p>
                                            <p className="text-sm text-gray-500">No additional document has been uploaded for this job</p>
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
                                        <p className="text-sm font-medium">Job ID</p>
                                        <p className="text-sm text-gray-600">#{career.id}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Location</p>
                                        <p className="text-sm text-gray-600">{career.location}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Closing Date</p>
                                        <p className="text-sm text-gray-600">
                                            {career.closing_date ? formatDate(career.closing_date) : 'Open-ended'}
                                        </p>
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
                                    <span className="font-medium">Views:</span>
                                    <span className="text-gray-600">{career.views_count}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Featured:</span>
                                    <span className="text-gray-600">{career.is_featured ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Active:</span>
                                    <span className="text-gray-600">{career.is_active ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Has Document:</span>
                                    <span className="text-gray-600">{career.document ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Has Benefits:</span>
                                    <span className="text-gray-600">{career.benefits ? 'Yes' : 'No'}</span>
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
                                    <p className="text-gray-600">{new Date(career.created_at).toLocaleString()}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(career.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('careers.edit', career.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Career
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('careers.index')}>Back to List</Link>
                                </Button>
                                {career.document_url && (
                                    <div className="border-t pt-2">
                                        <Button asChild variant="outline" size="sm" className="w-full">
                                            <a href={career.document_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Document
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
