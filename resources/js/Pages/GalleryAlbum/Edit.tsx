import GalleryAlbumForm, { GalleryAlbumRecord } from '@/components/gallery-album-form';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function EditGalleryAlbum({ album }: { album: GalleryAlbumRecord }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Photo Gallery', href: route('gallery-albums.index') },
        { title: 'Edit', href: route('gallery-albums.edit', album.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Gallery Album" />

            <div className="px-10 py-6">
                <Heading title="Edit Gallery Album" description="Update album details" />
                <GalleryAlbumForm album={album} />
            </div>
        </AppLayout>
    );
}
