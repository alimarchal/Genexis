import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, MapPin } from 'lucide-react';

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

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('regions.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Regions
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('regions.edit', region.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Region
                        </Link>
                    </Button>
                </div>

                <Heading title="Region Details" description="View complete information about this region" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Region Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Region Name</p>
                                        <p className="font-medium">{region.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={region.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {region.status}
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
                                        <p className="text-sm font-medium">{formatDate(region.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(region.updated_at)}</p>
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
