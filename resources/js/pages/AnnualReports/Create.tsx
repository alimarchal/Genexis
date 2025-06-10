import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload } from 'lucide-react';

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
        href: '',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        annual_report_fiscal_year: new Date().getFullYear(),
        annual_report: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('annual-reports.store'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('annual_report', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Annual Report" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('annual-reports.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Annual Reports
                        </Link>
                    </Button>
                </div>

                <Heading title="Create Annual Report" description="Add a new annual financial report" />

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

                            {/* Annual Report File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="annual_report">Annual Report File</Label>
                                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <label htmlFor="annual_report" className="cursor-pointer">
                                                <span className="mt-2 block text-sm font-medium text-gray-900">Upload Annual Report</span>
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
                                {data.annual_report && <div className="text-sm text-gray-600">Selected: {data.annual_report.name}</div>}
                                <InputError message={errors.annual_report} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center space-x-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Annual Report'}
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
