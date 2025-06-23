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
import { Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Region {
    id: number;
    name: string;
}

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
    region_id: number;
    district_id: number;
    type: 'main' | 'sub' | 'agent';
    status: 'active' | 'inactive';
}

interface Props {
    branch: Branch;
    regions: Region[];
    districts: District[];
}

type BranchForm = {
    name: string;
    code: string;
    address: string;
    region_id: string;
    district_id: string;
    type: 'main' | 'sub' | 'agent';
    status: 'active' | 'inactive';
};

export default function EditBranch({ branch, regions, districts }: Props) {
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
            href: route('branches.edit', branch.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm<BranchForm>({
        name: branch.name,
        code: branch.code,
        address: branch.address,
        region_id: branch.region_id.toString(),
        district_id: branch.district_id.toString(),
        type: branch.type,
        status: branch.status,
    });

    const [selectedRegion, setSelectedRegion] = useState(branch.region_id.toString());

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('branches.update', branch.id));
    };

    const handleRegionChange = (value: string) => {
        setSelectedRegion(value);
        setData('region_id', value);
        setData('district_id', ''); // Reset district when region changes
    };

    // Filter districts based on selected region
    const filteredDistricts = selectedRegion
        ? districts.filter(district => district.region.id.toString() === selectedRegion)
        : districts;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${branch.name}`} />

            <div className="px-10 py-6">
                <Heading title={`Edit Branch: ${branch.name}`} description="Update branch information" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Branch Name */}
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
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Branch Code */}
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
                                        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Branch Type</Label>
                                        <Select value={data.type} onValueChange={(value: 'main' | 'sub' | 'agent') => setData('type', value)}>
                                            <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select branch type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="main">Main Branch</SelectItem>
                                                <SelectItem value="sub">Sub Branch</SelectItem>
                                                <SelectItem value="agent">Agent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                            <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select status" />
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

                        {/* Location Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Location Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Region */}
                                    <div className="space-y-2">
                                        <Label htmlFor="region_id">Region</Label>
                                        <Select value={data.region_id} onValueChange={handleRegionChange}>
                                            <SelectTrigger className={errors.region_id ? 'border-red-500' : ''}>
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
                                        {errors.region_id && <p className="text-sm text-red-500">{errors.region_id}</p>}
                                    </div>

                                    {/* District */}
                                    <div className="space-y-2">
                                        <Label htmlFor="district_id">District</Label>
                                        <Select
                                            value={data.district_id}
                                            onValueChange={(value) => setData('district_id', value)}
                                            disabled={!selectedRegion}
                                        >
                                            <SelectTrigger className={errors.district_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder={selectedRegion ? "Select a district" : "Select a region first"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredDistricts.map((district) => (
                                                    <SelectItem key={district.id} value={district.id.toString()}>
                                                        {district.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.district_id && <p className="text-sm text-red-500">{errors.district_id}</p>}
                                    </div>
                                </div>

                                {/* Address - Full width */}
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={4}
                                        placeholder="Enter branch address..."
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('branches.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Branch'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
