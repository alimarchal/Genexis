import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Hash, Info, List, Settings } from 'lucide-react';

interface ServiceAttribute {
    id: number;
    service_id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
}

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string | null;
    image: string | null;
    image_url: string | null;
    is_active: boolean;
    sort_order: number;
    meta_data: Record<string, string | number | boolean | null> | null;
    attributes: ServiceAttribute[];
    created_at: string;
    updated_at: string;
}

interface Props {
    service: Service;
}

export default function ShowService({ service }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Services',
            href: route('services.index'),
        },
        {
            title: service.name,
            href: route('services.show', service.slug),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${service.name} - Services`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={service.name} description="View service details" />
                    <Button asChild>
                        <Link href={route('services.edit', service.slug)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Service
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    {/* Service Image */}
                                    {service.image_url && (
                                        <img src={service.image_url} alt={service.name} className="h-32 w-32 rounded border object-cover" />
                                    )}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{service.name}</CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">{service.slug}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(service.is_active)}
                                            {service.icon && (
                                                <Badge variant="outline" className="gap-1">
                                                    <span>{service.icon}</span>
                                                    Icon
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Description */}
                                <div className="space-y-2">
                                    <h3 className="flex items-center gap-2 text-lg font-medium">
                                        <Info className="h-5 w-5" />
                                        Description
                                    </h3>
                                    <div className="prose max-w-none">
                                        <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{service.description}</p>
                                    </div>
                                </div>

                                {/* Service Attributes */}
                                {service.attributes && service.attributes.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="flex items-center gap-2 text-lg font-medium">
                                            <List className="h-5 w-5" />
                                            Service Details
                                        </h3>
                                        <div className="grid gap-4">
                                            {service.attributes.map((attribute, index) => (
                                                <div key={attribute.id || index} className="rounded-lg border p-4">
                                                    <h4 className="font-medium text-gray-900">{attribute.attribute_name}</h4>
                                                    <div className="mt-2 whitespace-pre-wrap text-gray-700">{attribute.attribute_value}</div>
                                                </div>
                                            ))}
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
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Sort Order</p>
                                        <p className="text-sm text-gray-600">{service.sort_order}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Settings className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Slug</p>
                                        <p className="font-mono text-sm text-gray-600">{service.slug}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(service.is_active)}</div>
                                    </div>
                                </div>

                                {service.icon && (
                                    <>
                                        <Separator />
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{service.icon}</span>
                                            <div>
                                                <p className="text-sm font-medium">Icon</p>
                                                <p className="text-sm text-gray-600">{service.icon}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Statistics Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Attributes:</span>
                                    <span className="text-gray-600">{service.attributes ? service.attributes.length : 0}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Has Image:</span>
                                    <span className="text-gray-600">{service.image_url ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Has Icon:</span>
                                    <span className="text-gray-600">{service.icon ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Description Length:</span>
                                    <span className="text-gray-600">{service.description.length} chars</span>
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
                                    <p className="text-gray-600">{new Date(service.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(service.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('services.edit', service.slug)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Service
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('services.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
