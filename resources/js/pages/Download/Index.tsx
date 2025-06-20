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
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Downloads', href: route('downloads.index') },
];

interface DownloadItem {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string | null;
    file_size: number | null;
    category: string;
    is_featured: boolean;
    is_active: boolean;
    download_count: number;
    created_at: string;
    updated_at: string;
    file_size_formatted: string;
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
        const param = filters['filter[is_active]'];
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });
    const [categoryFilter, setCategoryFilter] = useState(filters['filter[category]'] || 'all');
    const [featuredFilter, setFeaturedFilter] = useState(() => {
        const param = filters['filter[is_featured]'];
        if (param === '1') return 'featured';
        if (param === '0') return 'not_featured';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[title]'] = search;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        if (categoryFilter !== 'all') params['filter[category]'] = categoryFilter;
        if (featuredFilter !== 'all') params['filter[is_featured]'] = featuredFilter === 'featured' ? '1' : '0';
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('downloads.index'),
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
            route('downloads.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleCategoryFilter = (value: string) => {
        setCategoryFilter(value);
        router.get(
            route('downloads.index'),
            {
                ...buildParams(),
                'filter[category]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleFeaturedFilter = (value: string) => {
        setFeaturedFilter(value);
        router.get(
            route('downloads.index'),
            {
                ...buildParams(),
                'filter[is_featured]': value !== 'all' ? (value === 'featured' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('downloads.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this download?')) {
            router.delete(route('downloads.destroy', id));
        }
    };

    const getStatusBadge = (download: DownloadItem) => {
        return download.is_active ? <Badge variant="default">Active</Badge> : <Badge variant="outline">Inactive</Badge>;
    };

    const getFeaturedBadge = (isFeatured: boolean) => {
        return isFeatured ? <Badge variant="secondary">Featured</Badge> : <Badge variant="outline">Regular</Badge>;
    };

    const getCategoryBadge = (category: string) => {
        const categoryColors: Record<string, string> = {
            document: 'bg-blue-100 text-blue-800',
            picture: 'bg-green-100 text-green-800',
            form: 'bg-purple-100 text-purple-800',
            general: 'bg-gray-100 text-gray-800',
        };

        return (
            <Badge variant="outline" className={categoryColors[category.toLowerCase()] || categoryColors.general}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
            <Head title="Downloads" />
            <div className="px-10 py-6">
                <Heading title="Downloads" description="Manage downloadable files and resources" />
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
                            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                                <SelectTrigger className="w-44">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="Document">Document</SelectItem>
                                    <SelectItem value="picture">Picture</SelectItem>
                                    <SelectItem value="form">Form</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={featuredFilter} onValueChange={handleFeaturedFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Items" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Items</SelectItem>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="not_featured">Regular</SelectItem>
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
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>File Size</TableHead>
                                    <TableHead>Downloads</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
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
                                            <TableCell className="w-80 max-w-80">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                                        <FileText className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div className="min-w-0 flex-1 overflow-hidden">
                                                        <div className="flex items-start gap-2">
                                                            <div className="pr-1 text-sm leading-tight font-medium break-words hyphens-auto whitespace-normal">
                                                                {download.title}
                                                            </div>
                                                            {download.is_featured && (
                                                                <Star className="mt-0.5 h-4 w-4 shrink-0 fill-current text-yellow-500" />
                                                            )}
                                                        </div>
                                                        {download.description && (
                                                            <div className="mt-1 line-clamp-2 text-xs break-words hyphens-auto whitespace-normal text-gray-500">
                                                                {download.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getCategoryBadge(download.category)}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">{download.file_size_formatted}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm font-medium">{download.download_count.toLocaleString()}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getStatusBadge(download)}
                                                    {download.is_featured && <Badge variant="secondary">Featured</Badge>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(download.created_at)}</TableCell>
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
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <a
                                                                href={route('downloads.admin-download', download.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download
                                                            </a>
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
                    {downloads.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {downloads.from} to {downloads.to} of {downloads.total} results
                            </div>
                            <div className="flex gap-2">
                                {downloads.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(downloads.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {downloads.current_page < downloads.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(downloads.current_page + 1)}>
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
