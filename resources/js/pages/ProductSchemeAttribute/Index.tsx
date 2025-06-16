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
import { Edit, Eye, Hash, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Scheme Attributes',
        href: route('product-scheme-attributes.index'),
    },
];

interface ProductScheme {
    id: number;
    name: string;
    productTypeAccount: {
        id: number;
        name: string;
    };
}

interface ProductSchemeAttribute {
    id: number;
    product_scheme_id: number;
    attribute_name: string;
    attribute_value: string;
    attribute_type: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    productScheme: {
        id: number;
        name: string;
        productTypeAccount: {
            id: number;
            name: string;
            productType: {
                id: number;
                name: string;
                product: {
                    id: number;
                    name: string;
                };
            };
        };
    };
}

interface Props {
    attributes: {
        data: ProductSchemeAttribute[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    schemes: ProductScheme[];
    filters: Record<string, string>;
}

export default function ProductSchemeAttributeIndex({ attributes, schemes, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[attribute_name]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[is_active]'];
        if (statusParam === '1') return 'active';
        if (statusParam === '0') return 'inactive';
        return 'all';
    });
    const [typeFilter, setTypeFilter] = useState(filters['filter[attribute_type]'] || 'all');
    const [schemeFilter, setSchemeFilter] = useState(filters['filter[product_scheme_id]'] || 'all');

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[attribute_name]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        }
        if (typeFilter !== 'all') {
            params['filter[attribute_type]'] = typeFilter;
        }
        if (schemeFilter !== 'all') {
            params['filter[product_scheme_id]'] = schemeFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('product-scheme-attributes.index'), {
            ...buildParams(),
            'filter[attribute_name]': value.trim() ? value : undefined
        }, { preserveState: true, replace: true });
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(route('product-scheme-attributes.index'), {
            ...buildParams(),
            'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined
        }, { preserveState: true, replace: true });
    };

    const handleTypeFilter = (value: string) => {
        setTypeFilter(value);
        router.get(route('product-scheme-attributes.index'), {
            ...buildParams(),
            'filter[attribute_type]': value !== 'all' ? value : undefined
        }, { preserveState: true, replace: true });
    };

    const handleSchemeFilter = (value: string) => {
        setSchemeFilter(value);
        router.get(route('product-scheme-attributes.index'), {
            ...buildParams(),
            'filter[product_scheme_id]': value !== 'all' ? value : undefined
        }, { preserveState: true, replace: true });
    };

    const handlePagination = (page: number) => {
        router.get(route('product-scheme-attributes.index'), {
            ...buildParams(),
            page
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this attribute?')) {
            router.delete(route('product-scheme-attributes.destroy', id));
        }
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            text: 'default',
            number: 'secondary',
            boolean: 'destructive',
            date: 'outline',
        };
        return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Scheme Attributes" />

            <div className="px-10 py-6">
                <Heading title="Product Scheme Attributes" description="Manage attribute details for product schemes" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search attributes..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={statusFilter} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={typeFilter} onValueChange={handleTypeFilter}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="boolean">Boolean</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={schemeFilter} onValueChange={handleSchemeFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Scheme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Schemes</SelectItem>
                                    {schemes.map((scheme) => (
                                        <SelectItem key={scheme.id} value={scheme.id.toString()}>
                                            {scheme.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button asChild>
                            <Link href={route('product-scheme-attributes.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Attribute
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Attribute Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Scheme</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attributes.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No attributes found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    attributes.data.map((attribute) => (
                                        <TableRow key={attribute.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Hash className="h-3 w-3 text-gray-400" />
                                                    <span className="font-mono text-sm">{attribute.sort_order}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{attribute.attribute_name}</div>
                                            </TableCell>
                                            <TableCell>
                                                {getTypeBadge(attribute.attribute_type)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs text-sm text-gray-600 truncate">
                                                    {attribute.attribute_value}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div className="font-medium">{attribute.productScheme.name}</div>
                                                    <div className="text-gray-500">{attribute.productScheme.productTypeAccount.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(attribute.is_active)}
                                            </TableCell>
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
                                                            <Link href={route('product-scheme-attributes.show', attribute.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('product-scheme-attributes.edit', attribute.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(attribute.id)} className="text-red-600">
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
                    {attributes.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {attributes.from} to {attributes.to} of {attributes.total} results
                            </div>
                            <div className="flex gap-2">
                                {attributes.current_page > 1 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePagination(attributes.current_page - 1)}
                                    >
                                        Previous
                                    </Button>
                                )}
                                {attributes.current_page < attributes.last_page && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePagination(attributes.current_page + 1)}
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