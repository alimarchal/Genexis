import Heading from '@/components/heading';
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
        href: route('managements.index'),
    },
    {
        title: 'Create',
        href: route('managements.create'),
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
        post(route('managements.store'));
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
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Select value={data.title} onValueChange={(value) => setData('title', value === 'none' ? '' : value)}>
                                                <SelectTrigger id="title" className={errors.title ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Select title" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">None</SelectItem>
                                                    <SelectItem value="Mr.">Mr.</SelectItem>
                                                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                                                    <SelectItem value="Ms.">Ms.</SelectItem>
                                                    <SelectItem value="Dr.">Dr.</SelectItem>
                                                    <SelectItem value="Prof.">Prof.</SelectItem>
                                                    <SelectItem value="Syed">Syed</SelectItem>
                                                    <SelectItem value="Raja">Raja</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Full Name</Label>
                                            <Input
                                                id="full_name"
                                                type="text"
                                                value={data.full_name}
                                                onChange={(e) => setData('full_name', e.target.value)}
                                                className={errors.full_name ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="space-y-2">
                                            <Label htmlFor="designation">Designation</Label>
                                            <Input
                                                id="designation"
                                                type="text"
                                                value={data.designation}
                                                onChange={(e) => setData('designation', e.target.value)}
                                                className={errors.designation ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="space-y-2">
                                            <Label htmlFor="order">Display Order</Label>
                                            <Input
                                                id="order"
                                                type="number"
                                                value={data.order}
                                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                                className={errors.order ? 'border-red-500' : ''}
                                                min="0"
                                            />
                                            {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Second Row - 2 columns */}
                                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
                                            <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                                <SelectTrigger id="status" className={errors.status ? 'border-red-500' : ''}>
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

                                    <div>
                                        <div className="space-y-2">
                                            <Label htmlFor="attachment">Attachment (Image/PDF)</Label>
                                            <Input
                                                id="attachment"
                                                type="file"
                                                onChange={handleFileChange}
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                className={`cursor-pointer ${errors.attachment ? 'border-red-500' : ''}`}
                                            />
                                            <p className="text-muted-foreground text-xs">Supported formats: JPG, JPEG, PNG, PDF (Max: 2MB)</p>
                                            {errors.attachment && <p className="text-sm text-red-500">{errors.attachment}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Third Row - Full width */}
                                <div className="mb-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={4}
                                            placeholder="Enter member description..."
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('managements.index')}>Cancel</Link>
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
