import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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
        title: 'Create',
        href: '',
    },
];

interface Branch {
    id: number;
    name: string;
    code: string;
}

interface Props {
    branches: Branch[];
}

export default function Create({ branches }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        branch_id: undefined as string | undefined,
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contacts.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Contact" />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title="Create Contact" description="Add a new contact to the directory" />
                    <Link href={route('contacts.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Contacts
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter full name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter email address"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Enter phone number"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input
                                        id="position"
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        placeholder="Enter position/title"
                                    />
                                    <InputError message={errors.position} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        type="text"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        placeholder="Enter department"
                                    />
                                    <InputError message={errors.department} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="branch_id">Branch</Label>
                                    <Select value={data.branch_id || ''} onValueChange={(value: string) => setData('branch_id', value)}>
                                        <SelectTrigger>
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
                                    <InputError message={errors.branch_id} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Contact'}
                                </Button>
                                <Link href={route('contacts.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
