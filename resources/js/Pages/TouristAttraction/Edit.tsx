import Heading from '@/components/heading';
import TouristAttractionForm, { TouristAttractionRecord } from '@/components/tourist-attraction-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function EditTouristAttraction({ attraction }: { attraction: TouristAttractionRecord }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Tourist Attractions', href: route('tourist-attractions.index') },
        { title: 'Edit', href: route('tourist-attractions.edit', attraction.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Tourist Attraction" />

            <div className="px-10 py-6">
                <Heading title="Edit Tourist Attraction" description="Update attraction details" />
                <TouristAttractionForm attraction={attraction} />
            </div>
        </AppLayout>
    );
}
