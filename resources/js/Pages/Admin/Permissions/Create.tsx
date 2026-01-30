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
        title: 'Create Permission',
        href: route('admin.permissions.create'),
    },
];

export default function CreatePermission() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.permissions.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Permission" />

            <div className="px-4 py-6">
                <Heading title="Create Permission" description="Define a new granular permission" />

                <div className="mt-6 max-w-xl">
                    <form onSubmit={submit}>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Permission Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. view financial reports"
                                            required
                                        />
                                        <p className="text-muted-foreground text-xs">
                                            Convention: <code>action resource</code> (e.g. <code>view users</code>)
                                        </p>
                                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Create Permission
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
