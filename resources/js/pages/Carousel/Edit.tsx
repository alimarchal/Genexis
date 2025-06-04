import { FormEventHandler } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputError } from '@/components/InputError';
import { Heading } from '@/components/ui/heading';
import { BreadcrumbItem } from '@/types';

interface Carousel {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
    button_text: string | null;
    button_url: string | null;
    order: number;
    status: 'active' | 'inactive';
}

interface Props {
    carousel: Carousel;
}

type CarouselForm = {
    title: string;
    description: string;
    image: File | null;
    button_text: string;
    button_url: string;
    order: number;
    status: 'active' | 'inactive';
    _method?: string;
};

export default function EditCarousel({ carousel }: Props) {
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
            title: 'Edit',
            href: route('carousels.edit', carousel.id),
        },
    ];

    const { data, setData, processing, errors } = useForm<CarouselForm>({
        title: carousel.title,
        description: carousel.description || '',
        image: null,
        button_text: carousel.button_text || '',
        button_url: carousel.button_url || '',
        order: carousel.order,
        status: carousel.status,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('carousels.update', carousel.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Carousel Slide" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('carousels.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Carousel
                        </Link>
                    </Button>
                </div>

                <Heading title="Edit Carousel Slide" description="Update carousel slide details and content" />

                <form onSubmit={submit} className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Slide Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title and Order */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter slide title"
                                        className="mt-1"
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        className="mt-1"
                                        min="0"
                                    />
                                    <InputError message={errors.order} className="mt-2" />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Enter slide description..."
                                    className="mt-1"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Current Image and Upload */}
                            <div>
                                <Label htmlFor="image">Image</Label>
                                {carousel.image_url && (
                                    <div className="mt-2 mb-4">
                                        <p className="text-sm text-muted-foreground mb-2">Current Image:</p>
                                        <img
                                            src={carousel.image_url}
                                            alt={carousel.title}
                                            className="h-32 w-48 object-cover rounded border"
                                        />
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="mt-1"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Upload JPG, JPEG, or PNG to replace current image. Max file size: 2MB
                                </p>
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            {/* Button Text and URL */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="button_text">Button Text</Label>
                                    <Input
                                        id="button_text"
                                        type="text"
                                        value={data.button_text}
                                        onChange={(e) => setData('button_text', e.target.value)}
                                        placeholder="e.g., Learn More"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.button_text} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="button_url">Button URL</Label>
                                    <Input
                                        id="button_url"
                                        type="text"
                                        value={data.button_url}
                                        onChange={(e) => setData('button_url', e.target.value)}
                                        placeholder="e.g., /products"
                                        className="mt-1"
                                    />
                                    <InputError message={errors.button_url} className="mt-2" />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <Label htmlFor="status">Status *</Label>
                                <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('carousels.index')}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Slide'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
