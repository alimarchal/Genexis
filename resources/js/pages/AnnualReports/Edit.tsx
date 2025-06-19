import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, FileText, Save, Upload } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface AnnualReport {
    id: number;
    annual_report_fiscal_year: number;
    annual_report: string | null;
    annual_report_url: string | null;
}

interface Props {
    annualReport: AnnualReport;
}

export default function EditAnnualReport({ annualReport }: Props) {
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
            title: 'Edit',
            href: route('annual-reports.edit', annualReport.id),
        },
    ];

    const { data, setData, processing, errors } = useForm({
        annual_report_fiscal_year: annualReport.annual_report_fiscal_year,
        annual_report: null as File | null,
        _method: 'PUT',
    });

    const [fileName, setFileName] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('annual-reports.update', annualReport.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('annual_report', file);
        setFileName(file ? file.name : '');
    };

    const getFileSize = (file: File | null): string => {
        if (!file) return '';
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        return `${sizeInMB} MB`;
    };

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Annual Report" />

            <div className="px-10 py-6">
                <Heading title="Edit Annual Report" description="Update the annual report for this fiscal year" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="annual_report_fiscal_year">Fiscal Year *</Label>
                                    <Input
                                        id="annual_report_fiscal_year"
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear() + 5}
                                        value={data.annual_report_fiscal_year}
                                        onChange={(e) => setData('annual_report_fiscal_year', parseInt(e.target.value) || annualReport.annual_report_fiscal_year)}
                                        placeholder="Enter fiscal year"
                                        className={errors.annual_report_fiscal_year ? 'border-red-500' : ''}
                                    />
                                    {errors.annual_report_fiscal_year && <p className="text-sm text-red-500">{errors.annual_report_fiscal_year}</p>}
                                    <p className="text-sm text-gray-500">
                                        The fiscal year for which this annual report is being uploaded (e.g., {annualReport.annual_report_fiscal_year})
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Annual Report Upload */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-purple-500" />
                                    <div>
                                        <CardTitle>Annual Report</CardTitle>
                                        <p className="text-sm text-gray-500 mt-1">Upload the comprehensive annual financial report</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Current File Display */}
                                {annualReport.annual_report && (
                                    <div className="space-y-2">
                                        <Label>Current File</Label>
                                        <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                            <div className="flex items-center gap-3 flex-1">
                                                <FileText className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {getCurrentFileName(annualReport.annual_report)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Currently uploaded file
                                                    </div>
                                                </div>
                                            </div>
                                            {annualReport.annual_report_url && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={annualReport.annual_report_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="annual_report">
                                        {annualReport.annual_report ? 'Replace File' : 'Upload File'}
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <Input
                                                id="annual_report"
                                                type="file"
                                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                onChange={handleFileChange}
                                                className={errors.annual_report ? 'border-red-500' : ''}
                                            />
                                            <Upload className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        </div>
                                    </div>
                                    {errors.annual_report && <p className="text-sm text-red-500">{errors.annual_report}</p>}

                                    {/* New File Info */}
                                    {fileName && (
                                        <div className="rounded-md bg-blue-50 border border-blue-200 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-blue-900">
                                                        New: {fileName}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-blue-600">
                                                    {getFileSize(data.annual_report)}
                                                </span>
                                            </div>
                                            {annualReport.annual_report && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    This will replace the current file
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500">
                                        {annualReport.annual_report
                                            ? 'Upload a new file to replace the current one (optional)'
                                            : 'Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx). Maximum size: 10MB'
                                        }
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Update Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Update Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Fiscal Year:</span>
                                        <span className="text-gray-600">FY {data.annual_report_fiscal_year} ({data.annual_report_fiscal_year}-{data.annual_report_fiscal_year + 1})</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Current Report:</span>
                                        <span className="text-gray-600">
                                            {annualReport.annual_report ? 'Uploaded' : 'No file'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">File to Update:</span>
                                        <span className="text-gray-600">
                                            {fileName ? 'Selected' : 'None'}
                                        </span>
                                    </div>

                                    {/* Current File */}
                                    {annualReport.annual_report && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Current File:</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span>Annual Report: {getCurrentFileName(annualReport.annual_report)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* File Being Updated */}
                                    {fileName && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-blue-700 mb-2">File Being Updated:</p>
                                            <div className="flex items-center gap-2 text-sm text-blue-600">
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                <span>Annual Report: {fileName}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('annual-reports.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Report'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}