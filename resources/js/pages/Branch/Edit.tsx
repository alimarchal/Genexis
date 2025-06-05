import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface District {
    id: number;
    name: string;
    region: {
        id: number;
        name: string;
    };
}

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
    district_id: number;
    status: 'active' | 'inactive';
}

interface Props {
    branch: Branch;
    districts: District[];
}

export default function Edit({ branch, districts }: Props) {
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
        {
            title: 'Edit',
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: branch.name,
        code: branch.code,
        address: branch.address,
        district_id: branch.district_id.toString(),
        status: branch.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('branches.update', branch.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Branch - ${branch.name}`} />

            <div className="flex items-center justify-between mb-6">
                <Heading level={1}>Edit Branch</Heading>
                <Link href={route('branches.index')}>
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Branches
                    </Button>
                </Link>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Branch Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Branch Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter branch name"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code">Branch Code</Label>
                            <Input
                                id="code"
                                type="text"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="Enter branch code"
                                className={errors.code ? 'border-red-500' : ''}
                            />
                            {errors.code && (
                                <p className="text-sm text-red-600">{errors.code}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Enter branch address"
                                className={errors.address ? 'border-red-500' : ''}
                                rows={3}
                            />
                            {errors.address && (
                                <p className="text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="district_id">District</Label>
                            <Select value={data.district_id} onValueChange={(value) => setData('district_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a district" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districts.map((district) => (
                                        <SelectItem key={district.id} value={district.id.toString()}>
                                            {district.name} ({district.region.name})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.district_id && (
                                <p className="text-sm text-red-600">{errors.district_id}</p>
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

                        <div className="flex items-center space-x-2 pt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Branch'}
                            </Button>
                            <Link href={route('branches.show', branch.id)}>
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
