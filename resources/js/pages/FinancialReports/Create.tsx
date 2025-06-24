import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FileText, Save, Upload } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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

export default function CreateFinancialReport() {
    const { data, setData, processing, errors } = useForm({
        fiscal_year: new Date().getFullYear(),
        first_quarter_report: null as File | null,
        half_yearly_report: null as File | null,
        third_quarter_report: null as File | null,
        annual_report: null as File | null,
    });

    const [fileNames, setFileNames] = useState({
        first_quarter_report: '',
        half_yearly_report: '',
        third_quarter_report: '',
        annual_report: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('financial-reports.store'), data);
    };

    const handleFileChange = (field: keyof typeof fileNames, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData(field, file);
        setFileNames((prev) => ({
            ...prev,
            [field]: file ? file.name : '',
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
        },
        {
            key: 'half_yearly_report' as const,
            title: 'Half Yearly Report',
            description: 'Upload the half yearly financial report',
            icon: <FileText className="h-5 w-5 text-green-500" />,
        },
        {
            key: 'third_quarter_report' as const,
            title: 'Third Quarter Report (Q3)',
            description: 'Upload the third quarter financial report',
            icon: <FileText className="h-5 w-5 text-orange-500" />,
        },
        {
            key: 'annual_report' as const,
            title: 'Annual Report',
            description: 'Upload the annual financial report',
            icon: <FileText className="h-5 w-5 text-purple-500" />,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Financial Report" />

            <div className="px-10 py-6">
                <Heading title="Create Financial Report" description="Add financial reports for a new fiscal year" />

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
                                        onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || new Date().getFullYear())}
                                        placeholder="Enter fiscal year"
                                        className={errors.fiscal_year ? 'border-red-500' : ''}
                                    />
                                    {errors.fiscal_year && <p className="text-sm text-red-500">{errors.fiscal_year}</p>}
                                    <p className="text-sm text-gray-500">
                                        The fiscal year for which these reports are being uploaded (e.g., {new Date().getFullYear()})
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
                                            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={field.key}>Upload File</Label>
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex-1">
                                                <Input
                                                    id={field.key}
                                                    type="file"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                    onChange={(e) => handleFileChange(field.key, e)}
                                                    className={errors[field.key] ? 'border-red-500' : ''}
                                                />
                                                <Upload className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            </div>
                                        </div>
                                        {errors[field.key] && <p className="text-sm text-red-500">{errors[field.key]}</p>}

                                        {/* File Info */}
                                        {fileNames[field.key] && (
                                            <div className="rounded-md bg-gray-50 p-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-gray-500" />
                                                        <span className="text-sm font-medium text-gray-900">{fileNames[field.key]}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">{getFileSize(data[field.key])}</span>
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-sm text-gray-500">
                                            Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx). Maximum size: 300MB
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

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
                                            FY {data.fiscal_year} ({data.fiscal_year}-{data.fiscal_year + 1})
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Reports to Upload:</span>
                                        <span className="text-gray-600">{Object.values(fileNames).filter(Boolean).length} of 4 selected</span>
                                    </div>
                                    {Object.values(fileNames).filter(Boolean).length > 0 && (
                                        <div className="mt-4">
                                            <p className="mb-2 text-sm font-medium text-gray-700">Selected Files:</p>
                                            <ul className="space-y-1">
                                                {reportFields.map(
                                                    (field) =>
                                                        fileNames[field.key] && (
                                                            <li key={field.key} className="flex items-center gap-2 text-sm text-gray-600">
                                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                                <span>
                                                                    {field.title.replace(' Report', '')}: {fileNames[field.key]}
                                                                </span>
                                                            </li>
                                                        ),
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
                                {processing ? 'Creating...' : 'Create Report'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
