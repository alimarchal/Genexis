import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Download, Edit, FileText, Hash, TrendingUp } from 'lucide-react';

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

    const getReportsBadge = () => {
        const reports = [
            financialReport.first_quarter_report,
            financialReport.half_yearly_report,
            financialReport.third_quarter_report,
            financialReport.annual_report,
        ].filter(Boolean);

        if (reports.length === 4) {
            return <Badge variant="default">Complete ({reports.length}/4)</Badge>;
        } else if (reports.length > 0) {
            return <Badge variant="secondary">Partial ({reports.length}/4)</Badge>;
        } else {
            return <Badge variant="outline">No Reports (0/4)</Badge>;
        }
    };

    const getYearBadge = () => {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - financialReport.fiscal_year;

        if (yearDiff <= 1) {
            return <Badge variant="default">Recent</Badge>;
        } else if (yearDiff <= 5) {
            return <Badge variant="secondary">Last 5 Years</Badge>;
        } else {
            return <Badge variant="outline">Older</Badge>;
        }
    };

    const reportSections = [
        {
            title: 'First Quarter Report (Q1)',
            description: 'Financial performance for the first quarter',
            file: financialReport.first_quarter_report,
            downloadUrl: financialReport.first_quarter_report_url,
            icon: <FileText className="h-5 w-5 text-blue-500" />,
            color: 'blue',
        },
        {
            title: 'Half Yearly Report',
            description: 'Mid-year financial summary and analysis',
            file: financialReport.half_yearly_report,
            downloadUrl: financialReport.half_yearly_report_url,
            icon: <FileText className="h-5 w-5 text-green-500" />,
            color: 'green',
        },
        {
            title: 'Third Quarter Report (Q3)',
            description: 'Financial performance for the third quarter',
            file: financialReport.third_quarter_report,
            downloadUrl: financialReport.third_quarter_report_url,
            icon: <FileText className="h-5 w-5 text-orange-500" />,
            color: 'orange',
        },
        {
            title: 'Annual Report',
            description: 'Comprehensive yearly financial report',
            file: financialReport.annual_report,
            downloadUrl: financialReport.annual_report_url,
            icon: <FileText className="h-5 w-5 text-purple-500" />,
            color: 'purple',
        },
    ];

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    const getFileExtension = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('.').pop()?.toUpperCase() || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`FY ${financialReport.fiscal_year} - Financial Reports`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Financial Reports - FY ${financialReport.fiscal_year}`}
                        description={`Financial reports for fiscal year ${financialReport.fiscal_year}-${financialReport.fiscal_year + 1}`}
                    />
                    <Button asChild>
                        <Link href={route('financial-reports.edit', financialReport.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Reports
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Overview Card */}
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                                        <TrendingUp className="h-10 w-10 text-blue-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">Fiscal Year {financialReport.fiscal_year}</CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">
                                                {financialReport.fiscal_year} - {financialReport.fiscal_year + 1}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getReportsBadge()}
                                            {getYearBadge()}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Report Sections */}
                        <div className="space-y-6">
                            {reportSections.map((section, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {section.icon}
                                                <div>
                                                    <CardTitle className="text-lg">{section.title}</CardTitle>
                                                    <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                                                </div>
                                            </div>
                                            {section.file && section.downloadUrl && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={section.downloadUrl} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {section.file ? (
                                            <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
                                                    <FileText className="h-6 w-6 text-gray-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">{getCurrentFileName(section.file)}</div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <span>{getFileExtension(section.file)} File</span>
                                                        <span>•</span>
                                                        <span>Available for download</span>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    Uploaded
                                                </Badge>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4 rounded-md border-2 border-dashed border-gray-200 p-6 text-center">
                                                <div className="flex-1">
                                                    <FileText className="mx-auto h-8 w-8 text-gray-400" />
                                                    <p className="mt-2 text-sm font-medium text-gray-900">No file uploaded</p>
                                                    <p className="text-sm text-gray-500">This report has not been uploaded yet</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Fiscal Year</p>
                                        <p className="text-sm text-gray-600">FY {financialReport.fiscal_year}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Period</p>
                                        <p className="text-sm text-gray-600">
                                            {financialReport.fiscal_year} - {financialReport.fiscal_year + 1}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getReportsBadge()}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Category</p>
                                        <div className="mt-1">{getYearBadge()}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistics Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Total Reports:</span>
                                    <span className="text-gray-600">
                                        {
                                            [
                                                financialReport.first_quarter_report,
                                                financialReport.half_yearly_report,
                                                financialReport.third_quarter_report,
                                                financialReport.annual_report,
                                            ].filter(Boolean).length
                                        }{' '}
                                        of 4
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Q1 Report:</span>
                                    <span className="text-gray-600">{financialReport.first_quarter_report ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Half-Year Report:</span>
                                    <span className="text-gray-600">{financialReport.half_yearly_report ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Q3 Report:</span>
                                    <span className="text-gray-600">{financialReport.third_quarter_report ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Annual Report:</span>
                                    <span className="text-gray-600">{financialReport.annual_report ? 'Yes' : 'No'}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(financialReport.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(financialReport.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('financial-reports.edit', financialReport.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Reports
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('financial-reports.index')}>Back to List</Link>
                                </Button>

                                {/* Download All Available Reports */}
                                {[
                                    financialReport.first_quarter_report,
                                    financialReport.half_yearly_report,
                                    financialReport.third_quarter_report,
                                    financialReport.annual_report,
                                ].filter(Boolean).length > 0 && (
                                    <div className="border-t pt-2">
                                        <p className="mb-2 text-sm font-medium text-gray-700">Download Reports:</p>
                                        <div className="space-y-2">
                                            {financialReport.first_quarter_report_url && (
                                                <Button asChild variant="outline" size="sm" className="w-full">
                                                    <a href={financialReport.first_quarter_report_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Q1 Report
                                                    </a>
                                                </Button>
                                            )}
                                            {financialReport.half_yearly_report_url && (
                                                <Button asChild variant="outline" size="sm" className="w-full">
                                                    <a href={financialReport.half_yearly_report_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Half-Year Report
                                                    </a>
                                                </Button>
                                            )}
                                            {financialReport.third_quarter_report_url && (
                                                <Button asChild variant="outline" size="sm" className="w-full">
                                                    <a href={financialReport.third_quarter_report_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Q3 Report
                                                    </a>
                                                </Button>
                                            )}
                                            {financialReport.annual_report_url && (
                                                <Button asChild variant="outline" size="sm" className="w-full">
                                                    <a href={financialReport.annual_report_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Annual Report
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
