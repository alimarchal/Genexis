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
import { Download, Edit, Eye, FileText, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Financial Highlights',
        href: route('financial-highlights.index'),
    },
];

interface FinancialHighlight {
    id: number;
    fiscal_year: number;
    financial_highlights: string | null;
    financial_highlights_url: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    financialHighlights: {
        data: FinancialHighlight[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function FinancialHighlightIndex({ financialHighlights, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[fiscal_year]'] || '');
    const [highlightsFilter, setHighlightsFilter] = useState(() => {
        const param = filters['filter[has_highlights]'];
        if (param === 'yes') return 'yes';
        if (param === 'no') return 'no';
        return 'all';
    });
    const [yearFilter, setYearFilter] = useState(() => {
        const yearParam = filters['filter[year_range]'];
        if (yearParam === 'recent') return 'recent';
        if (yearParam === 'last_5_years') return 'last_5_years';
        if (yearParam === 'older') return 'older';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[fiscal_year]'] = search;
        if (highlightsFilter !== 'all') params['filter[has_highlights]'] = highlightsFilter;
        if (yearFilter !== 'all') params['filter[year_range]'] = yearFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('financial-highlights.index'),
            {
                ...buildParams(),
                'filter[fiscal_year]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleHighlightsFilter = (value: string) => {
        setHighlightsFilter(value);
        router.get(
            route('financial-highlights.index'),
            {
                ...buildParams(),
                'filter[has_highlights]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleYearFilter = (value: string) => {
        setYearFilter(value);
        router.get(
            route('financial-highlights.index'),
            {
                ...buildParams(),
                'filter[year_range]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('financial-highlights.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this financial highlights?')) {
            router.delete(route('financial-highlights.destroy', id));
        }
    };

    const getHighlightsBadge = (highlight: FinancialHighlight) => {
        return highlight.financial_highlights ? <Badge variant="default">Uploaded</Badge> : <Badge variant="outline">No Highlights</Badge>;
    };

    const getYearBadge = (year: number) => {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - year;

        if (yearDiff <= 1) return <Badge variant="default">Recent</Badge>;
        if (yearDiff <= 5) return <Badge variant="secondary">Last 5 Years</Badge>;
        return <Badge variant="outline">Older</Badge>;
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
            <Head title="Financial Highlights" />
            <div className="px-10 py-6">
                <Heading title="Financial Highlights" description="Manage financial highlights by fiscal year" />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search by fiscal year..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={highlightsFilter} onValueChange={handleHighlightsFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Highlights" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Highlights</SelectItem>
                                    <SelectItem value="yes">Has Highlights</SelectItem>
                                    <SelectItem value="no">No Highlights</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={yearFilter} onValueChange={handleYearFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Years" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Years</SelectItem>
                                    <SelectItem value="recent">Recent</SelectItem>
                                    <SelectItem value="last_5_years">Last 5 Years</SelectItem>
                                    <SelectItem value="older">Older</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button asChild>
                            <Link href={route('financial-highlights.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Highlights
                            </Link>
                        </Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fiscal Year</TableHead>
                                    <TableHead>Highlights Status</TableHead>
                                    <TableHead>Year Category</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {financialHighlights.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                                            No financial highlights found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    financialHighlights.data.map((highlight) => (
                                        <TableRow key={highlight.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-orange-500" />
                                                    <div>
                                                        <div className="text-lg font-medium">FY {highlight.fiscal_year}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {highlight.fiscal_year}-{highlight.fiscal_year + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getHighlightsBadge(highlight)}</TableCell>
                                            <TableCell>{getYearBadge(highlight.fiscal_year)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(highlight.created_at)}</TableCell>
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
                                                            <Link href={route('financial-highlights.show', highlight.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('financial-highlights.edit', highlight.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {highlight.financial_highlights_url && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild>
                                                                    <a
                                                                        href={highlight.financial_highlights_url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download Highlights
                                                                    </a>
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(highlight.id)} className="text-red-600">
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
                    {financialHighlights.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {financialHighlights.from} to {financialHighlights.to} of {financialHighlights.total} results
                            </div>
                            <div className="flex gap-2">
                                {financialHighlights.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(financialHighlights.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {financialHighlights.current_page < financialHighlights.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(financialHighlights.current_page + 1)}>
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
