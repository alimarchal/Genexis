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
import { Download, Edit, Eye, FileText, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Schedule of Charges',
        href: route('schedule-of-charges.index'),
    },
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
    status: string;
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
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('schedule-of-charges.index'), { search: value, status: statusFilter }, { preserveState: true, replace: true });
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        const statusParam = value === 'all' ? undefined : value;
        router.get(route('schedule-of-charges.index'), { search, status: statusParam }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this schedule of charge?')) {
            router.delete(route('schedule-of-charges.destroy', id));
        }
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
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
            <Head title="Schedule of Charges" />

            <div className="px-10 py-6">
                <Heading title="Schedule of Charges" description="Manage schedule of charges documents and rates" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search schedules..."
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
                            <Link href={route('schedule-of-charges.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Schedule
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Attachment</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scheduleOfCharges.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                                            No schedule of charges found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    scheduleOfCharges.data.map((schedule) => (
                                        <TableRow key={schedule.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{schedule.title}</div>
                                                    {schedule.description && (
                                                        <div className="line-clamp-1 text-sm text-gray-500">
                                                            {schedule.description.substring(0, 60)}...
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>From: {formatDate(schedule.from)}</div>
                                                    {schedule.to && <div>To: {formatDate(schedule.to)}</div>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {schedule.attachment_url ? (
                                                    <Link
                                                        href={route('schedule-of-charges.admin-download', schedule.id)}
                                                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                        Download
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm text-gray-500">No file</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(schedule.is_active)}</TableCell>
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
                                                            <Link href={route('schedule-of-charges.show', schedule.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('schedule-of-charges.edit', schedule.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {schedule.attachment_url && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('schedule-of-charges.admin-download', schedule.id)}>
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(schedule.id)} className="text-red-600">
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
                    {scheduleOfCharges.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {scheduleOfCharges.from} to {scheduleOfCharges.to} of {scheduleOfCharges.total} results
                            </div>
                            <div className="flex gap-2">
                                {scheduleOfCharges.current_page > 1 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(route('schedule-of-charges.index'), {
                                                ...filters,
                                                page: scheduleOfCharges.current_page - 1,
                                            })
                                        }
                                    >
                                        Previous
                                    </Button>
                                )}
                                {scheduleOfCharges.current_page < scheduleOfCharges.last_page && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(route('schedule-of-charges.index'), {
                                                ...filters,
                                                page: scheduleOfCharges.current_page + 1,
                                            })
                                        }
                                    >
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
