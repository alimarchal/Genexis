import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Building, Clock, DollarSign, Edit, Hash, Settings, Trash2 } from 'lucide-react';

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
}

interface BranchService {
    id: number;
    service_name: string;
    description: string;
    branch_id: number;
    is_available: boolean;
    availability_hours: string;
    service_fee: string;
    status: string;
    created_at: string;
    updated_at: string;
    branch: Branch;
}

interface Props {
    branchService: BranchService;
}

export default function Show({ branchService }: Props) {
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
            href: '',
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

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this branch service?')) {
            router.delete(route('branch-services.destroy', branchService.id));
        }
    };

    const getServiceFee = () => {
        if (!branchService.service_fee || parseFloat(branchService.service_fee) === 0) {
            return 'Free';
        }
        return `PKR ${parseFloat(branchService.service_fee).toLocaleString()}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${branchService.service_name} - Branch Service Details`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title="Branch Service Details" description="View complete information about this branch service" />
                    <div className="flex items-center space-x-2">
                        <Link href={route('branch-services.edit', branchService.id)}>
                            <Button>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Service
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                        <Link href={route('branch-services.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Services
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Service Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Service Name</p>
                                        <p className="text-lg font-medium">{branchService.service_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Service Fee</p>
                                        <p className="text-lg font-medium">{getServiceFee()}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={branchService.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {branchService.status === 'active' ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Availability</p>
                                        <Badge variant={branchService.is_available ? 'default' : 'destructive'} className="mt-1">
                                            {branchService.is_available ? 'Available' : 'Not Available'}
                                        </Badge>
                                    </div>
                                </div>

                                {branchService.description && (
                                    <div className="border-t pt-4">
                                        <p className="text-muted-foreground mb-2 text-sm">Description</p>
                                        <p className="text-sm leading-relaxed">{branchService.description}</p>
                                    </div>
                                )}

                                {branchService.availability_hours && (
                                    <div className="border-t pt-4">
                                        <p className="text-muted-foreground mb-2 text-sm">Availability Hours</p>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-sm">{branchService.availability_hours}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Branch Information */}
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
                                        <p className="font-medium">{branchService.branch.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Branch Code</p>
                                        <p className="font-mono font-medium">{branchService.branch.code}</p>
                                    </div>
                                </div>
                                {branchService.branch.address && (
                                    <div className="border-t pt-4">
                                        <p className="text-muted-foreground mb-2 text-sm">Address</p>
                                        <p className="text-sm">{branchService.branch.address}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hash className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Created At</p>
                                        <p className="text-sm font-medium">{formatDate(branchService.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(branchService.updated_at)}</p>
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
                                    <Settings className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('branch-services.edit', branchService.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Service
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('branch-services.index')}>View All Services</Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('branches.show', branchService.branch.id)}>
                                        <Building className="mr-2 h-4 w-4" />
                                        View Branch
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Service Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Service Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">Service Fee</span>
                                        <span className="font-medium">{getServiceFee()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">Service ID</span>
                                        <span className="font-mono text-sm">#{branchService.id.toString().padStart(4, '0')}</span>
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
