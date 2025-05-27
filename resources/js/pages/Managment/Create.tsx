import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Management', href: '/managment' },
    { title: 'Create', href: '/managment/create' },
];

interface FormData {
    title: string;
    full_name: string;
    designation: string;
    description: string;
    attachment: File | null;
    order: number;
    status: 'active' | 'inactive';
}

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        title: '',
        full_name: '',
        designation: '',
        description: '',
        attachment: null,
        order: 0,
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('managment.store'));
    };

    const titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Management Member" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Create Management Member
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6 max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Select value={data.title} onValueChange={(value) => setData('title', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select title" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {titles.map((title) => (
                                                <SelectItem key={title} value={title}>
                                                    {title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.title} />
                                </div>

                                <div className="md:col-span-3 space-y-2">
                                    <Label htmlFor="full_name">Full Name *</Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="Enter full name"
                                        required
                                    />
                                    <InputError message={errors.full_name} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="designation">Designation *</Label>
                                <Input
                                    id="designation"
                                    type="text"
                                    value={data.designation}
                                    onChange={(e) => setData('designation', e.target.value)}
                                    placeholder="Enter designation"
                                    required
                                />
                                <InputError message={errors.designation} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter description"
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="attachment">Photo/Attachment</Label>
                                <Input
                                    id="attachment"
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setData('attachment', e.target.files?.[0] || null)}
                                />
                                <p className="text-sm text-gray-500">
                                    Supported formats: JPG, JPEG, PNG, PDF (Max: 2MB)
                                </p>
                                <InputError message={errors.attachment} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        placeholder="Enter display order"
                                        min="0"
                                    />
                                    <InputError message={errors.order} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Management Member'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}