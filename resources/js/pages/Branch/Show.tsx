import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building, Calendar, Edit, MapPin } from 'lucide-react';

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
                                        <p className="text-muted-foreground text-sm">Branch Name</p>
                                        <p className="font-medium">{branch.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Branch Code</p>
                                        <p className="font-medium font-mono">{branch.code}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">District</p>
                                        <p className="font-medium">{branch.district.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Region</p>
                                        <p className="font-medium">{branch.district.region.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={branch.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {branch.status}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <p className="text-muted-foreground mb-2 text-sm">Address</p>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{branch.address}</p>
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
                                        <p className="text-sm font-medium">{formatDate(branch.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(branch.updated_at)}</p>
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
                                    <Building className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('branches.edit', branch.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Branch
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('branches.index')}>View All Branches</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Branch ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Branch ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-mono text-2xl font-bold">#{branch.id.toString().padStart(4, '0')}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
