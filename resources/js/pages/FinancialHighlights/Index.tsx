import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface FinancialHighlight {
    id: number;
    fiscal_year: number;
    file_path: string;
    file_name: string;
    file_size: number;
    created_at: string;
    updated_at: string;
    creator: {
        name: string;
    };
    updater: {
        name: string;
    };
    download_url: string;
    view_url: string;
    edit_url: string;
}

interface Props {
    financial_highlights: {
        data: FinancialHighlight[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        sort?: string;
        per_page?: number;
    };
}

export default function Index({ financial_highlights, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const { delete: destroy } = useForm();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('financial-highlights.index'),
            {
                search,
                sort: filters.sort,
                per_page: filters.per_page,
            },
            { preserveState: true },
        );
    };

    const handleSort = (field: string) => {
        const currentSort = filters.sort;
        let newSort = field;

        if (currentSort === field) {
            newSort = `-${field}`;
        } else if (currentSort === `-${field}`) {
            newSort = field;
        }

        router.get(
            route('financial-highlights.index'),
            {
                search: filters.search,
                sort: newSort,
                per_page: filters.per_page,
            },
            { preserveState: true },
        );
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(
            route('financial-highlights.index'),
            {
                search: filters.search,
                sort: filters.sort,
                per_page: perPage,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this financial highlight?')) {
            destroy(route('financial-highlights.destroy', id));
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Financial Highlights', href: route('financial-highlights.index') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Financial Highlights" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Financial Highlights</h1>
                        <p className="mt-1 text-sm text-gray-600">Manage and view financial highlight documents</p>
                    </div>
                    <Link href={route('financial-highlights.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Financial Highlight
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <form onSubmit={handleSearch} className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search financial highlights..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </form>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Show:</span>
                                <Select value={filters.per_page?.toString() || '15'} onValueChange={(value) => handlePerPageChange(parseInt(value))}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="15">15</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort('fiscal_year')}>
                                        Fiscal Year
                                        {filters.sort === 'fiscal_year' && <span className="ml-1">↑</span>}
                                        {filters.sort === '-fiscal_year' && <span className="ml-1">↓</span>}
                                    </TableHead>
                                    <TableHead>File Name</TableHead>
                                    <TableHead>File Size</TableHead>
                                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort('created_at')}>
                                        Created
                                        {filters.sort === 'created_at' && <span className="ml-1">↑</span>}
                                        {filters.sort === '-created_at' && <span className="ml-1">↓</span>}
                                    </TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {financial_highlights.data.map((highlight) => (
                                    <TableRow key={highlight.id}>
                                        <TableCell className="font-medium">{highlight.fiscal_year}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <span className="text-sm">{highlight.file_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{formatFileSize(highlight.file_size)}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{formatDate(highlight.created_at)}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{highlight.creator?.name || 'N/A'}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(highlight.download_url, '_blank')}
                                                    title="Download"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Link href={highlight.view_url}>
                                                    <Button variant="ghost" size="sm" title="View">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={highlight.edit_url}>
                                                    <Button variant="ghost" size="sm" title="Edit">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(highlight.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {financial_highlights.data.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="text-gray-500">
                                <p className="text-lg font-medium">No financial highlights found</p>
                                <p className="mt-1">Get started by adding your first financial highlight document.</p>
                            </div>
                            <div className="mt-6">
                                <Link href={route('financial-highlights.create')}>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Financial Highlight
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {financial_highlights.total > 0 && (
                        <div className="border-t border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {(financial_highlights.current_page - 1) * financial_highlights.per_page + 1} to{' '}
                                    {Math.min(financial_highlights.current_page * financial_highlights.per_page, financial_highlights.total)} of{' '}
                                    {financial_highlights.total} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            router.get(
                                                route('financial-highlights.index'),
                                                {
                                                    page: financial_highlights.current_page - 1,
                                                    search: filters.search,
                                                    sort: filters.sort,
                                                    per_page: filters.per_page,
                                                },
                                                { preserveState: true },
                                            );
                                        }}
                                        disabled={financial_highlights.current_page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-sm text-gray-700">
                                        Page {financial_highlights.current_page} of {financial_highlights.last_page}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            router.get(
                                                route('financial-highlights.index'),
                                                {
                                                    page: financial_highlights.current_page + 1,
                                                    search: filters.search,
                                                    sort: filters.sort,
                                                    per_page: filters.per_page,
                                                },
                                                { preserveState: true },
                                            );
                                        }}
                                        disabled={financial_highlights.current_page === financial_highlights.last_page}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
