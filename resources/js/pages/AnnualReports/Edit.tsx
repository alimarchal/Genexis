import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Download, FileText, Save, Upload } from 'lucide-react';

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

export default function Edit({ annualReport }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        annual_report_fiscal_year: annualReport.annual_report_fiscal_year,
        annual_report: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('annual-reports.update', annualReport.id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('annual_report', file);
    };

    const downloadFile = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Annual Report - FY ${annualReport.annual_report_fiscal_year}`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('annual-reports.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Annual Reports
                        </Link>
                    </Button>
                </div>

                <Heading
                    title={`Edit Annual Report - FY ${annualReport.annual_report_fiscal_year}`}
                    description="Update annual report information and files"
                />

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Annual Report Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Fiscal Year */}
                            <div className="space-y-2">
                                <Label htmlFor="annual_report_fiscal_year">Fiscal Year *</Label>
                                <Input
                                    id="annual_report_fiscal_year"
                                    type="number"
                                    min="2000"
                                    max={new Date().getFullYear() + 5}
                                    value={data.annual_report_fiscal_year}
                                    onChange={(e) => setData('annual_report_fiscal_year', parseInt(e.target.value))}
                                    placeholder="Enter fiscal year (e.g. 2024)"
                                    required
                                />
                                <InputError message={errors.annual_report_fiscal_year} />
                            </div>

                            {/* Current Annual Report File */}
                            {annualReport.annual_report && annualReport.annual_report_url && (
                                <div className="space-y-2">
                                    <Label>Current Annual Report File</Label>
                                    <div className="flex items-center space-x-4 rounded-lg border bg-gray-50 p-4">
                                        <FileText className="h-8 w-8 text-gray-600" />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">Annual Report File</p>
                                            <p className="text-sm text-gray-600">FY {annualReport.annual_report_fiscal_year}</p>
                                        </div>
                                        <Badge variant="secondary">Current File</Badge>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                downloadFile(
                                                    annualReport.annual_report_url!,
                                                )
                                            }
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Annual Report File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="annual_report">
                                    {annualReport.annual_report ? 'Replace Annual Report File' : 'Upload Annual Report File'}
                                </Label>
                                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <label htmlFor="annual_report" className="cursor-pointer">
                                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                                    {annualReport.annual_report ? 'Upload New Annual Report' : 'Upload Annual Report'}
                                                </span>
                                                <span className="mt-1 block text-sm text-gray-500">PDF, JPG, JPEG, PNG up to 10MB</span>
                                            </label>
                                            <input
                                                id="annual_report"
                                                type="file"
                                                className="sr-only"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {data.annual_report && <div className="text-sm text-gray-600">New file selected: {data.annual_report.name}</div>}
                                <InputError message={errors.annual_report} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center space-x-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Updating...' : 'Update Annual Report'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('annual-reports.index')}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
