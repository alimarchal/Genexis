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
import { Crown, Edit, Eye, MoreHorizontal, Plus, Search, Trash, User } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Board of Directors',
        href: route('board-of-directors.index'),
    },
];

interface BoardOfDirector {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    short_description: string | null;
    full_biography: string | null;
    experience: string[] | null;
    achievements: string[] | null;
    image: string | null;
    image_url: string | null;
    sort_order: number;
    is_active: boolean;
    is_chairman: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    boardOfDirectors: {
        data: BoardOfDirector[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function BoardOfDirectorIndex({ boardOfDirectors, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[full_name]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[is_active]'];
        if (statusParam === '1') return 'active';
        if (statusParam === '0') return 'inactive';
        return 'all';
    });
    const [roleFilter, setRoleFilter] = useState(() => {
        const roleParam = filters['filter[is_chairman]'];
        if (roleParam === '1') return 'chairman';
        if (roleParam === '0') return 'member';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[full_name]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        }
        if (roleFilter !== 'all') {
            params['filter[is_chairman]'] = roleFilter === 'chairman' ? '1' : '0';
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('board-of-directors.index'),
            {
                ...buildParams(),
                'filter[full_name]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('board-of-directors.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleRoleFilter = (value: string) => {
        setRoleFilter(value);
        router.get(
            route('board-of-directors.index'),
            {
                ...buildParams(),
                'filter[is_chairman]': value !== 'all' ? (value === 'chairman' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('board-of-directors.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this board member?')) {
            router.delete(route('board-of-directors.destroy', id));
        }
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getRoleBadge = (isChairman: boolean) => {
        return isChairman ? (
            <Badge variant="destructive" className="gap-1">
                <Crown className="h-3 w-3" />
                Chairman
            </Badge>
        ) : (
            <Badge variant="outline" className="gap-1">
                <User className="h-3 w-3" />
                Director
            </Badge>
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
            <Head title="Board of Directors" />

            <div className="px-10 py-6">
                <Heading title="Board of Directors" description="Manage your organization's board members and leadership team" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search members..."
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

                            <Select value={roleFilter} onValueChange={handleRoleFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Roles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="chairman">Chairman</SelectItem>
                                    <SelectItem value="member">Director</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(auth.permissions.includes('create board of directors') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('board-of-directors.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Member
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Designation</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {boardOfDirectors.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No board members found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    boardOfDirectors.data.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">{member.sort_order}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {member.image_url && (
                                                        <img
                                                            src={member.image_url}
                                                            alt={member.full_name}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium">
                                                            {member.title && `${member.title} `}
                                                            {member.full_name}
                                                        </div>
                                                        <div className="max-w-xs truncate text-sm text-gray-500">
                                                            {member.short_description || '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] text-sm leading-tight">
                                                    {member.designation.split(',').map((part, index) => (
                                                        <div key={index} className="whitespace-nowrap">
                                                            {part.trim()}
                                                            {index < member.designation.split(',').length - 1 && ','}
                                                        </div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getRoleBadge(member.is_chairman)}</TableCell>
                                            <TableCell>{getStatusBadge(member.is_active)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(member.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view board of directors') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('board-of-directors.show', member.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit board of directors') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('board-of-directors.edit', member.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete board of directors') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(member.id)} className="text-red-600">
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

                    {/* Pagination Info */}
                    {boardOfDirectors.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {boardOfDirectors.from} to {boardOfDirectors.to} of {boardOfDirectors.total} results
                            </div>
                            <div className="flex gap-2">
                                {boardOfDirectors.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(boardOfDirectors.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {boardOfDirectors.current_page < boardOfDirectors.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(boardOfDirectors.current_page + 1)}>
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
