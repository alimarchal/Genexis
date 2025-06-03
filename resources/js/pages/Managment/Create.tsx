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
        title: 'Management',
        href: route('managments.index'),
    },
    {
        title: 'Create',
        href: route('managments.create'),
    },
];

type ManagementForm = {
    title: string;
    full_name: string;
    designation: string;
    description: string;
    attachment: File | null;
    order: number;
    status: 'active' | 'inactive';
};

export default function CreateManagement() {
    const { data, setData, post, processing, errors } = useForm<ManagementForm>({
        title: 'none',
        full_name: '',
        designation: '',
        description: '',
        attachment: null,
        order: 0,
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('managments.store'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('attachment', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Management" />

            <div className="px-10 py-6">
                <Heading title="Create Management Member" description="Add a new management member with their details and profile information" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <form onSubmit={submit} className="w-full">
                        <Card>
                            <CardContent className="pt-6">
                                {/* First Row - 4 columns */}
                                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Select value={data.title} onValueChange={(value) => setData('title', value === 'none' ? '' : value)}>
                                            <SelectTrigger id="title">
                                                <SelectValue placeholder="Select title" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                <SelectItem value="Mr.">Mr.</SelectItem>
                                                <SelectItem value="Mrs.">Mrs.</SelectItem>
                                                <SelectItem value="Ms.">Ms.</SelectItem>
                                                <SelectItem value="Dr.">Dr.</SelectItem>
                                                <SelectItem value="Prof.">Prof.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label htmlFor="full_name">Full Name</Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.full_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label htmlFor="designation">Designation</Label>
                                        <Input
                                            id="designation"
                                            type="text"
                                            value={data.designation}
                                            onChange={(e) => setData('designation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.designation} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label htmlFor="order">Display Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            min="0"
                                        />
                                        <InputError message={errors.order} className="mt-2" />
                                    </div>
                                </div>

                                {/* Second Row - 2 columns */}
                                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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

                                    <div>
                                        <Label htmlFor="attachment">Attachment (Image/PDF)</Label>
                                        <Input
                                            id="attachment"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            className="cursor-pointer"
                                        />
                                        <p className="text-muted-foreground mt-1 text-xs">Supported formats: JPG, JPEG, PNG, PDF (Max: 2MB)</p>
                                        <InputError message={errors.attachment} className="mt-2" />
                                    </div>
                                </div>

                                {/* Third Row - Full width */}
                                <div className="mb-6">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        placeholder="Enter member description..."
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('managments.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing ? 'Creating...' : 'Create Member'}
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
