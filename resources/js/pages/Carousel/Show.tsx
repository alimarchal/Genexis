import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
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
    created_at: string;
    updated_at: string;
}

interface Props {
    carousel: Carousel;
}

export default function ShowCarousel({ carousel }: Props) {
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
            title: carousel.title,
            href: route('carousels.show', carousel.id),
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this carousel slide?')) {
            router.delete(route('carousels.destroy', carousel.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${carousel.title} - Carousel`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('carousels.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Carousel
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('carousels.edit', carousel.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Slide
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Heading title="Carousel Slide Details" description="View complete information about this carousel slide" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Slide Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Title</label>
                                        <p className="mt-1 font-medium">{carousel.title}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Display Order</label>
                                        <p className="mt-1 font-medium">{carousel.order}</p>
                                    </div>
                                </div>

                                {carousel.description && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                                        <p className="mt-1">{carousel.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Button Text</label>
                                        <p className="mt-1 font-medium">{carousel.button_text || 'No button text'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Button URL</label>
                                        <p className="mt-1 font-medium">{carousel.button_url || 'No button URL'}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">
                                        <Badge variant={carousel.status === 'active' ? 'default' : 'secondary'}>
                                            {carousel.status}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Created</label>
                                        <p className="mt-1">{formatDate(carousel.created_at)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                        <p className="mt-1">{formatDate(carousel.updated_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                    <Link href={route('carousels.edit', carousel.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Slide
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                    <Link href={route('carousels.create')}>
                                        Create New Slide
                                    </Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Slide
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Image Preview */}
                        {carousel.image_url && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Image Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={carousel.image_url}
                                        alt={carousel.title}
                                        className="w-full rounded-lg border object-cover"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Button Preview */}
                        {carousel.button_text && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Button Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 text-center">
                                        <Button>
                                            {carousel.button_text}
                                        </Button>
                                        {carousel.button_url && (
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Links to: {carousel.button_url}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
