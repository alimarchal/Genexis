import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UploadField from '@/components/upload-field';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Download, FileText, Save } from 'lucide-react';
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

const reportFields = [
    { key: 'first_quarter_report', title: 'First Quarter Report (Q1)', color: 'text-blue-500' },
    { key: 'half_yearly_report', title: 'Half Yearly Report', color: 'text-green-500' },
    { key: 'third_quarter_report', title: 'Third Quarter Report (Q3)', color: 'text-orange-500' },
    { key: 'annual_report', title: 'Annual Report', color: 'text-purple-500' },
] as const;

export default function EditFinancialReport({ financialReport }: { financialReport: FinancialReport }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Financial Reports', href: route('financial-reports.index') },
        { title: 'Edit', href: route('financial-reports.edit', financialReport.id) },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        fiscal_year: financialReport.fiscal_year,
        first_quarter_report_upload_id: null as string | null,
        half_yearly_report_upload_id: null as string | null,
        third_quarter_report_upload_id: null as string | null,
        annual_report_upload_id: null as string | null,
    });
    const [busyFields, setBusyFields] = useState<Record<string, boolean>>({});
    const uploading = Object.values(busyFields).some(Boolean);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('financial-reports.update', financialReport.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Financial Report" />
            <div className="px-4 py-6 md:px-10">
                <Heading
                    title="Edit Financial Report"
                    description="Update financial reports for this fiscal year. A replaced file is deleted only after the new one is saved."
                />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Label htmlFor="fiscal_year">Fiscal Year *</Label>
                                <Input
                                    id="fiscal_year"
                                    type="number"
                                    min="1900"
                                    max={new Date().getFullYear() + 5}
                                    value={data.fiscal_year}
                                    onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || financialReport.fiscal_year)}
                                    className={errors.fiscal_year ? 'border-red-500' : ''}
                                />
                                {errors.fiscal_year && <p className="text-sm text-red-500">{errors.fiscal_year}</p>}
                            </CardContent>
                        </Card>

                        {reportFields.map((field) => {
                            const current = financialReport[field.key];
                            const downloadUrl = financialReport[`${field.key}_url`];

                            return (
                                <Card key={field.key}>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <FileText className={`h-5 w-5 ${field.color}`} />
                                            <CardTitle>{field.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {current && downloadUrl && (
                                            <Button asChild variant="outline" size="sm">
                                                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                                    <Download className="mr-2 h-4 w-4" /> Download current file
                                                </a>
                                            </Button>
                                        )}
                                        <UploadField
                                            context="financial-reports"
                                            label={current ? 'Replace file' : 'File'}
                                            accept={['pdf', 'doc', 'docx', 'xls', 'xlsx']}
                                            currentFileName={current?.split('/').pop()}
                                            onChange={(id) => setData(`${field.key}_upload_id`, id)}
                                            onBusyChange={(busy) =>
                                                setBusyFields((previous) =>
                                                    previous[field.key] === busy ? previous : { ...previous, [field.key]: busy },
                                                )
                                            }
                                            error={errors[`${field.key}_upload_id`]}
                                        />
                                    </CardContent>
                                </Card>
                            );
                        })}

                        <div className="flex items-center justify-end gap-3">
                            {uploading && <span className="text-sm text-amber-600">Wait for the uploads to finish before saving.</span>}
                            <Button variant="outline" asChild>
                                <Link href={route('financial-reports.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing || uploading}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : 'Update Report'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
