import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Download, Edit, FileText, Trash2 } from 'lucide-react';

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
    financialReport: FinancialReport;
}

export default function ShowFinancialReport({ financialReport }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Financial Reports',
            href: route('financial-reports.index'),
        },
        {
            title: `FY ${financialReport.fiscal_year}`,
            href: route('financial-reports.show', financialReport.id),
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getAvailableReportsCount = () => {
        const reports = [
            financialReport.first_quarter_report,
            financialReport.half_yearly_report,
            financialReport.third_quarter_report,
            financialReport.annual_report,
        ];
        return reports.filter(Boolean).length;
    };

    const reportSections = [
        {
            title: 'First Quarter Report',
            file: financialReport.first_quarter_report,
            url: financialReport.first_quarter_report_url,
            period: 'Q1',
        },
        {
            title: 'Half Yearly Report',
            file: financialReport.half_yearly_report,
            url: financialReport.half_yearly_report_url,
            period: 'H1',
        },
        {
            title: 'Third Quarter Report',
            file: financialReport.third_quarter_report,
            url: financialReport.third_quarter_report_url,
            period: 'Q3',
        },
        {
            title: 'Annual Report',
            file: financialReport.annual_report,
            url: financialReport.annual_report_url,
            period: 'FY',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Financial Report FY ${financialReport.fiscal_year}`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('financial-reports.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Financial Reports
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('financial-reports.edit', financialReport.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Report
                        </Link>
                    </Button>
                </div>

                <Heading
                    title={`Financial Report - FY ${financialReport.fiscal_year}`}
                    description="View and download quarterly and annual financial reports"
                />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Available Reports
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {reportSections.map((report) => (
                                    <div key={report.title} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{report.title}</h4>
                                                <p className="text-sm text-gray-500">{report.period} {financialReport.fiscal_year}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {report.file ? (
                                                <>
                                                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                                                        Available
                                                    </Badge>
                                                    {report.url && (
                                                        <Button size="sm" variant="outline" asChild>
                                                            <a href={report.url} target="_blank" rel="noopener noreferrer">
                                                                <Download className="w-4 h-4 mr-1" />
                                                                Download
                                                            </a>
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                <Badge variant="secondary" className="text-gray-500">
                                                    Not Available
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Record Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(financialReport.created_at)}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(financialReport.updated_at)}</dd>
                                    </div>
                                </dl>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('financial-reports.edit', financialReport.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Report
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this financial report?')) {
                                            // Handle delete - you might want to use Inertia's router.delete here
                                            window.location.href = route('financial-reports.index');
                                        }
                                    }}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Report
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Report Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Report Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Fiscal Year</dt>
                                        <dd className="mt-1 text-lg font-semibold">{financialReport.fiscal_year}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Available Reports</dt>
                                        <dd className="mt-1">
                                            <Badge variant="outline">
                                                {getAvailableReportsCount()} of 4 reports
                                            </Badge>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Completion Status</dt>
                                        <dd className="mt-1">
                                            {getAvailableReportsCount() === 4 ? (
                                                <Badge className="bg-green-100 text-green-800">Complete</Badge>
                                            ) : (
                                                <Badge variant="secondary">Partial</Badge>
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </CardContent>
                        </Card>

                        {/* Report ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Report ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-mono text-gray-600">#{financialReport.id}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
