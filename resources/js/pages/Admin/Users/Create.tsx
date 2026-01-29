import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
        title: 'Users',
        href: route('admin.users.index'),
    },
    {
        title: 'Create User',
        href: route('admin.users.create'),
    },
];

interface Role {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
    permissions: Permission[];
}

export default function CreateUser({ roles, permissions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [] as number[],
        permissions: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    const toggleRole = (id: number) => {
        const currentRoles = [...data.roles];
        const index = currentRoles.indexOf(id);
        if (index === -1) {
            currentRoles.push(id);
        } else {
            currentRoles.splice(index, 1);
        }
        setData('roles', currentRoles);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New User" />

            <div className="px-4 py-6">
                <Heading title="Create User" description="Add a new user and assign roles" />

                <div className="mt-6 max-w-4xl">
                    <form onSubmit={submit}>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g. John Doe"
                                                required
                                            />
                                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="e.g. john@example.com"
                                                required
                                            />
                                            {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Roles Section */}
                                    <div className="space-y-4">
                                        <Label className="text-lg font-semibold">Assign Roles</Label>
                                        <p className="text-muted-foreground text-sm">Select one or more roles for this user.</p>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {roles.map((role) => (
                                                <div key={role.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`role-${role.id}`}
                                                        checked={data.roles.includes(role.id)}
                                                        onCheckedChange={() => toggleRole(role.id)}
                                                    />
                                                    <Label htmlFor={`role-${role.id}`} className="cursor-pointer font-normal capitalize">
                                                        {role.name.replace(/-/g, ' ')}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Direct Permissions Section */}
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <Label className="text-lg font-semibold">Direct Permissions</Label>
                                            <p className="text-muted-foreground text-sm">
                                                Assign specific permissions directly to the user (independent of roles).
                                            </p>
                                        </div>

                                        <div className="h-64 overflow-y-auto rounded-md border p-4">
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {permissions.map((permission) => (
                                                    <div key={permission.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`perm-${permission.id}`}
                                                            checked={data.permissions.includes(permission.id)}
                                                            onCheckedChange={() => togglePermission(permission.id)}
                                                        />
                                                        <Label htmlFor={`perm-${permission.id}`} className="cursor-pointer font-normal capitalize">
                                                            {permission.name.replace(/-/g, ' ')}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Create User
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
