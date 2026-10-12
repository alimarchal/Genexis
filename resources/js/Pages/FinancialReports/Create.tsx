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
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Financial Reports', href: route('financial-reports.index') },
    { title: 'Create', href: route('financial-reports.create') },
];

const reportFields = [
    {
        key: 'first_quarter_report',
        title: 'First Quarter Report (Q1)',
        description: 'Upload the first quarter financial report',
        color: 'text-blue-500',
    },
    { key: 'half_yearly_report', title: 'Half Yearly Report', description: 'Upload the half yearly financial report', color: 'text-green-500' },
    {
        key: 'third_quarter_report',
        title: 'Third Quarter Report (Q3)',
        description: 'Upload the third quarter financial report',
        color: 'text-orange-500',
    },
    { key: 'annual_report', title: 'Annual Report', description: 'Upload the annual financial report', color: 'text-purple-500' },
] as const;

export default function CreateFinancialReport() {
    const { data, setData, post, processing, errors } = useForm({
        fiscal_year: new Date().getFullYear(),
        first_quarter_report_upload_id: null as string | null,
        half_yearly_report_upload_id: null as string | null,
        third_quarter_report_upload_id: null as string | null,
        annual_report_upload_id: null as string | null,
    });
    const [busyFields, setBusyFields] = useState<Record<string, boolean>>({});
    const uploading = Object.values(busyFields).some(Boolean);
    const attached = reportFields.filter((field) => data[`${field.key}_upload_id`]).length;

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('financial-reports.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Financial Report" />
            <div className="px-4 py-6 md:px-10">
                <Heading
                    title="Create Financial Report"
                    description="Upload financial reports for a fiscal year. Large files (several GB) are sent in parts and can be resumed."
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
                                    onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || new Date().getFullYear())}
                                    className={errors.fiscal_year ? 'border-red-500' : ''}
                                />
                                {errors.fiscal_year && <p className="text-sm text-red-500">{errors.fiscal_year}</p>}
                            </CardContent>
                        </Card>

                        {reportFields.map((field) => (
                            <Card key={field.key}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <FileText className={`h-5 w-5 ${field.color}`} />
                                        <div>
                                            <CardTitle>{field.title}</CardTitle>
                                            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <UploadField
                                        context="financial-reports"
                                        label="File"
                                        accept={['pdf', 'doc', 'docx', 'xls', 'xlsx']}
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
                        ))}

                        <div className="flex items-center justify-end gap-3">
                            {uploading && <span className="text-sm text-amber-600">Wait for the uploads to finish before saving.</span>}
                            <Button variant="outline" asChild>
                                <Link href={route('financial-reports.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing || uploading}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : `Create Report (${attached} of 4 files)`}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
