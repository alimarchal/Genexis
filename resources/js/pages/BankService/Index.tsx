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
import { Building, Edit, Eye, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Bank Services',
        href: route('bank-services.index'),
    },
];

interface BankService {
    id: number;
    title: string;
    description: string;
    icon: string;
    products: string[] | string;
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[] | string;
    order: number;
    status: boolean;
    service_type: 'service' | 'deposit' | 'stat';
    stat_number: string | null;
    stat_label: string | null;
    stat_description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    bankServices: {
        data: BankService[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function BankServiceIndex({ bankServices, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    // Helper function to ensure we have arrays
    const ensureArray = (value: string | string[] | unknown): string[] => {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [value];
            } catch {
                return [value];
            }
        }
        return [];
    };

    const [search, setSearch] = useState(filters['filter[title]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[status]'];
        if (statusParam === '1') return '1';
        if (statusParam === '0') return '0';
        return 'all';
    });
    const [typeFilter, setTypeFilter] = useState(filters['filter[service_type]'] || 'all');

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[title]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[status]'] = statusFilter;
        }
        if (typeFilter !== 'all') {
            params['filter[service_type]'] = typeFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('bank-services.index'),
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
            route('bank-services.index'),
            {
                ...buildParams(),
                'filter[status]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleTypeFilter = (value: string) => {
        setTypeFilter(value);
        router.get(
            route('bank-services.index'),
            {
                ...buildParams(),
                'filter[service_type]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('bank-services.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this bank service?')) {
            router.delete(route('bank-services.destroy', id));
        }
    };

    const getStatusBadge = (status: boolean) => {
        return status ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            service: 'default',
            deposit: 'secondary',
            stat: 'outline',
        };

        return <Badge variant={variants[type] || 'default'}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
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
            <Head title="Bank Services" />

            <div className="px-10 py-6">
                <Heading title="Bank Services" description="Manage your bank services and offerings" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search services..."
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
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={typeFilter} onValueChange={handleTypeFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="service">Service</SelectItem>
                                    <SelectItem value="deposit">Deposit</SelectItem>
                                    <SelectItem value="stat">Stats</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(auth.permissions.includes('create bank services') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('bank-services.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Service
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-32">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bankServices.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                            No bank services found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bankServices.data.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Building className="text-muted-foreground h-4 w-4" />
                                                    <div>
                                                        <div className="font-medium">{service.title}</div>
                                                        <div className="text-muted-foreground max-w-xs truncate text-sm">{service.description}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getTypeBadge(service.service_type)}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {ensureArray(service.products).length > 0 ? (
                                                        <span>{ensureArray(service.products).length} products</span>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(service.status)}</TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{formatDate(service.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view bank services') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('bank-services.show', service.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit bank services') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('bank-services.edit', service.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete bank services') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(service.id)} className="text-red-600">
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
                    {bankServices.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {bankServices.from} to {bankServices.to} of {bankServices.total} results
                            </div>
                            <div className="flex gap-2">
                                {bankServices.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(bankServices.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {bankServices.current_page < bankServices.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(bankServices.current_page + 1)}>
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
