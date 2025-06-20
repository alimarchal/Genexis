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

interface FinancialHighlight {
    id: number;
    fiscal_year: number;
    financial_highlights: string | null;
    financial_highlights_url: string | null;
}

interface Props {
    financialHighlight: FinancialHighlight;
}

export default function EditFinancialHighlight({ financialHighlight }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Financial Highlights', href: route('financial-highlights.index') },
        { title: 'Edit', href: route('financial-highlights.edit', financialHighlight.id) },
    ];

    const { data, setData, processing, errors } = useForm({
        fiscal_year: financialHighlight.fiscal_year,
        financial_highlights: null as File | null,
        _method: 'PUT',
    });

    const [fileName, setFileName] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('financial-highlights.update', financialHighlight.id), {
            ...data,
            _method: 'PUT',
        });
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

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Financial Highlights" />
            <div className="px-10 py-6">
                <Heading title="Edit Financial Highlights" description="Update the financial highlights for this fiscal year" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
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
                                        onChange={(e) => setData('fiscal_year', parseInt(e.target.value) || financialHighlight.fiscal_year)}
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
                                        <p className="mt-1 text-sm text-gray-500">Upload the financial highlights document</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {financialHighlight.financial_highlights && (
                                    <div className="space-y-2">
                                        <Label>Current File</Label>
                                        <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                            <div className="flex flex-1 items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {getCurrentFileName(financialHighlight.financial_highlights)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">Currently uploaded file</div>
                                                </div>
                                            </div>
                                            {financialHighlight.financial_highlights_url && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={financialHighlight.financial_highlights_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="financial_highlights">
                                        {financialHighlight.financial_highlights ? 'Replace File' : 'Upload File'}
                                    </Label>
                                    <div className="relative flex-1">
                                        <Input
                                            id="financial_highlights"
                                            type="file"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={handleFileChange}
                                            className={errors.financial_highlights ? 'border-red-500' : ''}
                                        />
                                        <Upload className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    </div>
                                    {errors.financial_highlights && <p className="text-sm text-red-500">{errors.financial_highlights}</p>}

                                    {fileName && (
                                        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-blue-900">New: {fileName}</span>
                                                </div>
                                                <span className="text-sm text-blue-600">{getFileSize(data.financial_highlights)}</span>
                                            </div>
                                            {financialHighlight.financial_highlights && (
                                                <p className="mt-1 text-xs text-blue-600">This will replace the current file</p>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500">
                                        {financialHighlight.financial_highlights
                                            ? 'Upload a new file to replace the current one (optional)'
                                            : 'Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx). Maximum size: 300MB'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Update Summary</CardTitle>
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
                                        <span className="font-medium">Current Highlights:</span>
                                        <span className="text-gray-600">{financialHighlight.financial_highlights ? 'Uploaded' : 'No file'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">File to Update:</span>
                                        <span className="text-gray-600">{fileName ? 'Selected' : 'None'}</span>
                                    </div>

                                    {financialHighlight.financial_highlights && (
                                        <div className="mt-4">
                                            <p className="mb-2 text-sm font-medium text-gray-700">Current File:</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                <span>Financial Highlights: {getCurrentFileName(financialHighlight.financial_highlights)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {fileName && (
                                        <div className="mt-4">
                                            <p className="mb-2 text-sm font-medium text-blue-700">File Being Updated:</p>
                                            <div className="flex items-center gap-2 text-sm text-blue-600">
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
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
                                {processing ? 'Updating...' : 'Update Highlights'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
