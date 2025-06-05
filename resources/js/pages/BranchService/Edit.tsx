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
import { ArrowLeft } from 'lucide-react';

interface Branch {
    id: number;
    name: string;
    code: string;
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
    branch: Branch;
}

interface Props {
    branchService: BranchService;
    branches: Branch[];
}

export default function Edit({ branchService, branches }: Props) {
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
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        service_name: branchService.service_name,
        description: branchService.description || '',
        branch_id: branchService.branch_id.toString(),
        is_available: branchService.is_available,
        availability_hours: branchService.availability_hours || '',
        service_fee: branchService.service_fee || '',
        status: branchService.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('branch-services.update', branchService.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${branchService.service_name}`} />

            <div className="flex items-center justify-between mb-6">
                <Heading level={1}>Edit Branch Service</Heading>
                <div className="flex items-center space-x-2">
                    <Link href={route('branch-services.show', branchService.id)}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Service
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="max-w-4xl">
                <CardHeader>
                    <CardTitle>Update Branch Service Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="service_name">Service Name</Label>
                                <Input
                                    id="service_name"
                                    type="text"
                                    value={data.service_name}
                                    onChange={(e) => setData('service_name', e.target.value)}
                                    placeholder="Enter service name"
                                    className={errors.service_name ? 'border-red-500' : ''}
                                />
                                {errors.service_name && (
                                    <p className="text-sm text-red-600">{errors.service_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="branch_id">Branch</Label>
                                <Select value={data.branch_id} onValueChange={(value) => setData('branch_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map((branch) => (
                                            <SelectItem key={branch.id} value={branch.id.toString()}>
                                                {branch.name} ({branch.code})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.branch_id && (
                                    <p className="text-sm text-red-600">{errors.branch_id}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter service description"
                                className={errors.description ? 'border-red-500' : ''}
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="availability_hours">Availability Hours</Label>
                                <Input
                                    id="availability_hours"
                                    type="text"
                                    value={data.availability_hours}
                                    onChange={(e) => setData('availability_hours', e.target.value)}
                                    placeholder="e.g., Monday-Friday 9:00 AM - 5:00 PM"
                                    className={errors.availability_hours ? 'border-red-500' : ''}
                                />
                                {errors.availability_hours && (
                                    <p className="text-sm text-red-600">{errors.availability_hours}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="service_fee">Service Fee (PKR)</Label>
                                <Input
                                    id="service_fee"
                                    type="number"
                                    step="0.01"
                                    value={data.service_fee}
                                    onChange={(e) => setData('service_fee', e.target.value)}
                                    placeholder="Enter service fee (leave blank if free)"
                                    className={errors.service_fee ? 'border-red-500' : ''}
                                />
                                {errors.service_fee && (
                                    <p className="text-sm text-red-600">{errors.service_fee}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_available"
                                    checked={data.is_available}
                                    onCheckedChange={(checked) => setData('is_available', checked as boolean)}
                                />
                                <Label htmlFor="is_available">Service Available</Label>
                                {errors.is_available && (
                                    <p className="text-sm text-red-600">{errors.is_available}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Branch Service'}
                            </Button>
                            <Link href={route('branch-services.show', branchService.id)}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
