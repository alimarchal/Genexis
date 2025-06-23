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
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'BOD Committees', href: route('bod-committees.index') },
];

interface BodCommittee {
    id: number;
    name: string;
    description: string | null;
    chairman_board: {
        id: number;
        full_name: string;
        designation: string;
    } | null;
    secretary_board: {
        id: number;
        full_name: string;
        designation: string;
    } | null;
    secretary_management: {
        id: number;
        full_name: string;
        designation: string;
    } | null;
    board_members: number[] | null;
    management_members: number[] | null;
    is_active: boolean;
    sort_order: number | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    bodCommittees: {
        data: BodCommittee[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function BodCommitteeIndex({ bodCommittees, filters }: Props) {
    if (!bodCommittees?.data) {
        return <div>Loading...</div>;
    }

    const [search, setSearch] = useState(filters['filter[name]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const param = filters['filter[is_active]'];
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });
    const [chairmanFilter, setChairmanFilter] = useState(() => {
        const param = filters['filter[has_chairman]'];
        if (param === 'yes') return 'yes';
        if (param === 'no') return 'no';
        return 'all';
    });
    const [secretaryFilter, setSecretaryFilter] = useState(() => {
        const param = filters['filter[has_secretary]'];
        if (param === 'yes') return 'yes';
        if (param === 'no') return 'no';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[name]'] = search;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        if (chairmanFilter !== 'all') params['filter[has_chairman]'] = chairmanFilter;
        if (secretaryFilter !== 'all') params['filter[has_secretary]'] = secretaryFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('bod-committees.index'),
            {
                ...buildParams(),
                'filter[name]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('bod-committees.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleChairmanFilter = (value: string) => {
        setChairmanFilter(value);
        router.get(
            route('bod-committees.index'),
            {
                ...buildParams(),
                'filter[has_chairman]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleSecretaryFilter = (value: string) => {
        setSecretaryFilter(value);
        router.get(
            route('bod-committees.index'),
            {
                ...buildParams(),
                'filter[has_secretary]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('bod-committees.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this committee?')) {
            router.delete(route('bod-committees.destroy', id));
        }
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getSecretaryInfo = (committee: BodCommittee) => {
        if (committee.secretary_board) {
            return (
                <div className="text-sm">
                    <div className="font-medium">{committee.secretary_board.full_name}</div>
                    <div className="text-gray-500">Board Member</div>
                </div>
            );
        }

        if (committee.secretary_management) {
            return (
                <div className="text-sm">
                    <div className="font-medium">{committee.secretary_management.full_name}</div>
                    <div className="text-gray-500">Management</div>
                </div>
            );
        }

        return <span className="text-gray-400">Not assigned</span>;
    };

    const getMembersCount = (committee: BodCommittee) => {
        const boardCount = committee.board_members?.length || 0;
        const managementCount = committee.management_members?.length || 0;
        const total = boardCount + managementCount;

        return (
            <div className="text-sm">
                <div className="font-medium">{total} members</div>
                <div className="text-gray-500">
                    {boardCount} Board, {managementCount} Management
                </div>
            </div>
        );
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
            <Head title="BOD Committees" />

            <div className="px-10 py-6">
                <Heading title="BOD Committees" description="Manage Board of Directors committees and their members" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search committees..."
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

                            <Select value={chairmanFilter} onValueChange={handleChairmanFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Chairman" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="yes">Has Chairman</SelectItem>
                                    <SelectItem value="no">No Chairman</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={secretaryFilter} onValueChange={handleSecretaryFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Secretary" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="yes">Has Secretary</SelectItem>
                                    <SelectItem value="no">No Secretary</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button asChild>
                            <Link href={route('bod-committees.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Committee
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Committee</TableHead>
                                    <TableHead>Chairman</TableHead>
                                    <TableHead>Secretary</TableHead>
                                    <TableHead>Members</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bodCommittees.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-8 text-center text-gray-500">
                                            No committees found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bodCommittees.data.map((committee) => (
                                        <TableRow key={committee.id}>
                                            <TableCell className="font-medium">{committee.sort_order}</TableCell>
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    <div className="font-medium">{committee.name}</div>
                                                    {committee.description && (
                                                        <div className="mt-1 line-clamp-2 text-sm text-gray-500">{committee.description}</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {committee.chairman_board ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium">{committee.chairman_board.full_name}</div>
                                                        <div className="max-w-[200px] truncate text-gray-500">
                                                            {committee.chairman_board.designation}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">Not assigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{getSecretaryInfo(committee)}</TableCell>
                                            <TableCell>{getMembersCount(committee)}</TableCell>
                                            <TableCell>{getStatusBadge(committee.is_active)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(committee.created_at)}</TableCell>
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
                                                            <Link href={route('bod-committees.show', committee.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('bod-committees.edit', committee.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(committee.id)} className="text-red-600">
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
                    {bodCommittees.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {bodCommittees.from} to {bodCommittees.to} of {bodCommittees.total} results
                            </div>
                            <div className="flex gap-2">
                                {bodCommittees.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(bodCommittees.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {bodCommittees.current_page < bodCommittees.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(bodCommittees.current_page + 1)}>
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
