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
import { Calendar, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Schedule of Charges', href: route('schedule-of-charges.index') },
];

interface ScheduleOfCharge {
    id: number;
    title: string;
    from: string;
    to: string | null;
    attachment: string | null;
    attachment_url: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    scheduleOfCharges: {
        data: ScheduleOfCharge[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function ScheduleOfChargeIndex({ scheduleOfCharges, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[title]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const param = filters['filter[is_active]'];
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });
    const [attachmentFilter, setAttachmentFilter] = useState(() => {
        const param = filters['filter[has_attachment]'];
        if (param === 'yes') return 'yes';
        if (param === 'no') return 'no';
        return 'all';
    });
    const [dateFilter, setDateFilter] = useState(() => {
        const param = filters['filter[date_range]'];
        if (param === 'current') return 'current';
        if (param === 'upcoming') return 'upcoming';
        if (param === 'expired') return 'expired';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[title]'] = search;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        if (attachmentFilter !== 'all') params['filter[has_attachment]'] = attachmentFilter;
        if (dateFilter !== 'all') params['filter[date_range]'] = dateFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('schedule-of-charges.index'),
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
            route('schedule-of-charges.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleAttachmentFilter = (value: string) => {
        setAttachmentFilter(value);
        router.get(
            route('schedule-of-charges.index'),
            {
                ...buildParams(),
                'filter[has_attachment]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleDateFilter = (value: string) => {
        setDateFilter(value);
        router.get(
            route('schedule-of-charges.index'),
            {
                ...buildParams(),
                'filter[date_range]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('schedule-of-charges.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this schedule of charges?')) {
            router.delete(route('schedule-of-charges.destroy', id));
        }
    };

    const getStatusBadge = (charge: ScheduleOfCharge) => {
        if (!charge.is_active) return <Badge variant="outline">Inactive</Badge>;

        const currentDate = new Date().toISOString().split('T')[0];
        const fromDate = charge.from;
        const toDate = charge.to;

        if (fromDate > currentDate) return <Badge variant="secondary">Upcoming</Badge>;
        if (toDate && toDate < currentDate) return <Badge variant="destructive">Expired</Badge>;
        return <Badge variant="default">Current</Badge>;
    };

    const getAttachmentBadge = (hasAttachment: boolean) => {
        return hasAttachment ? <Badge variant="outline">Has File</Badge> : <Badge variant="secondary">No File</Badge>;
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
            <Head title="Schedule of Charges" />
            <div className="px-10 py-6">
                <Heading title="Schedule of Charges" description="Manage banking charges and fee schedules" />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search by title..."
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
                            <Select value={attachmentFilter} onValueChange={handleAttachmentFilter}>
                                <SelectTrigger className="w-44">
                                    <SelectValue placeholder="All Files" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Files</SelectItem>
                                    <SelectItem value="yes">Has Attachment</SelectItem>
                                    <SelectItem value="no">No Attachment</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={dateFilter} onValueChange={handleDateFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Dates" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Dates</SelectItem>
                                    <SelectItem value="current">Current</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button asChild>
                            <Link href={route('schedule-of-charges.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Schedule
                            </Link>
                        </Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Date Range</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Attachment</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scheduleOfCharges.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                                            No schedule of charges found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    scheduleOfCharges.data.map((charge) => (
                                        <TableRow key={charge.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-5 w-5 text-indigo-500" />
                                                    <div>
                                                        <div className="font-medium">{charge.title}</div>
                                                        {charge.description && (
                                                            <div className="max-w-xs truncate text-sm text-gray-500">{charge.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{formatDateRange(charge.from, charge.to)}</div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(charge)}</TableCell>
                                            <TableCell>{getAttachmentBadge(!!charge.attachment)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(charge.created_at)}</TableCell>
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
                                                            <Link href={route('schedule-of-charges.show', charge.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('schedule-of-charges.edit', charge.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {charge.attachment_url && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild>
                                                                    <a href={charge.attachment_url} target="_blank" rel="noopener noreferrer">
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download
                                                                    </a>
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(charge.id)} className="text-red-600">
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
                    {scheduleOfCharges.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {scheduleOfCharges.from} to {scheduleOfCharges.to} of {scheduleOfCharges.total} results
                            </div>
                            <div className="flex gap-2">
                                {scheduleOfCharges.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(scheduleOfCharges.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {scheduleOfCharges.current_page < scheduleOfCharges.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(scheduleOfCharges.current_page + 1)}>
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
