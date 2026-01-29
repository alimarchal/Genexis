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
import { Edit, MoreHorizontal, Plus, Search, Trash, User } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Users',
        href: route('admin.users.index'),
    },
];

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    created_at: string;
}

interface Props {
    users: {
        data: User[];
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

export default function UserIndex({ users, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.users.index'),
            { search: searchTerm },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="User Management" description="Manage system users and their access" />
                    {(auth.permissions.includes('create users') || auth.roles.includes('super-admin')) && (
                        <Button asChild>
                            <Link href={route('admin.users.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add New User
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
                                placeholder="Search by name or email..."
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
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <User className="text-muted-foreground h-4 w-4" />
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map((role) => (
                                                    <Badge
                                                        key={role.id}
                                                        variant={role.name === 'super-admin' ? 'default' : 'secondary'}
                                                        className="capitalize"
                                                    >
                                                        {role.name.replace(/-/g, ' ')}
                                                    </Badge>
                                                ))}
                                                {user.roles.length === 0 && <span className="text-muted-foreground text-xs italic">No Roles</span>}
                                            </div>
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
                                                    {(auth.permissions.includes('edit users') || auth.roles.includes('super-admin')) && (
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('admin.users.edit', user.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    )}
                                                    {(auth.permissions.includes('delete users') || auth.roles.includes('super-admin')) && (
                                                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600">
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
                {users.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {users.data.length} of {users.total} results
                        </p>
                        <div className="flex gap-2">
                            {users.prev_page_url && (
                                <Button variant="outline" size="sm" onClick={() => router.get(users.prev_page_url)}>
                                    Previous
                                </Button>
                            )}
                            {users.next_page_url && (
                                <Button variant="outline" size="sm" onClick={() => router.get(users.next_page_url)}>
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
