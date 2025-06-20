import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Carousel',
        href: route('carousels.index'),
    },
    {
        title: 'Create',
        href: route('carousels.create'),
    },
];

type CarouselForm = {
    title: string;
    description: string;
    image: File | null;
    button_text: string;
    button_url: string;
    order: number;
    status: 'active' | 'inactive';
};

export default function CreateCarousel() {
    const [fileError, setFileError] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<CarouselForm>({
        title: '',
        description: '',
        image: null,
        button_text: '',
        button_url: '',
        order: 0,
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('carousels.store'), {
            onError: (errors) => {
                console.log('Form validation errors:', errors);
            },
            onSuccess: () => {
                console.log('Form submitted successfully');
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileError(null); // Clear any previous file errors

        if (file) {
            // Check file size (2MB = 2048KB = 2048 * 1024 bytes)
            const maxSize = 2048 * 1024; // 2MB in bytes
            if (file.size > maxSize) {
                setFileError('File size is too large. Maximum size allowed is 2MB.');
                e.target.value = ''; // Clear the input
                return;
            }

            // Check file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                setFileError('Invalid file type. Only JPG, JPEG, and PNG files are allowed.');
                e.target.value = ''; // Clear the input
                return;
            }
        }

        setData('image', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Carousel Slide" />

            <div className="px-10 py-6">
                <Heading title="Create Carousel Slide" description="Add a new slide to your website carousel" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <form onSubmit={submit} className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Slide Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title and Order */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="md:col-span-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title *</Label>
                                            <Input
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Enter slide title"
                                                className={errors.title ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
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
                                                placeholder="0"
                                                className={errors.order ? 'border-red-500' : ''}
                                                min="0"
                                            />
                                            {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        placeholder="Enter slide description..."
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image *</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/jpg,image/png"
                                        className={errors.image || fileError ? 'border-red-500' : ''}
                                        required
                                    />
                                    <p className="text-muted-foreground text-sm">Upload JPG, JPEG, or PNG. Max file size: 2MB</p>
                                    {fileError && <p className="text-sm text-red-500">{fileError}</p>}
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>

                                {/* Button Text and URL */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="button_text">Button Text</Label>
                                        <Input
                                            id="button_text"
                                            type="text"
                                            value={data.button_text}
                                            onChange={(e) => setData('button_text', e.target.value)}
                                            placeholder="e.g., Learn More"
                                            className={errors.button_text ? 'border-red-500' : ''}
                                        />
                                        {errors.button_text && <p className="text-sm text-red-500">{errors.button_text}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="button_url">Button URL</Label>
                                        <Input
                                            id="button_url"
                                            type="text"
                                            value={data.button_url}
                                            onChange={(e) => setData('button_url', e.target.value)}
                                            placeholder="e.g., /products"
                                            className={errors.button_url ? 'border-red-500' : ''}
                                        />
                                        {errors.button_url && <p className="text-sm text-red-500">{errors.button_url}</p>}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
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

                                {/* Submit Button */}
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('carousels.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Slide'}
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
