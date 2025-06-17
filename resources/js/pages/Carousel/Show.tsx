import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';

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

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={carousel.title} description="View carousel slide details" />
                    <Button asChild>
                        <Link href={route('carousels.edit', carousel.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Slide
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">{carousel.title}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={carousel.status === 'active' ? 'default' : 'secondary'}>{carousel.status}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Slide Image */}
                                {carousel.image_url && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Slide Image</h3>
                                        <img src={carousel.image_url} alt={carousel.title} className="w-full rounded-lg border object-cover" />
                                    </div>
                                )}

                                {/* Description */}
                                {carousel.description && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Description</h3>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{carousel.description}</p>
                                    </div>
                                )}

                                {/* Button Preview */}
                                {carousel.button_text && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Button Preview</h3>
                                        <div className="border-muted-foreground/25 rounded-lg border-2 border-dashed p-4 text-center">
                                            <Button>{carousel.button_text}</Button>
                                            {carousel.button_url && (
                                                <p className="text-muted-foreground mt-2 text-xs">Links to: {carousel.button_url}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Timestamps */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Timestamps</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">Created</label>
                                            <p className="mt-1">{formatDate(carousel.created_at)}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-sm font-medium">Last Updated</label>
                                            <p className="mt-1">{formatDate(carousel.updated_at)}</p>
                                        </div>
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
                                    <Link href={route('carousels.create')}>Create New Slide</Link>
                                </Button>
                                <Button variant="destructive" size="sm" className="w-full justify-start" onClick={handleDelete}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Slide
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Slide Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Slide Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-muted-foreground text-sm font-medium">Display Order</label>
                                    <p className="mt-1 font-medium">{carousel.order}</p>
                                </div>
                                <div>
                                    <label className="text-muted-foreground text-sm font-medium">Status</label>
                                    <div className="mt-1">
                                        <Badge variant={carousel.status === 'active' ? 'default' : 'secondary'}>{carousel.status}</Badge>
                                    </div>
                                </div>
                                {carousel.button_text && (
                                    <div>
                                        <label className="text-muted-foreground text-sm font-medium">Button Text</label>
                                        <p className="mt-1 font-medium">{carousel.button_text}</p>
                                    </div>
                                )}
                                {carousel.button_url && (
                                    <div>
                                        <label className="text-muted-foreground text-sm font-medium">Button URL</label>
                                        <p className="mt-1 font-medium">{carousel.button_url}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
