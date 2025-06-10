import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { FormEventHandler } from 'react';

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
        title: 'Create',
        href: route('financial-reports.create'),
    },
];

type FinancialReportForm = {
    fiscal_year: number | string;
    first_quarter_report: File | null;
    half_yearly_report: File | null;
    third_quarter_report: File | null;
    annual_report: File | null;
};

export default function CreateFinancialReport() {
    const { data, setData, post, processing, errors } = useForm<FinancialReportForm>({
        fiscal_year: new Date().getFullYear(),
        first_quarter_report: null,
        half_yearly_report: null,
        third_quarter_report: null,
        annual_report: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('financial-reports.store'));
    };

    const handleFileChange = (field: keyof FinancialReportForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData(field, file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Financial Report" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('financial-reports.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Financial Reports
                        </Link>
                    </Button>
                </div>

                <Heading title="Create Financial Report" description="Add a new financial report for a fiscal year with quarterly and annual reports" />

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

                                {/* First Quarter Report */}
                                <div>
                                    <Label htmlFor="first_quarter_report">First Quarter Report</Label>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="first_quarter_report"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span> Q1 report
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                                    {data.first_quarter_report && (
                                                        <p className="mt-2 text-sm text-green-600">
                                                            Selected: {data.first_quarter_report.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <Input
                                                    id="first_quarter_report"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={handleFileChange('first_quarter_report')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors.first_quarter_report} className="mt-2" />
                                </div>

                                {/* Half Yearly Report */}
                                <div>
                                    <Label htmlFor="half_yearly_report">Half Yearly Report</Label>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="half_yearly_report"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span> Half yearly report
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                                    {data.half_yearly_report && (
                                                        <p className="mt-2 text-sm text-green-600">
                                                            Selected: {data.half_yearly_report.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <Input
                                                    id="half_yearly_report"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={handleFileChange('half_yearly_report')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors.half_yearly_report} className="mt-2" />
                                </div>

                                {/* Third Quarter Report */}
                                <div>
                                    <Label htmlFor="third_quarter_report">Third Quarter Report</Label>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="third_quarter_report"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span> Q3 report
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                                    {data.third_quarter_report && (
                                                        <p className="mt-2 text-sm text-green-600">
                                                            Selected: {data.third_quarter_report.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <Input
                                                    id="third_quarter_report"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={handleFileChange('third_quarter_report')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors.third_quarter_report} className="mt-2" />
                                </div>

                                {/* Annual Report */}
                                <div>
                                    <Label htmlFor="annual_report">Annual Report</Label>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="annual_report"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span> Annual report
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                                    {data.annual_report && (
                                                        <p className="mt-2 text-sm text-green-600">
                                                            Selected: {data.annual_report.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <Input
                                                    id="annual_report"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={handleFileChange('annual_report')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <InputError message={errors.annual_report} className="mt-2" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-2 mt-8">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('financial-reports.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Financial Report'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
