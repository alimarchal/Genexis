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
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Financial Highlights', href: route('financial-highlights.index') },
    { title: 'Create', href: route('financial-highlights.create') },
];

export default function CreateFinancialHighlight() {
    const { data, setData, processing, errors } = useForm({
        fiscal_year: new Date().getFullYear(),
        financial_highlights: null as File | null,
    });

    const [fileName, setFileName] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('financial-highlights.store'), data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('financial_highlights', file);
        setFileName(file ? file.name : '');
    };

    const getFileSize = (file: File | null): string => {
        if (!file) return '';
        return `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Financial Highlights" />
            <div className="px-10 py-6">
                <Heading title="Create Financial Highlights" description="Add financial highlights for a fiscal year" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fiscal_year">Fiscal Year *</Label>
                                    <Input
                                        id="fiscal_year" type="number" min="1900" max={new Date().getFullYear() + 5}
                                        value={data.fiscal_year}
                                        onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || new Date().getFullYear())}
                                        placeholder="Enter fiscal year"
                                        className={errors.fiscal_year ? 'border-red-500' : ''}
                                    />
                                    {errors.fiscal_year && <p className="text-sm text-red-500">{errors.fiscal_year}</p>}
                                    <p className="text-sm text-gray-500">The fiscal year for which these highlights are being uploaded</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-orange-500" />
                                    <div>
                                        <CardTitle>Financial Highlights</CardTitle>
                                        <p className="text-sm text-gray-500 mt-1">Upload the financial highlights document</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="financial_highlights">Upload File</Label>
                                    <div className="relative flex-1">
                                        <Input
                                            id="financial_highlights" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={handleFileChange}
                                            className={errors.financial_highlights ? 'border-red-500' : ''}
                                        />
                                        <Upload className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    </div>
                                    {errors.financial_highlights && <p className="text-sm text-red-500">{errors.financial_highlights}</p>}

                                    {fileName && (
                                        <div className="rounded-md bg-gray-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-900">{fileName}</span>
                                                </div>
                                                <span className="text-sm text-gray-500">{getFileSize(data.financial_highlights)}</span>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500">Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx). Maximum size: 10MB</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Upload Summary</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Fiscal Year:</span>
                                        <span className="text-gray-600">FY {data.fiscal_year} ({data.fiscal_year}-{data.fiscal_year + 1})</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Highlights Status:</span>
                                        <span className="text-gray-600">{fileName ? 'Ready to upload' : 'No file selected'}</span>
                                    </div>
                                    {fileName && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Selected File:</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span>Financial Highlights: {fileName}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('financial-highlights.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Highlights'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}