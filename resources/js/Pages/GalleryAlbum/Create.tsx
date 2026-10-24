import Heading from '@/components/heading';
import GalleryAlbumForm from '@/components/gallery-album-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Photo Gallery', href: route('gallery-albums.index') },
    { title: 'Create', href: route('gallery-albums.create') },
];

export default function CreateGalleryAlbum() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Gallery Album" />

            <div className="px-10 py-6">
                <Heading title="Create Gallery Album" description="Add a new photo album to the website gallery" />
                <GalleryAlbumForm />
            </div>
        </AppLayout>
    );
}
