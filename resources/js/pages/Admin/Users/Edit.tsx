import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Save, AlertTriangle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Role {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    user: User;
    roles: Role[];
    permissions: Permission[];
    userRoles: number[];
    userPermissions: number[]; // Direct permissions
    inheritedPermissions: number[]; // Permissions from roles
}

export default function EditUser({ user, roles, permissions, userRoles, userPermissions, inheritedPermissions }: Props) {
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
            title: 'Edit User',
            href: route('admin.users.edit', user.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        roles: userRoles || [],
        permissions: userPermissions || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
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
            <Head title="Edit User" />

            <div className="px-4 py-6">
                <Heading title={`Edit User: ${user.name}`} description="Update user details, roles, and permissions" />

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
                                            <Label htmlFor="password">Password (Leave blank to keep current)</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="New password..."
                                            />
                                            {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                                        </div>
                                    </div>

                                    <Separator />

                                    <Tabs defaultValue="roles" className="w-full">
                                        <TabsList className="w-full grid w-full grid-cols-2">
                                            <TabsTrigger value="roles">Roles</TabsTrigger>
                                            <TabsTrigger value="permissions">Permissions</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="roles" className="mt-4 space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-lg font-medium">Assign Roles</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    Roles granting permissions to this user.
                                                </p>
                                            </div>

                                            {userRoles.some(rId => {
                                                const r = roles.find(role => role.id === rId);
                                                return r?.name === 'super-admin';
                                            }) && (
                                                    <Alert variant="default" className="bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-900/50 dark:text-yellow-200">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        <AlertTitle>Super Admin User</AlertTitle>
                                                        <AlertDescription>
                                                            This user has the Super Admin role. Be careful when modifying roles to ensure you don't accidentally lock out the main admin.
                                                        </AlertDescription>
                                                    </Alert>
                                                )}

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {roles.map((role) => (
                                                    <div key={role.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`role-${role.id}`}
                                                            checked={data.roles.includes(role.id)}
                                                            onCheckedChange={() => toggleRole(role.id)}
                                                        />
                                                        <Label htmlFor={`role-${role.id}`} className="font-normal capitalize cursor-pointer">
                                                            {role.name.replace(/-/g, ' ')}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="permissions" className="mt-4 space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-lg font-medium">Direct Permissions</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    Grant specific additional permissions. <br />
                                                    <span className="italic">Note: Permissions inherited from roles are disabled (already granted).</span>
                                                </p>
                                            </div>

                                            <div className="h-96 overflow-y-auto rounded-md border p-4">
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                    {permissions.map((permission) => {
                                                        const isInherited = inheritedPermissions.includes(permission.id);
                                                        return (
                                                            <div key={permission.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`perm-${permission.id}`}
                                                                    checked={isInherited || data.permissions.includes(permission.id)}
                                                                    onCheckedChange={() => !isInherited && togglePermission(permission.id)}
                                                                    disabled={isInherited}
                                                                />
                                                                <Label
                                                                    htmlFor={`perm-${permission.id}`}
                                                                    className={`font-normal capitalize cursor-pointer ${isInherited ? 'text-muted-foreground italic' : ''}`}
                                                                >
                                                                    {permission.name.replace(/-/g, ' ')}
                                                                    {isInherited && ' (Inherited)'}
                                                                </Label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Update User
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
