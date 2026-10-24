import Heading from '@/components/heading';
import TouristAttractionForm from '@/components/tourist-attraction-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Tourist Attractions', href: route('tourist-attractions.index') },
    { title: 'Create', href: route('tourist-attractions.create') },
];

export default function CreateTouristAttraction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tourist Attraction" />

            <div className="px-10 py-6">
                <Heading title="Create Tourist Attraction" description="Add a new tourist attraction page" />
                <TouristAttractionForm />
            </div>
        </AppLayout>
    );
}
