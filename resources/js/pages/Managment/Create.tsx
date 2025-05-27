import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Management',
        href: route('managments.index'),
    },
    {
        title: 'Create',
        href: route('managments.create'),
    },
];


type ManagementForm = {
    title: string;
    full_name: string;
    designation: string;
    description: string;
    attachment: File | null;
    order: number;
    status: 'active' | 'inactive';
};

export default function CreateManagement() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Management" />

            <div className="px-10 py-6">
                <Heading title="Create Management Member" description="Add a new management member with their details and profile information" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">


                    PUTITHERE

                </div>
            </div>
        </AppLayout>
    );
}