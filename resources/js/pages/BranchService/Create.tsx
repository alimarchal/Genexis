import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
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
        href: '',
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
        is_available: true as boolean,
        availability_hours: '',
        service_fee: '',
        status: 'active' as 'active' | 'inactive',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('branch-services.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Branch Service" />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title="Create Branch Service" description="Add a new service to a branch" />
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
                                    />
                                    <InputError message={errors.service_name} />
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
                                    <InputError message={errors.branch_id} />
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
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="availability_hours">Availability Hours</Label>
                                    <Input
                                        id="availability_hours"
                                        type="text"
                                        value={data.availability_hours}
                                        onChange={(e) => setData('availability_hours', e.target.value)}
                                        placeholder="e.g., 9:00 AM - 5:00 PM"
                                    />
                                    <InputError message={errors.availability_hours} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="service_fee">Service Fee</Label>
                                    <Input
                                        id="service_fee"
                                        type="text"
                                        value={data.service_fee}
                                        onChange={(e) => setData('service_fee', e.target.value)}
                                        placeholder="Enter service fee (optional)"
                                    />
                                    <InputError message={errors.service_fee} />
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
                                    <InputError message={errors.is_available} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value as 'active' | 'inactive')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
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
            </div>
        </AppLayout>
    );
}
