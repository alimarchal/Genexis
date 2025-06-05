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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Branches',
        href: route('branches.index'),
    },
];

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
    district_id: number;
    district: {
        id: number;
        name: string;
        region: {
            id: number;
            name: string;
        };
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    branches: {
        data: Branch[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        filter?: {
            name?: string;
            status?: string;
        };
        sort?: string;
    };
}

export default function Index({ branches, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.name || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchTerm) {
            params.append('filter[name]', searchTerm);
        }

        if (statusFilter && statusFilter !== 'all') {
            params.append('filter[status]', statusFilter);
        }

        router.get(`${route('branches.index')}?${params.toString()}`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this branch?')) {
            router.delete(route('branches.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branches" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Branches" description="Manage your organization's branches" />
                    <Button asChild>
                        <Link href={route('branches.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Branch
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-4">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit">Filter</Button>
                    </div>
                </form>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>District</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {branches.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                        No branches found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                branches.data.map((branch) => (
                                    <TableRow key={branch.id}>
                                        <TableCell className="font-medium">{branch.name}</TableCell>
                                        <TableCell>{branch.code}</TableCell>
                                        <TableCell>{branch.district?.name || 'N/A'}</TableCell>
                                        <TableCell>{branch.district?.region?.name || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                                                {branch.status}
                                            </Badge>
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
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('branches.show', branch.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('branches.edit', branch.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(branch.id)} className="text-red-600">
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
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
                {branches.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {branches.data.length} of {branches.total} results
                        </p>
                        <div className="flex gap-2">
                            {Array.from({ length: branches.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === branches.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get(route('branches.index', { page }))}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
