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
import { Download, Edit, Eye, FileText, MoreHorizontal, Plus, Search, Star, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Downloads',
        href: route('downloads.index'),
    },
];

interface DownloadItem {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string | null;
    file_size: number | null;
    file_size_formatted: string;
    category: string;
    is_featured: boolean;
    is_active: boolean;
    download_count: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    downloads: {
        data: DownloadItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function DownloadIndex({ downloads, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[title]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        if (filters['filter[is_active]'] === '1') return 'active';
        if (filters['filter[is_active]'] === '0') return 'inactive';
        return 'all';
    });
    const [categoryFilter, setCategoryFilter] = useState(filters['filter[category]'] || 'all');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('downloads.index'),
            {
                ...filters,
                'filter[title]': value || undefined,
                page: undefined
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('downloads.index'),
            {
                ...filters,
                'filter[is_active]': value === 'all' ? undefined : (value === 'active' ? '1' : '0'),
                page: undefined
            },
            { preserveState: true, replace: true },
        );
    };

    const handleCategoryFilter = (value: string) => {
        setCategoryFilter(value);
        router.get(
            route('downloads.index'),
            {
                ...filters,
                'filter[category]': value === 'all' ? undefined : value,
                page: undefined
            },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this download?')) {
            router.delete(route('downloads.destroy', id));
        }
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getCategoryBadge = (category: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            forms: 'default',
            reports: 'secondary',
            brochures: 'outline',
            policies: 'destructive',
            general: 'secondary',
        };

        return <Badge variant={variants[category] || 'default'}>{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Downloads" />

            <div className="px-10 py-6">
                <Heading title="Downloads" description="Manage downloadable files and documents" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search downloads..."
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

                            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="forms">Forms</SelectItem>
                                    <SelectItem value="reports">Reports</SelectItem>
                                    <SelectItem value="brochures">Brochures</SelectItem>
                                    <SelectItem value="policies">Policies</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button asChild>
                            <Link href={route('downloads.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Download
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>File Info</TableHead>
                                    <TableHead>Downloads</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {downloads.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No downloads found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    downloads.data.map((download) => (
                                        <TableRow key={download.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-8 w-8 text-blue-500" />
                                                    <div>
                                                        <div className="font-medium">{download.title}</div>
                                                        {download.description && (
                                                            <div className="line-clamp-1 text-sm text-gray-500">
                                                                {download.description.substring(0, 60)}...
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getCategoryBadge(download.category)}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div className="font-medium">{download.file_size_formatted}</div>
                                                    <div className="text-gray-500">{download.file_type}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{download.download_count}</Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(download.is_active)}</TableCell>
                                            <TableCell>
                                                {download.is_featured && (
                                                    <Badge variant="outline">
                                                        <Star className="mr-1 h-3 w-3" />
                                                        Featured
                                                    </Badge>
                                                )}
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
                                                            <Link href={route('downloads.show', download.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('downloads.edit', download.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('downloads.admin-download', download.id)}>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(download.id)} className="text-red-600">
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
                    {downloads.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {downloads.from} to {downloads.to} of {downloads.total} results
                            </div>
                            <div className="flex gap-2">
                                {downloads.current_page > 1 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(route('downloads.index'), {
                                                ...filters,
                                                page: downloads.current_page - 1,
                                            })
                                        }
                                    >
                                        Previous
                                    </Button>
                                )}
                                {downloads.current_page < downloads.last_page && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(route('downloads.index'), {
                                                ...filters,
                                                page: downloads.current_page + 1,
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
