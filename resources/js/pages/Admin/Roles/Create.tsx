import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
        title: 'Roles',
        href: route('admin.roles.index'),
    },
    {
        title: 'Create Role',
        href: route('admin.roles.create'),
    },
];

interface Permission {
    id: number;
    name: string;
}

interface Props {
    permissions: Permission[];
}

export default function CreateRole({ permissions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    const togglePermission = (id: number) => {
        const currentPermissions = [...data.permissions];
        const index = currentPermissions.indexOf(id);
        if (index === -1) {
            currentPermissions.push(id);
        } else {
            currentPermissions.splice(index, 1);
        }
        setData('permissions', currentPermissions);
    };

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setData('permissions', permissions.map((p) => p.id));
        } else {
            setData('permissions', []);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Role" />

            <div className="px-4 py-6">
                <Heading title="Create Role" description="Define a new role and its permissions" />

                <div className="mt-6 max-w-4xl">
                    <form onSubmit={submit}>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Role Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. Manager"
                                            required
                                        />
                                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <Label className="text-base">Permissions</Label>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="select-all"
                                                    checked={data.permissions.length === permissions.length && permissions.length > 0}
                                                    onCheckedChange={(checked) => toggleSelectAll(checked === true)}
                                                />
                                                <Label htmlFor="select-all">Select All</Label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {permissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`permission-${permission.id}`}
                                                        checked={data.permissions.includes(permission.id)}
                                                        onCheckedChange={() => togglePermission(permission.id)}
                                                    />
                                                    <Label htmlFor={`permission-${permission.id}`} className="font-normal capitalize cursor-pointer">
                                                        {permission.name.replace(/-/g, ' ')}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Create Role
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
