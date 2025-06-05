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
        title: 'Regions',
        href: route('regions.index'),
    },
];

interface Region {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    regions: {
        data: Region[];
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

export default function Index({ regions, filters }: Props) {
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

        router.get(`${route('regions.index')}?${params.toString()}`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this region?')) {
            router.delete(route('regions.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Regions" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Regions" description="Manage your organization's regions" />
                    <Button asChild>
                        <Link href={route('regions.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Region
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
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {regions.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-muted-foreground py-8 text-center">
                                        No regions found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                regions.data.map((region) => (
                                    <TableRow key={region.id}>
                                        <TableCell className="font-medium">{region.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={region.status === 'active' ? 'default' : 'secondary'}>
                                                {region.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(region.created_at).toLocaleDateString()}
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
                                                        <Link href={route('regions.show', region.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('regions.edit', region.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(region.id)} className="text-red-600">
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
                {regions.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {regions.data.length} of {regions.total} results
                        </p>
                        <div className="flex gap-2">
                            {Array.from({ length: regions.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === regions.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get(route('regions.index', { page }))}
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
