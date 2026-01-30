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
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Percent, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Profit Rates', href: route('profit-rates.index') },
];

interface ProfitRate {
    id: number;
    category: string;
    rate: number;
    valid_from: string;
    valid_to: string | null;
    is_active: boolean;
    sort_order: number | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    profitRates: {
        data: ProfitRate[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function ProfitRateIndex({ profitRates, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[category]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const param = filters['filter[is_active]'];
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });
    const [rateFilter, setRateFilter] = useState(() => {
        const param = filters['filter[rate_range]'];
        if (param === 'low') return 'low';
        if (param === 'medium') return 'medium';
        if (param === 'high') return 'high';
        return 'all';
    });
    const [validityFilter, setValidityFilter] = useState(() => {
        const param = filters['filter[validity_status]'];
        if (param === 'current') return 'current';
        if (param === 'upcoming') return 'upcoming';
        if (param === 'expired') return 'expired';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[category]'] = search;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        if (rateFilter !== 'all') params['filter[rate_range]'] = rateFilter;
        if (validityFilter !== 'all') params['filter[validity_status]'] = validityFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('profit-rates.index'),
            {
                ...buildParams(),
                'filter[category]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('profit-rates.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleRateFilter = (value: string) => {
        setRateFilter(value);
        router.get(
            route('profit-rates.index'),
            {
                ...buildParams(),
                'filter[rate_range]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleValidityFilter = (value: string) => {
        setValidityFilter(value);
        router.get(
            route('profit-rates.index'),
            {
                ...buildParams(),
                'filter[validity_status]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('profit-rates.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this profit rate?')) {
            router.delete(route('profit-rates.destroy', id));
        }
    };

    const getStatusBadge = (rate: ProfitRate) => {
        if (!rate.is_active) return <Badge variant="outline">Inactive</Badge>;

        const currentDate = new Date().toISOString().split('T')[0];
        const fromDate = rate.valid_from;
        const toDate = rate.valid_to;

        if (fromDate > currentDate) return <Badge variant="secondary">Upcoming</Badge>;
        if (toDate && toDate < currentDate) return <Badge variant="destructive">Expired</Badge>;
        return <Badge variant="default">Current</Badge>;
    };

    const getRateBadge = (rateValue: number) => {
        if (rateValue < 5) return <Badge variant="secondary">Low (&lt;5%)</Badge>;
        if (rateValue <= 10) return <Badge variant="default">Medium (5-10%)</Badge>;
        return <Badge variant="destructive">High (&gt;10%)</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateRange = (from: string, to: string | null) => {
        const fromFormatted = formatDate(from);
        if (!to) return `${fromFormatted} - Ongoing`;
        return `${fromFormatted} - ${formatDate(to)}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profit Rates" />
            <div className="px-10 py-6">
                <Heading title="Profit Rates" description="Manage banking profit rates by category" />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search by category..."
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
                            <Select value={rateFilter} onValueChange={handleRateFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Rates" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Rates</SelectItem>
                                    <SelectItem value="low">Low (&lt;5%)</SelectItem>
                                    <SelectItem value="medium">Medium (5-10%)</SelectItem>
                                    <SelectItem value="high">High (&gt;10%)</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={validityFilter} onValueChange={handleValidityFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Validity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Validity</SelectItem>
                                    <SelectItem value="current">Current</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {(auth.permissions.includes('create profit rates') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('profit-rates.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Rate
                                </Link>
                            </Button>
                        )}
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>Valid Period</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {profitRates.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No profit rates found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    profitRates.data.map((rate) => (
                                        <TableRow key={rate.id}>
                                            <TableCell className="font-medium">{rate.sort_order || '-'}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Percent className="h-5 w-5 text-emerald-500" />
                                                    <div>
                                                        <div className="font-medium">{rate.category}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-semibold text-emerald-600">{rate.rate}%</span>
                                                    {getRateBadge(rate.rate)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{formatDateRange(rate.valid_from, rate.valid_to)}</div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(rate)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(rate.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view profit rates') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('profit-rates.show', rate.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit profit rates') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('profit-rates.edit', rate.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete profit rates') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(rate.id)} className="text-red-600">
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
                    {profitRates.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {profitRates.from} to {profitRates.to} of {profitRates.total} results
                            </div>
                            <div className="flex gap-2">
                                {profitRates.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(profitRates.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {profitRates.current_page < profitRates.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(profitRates.current_page + 1)}>
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
