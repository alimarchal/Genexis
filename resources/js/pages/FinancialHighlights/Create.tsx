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
        title: 'Financial Highlights',
        href: route('financial-highlights.index'),
    },
    {
        title: 'Create',
        href: '',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        fiscal_year: new Date().getFullYear(),
        financial_highlights: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('financial-highlights.store'));
    };

    const handleFileChange = (file: File | null) => {
        setData('financial_highlights', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Financial Highlight" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('financial-highlights.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Financial Highlights
                        </Link>
                    </Button>
                </div>

                <Heading title="Create Financial Highlight" description="Add a new financial highlight document" />

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Financial Highlight Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Fiscal Year */}
                            <div className="space-y-2">
                                <Label htmlFor="fiscal_year">Fiscal Year *</Label>
                                <Input
                                    id="fiscal_year"
                                    type="number"
                                    min="2000"
                                    max={new Date().getFullYear() + 5}
                                    value={data.fiscal_year}
                                    onChange={(e) => setData('fiscal_year', parseInt(e.target.value))}
                                    placeholder="Enter fiscal year (e.g. 2024)"
                                    required
                                />
                                <InputError message={errors.fiscal_year} />
                            </div>

                            {/* Financial Highlights File Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="financial_highlights">Financial Highlights File *</Label>
                                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <label htmlFor="financial_highlights" className="cursor-pointer">
                                                <span className="mt-2 block text-sm font-medium text-gray-900">Upload Financial Highlights</span>
                                                <span className="mt-1 block text-sm text-gray-500">PDF, JPG, JPEG, PNG up to 10MB</span>
                                            </label>
                                            <input
                                                id="financial_highlights"
                                                type="file"
                                                className="sr-only"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {data.financial_highlights && <div className="text-sm text-gray-600">Selected: {data.financial_highlights.name}</div>}
                                <InputError message={errors.financial_highlights} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center space-x-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Financial Highlight'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('financial-highlights.index')}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
