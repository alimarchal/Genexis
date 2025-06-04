import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, Search, Building } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';

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
    products: string[];
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[];
    order: number;
    status: boolean;
    service_type: 'main' | 'additional' | 'stat';
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
    };
    filters: {
        filter?: {
            title?: string;
            status?: string;
            service_type?: string;
        };
        sort?: string;
    };
}

export default function BankServiceIndex({ bankServices, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.title || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || 'all');
    const [typeFilter, setTypeFilter] = useState(filters.filter?.service_type || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, unknown> = {};

        if (searchTerm) {
            params['filter[title]'] = searchTerm;
        }

        if (statusFilter && statusFilter !== 'all') {
            params['filter[status]'] = statusFilter;
        }

        if (typeFilter && typeFilter !== 'all') {
            params['filter[service_type]'] = typeFilter;
        }

        router.get(route('bank-services.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this bank service?')) {
            router.delete(route('bank-services.destroy', id));
        }
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

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Bank Services" description="Manage your bank services and offerings" />
                    <Button asChild>
                        <Link href={route('bank-services.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Service
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Search by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                        <div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="main">Main</SelectItem>
                                    <SelectItem value="additional">Additional</SelectItem>
                                    <SelectItem value="stat">Stats</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit">
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </div>
                </form>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>CTA</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-32">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bankServices.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No bank services found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bankServices.data.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell className="font-medium">
                                            {service.order}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{service.title}</div>
                                                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                                                        {service.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {service.service_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {service.products.length > 0 ? (
                                                    <span>{service.products.length} products</span>
                                                ) : (
                                                    '-'
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div className="font-medium">{service.cta_text}</div>
                                                <div className="text-muted-foreground text-xs max-w-xs truncate">
                                                    {service.cta_link}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={service.status ? 'default' : 'secondary'}>
                                                {service.status ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(service.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link href={route('bank-services.show', service.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link href={route('bank-services.edit', service.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(service.id)}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {bankServices.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {(bankServices.current_page - 1) * bankServices.per_page + 1} to{' '}
                            {Math.min(bankServices.current_page * bankServices.per_page, bankServices.total)} of{' '}
                            {bankServices.total} results
                        </div>
                        <div className="flex gap-2">
                            {bankServices.current_page > 1 && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('bank-services.index', { page: bankServices.current_page - 1 })}>
                                        Previous
                                    </Link>
                                </Button>
                            )}
                            {bankServices.current_page < bankServices.last_page && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('bank-services.index', { page: bankServices.current_page + 1 })}>
                                        Next
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
