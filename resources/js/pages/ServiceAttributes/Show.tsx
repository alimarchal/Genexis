import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Hash, Settings } from 'lucide-react';

interface Service {
    id: number;
    name: string;
}

interface ServiceAttribute {
    id: number;
    service_id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
    service: Service;
}

interface Props {
    serviceAttribute: ServiceAttribute;
}

export default function ShowServiceAttribute({ serviceAttribute }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Service Attributes', href: route('service-attributes.index') },
        { title: serviceAttribute.attribute_name, href: route('service-attributes.show', serviceAttribute.id) },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${serviceAttribute.attribute_name} - Service Attribute`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={serviceAttribute.attribute_name} description="Service attribute details" />
                    <Button asChild>
                        <Link href={route('service-attributes.edit', serviceAttribute.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Attribute
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                                        <Settings className="h-10 w-10 text-blue-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{serviceAttribute.attribute_name}</CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">
                                                For: {serviceAttribute.service.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="gap-1">
                                                Sort Order: {serviceAttribute.sort_order}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Attribute Value
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                                        {serviceAttribute.attribute_value}
                                    </p>
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
                                        <p className="text-sm font-medium">Attribute ID</p>
                                        <p className="text-sm text-gray-600">#{serviceAttribute.id}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Settings className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Service</p>
                                        <p className="text-sm text-gray-600">{serviceAttribute.service.name}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium">Sort Order</p>
                                        <p className="text-sm text-gray-600">{serviceAttribute.sort_order}</p>
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
                                    <span className="font-medium">Service ID:</span>
                                    <span className="text-gray-600">{serviceAttribute.service_id}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Value Length:</span>
                                    <span className="text-gray-600">{serviceAttribute.attribute_value.length} characters</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Lines:</span>
                                    <span className="text-gray-600">{serviceAttribute.attribute_value.split('\n').length}</span>
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
                                    <p className="text-gray-600">{new Date(serviceAttribute.created_at).toLocaleString()}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(serviceAttribute.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('service-attributes.edit', serviceAttribute.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Attribute
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('service-attributes.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}