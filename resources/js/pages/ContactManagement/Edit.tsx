import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    branch_id: number;
    status: 'active' | 'inactive';
}

interface Branch {
    id: number;
    name: string;
    code: string;
}

interface Props {
    contact: Contact;
    branches: Branch[];
}

type ContactForm = {
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    branch_id: string;
    status: 'active' | 'inactive';
};

export default function EditContact({ contact, branches }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Contacts',
            href: route('contacts.index'),
        },
        {
            title: 'Edit',
            href: route('contacts.edit', contact.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm<ContactForm>({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        position: contact.position || '',
        department: contact.department || '',
        branch_id: contact.branch_id.toString(),
        status: contact.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('contacts.update', contact.id), {
            onSuccess: () => {
                console.log('Update successful');
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Contact" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('contacts.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Contacts
                        </Link>
                    </Button>
                </div>

                <Heading title="Edit Contact" description="Update contact details and information" />

                <form onSubmit={submit} className="max-w-4xl">
                    <Card>
                        <CardContent className="pt-6">
                            {/* First Row - 3 columns */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                            </div>

                            {/* Second Row - 3 columns */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="position">Position</Label>
                                    <Input
                                        id="position"
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                    />
                                    <InputError message={errors.position} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        type="text"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                    />
                                    <InputError message={errors.department} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="branch_id">Branch</Label>
                                    <Select value={data.branch_id} onValueChange={(value) => setData('branch_id', value)}>
                                        <SelectTrigger id="branch_id">
                                            <SelectValue placeholder="Select branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches.map((branch) => (
                                                <SelectItem key={branch.id} value={branch.id.toString()}>
                                                    {branch.name} ({branch.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.branch_id} className="mt-2" />
                                </div>
                            </div>

                            {/* Third Row - 1 column */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('contacts.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Updating...' : 'Update Contact'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
