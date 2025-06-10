import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Download, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Annual Reports',
        href: route('annual-reports.index'),
    },
];

interface AnnualReport {
    id: number;
    annual_report_fiscal_year: number;
    annual_report: string | null;
    annual_report_url: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginatedAnnualReports {
    data: AnnualReport[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    annualReports: PaginatedAnnualReports;
    filters: {
        filter?: {
            search?: string;
        };
        sort?: string;
    };
}

export default function Index({ annualReports, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchTerm) {
            params.append('filter[search]', searchTerm);
        }

        router.get(
            `${route('annual-reports.index')}?${params.toString()}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (annualReport: AnnualReport) => {
        if (confirm('Are you sure you want to delete this annual report?')) {
            router.delete(route('annual-reports.destroy', annualReport.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const downloadFile = (url: string, filename: string) => {
        window.open(url, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Annual Reports" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Annual Reports" description="Manage annual financial reports" />
                    <Button asChild>
                        <Link href={route('annual-reports.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Annual Report
                        </Link>
                    </Button>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Search & Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex items-center space-x-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search by fiscal year..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Reports Counter */}
                <Card className="mb-6">
                    <CardContent className="flex items-center justify-between py-4">
                        <div className="text-2xl font-bold text-gray-900">{annualReports.total} Total Annual Reports</div>
                        <div className="text-sm text-gray-600">{annualReports.data.filter((r) => r.annual_report).length} reports with files</div>
                    </CardContent>
                </Card>

                {/* Annual Reports Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Annual Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {annualReports.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-gray-500">No annual reports found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 text-left font-medium text-gray-900">Fiscal Year</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900">Report File</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900">Created</th>
                                            <th className="px-4 py-3 text-right font-medium text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {annualReports.data.map((report) => (
                                            <tr key={report.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <div className="font-medium text-gray-900">FY {report.annual_report_fiscal_year}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {report.annual_report && report.annual_report_url ? (
                                                        <div className="flex items-center space-x-2">
                                                            <Badge variant="secondary">File Available</Badge>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    downloadFile(
                                                                        report.annual_report_url!,
                                                                        `Annual-Report-${report.annual_report_fiscal_year}.pdf`,
                                                                    )
                                                                }
                                                            >
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline">No File</Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(report.created_at)}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={route('annual-reports.show', report.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={route('annual-reports.edit', report.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(report)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {annualReports.last_page > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {(annualReports.current_page - 1) * annualReports.per_page + 1} to{' '}
                            {Math.min(annualReports.current_page * annualReports.per_page, annualReports.total)} of {annualReports.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            {annualReports.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
