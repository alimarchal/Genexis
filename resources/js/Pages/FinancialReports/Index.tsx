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
import { Download, Edit, Eye, FileText, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Financial Reports',
        href: route('financial-reports.index'),
    },
];

interface FinancialReport {
    id: number;
    fiscal_year: number;
    first_quarter_report: string | null;
    half_yearly_report: string | null;
    third_quarter_report: string | null;
    annual_report: string | null;
    first_quarter_report_url: string | null;
    half_yearly_report_url: string | null;
    third_quarter_report_url: string | null;
    annual_report_url: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    financialReports: {
        data: FinancialReport[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function FinancialReportIndex({ financialReports, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[fiscal_year]'] || '');
    const [reportFilter, setReportFilter] = useState(() => {
        const reportParam = filters['filter[has_reports]'];
        if (reportParam === 'q1') return 'q1';
        if (reportParam === 'half') return 'half';
        if (reportParam === 'q3') return 'q3';
        if (reportParam === 'annual') return 'annual';
        if (reportParam === 'complete') return 'complete';
        if (reportParam === 'incomplete') return 'incomplete';
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

        if (search.trim()) {
            params['filter[fiscal_year]'] = search;
        }
        if (reportFilter !== 'all') {
            params['filter[has_reports]'] = reportFilter;
        }
        if (yearFilter !== 'all') {
            params['filter[year_range]'] = yearFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('financial-reports.index'),
            {
                ...buildParams(),
                'filter[fiscal_year]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleReportFilter = (value: string) => {
        setReportFilter(value);
        router.get(
            route('financial-reports.index'),
            {
                ...buildParams(),
                'filter[has_reports]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleYearFilter = (value: string) => {
        setYearFilter(value);
        router.get(
            route('financial-reports.index'),
            {
                ...buildParams(),
                'filter[year_range]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('financial-reports.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this financial report?')) {
            router.delete(route('financial-reports.destroy', id));
        }
    };

    const getReportsBadge = (report: FinancialReport) => {
        const reports = [report.first_quarter_report, report.half_yearly_report, report.third_quarter_report, report.annual_report].filter(Boolean);

        if (reports.length === 4) {
            return <Badge variant="default">Complete ({reports.length}/4)</Badge>;
        } else if (reports.length > 0) {
            return <Badge variant="secondary">Partial ({reports.length}/4)</Badge>;
        } else {
            return <Badge variant="outline">No Reports (0/4)</Badge>;
        }
    };

    const getYearBadge = (year: number) => {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - year;

        if (yearDiff <= 1) {
            return <Badge variant="default">Recent</Badge>;
        } else if (yearDiff <= 5) {
            return <Badge variant="secondary">Last 5 Years</Badge>;
        } else {
            return <Badge variant="outline">Older</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getAvailableReports = (report: FinancialReport) => {
        const reports = [];
        if (report.first_quarter_report) reports.push({ name: 'Q1', url: report.first_quarter_report_url });
        if (report.half_yearly_report) reports.push({ name: 'Half-Year', url: report.half_yearly_report_url });
        if (report.third_quarter_report) reports.push({ name: 'Q3', url: report.third_quarter_report_url });
        if (report.annual_report) reports.push({ name: 'Annual', url: report.annual_report_url });
        return reports;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Financial Reports" />

            <div className="px-10 py-6">
                <Heading title="Financial Reports" description="Manage quarterly and annual financial reports by fiscal year" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
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

                            <Select value={reportFilter} onValueChange={handleReportFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Reports" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Reports</SelectItem>
                                    <SelectItem value="complete">Complete (4/4)</SelectItem>
                                    <SelectItem value="incomplete">Incomplete</SelectItem>
                                    <SelectItem value="q1">Has Q1 Report</SelectItem>
                                    <SelectItem value="half">Has Half-Year</SelectItem>
                                    <SelectItem value="q3">Has Q3 Report</SelectItem>
                                    <SelectItem value="annual">Has Annual</SelectItem>
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

                        {(auth.permissions.includes('create financial reports') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('financial-reports.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Report
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fiscal Year</TableHead>
                                    <TableHead>Reports Status</TableHead>
                                    <TableHead>Available Reports</TableHead>
                                    <TableHead>Year Category</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {financialReports.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                                            No financial reports found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    financialReports.data.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-blue-500" />
                                                    <div>
                                                        <div className="text-lg font-medium">FY {report.fiscal_year}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {report.fiscal_year}-{report.fiscal_year + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getReportsBadge(report)}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {getAvailableReports(report).length > 0 ? (
                                                        getAvailableReports(report).map((reportFile, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {reportFile.name}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-500">No reports</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getYearBadge(report.fiscal_year)}</TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(report.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view financial reports') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('financial-reports.show', report.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit financial reports') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('financial-reports.edit', report.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {getAvailableReports(report).length > 0 && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                {getAvailableReports(report).map((reportFile, index) => (
                                                                    <DropdownMenuItem key={index} asChild>
                                                                        <a href={reportFile.url || '#'} target="_blank" rel="noopener noreferrer">
                                                                            <Download className="mr-2 h-4 w-4" />
                                                                            Download {reportFile.name}
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete financial reports') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(report.id)} className="text-red-600">
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
                    {financialReports.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {financialReports.from} to {financialReports.to} of {financialReports.total} results
                            </div>
                            <div className="flex gap-2">
                                {financialReports.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(financialReports.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {financialReports.current_page < financialReports.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(financialReports.current_page + 1)}>
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
