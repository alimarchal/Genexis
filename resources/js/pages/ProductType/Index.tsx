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
import { Edit, Eye, MoreHorizontal, Package, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Product Types',
        href: route('product-types.index'),
    },
];

interface Product {
    id: number;
    name: string;
}

interface ProductType {
    id: number;
    product_id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    product: Product;
}

interface Props {
    productTypes: {
        data: ProductType[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    products: Product[];
    filters: Record<string, string>;
}

export default function ProductTypeIndex({ productTypes, products, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[name]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[is_active]'];
        if (statusParam === '1') return 'active';
        if (statusParam === '0') return 'inactive';
        return 'all';
    });
    const [productFilter, setProductFilter] = useState(filters['filter[product_id]'] || 'all');

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[name]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        }
        if (productFilter !== 'all') {
            params['filter[product_id]'] = productFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('product-types.index'),
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
            route('product-types.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleProductFilter = (value: string) => {
        setProductFilter(value);
        router.get(
            route('product-types.index'),
            {
                ...buildParams(),
                'filter[product_id]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('product-types.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product type?')) {
            router.delete(route('product-types.destroy', id));
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
            <Head title="Product Types" />

            <div className="px-10 py-6">
                <Heading title="Product Types" description="Manage product type categories" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search product types..."
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

                            <Select value={productFilter} onValueChange={handleProductFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Products" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Products</SelectItem>
                                    {products.map((product) => (
                                        <SelectItem key={product.id} value={product.id.toString()}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button asChild>
                            <Link href={route('product-types.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Type
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type Name</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productTypes.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                                            No product types found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    productTypes.data.map((productType) => (
                                        <TableRow key={productType.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Package className="h-4 w-4 text-gray-500" />
                                                    <div>
                                                        <div className="font-medium">{productType.name}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{productType.product.name}</Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(productType.is_active)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(productType.created_at)}</TableCell>
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
                                                            <Link href={route('product-types.show', productType.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('product-types.edit', productType.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(productType.id)} className="text-red-600">
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
                    {productTypes.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {productTypes.from} to {productTypes.to} of {productTypes.total} results
                            </div>
                            <div className="flex gap-2">
                                {productTypes.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(productTypes.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {productTypes.current_page < productTypes.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(productTypes.current_page + 1)}>
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
