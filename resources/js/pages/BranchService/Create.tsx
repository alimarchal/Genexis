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
        title: 'Create',
    },
];

interface Branch {
    id: number;
    name: string;
    code: string;
}

interface Props {
    branches: Branch[];
}

export default function Create({ branches }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        service_name: '',
        description: '',
        branch_id: undefined as string | undefined,
        is_available: true,
        availability_hours: '',
        service_fee: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('branch-services.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Branch Service" />

            <div className="flex items-center justify-between mb-6">
                <Heading level={1}>Create Branch Service</Heading>
                <Link href={route('branch-services.index')}>
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Branch Services
                    </Button>
                </Link>
            </div>

            <Card className="max-w-4xl">
                <CardHeader>
                    <CardTitle>Branch Service Information</CardTitle>
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
                                <Select value={data.branch_id || ''} onValueChange={(value) => setData('branch_id', value)}>
                                    <SelectTrigger>
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
                                {processing ? 'Creating...' : 'Create Branch Service'}
                            </Button>
                            <Link href={route('branch-services.index')}>
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
