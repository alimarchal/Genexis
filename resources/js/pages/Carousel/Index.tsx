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
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Carousel',
        href: route('carousels.index'),
    },
];

interface Carousel {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
    button_text: string | null;
    button_url: string | null;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    carousels: {
        data: Carousel[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function CarouselIndex({ carousels, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[title]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[status]'];
        if (statusParam === 'active') return 'active';
        if (statusParam === 'inactive') return 'inactive';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[title]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[status]'] = statusFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('carousels.index'),
            {
                ...buildParams(),
                'filter[title]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('carousels.index'),
            {
                ...buildParams(),
                'filter[status]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('carousels.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this carousel slide?')) {
            router.delete(route('carousels.destroy', id));
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
            <Head title="Carousel" />

            <div className="px-10 py-6">
                <Heading title="Carousel Slides" description="Manage your website carousel slides and content" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search slides..."
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
                            <Link href={route('carousels.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Slide
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Button</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {carousels.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No carousel slides found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    carousels.data.map((carousel) => (
                                        <TableRow key={carousel.id}>
                                            <TableCell className="font-medium">{carousel.order}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {carousel.image_url && (
                                                        <img
                                                            src={carousel.image_url}
                                                            alt={carousel.title}
                                                            className="h-10 w-16 rounded-md object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium">{carousel.title}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs truncate text-sm text-gray-500">{carousel.description || '-'}</div>
                                            </TableCell>
                                            <TableCell>
                                                {carousel.button_text ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium">{carousel.button_text}</div>
                                                        <div className="max-w-xs truncate text-xs text-gray-500">{carousel.button_url}</div>
                                                    </div>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(carousel.status)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(carousel.created_at)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('carousels.show', carousel.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('carousels.edit', carousel.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(carousel.id)} className="text-red-600">
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

                    {/* Pagination Info */}
                    {carousels.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {carousels.from} to {carousels.to} of {carousels.total} results
                            </div>
                            <div className="flex gap-2">
                                {carousels.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(carousels.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {carousels.current_page < carousels.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(carousels.current_page + 1)}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
