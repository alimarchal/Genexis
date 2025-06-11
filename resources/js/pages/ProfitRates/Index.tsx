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
        title: 'Profit Rates',
        href: route('profit-rates.index'),
    },
];

interface ProfitRate {
    id: number;
    category: string;
    rate: number;
    valid_from: string;
    valid_to: string | null;
    is_active: boolean;
    sort_order?: number;
    status: string;
    created_at: string;
    updated_at: string;
    creator?: {
        name: string;
    };
    updater?: {
        name: string;
    };
}

interface Props {
    profitRates: {
        data: ProfitRate[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
        is_active?: string;
        current?: string;
        sort?: string;
        per_page?: number;
    };
}

export default function Index({ profitRates, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.is_active || 'all');
    const [currentFilter, setCurrentFilter] = useState(filters.current || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, string | number | Record<string, string>> = {};

        if (search) {
            params.search = search;
        }

        const filterParams: Record<string, string> = {};
        if (statusFilter !== 'all') {
            filterParams.is_active = statusFilter;
        }
        if (currentFilter !== 'all') {
            filterParams.current = currentFilter;
        }

        if (Object.keys(filterParams).length > 0) {
            params.filter = filterParams;
        }

        router.get(route('profit-rates.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this profit rate?')) {
            router.delete(route('profit-rates.destroy', id));
        }
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(
            route('profit-rates.index'),
            {
                ...filters,
                per_page: perPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatRate = (rate: number) => {
        return `${rate}%`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profit Rates" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Profit Rates" description="Manage profit rates for different product categories" />
                    <Button asChild>
                        <Link href={route('profit-rates.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Profit Rate
                        </Link>
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 p-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search profit rates..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="1">Active</SelectItem>
                                        <SelectItem value="0">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={currentFilter} onValueChange={setCurrentFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Periods</SelectItem>
                                        <SelectItem value="1">Current</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-600">Show:</span>
                                <Select value={filters.per_page?.toString() || '15'} onValueChange={(value) => handlePerPageChange(parseInt(value))}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="15">15</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>Valid From</TableHead>
                                    <TableHead>Valid To</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Sort Order</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead className="w-32">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {profitRates.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">
                                            No profit rates found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    profitRates.data.map((rate) => (
                                        <TableRow key={rate.id}>
                                            <TableCell className="font-medium">{rate.category}</TableCell>
                                            <TableCell className="font-semibold text-green-600">{formatRate(rate.rate)}</TableCell>
                                            <TableCell>{formatDate(rate.valid_from)}</TableCell>
                                            <TableCell>{rate.valid_to ? formatDate(rate.valid_to) : 'Ongoing'}</TableCell>
                                            <TableCell>
                                                <Badge variant={rate.is_active ? 'default' : 'secondary'}>{rate.status}</Badge>
                                            </TableCell>
                                            <TableCell>{rate.sort_order || '-'}</TableCell>
                                            <TableCell className="text-sm text-gray-600">{formatDate(rate.created_at)}</TableCell>
                                            <TableCell className="text-sm text-gray-600">{rate.creator?.name || 'N/A'}</TableCell>
                                            <TableCell>
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
                                                            <Link href={route('profit-rates.show', rate.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('profit-rates.edit', rate.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(rate.id)}>
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
                    {profitRates.total > 0 && (
                        <div className="border-t border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {(profitRates.current_page - 1) * profitRates.per_page + 1} to{' '}
                                    {Math.min(profitRates.current_page * profitRates.per_page, profitRates.total)} of {profitRates.total} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    {profitRates.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
