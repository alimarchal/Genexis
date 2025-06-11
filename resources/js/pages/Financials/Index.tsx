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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, FileText, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
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
    first_quarter_report_url: string | null;
    half_yearly_report: string | null;
    half_yearly_report_url: string | null;
    third_quarter_report: string | null;
    third_quarter_report_url: string | null;
    annual_report: string | null;
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
    };
    filters: {
        filter?: {
            fiscal_year?: string;
        };
        sort?: string;
    };
}

export default function FinancialReportsIndex({ financialReports, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.fiscal_year || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, unknown> = {};

        if (searchTerm) {
            params['filter[fiscal_year]'] = searchTerm;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router.get(route('financial-reports.index'), params as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this financial report?')) {
            router.delete(route('financial-reports.destroy', id));
        }
    };

    const getAvailableReportsCount = (report: FinancialReport) => {
        const reports = [report.first_quarter_report, report.half_yearly_report, report.third_quarter_report, report.annual_report];
        return reports.filter(Boolean).length;
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
            <Head title="Financial Reports" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Financial Reports" description="Manage annual and quarterly financial reports" />
                    <Button asChild>
                        <Link href={route('financial-reports.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Report
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-4">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by fiscal year..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit">Filter</Button>
                    </div>
                </form>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fiscal Year</TableHead>
                                <TableHead>Q1 Report</TableHead>
                                <TableHead>Half Yearly</TableHead>
                                <TableHead>Q3 Report</TableHead>
                                <TableHead>Annual Report</TableHead>
                                <TableHead>Reports Available</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-[70px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {financialReports.data.length > 0 ? (
                                financialReports.data.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-medium">{report.fiscal_year}</TableCell>
                                        <TableCell>
                                            {report.first_quarter_report_url ? (
                                                <a
                                                    href={report.first_quarter_report_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">Not available</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {report.half_yearly_report_url ? (
                                                <a
                                                    href={report.half_yearly_report_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">Not available</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {report.third_quarter_report_url ? (
                                                <a
                                                    href={report.third_quarter_report_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">Not available</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {report.annual_report_url ? (
                                                <a
                                                    href={report.annual_report_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">Not available</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{getAvailableReportsCount(report)} of 4</Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(report.created_at)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('financial-reports.show', report.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('financial-reports.edit', report.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(report.id)}>
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center">
                                        No financial reports found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {financialReports.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {(financialReports.current_page - 1) * financialReports.per_page + 1} to{' '}
                            {Math.min(financialReports.current_page * financialReports.per_page, financialReports.total)} of {financialReports.total}{' '}
                            results
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
