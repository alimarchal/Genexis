import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, MapPin } from 'lucide-react';

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

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={district.name} description="View district details" />
                    <Button asChild>
                        <Link href={route('districts.edit', district.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit District
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    District Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">District Name</p>
                                        <p className="text-lg font-semibold">{district.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Region</p>
                                        <p className="text-lg font-semibold">{district.region?.name || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Status</p>
                                        <Badge variant={district.status === 'active' ? 'default' : 'secondary'}>{district.status}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Created At</p>
                                        <p className="text-sm">{formatDate(district.created_at)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Last Updated</p>
                                        <p className="text-sm">{formatDate(district.updated_at)}</p>
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
                            <CardContent className="space-y-3">
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
