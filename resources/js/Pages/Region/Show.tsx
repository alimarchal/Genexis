import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, MapPin } from 'lucide-react';

interface Region {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    region: Region;
}

export default function ShowRegion({ region }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Regions',
            href: route('regions.index'),
        },
        {
            title: region.name,
            href: route('regions.show', region.id),
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
            <Head title={`${region.name} - Region`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={region.name} description="View region details" />
                    <Button asChild>
                        <Link href={route('regions.edit', region.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Region
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
                                    Region Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Region Name</p>
                                        <p className="text-lg font-semibold">{region.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Status</p>
                                        <Badge variant={region.status === 'active' ? 'default' : 'secondary'}>{region.status}</Badge>
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
                                        <p className="text-sm">{formatDate(region.created_at)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Last Updated</p>
                                        <p className="text-sm">{formatDate(region.updated_at)}</p>
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
                                    <Link href={route('regions.edit', region.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Region
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('regions.index')}>View All Regions</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Region ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Region ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-mono text-2xl font-bold">#{region.id.toString().padStart(4, '0')}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
