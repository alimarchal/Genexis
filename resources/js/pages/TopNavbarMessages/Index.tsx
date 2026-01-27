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
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Top Navbar Messages', href: route('top-navbar-messages.index') },
];

interface TopNavbarMessage {
    id: number;
    type: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    icon: string;
    text: string;
    color: string;
    bg_color: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    messages: {
        data: TopNavbarMessage[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        filter?: {
            text?: string;
            is_active?: string;
            priority?: string;
        };
    };
}

export default function Index({ messages, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters?.filter?.text || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const param = filters?.filter?.is_active;
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });
    const [priorityFilter, setPriorityFilter] = useState(filters?.filter?.priority || 'all');

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[text]'] = search;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        if (priorityFilter !== 'all') params['filter[priority]'] = priorityFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('top-navbar-messages.index'),
            {
                ...buildParams(),
                'filter[text]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('top-navbar-messages.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePriorityFilter = (value: string) => {
        setPriorityFilter(value);
        router.get(
            route('top-navbar-messages.index'),
            {
                ...buildParams(),
                'filter[priority]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('top-navbar-messages.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('top-navbar-messages.destroy', id));
        }
    };

    const getPriorityColor = (priority: string) => {
        const colors = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-blue-100 text-blue-800',
            high: 'bg-orange-100 text-orange-800',
            urgent: 'bg-red-100 text-red-800',
        };
        return colors[priority as keyof typeof colors] || colors.medium;
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
            <Head title="Top Navbar Messages" />
            <div className="px-10 py-6">
                <Heading title="Top Navbar Messages" description="Manage messages displayed in the top navigation bar" />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search messages..."
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
                            <Select value={priorityFilter} onValueChange={handlePriorityFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priority</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {(auth.permissions.includes('create top navbar messages') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('top-navbar-messages.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Message
                                </Link>
                            </Button>
                        )}
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No messages found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    messages.data.map((message) => (
                                        <TableRow key={message.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-lg">{message.icon}</div>
                                                    <div>
                                                        <div className="font-medium">{message.type}</div>
                                                        <div className="max-w-xs truncate text-sm text-gray-500" title={message.text}>
                                                            {message.text}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{message.type}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getPriorityColor(message.priority)}>{message.priority.toUpperCase()}</Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(message.is_active)}</TableCell>
                                            <TableCell>
                                                <span className="font-mono text-sm">{message.sort_order}</span>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(message.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view top navbar messages') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('top-navbar-messages.show', message.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit top navbar messages') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('top-navbar-messages.edit', message.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete top navbar messages') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(message.id)} className="text-red-600">
                                                                <Trash2 className="mr-2 h-4 w-4" />
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
                    {messages.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {messages.from} to {messages.to} of {messages.total} results
                            </div>
                            <div className="flex gap-2">
                                {messages.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(messages.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {messages.current_page < messages.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(messages.current_page + 1)}>
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
