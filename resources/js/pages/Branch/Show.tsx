import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building, Calendar, Edit, Eye, Hash, MapPin, Trash } from 'lucide-react';

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
    district_id: number;
    district: {
        id: number;
        name: string;
        region: {
            id: number;
            name: string;
        };
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    branch: Branch;
}

export default function ShowBranch({ branch }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Branches',
            href: route('branches.index'),
        },
        {
            title: branch.name,
            href: route('branches.show', branch.id),
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
            <Head title={`${branch.name} - Branch`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('branches.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Branches
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('branches.edit', branch.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Branch
                        </Link>
                    </Button>
                </div>

                <Heading title="Branch Details" description="View complete information about this branch" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Branch Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">Branch Name</p>
                                        <p className="text-lg font-semibold">{branch.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">Branch Code</p>
                                        <p className="text-lg font-semibold">{branch.code}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">District</p>
                                        <p className="text-lg font-semibold">{branch.district?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">Region</p>
                                        <p className="text-lg font-semibold">{branch.district?.region?.name || 'N/A'}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Address</p>
                                    <p className="text-lg">{branch.address}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">Status</p>
                                    <Badge variant={branch.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                        {branch.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">Created At</p>
                                        <p className="text-lg">{formatDate(branch.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm font-medium">Last Updated</p>
                                        <p className="text-lg">{formatDate(branch.updated_at)}</p>
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
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                    <Link href={route('branches.show', branch.id)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                    <Link href={route('branches.edit', branch.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Branch
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 w-full justify-start">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Branch
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Branch ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Hash className="h-5 w-5" />
                                    Branch ID
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm font-medium">Internal ID</p>
                                <p className="text-2xl font-bold">{branch.id}</p>
                            </CardContent>
                        </Card>

                        {/* Location Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="h-5 w-5" />
                                    Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">District</p>
                                        <p className="font-semibold">{branch.district?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Region</p>
                                        <p className="font-semibold">{branch.district?.region?.name || 'N/A'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
