import AuditInfo from '@/components/audit-info';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface Record {
    id: number;
    title: string;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    creator?: { name: string } | null;
    updater?: { name: string } | null;
    description: string | null;
    photos: { id: number; image_url: string | null; caption: string | null }[];
}

export default function ShowGalleryAlbum({ album }: { album: Record }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Photo Gallery', href: route('gallery-albums.index') },
        { title: album.title, href: route('gallery-albums.show', album.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={album.title} />

            <div className="px-10 py-6">
                <div className="flex items-start justify-between">
                    <Heading title={album.title} description="Display order {album.order}" />
                    <Button asChild>
                        <Link href={route('gallery-albums.edit', album.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>

                <div className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                Details
                                <Badge variant={album.status === 'active' ? 'default' : 'secondary'}>{album.status}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {album.description && <p className="text-sm text-gray-700">{album.description}</p>}
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {album.photos.map((photo) => (
                                    <div key={photo.id}>
                                        {photo.image_url && (
                                            <img src={photo.image_url} alt={photo.caption ?? ''} className="h-28 w-full rounded-md object-cover" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            {album.photos.length === 0 && <p className="text-sm text-gray-500">No photos uploaded yet.</p>}
                        </CardContent>
                    </Card>

                    <AuditInfo record={album} />
                </div>
            </div>
        </AppLayout>
    );
}
