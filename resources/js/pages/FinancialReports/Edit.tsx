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
}

interface Props {
    financialReport: FinancialReport;
}

export default function EditFinancialReport({ financialReport }: Props) {
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
            title: 'Edit',
            href: route('financial-reports.edit', financialReport.id),
        },
    ];

    const { data, setData, processing, errors } = useForm({
        fiscal_year: financialReport.fiscal_year,
        first_quarter_report: null as File | null,
        half_yearly_report: null as File | null,
        third_quarter_report: null as File | null,
        annual_report: null as File | null,
        _method: 'PUT',
    });

    const [fileNames, setFileNames] = useState({
        first_quarter_report: '',
        half_yearly_report: '',
        third_quarter_report: '',
        annual_report: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('financial-reports.update', financialReport.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (field: keyof typeof fileNames, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData(field, file);
        setFileNames(prev => ({
            ...prev,
            [field]: file ? file.name : ''
        }));
    };

    const getFileSize = (file: File | null): string => {
        if (!file) return '';
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        return `${sizeInMB} MB`;
    };

    const reportFields = [
        {
            key: 'first_quarter_report' as const,
            title: 'First Quarter Report (Q1)',
            description: 'Upload the first quarter financial report',
            icon: <FileText className="h-5 w-5 text-blue-500" />,
            currentFile: financialReport.first_quarter_report,
            downloadUrl: financialReport.first_quarter_report_url,
        },
        {
            key: 'half_yearly_report' as const,
            title: 'Half Yearly Report',
            description: 'Upload the half yearly financial report',
            icon: <FileText className="h-5 w-5 text-green-500" />,
            currentFile: financialReport.half_yearly_report,
            downloadUrl: financialReport.half_yearly_report_url,
        },
        {
            key: 'third_quarter_report' as const,
            title: 'Third Quarter Report (Q3)',
            description: 'Upload the third quarter financial report',
            icon: <FileText className="h-5 w-5 text-orange-500" />,
            currentFile: financialReport.third_quarter_report,
            downloadUrl: financialReport.third_quarter_report_url,
        },
        {
            key: 'annual_report' as const,
            title: 'Annual Report',
            description: 'Upload the annual financial report',
            icon: <FileText className="h-5 w-5 text-purple-500" />,
            currentFile: financialReport.annual_report,
            downloadUrl: financialReport.annual_report_url,
        },
    ];

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Financial Report" />

            <div className="px-10 py-6">
                <Heading title="Edit Financial Report" description="Update financial reports for this fiscal year" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fiscal_year">Fiscal Year *</Label>
                                    <Input
                                        id="fiscal_year"
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear() + 5}
                                        value={data.fiscal_year}
                                        onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || financialReport.fiscal_year)}
                                        placeholder="Enter fiscal year"
                                        className={errors.fiscal_year ? 'border-red-500' : ''}
                                    />
                                    {errors.fiscal_year && <p className="text-sm text-red-500">{errors.fiscal_year}</p>}
                                    <p className="text-sm text-gray-500">
                                        The fiscal year for which these reports are being uploaded (e.g., {financialReport.fiscal_year})
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Report Uploads */}
                        {reportFields.map((field) => (
                            <Card key={field.key}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        {field.icon}
                                        <div>
                                            <CardTitle>{field.title}</CardTitle>
                                            <p className="text-sm text-gray-500 mt-1">{field.description}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Current File Display */}
                                    {field.currentFile && (
                                        <div className="space-y-2">
                                            <Label>Current File</Label>
                                            <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <FileText className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {getCurrentFileName(field.currentFile)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Currently uploaded file
                                                        </div>
                                                    </div>
                                                </div>
                                                {field.downloadUrl && (
                                                    <Button asChild variant="outline" size="sm">
                                                        <a href={field.downloadUrl} target="_blank" rel="noopener noreferrer">
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
                                        <Label htmlFor={field.key}>
                                            {field.currentFile ? 'Replace File' : 'Upload File'}
                                        </Label>
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex-1">
                                                <Input
                                                    id={field.key}
                                                    type="file"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                    onChange={(e) => handleFileChange(field.key, e)}
                                                    className={errors[field.key] ? 'border-red-500' : ''}
                                                />
                                                <Upload className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            </div>
                                        </div>
                                        {errors[field.key] && <p className="text-sm text-red-500">{errors[field.key]}</p>}

                                        {/* New File Info */}
                                        {fileNames[field.key] && (
                                            <div className="rounded-md bg-blue-50 border border-blue-200 p-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-blue-500" />
                                                        <span className="text-sm font-medium text-blue-900">
                                                            New: {fileNames[field.key]}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-blue-600">
                                                        {getFileSize(data[field.key])}
                                                    </span>
                                                </div>
                                                {field.currentFile && (
                                                    <p className="text-xs text-blue-600 mt-1">
                                                        This will replace the current file
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        <p className="text-sm text-gray-500">
                                            {field.currentFile
                                                ? 'Upload a new file to replace the current one (optional)'
                                                : 'Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx). Maximum size: 10MB'
                                            }
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Update Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Update Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Fiscal Year:</span>
                                        <span className="text-gray-600">FY {data.fiscal_year} ({data.fiscal_year}-{data.fiscal_year + 1})</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Current Reports:</span>
                                        <span className="text-gray-600">
                                            {reportFields.filter(field => field.currentFile).length} of 4 uploaded
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Files to Update:</span>
                                        <span className="text-gray-600">
                                            {Object.values(fileNames).filter(Boolean).length} selected
                                        </span>
                                    </div>

                                    {/* Current Files */}
                                    {reportFields.some(field => field.currentFile) && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Current Files:</p>
                                            <ul className="space-y-1">
                                                {reportFields.map((field) =>
                                                    field.currentFile && (
                                                        <li key={field.key} className="flex items-center gap-2 text-sm text-gray-600">
                                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                            <span>{field.title.replace(' Report', '')}: {getCurrentFileName(field.currentFile)}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Files Being Updated */}
                                    {Object.values(fileNames).filter(Boolean).length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-blue-700 mb-2">Files Being Updated:</p>
                                            <ul className="space-y-1">
                                                {reportFields.map((field) =>
                                                    fileNames[field.key] && (
                                                        <li key={field.key} className="flex items-center gap-2 text-sm text-blue-600">
                                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                            <span>{field.title.replace(' Report', '')}: {fileNames[field.key]}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('financial-reports.index')}>Cancel</Link>
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