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
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function RegionIndex({ regions, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[name]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[status]'];
        if (statusParam === 'active') return 'active';
        if (statusParam === 'inactive') return 'inactive';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[name]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[status]'] = statusFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('regions.index'),
            {
                ...buildParams(),
                'filter[name]': value.trim() ? value : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('regions.index'),
            {
                ...buildParams(),
                'filter[status]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('regions.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this region?')) {
            router.delete(route('regions.destroy', id));
        }
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Regions" />

            <div className="px-10 py-6">
                <Heading title="Regions" description="Manage your organization's regions and geographical divisions" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search regions..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={statusFilter} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button asChild>
                            <Link href={route('regions.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Region
                            </Link>
                        </Button>
                    </div>

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
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No regions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    regions.data.map((region) => (
                                        <TableRow key={region.id}>
                                            <TableCell className="font-medium">{region.name}</TableCell>
                                            <TableCell>{getStatusBadge(region.status)}</TableCell>
                                            <TableCell>{formatDate(region.created_at)}</TableCell>
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
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(region.id)}>
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
                        <div className="flex items-center justify-between">
                            <div className="text-muted-foreground text-sm">
                                Showing {regions.from} to {regions.to} of {regions.total} results
                            </div>
                            <div className="flex gap-2">
                                {Array.from({ length: regions.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === regions.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handlePagination(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
