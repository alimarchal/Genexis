import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building, Calendar, DollarSign, Edit, Hash, Settings } from 'lucide-react';

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
}

type AvailabilityHours = string | string[] | Record<string, string[] | null> | null;

interface BranchService {
    id: number;
    service_name: string;
    description: string;
    branch_id: number;
    is_available: boolean;
    availability_hours: AvailabilityHours;
    service_fee: string | null;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    branch: Branch;
}

interface Props {
    branchService: BranchService;
}

export default function ShowBranchService({ branchService }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Branch Services',
            href: route('branch-services.index'),
        },
        {
            title: branchService.service_name,
            href: route('branch-services.show', branchService.id),
        },
    ];

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge variant="default">Active</Badge>
        ) : (
            <Badge variant="secondary">Inactive</Badge>
        );
    };

    const getAvailabilityBadge = (isAvailable: boolean) => {
        return isAvailable ? (
            <Badge variant="default" className="gap-1">
                <Settings className="h-3 w-3" />
                Available
            </Badge>
        ) : (
            <Badge variant="outline" className="gap-1">
                <Settings className="h-3 w-3" />
                Unavailable
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

    const getServiceFee = () => {
        if (!branchService.service_fee || parseFloat(branchService.service_fee) === 0) {
            return 'Free';
        }
        return `PKR ${parseFloat(branchService.service_fee).toLocaleString()}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${branchService.service_name} - Branch Service`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={branchService.service_name} description="View branch service details and information" />
                    <Button asChild>
                        <Link href={route('branch-services.edit', branchService.id)}>
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
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                        <Settings className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{branchService.service_name}</CardTitle>
                                            <p className="text-muted-foreground mt-1">Offered at {branchService.branch.name}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {getStatusBadge(branchService.status)}
                                            {getAvailabilityBadge(branchService.is_available)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="mb-2 font-semibold">Service Information</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Service Name</p>
                                                <p className="mt-1">{branchService.service_name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Branch</p>
                                                <p className="mt-1">{branchService.branch.name} ({branchService.branch.code})</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                                <p className="mt-1 capitalize">{branchService.status}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Available</p>
                                                <p className="mt-1">{branchService.is_available ? 'Yes' : 'No'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {branchService.description && (
                                        <>
                                            <Separator />
                                            <div>
                                                <h4 className="mb-2 font-semibold">Description</h4>
                                                <p className="text-sm leading-relaxed">{branchService.description}</p>
                                            </div>
                                        </>
                                    )}

                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-semibold">Service Details</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Service Fee</p>
                                                <p className="mt-1 font-semibold">{getServiceFee()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Availability Hours</p>
                                                <p className="mt-1">
                                                    {(() => {
                                                        if (!branchService.availability_hours) return 'Not specified';

                                                        // If it's already a string, return it
                                                        if (typeof branchService.availability_hours === 'string') {
                                                            return branchService.availability_hours;
                                                        }

                                                        // If it's an array, join it
                                                        if (Array.isArray(branchService.availability_hours)) {
                                                            return branchService.availability_hours.join(', ');
                                                        }

                                                        // If it's an object, process it
                                                        if (typeof branchService.availability_hours === 'object') {
                                                            const days = Object.entries(branchService.availability_hours)
                                                                .filter(([, hours]) => hours !== null && hours !== undefined)
                                                                .map(([day, hours]) => {
                                                                    if (Array.isArray(hours)) {
                                                                        if (hours.length >= 2) {
                                                                            return `${day}: ${hours[0]} - ${hours[1]}`;
                                                                        }
                                                                        return `${day}: ${hours.join(', ')}`;
                                                                    }
                                                                    return `${day}: ${hours}`;
                                                                });

                                                            return days.join(', ') || 'Not specified';
                                                        }

                                                        return String(branchService.availability_hours);
                                                    })()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-semibold">Branch Information</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Branch Address</p>
                                                <p className="mt-1">{branchService.branch.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-semibold">Timeline</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                                <p className="mt-1">{formatDate(branchService.created_at)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                                <p className="mt-1">{formatDate(branchService.updated_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Service ID Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Hash className="h-4 w-4" />
                                    Service ID
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{branchService.id}</div>
                                <p className="text-sm text-muted-foreground">Internal identifier</p>
                            </CardContent>
                        </Card>

                        {/* Branch Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Building className="h-4 w-4" />
                                    Branch
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                                    <p className="text-sm">{branchService.branch.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Code</p>
                                    <p className="text-sm font-mono">{branchService.branch.code}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                    <p className="text-sm">{branchService.branch.address}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Details Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <DollarSign className="h-4 w-4" />
                                    Service Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Fee</p>
                                    <p className="text-sm font-semibold">{getServiceFee()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Available</p>
                                    <div className="mt-1">{getAvailabilityBadge(branchService.is_available)}</div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <div className="mt-1">{getStatusBadge(branchService.status)}</div>
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
                                    <p className="text-sm">{formatDate(branchService.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Updated</p>
                                    <p className="text-sm">{formatDate(branchService.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
