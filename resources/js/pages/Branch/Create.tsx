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
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

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
        title: 'Create',
        href: route('branches.create'),
    },
];

interface District {
    id: number;
    name: string;
    region: {
        id: number;
        name: string;
    };
}

interface Props {
    districts: District[];
}

type BranchForm = {
    name: string;
    code: string;
    address: string;
    district_id: string;
    status: 'active' | 'inactive';
};

export default function CreateBranch({ districts }: Props) {
    const { data, setData, post, processing, errors } = useForm<BranchForm>({
        name: '',
        code: '',
        address: '',
        district_id: '',
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('branches.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Branch" />

            <div className="px-10 py-6">
                <Heading title="Create Branch" description="Add a new branch to your organization" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <form onSubmit={submit} className="w-full">
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

                                {/* Second Row - 1 column */}
                                <div className="mb-6 grid grid-cols-1 gap-4">
                                    <div>
                                        <Label htmlFor="district_id">District</Label>
                                        <Select value={data.district_id} onValueChange={(value) => setData('district_id', value)}>
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
                                        {processing ? 'Creating...' : 'Create Branch'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
