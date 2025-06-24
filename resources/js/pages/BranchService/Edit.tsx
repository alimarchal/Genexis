import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Branch {
    id: number;
    name: string;
    code: string;
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
    branch: Branch;
}

interface Props {
    branchService: BranchService;
    branches: Branch[];
}

type BranchServiceForm = {
    branch_id: string;
    service_name: string;
    description: string;
    is_available: boolean;
    availability_hours: string;
    service_fee: string;
    status: 'active' | 'inactive';
};

export default function EditBranchService({ branchService, branches }: Props) {
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
        {
            title: 'Edit',
            href: route('branch-services.edit', branchService.id),
        },
    ];

    // Convert complex availability_hours object to simple string for editing
    const getAvailabilityHoursString = (availabilityHours: AvailabilityHours): string => {
        if (!availabilityHours) return '';

        // If it's already a string, return it
        if (typeof availabilityHours === 'string') {
            return availabilityHours;
        }

        // If it's an array, join it
        if (Array.isArray(availabilityHours)) {
            return availabilityHours.join(', ');
        }

        // If it's an object, process it
        if (typeof availabilityHours === 'object') {
            const days = Object.entries(availabilityHours)
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

            return days.join(', ');
        }

        return String(availabilityHours);
    };

    const { data, setData, put, processing, errors } = useForm<BranchServiceForm>({
        branch_id: branchService.branch_id.toString(),
        service_name: branchService.service_name,
        description: branchService.description || '',
        is_available: branchService.is_available,
        availability_hours: getAvailabilityHoursString(branchService.availability_hours),
        service_fee: branchService.service_fee || '',
        status: branchService.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('branch-services.update', branchService.id));
    };

    const handleAvailabilityHoursChange = (value: string) => {
        setData('availability_hours', value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${branchService.service_name}`} />

            <div className="px-10 py-6">
                <Heading title="Edit Branch Service" description="Update branch service information" />

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Service Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="service_name">Service Name *</Label>
                                            <Input
                                                id="service_name"
                                                value={data.service_name}
                                                onChange={(e) => setData('service_name', e.target.value)}
                                                placeholder="Enter service name"
                                                className={errors.service_name ? 'border-red-500' : ''}
                                            />
                                            {errors.service_name && <p className="text-sm text-red-500">{errors.service_name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="branch_id">Branch *</Label>
                                            <Select value={data.branch_id} onValueChange={(value) => setData('branch_id', value)}>
                                                <SelectTrigger className={errors.branch_id ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Select a branch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {branches.map((branch) => (
                                                        <SelectItem key={branch.id} value={branch.id.toString()}>
                                                            {branch.name} ({branch.code})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.branch_id && <p className="text-sm text-red-500">{errors.branch_id}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Enter service description"
                                            rows={4}
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Service Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Service Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="availability_hours">Availability Hours</Label>
                                            <Input
                                                id="availability_hours"
                                                value={data.availability_hours}
                                                onChange={(e) => handleAvailabilityHoursChange(e.target.value)}
                                                placeholder="e.g., Monday: 9:00 - 17:00, Tuesday: 9:00 - 17:00"
                                                className={errors.availability_hours ? 'border-red-500' : ''}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Enter availability hours in text format
                                            </p>
                                            {errors.availability_hours && <p className="text-sm text-red-500">{errors.availability_hours}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="service_fee">Service Fee (PKR)</Label>
                                            <Input
                                                id="service_fee"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.service_fee}
                                                onChange={(e) => setData('service_fee', e.target.value)}
                                                placeholder="0.00"
                                                className={errors.service_fee ? 'border-red-500' : ''}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Leave empty or 0 for free service
                                            </p>
                                            {errors.service_fee && <p className="text-sm text-red-500">{errors.service_fee}</p>}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_available"
                                                checked={data.is_available}
                                                onCheckedChange={(checked) => setData('is_available', checked as boolean)}
                                            />
                                            <Label htmlFor="is_available">Service Available</Label>
                                            {errors.is_available && <p className="text-sm text-red-500">{errors.is_available}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status *</Label>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value as 'active' | 'inactive')}>
                                                <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit Buttons */}
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Updating...' : 'Update Branch Service'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('branch-services.show', branchService.id)}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Current Service Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Current Service</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <p className="font-medium text-muted-foreground">Service ID</p>
                                    <p className="font-mono">{branchService.id}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Current Branch</p>
                                    <p>{branchService.branch.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Current Status</p>
                                    <p className="capitalize">{branchService.status}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Available</p>
                                    <p>{branchService.is_available ? 'Yes' : 'No'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Help Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Help</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <p className="font-medium text-muted-foreground">Service Name</p>
                                    <p>Enter a clear, descriptive name for the service</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Branch</p>
                                    <p>Select the branch where this service is offered</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Availability</p>
                                    <p>Specify when the service is available to customers</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Service Fee</p>
                                    <p>Set the fee in PKR. Leave empty for free services</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
