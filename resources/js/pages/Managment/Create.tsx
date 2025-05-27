import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Heading from '@/components/heading';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Management',
        href: '/managment',
    },
    {
        title: 'Create',
        href: '/managment/create',
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
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ManagementForm>({
        title: '',
        full_name: '',
        designation: '',
        description: '',
        attachment: null,
        order: 0,
        status: 'active',
    });

    const titleOptions = [
        { value: 'Mr.', label: 'Mr.' },
        { value: 'Ms.', label: 'Ms.' },
        { value: 'Mrs.', label: 'Mrs.' },
        { value: 'Dr.', label: 'Dr.' },
        { value: 'Prof.', label: 'Prof.' },
        { value: 'Eng.', label: 'Eng.' },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('managment.store'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('attachment', file);
    };

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