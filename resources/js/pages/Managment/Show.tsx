import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Edit, User, Calendar, FileText, Hash, Tag } from 'lucide-react';

interface Managment {
    id: number;
    title?: string;
    full_name: string;
    designation: string;
    description?: string;
    attachment?: string;
    attachment_url?: string;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    managment: Managment;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Management', href: '/managment' },
    { title: 'View', href: '#' },
];

export default function Show({ managment }: Props) {
    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
        ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">Inactive</Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={managment.full_name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Management Member Details
                                </CardTitle>
                            </div>
                            <Link href={`/managment/${managment.id}/edit`}>
                                <Button>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Photo Section */}
                            <div className="lg:col-span-1">
                                <div className="space-y-4">
                                    {managment.attachment_url ? (
                                        <div className="text-center">
                                            <img
                                                src={managment.attachment_url}
                                                alt={managment.full_name}
                                                className="w-48 h-48 mx-auto rounded-lg object-cover shadow-lg border"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border">
                                            <User className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="lg:col-span-2">
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <h1 className="text-3xl font-bold">
                                                {managment.title} {managment.full_name}
                                            </h1>
                                            {getStatusBadge(managment.status)}
                                        </div>
                                        <p className="text-xl text-gray-600 mb-4">{managment.designation}</p>
                                        {managment.description && (
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                    <FileText className="h-4 w-4" />
                                                    Description
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed">{managment.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    {/* Additional Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Hash className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Display Order</p>
                                                    <p className="font-medium">{managment.order}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Tag className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Status</p>
                                                    <div className="mt-1">{getStatusBadge(managment.status)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Created At</p>
                                                    <p className="font-medium">
                                                        {new Date(managment.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Last Updated</p>
                                                    <p className="font-medium">
                                                        {new Date(managment.updated_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center">
                            <Link href={`/managment/${managment.id}/edit`}>
                                <Button>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Member
                                </Button>
                            </Link>
                            <Link href="/managment">
                                <Button variant="outline">
                                    Back to List
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}