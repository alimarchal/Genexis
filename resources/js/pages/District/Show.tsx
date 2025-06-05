import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, MapPin } from 'lucide-react';

interface District {
    id: number;
    name: string;
    region_id: number;
    region: {
        id: number;
        name: string;
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    district: District;
}

export default function ShowDistrict({ district }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Districts',
            href: route('districts.index'),
        },
        {
            title: district.name,
            href: route('districts.show', district.id),
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
            <Head title={`${district.name} - District`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('districts.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Districts
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('districts.edit', district.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit District
                        </Link>
                    </Button>
                </div>

                <Heading title="District Details" description="View complete information about this district" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    District Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">District Name</p>
                                        <p className="font-medium">{district.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Region</p>
                                        <p className="font-medium">{district.region.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={district.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {district.status}
                                        </Badge>
                                    </div>
                                </div>
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
                                        <p className="text-sm font-medium">{formatDate(district.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(district.updated_at)}</p>
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
                                    <MapPin className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('districts.edit', district.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit District
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('districts.index')}>View All Districts</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* District ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>District ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-mono text-2xl font-bold">#{district.id.toString().padStart(4, '0')}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
