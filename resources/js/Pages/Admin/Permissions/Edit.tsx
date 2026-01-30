import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Permission {
    id: number;
    name: string;
}

interface Props {
    permission: Permission;
}

export default function EditPermission({ permission }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Permissions',
            href: route('admin.permissions.index'),
        },
        {
            title: 'Edit Permission',
            href: route('admin.permissions.edit', permission.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.permissions.update', permission.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Permission" />

            <div className="px-4 py-6">
                <Heading title={`Edit Permission: ${permission.name}`} description="Update permission name" />

                <div className="mt-6 max-w-xl">
                    <form onSubmit={submit}>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Permission Name</Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Update Permission
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
