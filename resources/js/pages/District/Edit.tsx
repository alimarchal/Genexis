import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Region {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
    region_id: number;
    status: 'active' | 'inactive';
}

interface Props {
    district: District;
    regions: Region[];
}

export default function Edit({ district, regions }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Districts',
            href: route('districts.index'),
        },
        {
            title: district.name,
            href: route('districts.show', district.id),
        },
        {
            title: 'Edit',
            href: '',
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: district.name,
        region_id: district.region_id.toString(),
        status: district.status as 'active' | 'inactive',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('districts.update', district.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit District - ${district.name}`} />

            <div className="px-10 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Edit District" description={`Update ${district.name} information`} />
                    <Link href={route('districts.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Districts
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>District Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">District Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter district name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region_id">Region</Label>
                                <Select value={data.region_id} onValueChange={(value) => setData('region_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region) => (
                                            <SelectItem key={region.id} value={region.id.toString()}>
                                                {region.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.region_id} />
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

                            <div className="flex items-center space-x-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update District'}
                                </Button>
                                <Link href={route('districts.show', district.id)}>
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
