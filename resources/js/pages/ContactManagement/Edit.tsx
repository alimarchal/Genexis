import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
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
            title: contact.name,
            href: route('contacts.show', contact.id),
        },
        {
            title: 'Edit',
            href: route('contacts.edit', contact.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm<ContactForm>({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        position: contact.position,
        department: contact.department,
        branch_id: contact.branch_id.toString(),
        status: contact.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('contacts.update', contact.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${contact.name}`} />

            <div className="px-10 py-6">
                <Heading title={`Edit Contact: ${contact.name}`} description="Update contact information" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter full name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Enter email address"
                                            className={errors.email ? 'border-red-500' : ''}
                                        />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Enter phone number"
                                            className={errors.phone ? 'border-red-500' : ''}
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>

                                    {/* Position */}
                                    <div className="space-y-2">
                                        <Label htmlFor="position">Position</Label>
                                        <Input
                                            id="position"
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            placeholder="Enter position/title"
                                            className={errors.position ? 'border-red-500' : ''}
                                        />
                                        {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Work Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Work Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Department */}
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            type="text"
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            placeholder="Enter department"
                                            className={errors.department ? 'border-red-500' : ''}
                                        />
                                        {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                                    </div>

                                    {/* Branch */}
                                    <div className="space-y-2">
                                        <Label htmlFor="branch_id">Branch</Label>
                                        <Select value={data.branch_id} onValueChange={(value) => setData('branch_id', value)}>
                                            <SelectTrigger className={errors.branch_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select a branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {branches.map((branch) => (
                                                    <SelectItem key={branch.id} value={branch.id.toString()}>
                                                        {branch.name} ({branch.code})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.branch_id && <p className="text-sm text-red-500">{errors.branch_id}</p>}
                                    </div>
                                </div>

                                {/* Status - Full width */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                        <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>
                            </CardContent>
                        </Card>

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
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
