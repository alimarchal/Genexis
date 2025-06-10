import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Download, Edit, FileText, Trash2 } from 'lucide-react';

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
        title: 'Details',
        href: '',
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

interface Props {
    annualReport: AnnualReport;
}

export default function Show({ annualReport }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this annual report?')) {
            router.delete(route('annual-reports.destroy', annualReport.id));
        }
    };

    const downloadFile = (url: string, filename: string) => {
        window.open(url, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Annual Report - FY ${annualReport.annual_report_fiscal_year}`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('annual-reports.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Annual Reports
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('annual-reports.edit', annualReport.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Report
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Heading
                    title={`Annual Report - FY ${annualReport.annual_report_fiscal_year}`}
                    description="View complete information about this annual report"
                />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Report Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Fiscal Year</label>
                                        <p className="text-lg font-semibold text-gray-900">FY {annualReport.annual_report_fiscal_year}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Report Status</label>
                                        <div className="mt-1">
                                            {annualReport.annual_report ? (
                                                <Badge variant="default">File Available</Badge>
                                            ) : (
                                                <Badge variant="outline">No File Uploaded</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* File Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Report File
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {annualReport.annual_report && annualReport.annual_report_url ? (
                                    <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
                                        <div className="flex items-center space-x-4">
                                            <FileText className="h-10 w-10 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Annual Report File</p>
                                                <p className="text-sm text-gray-600">FY {annualReport.annual_report_fiscal_year}</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                downloadFile(
                                                    annualReport.annual_report_url!,
                                                    `Annual-Report-${annualReport.annual_report_fiscal_year}.pdf`,
                                                )
                                            }
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No file uploaded</h3>
                                        <p className="mt-1 text-sm text-gray-500">Upload an annual report file to make it available for download.</p>
                                        <div className="mt-6">
                                            <Button asChild>
                                                <Link href={route('annual-reports.edit', annualReport.id)}>Upload File</Link>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Created</label>
                                    <p className="text-sm text-gray-900">{formatDate(annualReport.created_at)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                    <p className="text-sm text-gray-900">{formatDate(annualReport.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild className="w-full">
                                    <Link href={route('annual-reports.edit', annualReport.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Report
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={route('annual-reports.create')}>Create New Report</Link>
                                </Button>
                                {annualReport.annual_report_url && (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() =>
                                            downloadFile(
                                                annualReport.annual_report_url!,
                                                `Annual-Report-${annualReport.annual_report_fiscal_year}.pdf`,
                                            )
                                        }
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download File
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
