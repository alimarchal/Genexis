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
        title: 'Regions',
        href: route('regions.index'),
    },
    {
        title: 'Create',
        href: route('regions.create'),
    },
];

type RegionForm = {
    name: string;
    status: 'active' | 'inactive';
    description: string;
};

export default function CreateRegion() {
    const { data, setData, post, processing, errors } = useForm<RegionForm>({
        name: '',
        status: 'active',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('regions.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Region" />

            <div className="px-10 py-6">
                <Heading title="Create Region" description="Add a new region to your organization" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <form onSubmit={submit} className="w-full">
                        <Card>
                            <CardContent className="pt-6">
                                {/* First Row - 2 columns */}
                                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">Region Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter region name"
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
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

                                {/* Second Row - Full width */}
                                <div className="mb-6">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        placeholder="Enter region description..."
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('regions.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing ? 'Creating...' : 'Create Region'}
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
