import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, MoreHorizontal, Plus, Search, Shield, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Roles',
        href: route('admin.roles.index'),
    },
];

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    permissions?: { id: number; name: string }[];
}

interface Props {
    roles: {
        data: Role[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        next_page_url: string;
        prev_page_url: string;
    };
    filters: {
        search?: string;
    };
}

export default function RoleIndex({ roles, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.roles.index'),
            { search: searchTerm },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(route('admin.roles.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Management" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Role Management" description="Manage system roles and permissions" />
                    {(auth.permissions.includes('create roles') || auth.roles.includes('super-admin')) && (
                        <Button asChild>
                            <Link href={route('admin.roles.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Role
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-4">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search roles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit">Search</Button>
                    </div>
                </form>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Guard</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                                        No roles found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                roles.data.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">{role.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Shield className="text-muted-foreground h-4 w-4" />
                                                <span className="font-semibold capitalize">{role.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{role.guard_name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{role.permissions?.length || 0} Permissions</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {(auth.permissions.includes('edit roles') || auth.roles.includes('super-admin')) && (
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('admin.roles.edit', role.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit Permissions
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    )}
                                                    {(auth.permissions.includes('delete roles') || auth.roles.includes('super-admin')) && role.name !== 'super-admin' && (
                                                        <DropdownMenuItem onClick={() => handleDelete(role.id)} className="text-red-600">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {roles.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {roles.data.length} of {roles.total} results
                        </p>
                        <div className="flex gap-2">
                            {roles.prev_page_url && (
                                <Button variant="outline" size="sm" onClick={() => router.get(roles.prev_page_url)}>
                                    Previous
                                </Button>
                            )}
                            {roles.next_page_url && (
                                <Button variant="outline" size="sm" onClick={() => router.get(roles.next_page_url)}>
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
