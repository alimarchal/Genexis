import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building, Calendar, Edit, Hash, MapPin, Tag } from 'lucide-react';

interface Region {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
    region: Region;
}

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
    region_id: number;
    district_id: number;
    type: 'main' | 'sub' | 'agent';
    status: 'active' | 'inactive';
    district: District;
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

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge variant="default">Active</Badge>
        ) : (
            <Badge variant="secondary">Inactive</Badge>
        );
    };

    const getTypeBadge = (type: string) => {
        const typeMapping = {
            main: { variant: 'destructive' as const, label: 'Main Branch' },
            sub: { variant: 'default' as const, label: 'Sub Branch' },
            agent: { variant: 'outline' as const, label: 'Agent' },
        };

        const config = typeMapping[type as keyof typeof typeMapping] || {
            variant: 'outline' as const,
            label: type,
        };

        return (
            <Badge variant={config.variant} className="gap-1">
                <Building className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

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

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={branch.name} description="View branch details and information" />
                    <Button asChild>
                        <Link href={route('branches.edit', branch.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Branch
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                        <Building className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{branch.name}</CardTitle>
                                            <p className="text-muted-foreground mt-1">{branch.code}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {getStatusBadge(branch.status)}
                                            {getTypeBadge(branch.type)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="mb-2 font-semibold">Branch Information</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Branch Name</p>
                                                <p className="mt-1">{branch.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Branch Code</p>
                                                <p className="mt-1 font-mono">{branch.code}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Branch Type</p>
                                                <p className="mt-1 capitalize">{branch.type.replace('_', ' ')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                                <p className="mt-1 capitalize">{branch.status}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-semibold">Location Details</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Address</p>
                                                <p className="mt-1">{branch.address}</p>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">District</p>
                                                    <p className="mt-1">{branch.district.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Region</p>
                                                    <p className="mt-1">{branch.district.region.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-semibold">Timeline</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                                <p className="mt-1">{formatDate(branch.created_at)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                                <p className="mt-1">{formatDate(branch.updated_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Branch ID Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Hash className="h-4 w-4" />
                                    Branch ID
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{branch.id}</div>
                                <p className="text-sm text-muted-foreground">Internal identifier</p>
                            </CardContent>
                        </Card>

                        {/* Location Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <MapPin className="h-4 w-4" />
                                    Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Region</p>
                                    <p className="text-sm">{branch.district.region.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">District</p>
                                    <p className="text-sm">{branch.district.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                    <p className="text-sm">{branch.address}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Branch Details Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Tag className="h-4 w-4" />
                                    Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Code</p>
                                    <p className="text-sm font-mono">{branch.code}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                                    <p className="text-sm capitalize">{branch.type.replace('_', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <div className="mt-1">{getStatusBadge(branch.status)}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Calendar className="h-4 w-4" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                                    <p className="text-sm">{formatDate(branch.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Updated</p>
                                    <p className="text-sm">{formatDate(branch.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
