import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Download, Edit, FileText, Hash, TrendingUp } from 'lucide-react';

interface FinancialHighlight {
    id: number;
    fiscal_year: number;
    financial_highlights: string | null;
    financial_highlights_url: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    financialHighlight: FinancialHighlight;
}

export default function ShowFinancialHighlight({ financialHighlight }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Financial Highlights', href: route('financial-highlights.index') },
        { title: `FY ${financialHighlight.fiscal_year}`, href: route('financial-highlights.show', financialHighlight.id) },
    ];

    const getHighlightsBadge = () => {
        return financialHighlight.financial_highlights ? <Badge variant="default">Uploaded</Badge> : <Badge variant="outline">No Highlights</Badge>;
    };

    const getYearBadge = () => {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - financialHighlight.fiscal_year;

        if (yearDiff <= 1) return <Badge variant="default">Recent</Badge>;
        if (yearDiff <= 5) return <Badge variant="secondary">Last 5 Years</Badge>;
        return <Badge variant="outline">Older</Badge>;
    };

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    const getFileExtension = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('.').pop()?.toUpperCase() || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`FY ${financialHighlight.fiscal_year} - Financial Highlights`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Financial Highlights - FY ${financialHighlight.fiscal_year}`}
                        description={`Financial highlights for fiscal year ${financialHighlight.fiscal_year}-${financialHighlight.fiscal_year + 1}`}
                    />
                    <Button asChild>
                        <Link href={route('financial-highlights.edit', financialHighlight.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Highlights
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                                        <TrendingUp className="h-10 w-10 text-orange-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">Fiscal Year {financialHighlight.fiscal_year}</CardTitle>
                                            <p className="mt-1 text-lg text-gray-600">
                                                {financialHighlight.fiscal_year} - {financialHighlight.fiscal_year + 1}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getHighlightsBadge()}
                                            {getYearBadge()}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-orange-500" />
                                        <div>
                                            <CardTitle className="text-lg">Financial Highlights</CardTitle>
                                            <p className="mt-1 text-sm text-gray-500">Key financial metrics and achievements</p>
                                        </div>
                                    </div>
                                    {financialHighlight.financial_highlights && financialHighlight.financial_highlights_url && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={financialHighlight.financial_highlights_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {financialHighlight.financial_highlights ? (
                                    <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
                                            <FileText className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">
                                                {getCurrentFileName(financialHighlight.financial_highlights)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>{getFileExtension(financialHighlight.financial_highlights)} File</span>
                                                <span>•</span>
                                                <span>Available for download</span>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            Uploaded
                                        </Badge>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 rounded-md border-2 border-dashed border-gray-200 p-6 text-center">
                                        <div className="flex-1">
                                            <FileText className="mx-auto h-8 w-8 text-gray-400" />
                                            <p className="mt-2 text-sm font-medium text-gray-900">No file uploaded</p>
                                            <p className="text-sm text-gray-500">The financial highlights have not been uploaded yet</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Fiscal Year</p>
                                        <p className="text-sm text-gray-600">FY {financialHighlight.fiscal_year}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Period</p>
                                        <p className="text-sm text-gray-600">
                                            {financialHighlight.fiscal_year} - {financialHighlight.fiscal_year + 1}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getHighlightsBadge()}</div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Category</p>
                                        <div className="mt-1">{getYearBadge()}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Highlights Uploaded:</span>
                                    <span className="text-gray-600">{financialHighlight.financial_highlights ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">File Type:</span>
                                    <span className="text-gray-600">
                                        {financialHighlight.financial_highlights ? getFileExtension(financialHighlight.financial_highlights) : 'N/A'}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Downloadable:</span>
                                    <span className="text-gray-600">{financialHighlight.financial_highlights_url ? 'Yes' : 'No'}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(financialHighlight.created_at).toLocaleString()}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(financialHighlight.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('financial-highlights.edit', financialHighlight.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Highlights
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('financial-highlights.index')}>Back to List</Link>
                                </Button>
                                {financialHighlight.financial_highlights_url && (
                                    <div className="border-t pt-2">
                                        <Button asChild variant="outline" size="sm" className="w-full">
                                            <a href={financialHighlight.financial_highlights_url} target="_blank" rel="noopener noreferrer">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Highlights
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
