import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UploadField from '@/components/upload-field';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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
        title: 'Create',
        href: route('annual-reports.create'),
    },
];

export default function CreateAnnualReport() {
    const { data, setData, post, processing, errors } = useForm({
        annual_report_fiscal_year: new Date().getFullYear(),
        annual_report_upload_id: null as string | null,
    });

    const [uploading, setUploading] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('annual-reports.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Annual Report" />

            <div className="px-10 py-6">
                <Heading title="Create Annual Report" description="Add an annual report for a fiscal year" />

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
                                        onChange={(e) => setData('annual_report_fiscal_year', parseInt(e.target.value) || new Date().getFullYear())}
                                        placeholder="Enter fiscal year"
                                        className={errors.annual_report_fiscal_year ? 'border-red-500' : ''}
                                    />
                                    {errors.annual_report_fiscal_year && <p className="text-sm text-red-500">{errors.annual_report_fiscal_year}</p>}
                                    <p className="text-sm text-gray-500">
                                        The fiscal year for which this annual report is being uploaded (e.g., {new Date().getFullYear()})
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
                                        <p className="mt-1 text-sm text-gray-500">Upload the comprehensive annual financial report</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <UploadField
                                    context="annual-reports"
                                    label="File"
                                    accept={['pdf', 'doc', 'docx', 'xls', 'xlsx']}
                                    onChange={(id) => setData('annual_report_upload_id', id)}
                                    onBusyChange={setUploading}
                                    error={errors.annual_report_upload_id ?? (errors as Record<string, string | undefined>).annual_report}
                                />
                            </CardContent>
                        </Card>

                        {/* Upload Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Fiscal Year:</span>
                                        <span className="text-gray-600">
                                            FY {data.annual_report_fiscal_year} ({data.annual_report_fiscal_year}-{data.annual_report_fiscal_year + 1}
                                            )
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Report Status:</span>
                                        <span className="text-gray-600">
                                            {(data.annual_report_upload_id ? 'Uploaded file' : '') ? 'Ready to upload' : 'No file selected'}
                                        </span>
                                    </div>
                                    {(data.annual_report_upload_id ? 'Uploaded file' : '') && (
                                        <div className="mt-4">
                                            <p className="mb-2 text-sm font-medium text-gray-700">Selected File:</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span>Annual Report: {data.annual_report_upload_id ? 'Uploaded file' : ''}</span>
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
                            <Button type="submit" disabled={processing || uploading}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Report'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
