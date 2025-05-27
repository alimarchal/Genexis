import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

interface Management {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    description: string | null;
    attachment: string | null;
    attachment_url: string | null;
    order: number;
    status: 'active' | 'inactive';
}

interface Props {
    managment: Management;
}

type ManagementForm = {
    title: string;
    full_name: string;
    designation: string;
    description: string;
    attachment: File | null;
    order: number;
    status: 'active' | 'inactive';
    _method?: string;
};

export default function EditManagement({ managment }: Props) {
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
            title: 'Edit',
            href: route('managments.edit', managment.id),
        },
    ];

    const { data, setData, post, processing, errors } = useForm<ManagementForm>({
        title: managment.title || 'none',
        full_name: managment.full_name,
        designation: managment.designation,
        description: managment.description || '',
        attachment: null,
        order: managment.order,
        status: managment.status,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('managments.update', managment.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('attachment', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Management" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('managments.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Management
                        </Link>
                    </Button>
                </div>

                <Heading
                    title="Edit Management Member"
                    description="Update management member details and profile information"
                />

                <form onSubmit={submit} className="max-w-4xl">
                    <Card>
                        <CardContent className="pt-6">
                            {/* First Row - 4 columns */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Select value={data.title || 'none'} onValueChange={(value) => setData('title', value === 'none' ? '' : value)}>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Supported formats: JPG, JPEG, PNG, PDF (Max: 2MB)
                                    </p>
                                    {managment.attachment_url && !data.attachment && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            Current file: <a href={managment.attachment_url} target="_blank" rel="noopener noreferrer" className="underline">View attachment</a>
                                        </p>
                                    )}
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
                                    {processing ? 'Updating...' : 'Update Member'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}