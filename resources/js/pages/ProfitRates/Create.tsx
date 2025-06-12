import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Profit Rates',
        href: route('profit-rates.index'),
    },
    {
        title: 'Create',
        href: '',
    },
];

const PROFIT_RATE_CATEGORIES = [
    'PLS Saving Deposit',
    'BMBA',
    'SDA(from 0.05M to Rs. 50M)',
    'SDA(Above to Rs. 50M to Rs.100M)',
    'SDA(Above to Rs.100M)',
    'Premium Plus Remittance Saving Account',
    "7 Days' Notice Deposit",
    "30 Days' Deposit",
    '3 Month TDR',
    '6 Month TDR',
    '1 Year TDR',
    '2 Year TDR',
    '3 Year TDR',
    '4 Year TDR',
    '5 Year TDR',
];

type ProfitRateForm = {
    category: string;
    rate: number | string;
    valid_from: string;
    valid_to: string;
    is_active: boolean;
    sort_order?: number | string;
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<ProfitRateForm>({
        category: '',
        rate: '',
        valid_from: '',
        valid_to: '',
        is_active: true,
        sort_order: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('profit-rates.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Profit Rate" />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('profit-rates.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Profit Rates
                        </Link>
                    </Button>
                </div>

                <Heading title="Create Profit Rate" description="Add a new profit rate for a product category" />

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Profit Rate Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select value={data.category} onValueChange={(value) => setData('category', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROFIT_RATE_CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            {/* Rate */}
                            <div className="space-y-2">
                                <Label htmlFor="rate">Rate (%) *</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    value={data.rate}
                                    onChange={(e) => setData('rate', e.target.value)}
                                    placeholder="Enter rate percentage (e.g. 10.50)"
                                    required
                                />
                                <InputError message={errors.rate} />
                            </div>

                            {/* Valid From */}
                            <div className="space-y-2">
                                <Label htmlFor="valid_from">Valid From *</Label>
                                <Input
                                    id="valid_from"
                                    type="date"
                                    value={data.valid_from}
                                    onChange={(e) => setData('valid_from', e.target.value)}
                                    required
                                />
                                <InputError message={errors.valid_from} />
                            </div>

                            {/* Valid To */}
                            <div className="space-y-2">
                                <Label htmlFor="valid_to">Valid To</Label>
                                <Input
                                    id="valid_to"
                                    type="date"
                                    value={data.valid_to}
                                    onChange={(e) => setData('valid_to', e.target.value)}
                                    placeholder="Leave empty for ongoing rate"
                                />
                                <p className="text-sm text-gray-600">Leave empty if this rate is ongoing</p>
                                <InputError message={errors.valid_to} />
                            </div>

                            {/* Sort Order */}
                            <div className="space-y-2">
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', e.target.value)}
                                    placeholder="Enter display order (lower numbers appear first)"
                                />
                                <p className="text-sm text-gray-600">Controls the display order in listings</p>
                                <InputError message={errors.sort_order} />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="is_active">Status *</Label>
                                <Select value={data.is_active.toString()} onValueChange={(value) => setData('is_active', value === 'true')}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Active</SelectItem>
                                        <SelectItem value="false">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.is_active} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center space-x-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Profit Rate'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('profit-rates.index')}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
