import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

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
    region_id: number;
    type: 'main_branch' | 'sub_branch' | 'atm' | 'service_center' | 'mobile_unit';
    status: 'active' | 'inactive';
}

interface Props {
    branch: Branch;
    districts: District[];
}

type BranchForm = {
    name: string;
    code: string;
    address: string;
    district_id: string;
    region_id: string;
    type: 'main_branch' | 'sub_branch' | 'atm' | 'service_center' | 'mobile_unit';
    status: 'active' | 'inactive';
    _method?: string;
};

export default function EditBranch({ branch, districts }: Props) {
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
            title: 'Edit',
            href: route('branches.edit', branch.id),
        },
    ];

    const { data, setData, processing, errors } = useForm<BranchForm>({
        name: branch.name,
        code: branch.code,
        address: branch.address,
        district_id: branch.district_id.toString(),
        region_id: branch.region_id.toString(),
        type: branch.type,
        status: branch.status,
        _method: 'PUT',
    });

    const handleDistrictChange = (districtId: string) => {
        const selectedDistrict = districts.find(d => d.id.toString() === districtId);
        setData({
            ...data,
            district_id: districtId,
            region_id: selectedDistrict?.region.id.toString() || '',
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('branches.update', branch.id), {
            ...data,
            _method: 'PUT',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Branch" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('branches.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Branches
                        </Link>
                    </Button>
                </div>

                <Heading title="Edit Branch" description="Update branch details and information" />

                <form onSubmit={submit} className="max-w-4xl">
                    <Card>
                        <CardContent className="pt-6">
                            {/* First Row - 3 columns */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="name">Branch Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter branch name"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="code">Branch Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder="Enter branch code"
                                        required
                                    />
                                    <InputError message={errors.code} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>

                            {/* Second Row - 2 columns */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="district_id">District</Label>
                                    <Select value={data.district_id} onValueChange={handleDistrictChange}>
                                        <SelectTrigger id="district_id">
                                            <SelectValue placeholder="Select district" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {districts.map((district) => (
                                                <SelectItem key={district.id} value={district.id.toString()}>
                                                    {district.name} ({district.region.name})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.district_id} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="type">Branch Type</Label>
                                    <Select value={data.type} onValueChange={(value: 'main_branch' | 'sub_branch' | 'atm' | 'service_center' | 'mobile_unit') => setData('type', value)}>
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select branch type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="main_branch">Main Branch</SelectItem>
                                            <SelectItem value="sub_branch">Sub Branch</SelectItem>
                                            <SelectItem value="atm">ATM</SelectItem>
                                            <SelectItem value="service_center">Service Center</SelectItem>
                                            <SelectItem value="mobile_unit">Mobile Unit</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>
                            </div>

                            {/* Third Row - Full width */}
                            <div className="mb-6">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={4}
                                    placeholder="Enter branch address..."
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

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
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
