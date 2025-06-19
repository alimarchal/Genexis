import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Download, Edit, FileText, Hash, TrendingUp } from 'lucide-react';

interface AnnualReport {
    id: number;
    annual_report_fiscal_year: number;
    annual_report: string | null;
    annual_report_url: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    annualReport: AnnualReport;
}

export default function ShowAnnualReport({ annualReport }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Annual Reports',
            href: route('annual-reports.index'),
        },
        {
            title: `FY ${annualReport.annual_report_fiscal_year}`,
            href: route('annual-reports.show', annualReport.id),
        },
    ];

    const getReportBadge = () => {
        if (annualReport.annual_report) {
            return <Badge variant="default">Uploaded</Badge>;
        } else {
            return <Badge variant="outline">No Report</Badge>;
        }
    };

    const getYearBadge = () => {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - annualReport.annual_report_fiscal_year;

        if (yearDiff <= 1) {
            return <Badge variant="default">Recent</Badge>;
        } else if (yearDiff <= 5) {
            return <Badge variant="secondary">Last 5 Years</Badge>;
        } else {
            return <Badge variant="outline">Older</Badge>;
        }
    };

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
            <Head title={`FY ${annualReport.annual_report_fiscal_year} - Annual Report`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Annual Report - FY ${annualReport.annual_report_fiscal_year}`}
                        description={`Annual financial report for fiscal year ${annualReport.annual_report_fiscal_year}-${annualReport.annual_report_fiscal_year + 1}`}
                    />
                    <Button asChild>
                        <Link href={route('annual-reports.edit', annualReport.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Report
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
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                                        <TrendingUp className="h-10 w-10 text-purple-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">
                                                Fiscal Year {annualReport.annual_report_fiscal_year}
                                            </CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">
                                                {annualReport.annual_report_fiscal_year} - {annualReport.annual_report_fiscal_year + 1}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getReportBadge()}
                                            {getYearBadge()}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Annual Report Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-purple-500" />
                                        <div>
                                            <CardTitle className="text-lg">Annual Report</CardTitle>
                                            <p className="text-sm text-gray-500 mt-1">Comprehensive yearly financial report</p>
                                        </div>
                                    </div>
                                    {annualReport.annual_report && annualReport.annual_report_url && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={annualReport.annual_report_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {annualReport.annual_report ? (
                                    <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border">
                                            <FileText className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">
                                                {getCurrentFileName(annualReport.annual_report)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>{getFileExtension(annualReport.annual_report)} File</span>
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
                                            <p className="text-sm text-gray-500">
                                                The annual report has not been uploaded yet
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
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
                                        <p className="text-sm text-gray-600">FY {annualReport.annual_report_fiscal_year}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Period</p>
                                        <p className="text-sm text-gray-600">
                                            {annualReport.annual_report_fiscal_year} - {annualReport.annual_report_fiscal_year + 1}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getReportBadge()}</div>
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
                                    <span className="font-medium">Report Uploaded:</span>
                                    <span className="text-gray-600">{annualReport.annual_report ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">File Type:</span>
                                    <span className="text-gray-600">
                                        {annualReport.annual_report ? getFileExtension(annualReport.annual_report) : 'N/A'}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Downloadable:</span>
                                    <span className="text-gray-600">{annualReport.annual_report_url ? 'Yes' : 'No'}</span>
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
                                    <p className="text-gray-600">{new Date(annualReport.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(annualReport.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('annual-reports.edit', annualReport.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Report
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('annual-reports.index')}>Back to List</Link>
                                </Button>

                                {/* Download Report */}
                                {annualReport.annual_report_url && (
                                    <div className="pt-2 border-t">
                                        <Button asChild variant="outline" size="sm" className="w-full">
                                            <a href={annualReport.annual_report_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Annual Report
                                            </a>
                                        </Button>
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