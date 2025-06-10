import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, FileText, Save, Upload } from 'lucide-react';
import { FormEventHandler } from 'react';

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
}

interface Props {
    financialReport: FinancialReport;
}

type FinancialReportForm = {
    fiscal_year: number | string;
    first_quarter_report: File | null;
    half_yearly_report: File | null;
    third_quarter_report: File | null;
    annual_report: File | null;
    _method?: string;
};

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

    const { data, setData, processing, errors } = useForm<FinancialReportForm>({
        fiscal_year: financialReport.fiscal_year,
        first_quarter_report: null,
        half_yearly_report: null,
        third_quarter_report: null,
        annual_report: null,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('financial-reports.update', financialReport.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (field: keyof FinancialReportForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData(field, file);
    };

    const renderFileUpload = (
        field: keyof FinancialReportForm,
        label: string,
        existingFile: string | null,
        existingFileUrl: string | null
    ) => (
        <div>
            <Label htmlFor={field}>{label}</Label>
            <div className="mt-2">
                {existingFile && !data[field] && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                                <span className="text-sm text-blue-800">Current file available</span>
                            </div>
                            {existingFileUrl && (
                                <a
                                    href={existingFileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                >
                                    View Current
                                </a>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor={field}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> {existingFile ? 'new' : ''} {label.toLowerCase()}
                            </p>
                            <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                            {data[field] && (
                                <p className="mt-2 text-sm text-green-600">
                                    Selected: {(data[field] as File).name}
                                </p>
                            )}
                        </div>
                        <Input
                            id={field}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange(field)}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
            <InputError message={errors[field]} className="mt-2" />
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Financial Report" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('financial-reports.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Financial Reports
                        </Link>
                    </Button>
                </div>

                <Heading title="Edit Financial Report" description="Update financial report details and upload new documents" />

                <form onSubmit={submit} className="max-w-4xl">
                    <Card>
                        <CardContent className="pt-6">
                            {/* Fiscal Year */}
                            <div className="mb-6">
                                <Label htmlFor="fiscal_year">Fiscal Year *</Label>
                                <Input
                                    id="fiscal_year"
                                    type="number"
                                    value={data.fiscal_year}
                                    onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || '')}
                                    min={1900}
                                    max={new Date().getFullYear() + 10}
                                    required
                                    className="max-w-xs"
                                />
                                <InputError message={errors.fiscal_year} className="mt-2" />
                            </div>

                            {/* Reports Upload Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">Financial Reports</h3>

                                {renderFileUpload(
                                    'first_quarter_report',
                                    'First Quarter Report',
                                    financialReport.first_quarter_report,
                                    financialReport.first_quarter_report_url
                                )}

                                {renderFileUpload(
                                    'half_yearly_report',
                                    'Half Yearly Report',
                                    financialReport.half_yearly_report,
                                    financialReport.half_yearly_report_url
                                )}

                                {renderFileUpload(
                                    'third_quarter_report',
                                    'Third Quarter Report',
                                    financialReport.third_quarter_report,
                                    financialReport.third_quarter_report_url
                                )}

                                {renderFileUpload(
                                    'annual_report',
                                    'Annual Report',
                                    financialReport.annual_report,
                                    financialReport.annual_report_url
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-2 mt-8">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('financial-reports.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Updating...' : 'Update Financial Report'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
