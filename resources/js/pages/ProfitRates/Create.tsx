import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Profit Rates', href: route('profit-rates.index') },
    { title: 'Create', href: route('profit-rates.create') },
];

export default function CreateProfitRate() {
    const { data, setData, processing, errors } = useForm({
        category: '',
        rate: '',
        valid_from: '',
        valid_to: '',
        is_active: true,
        sort_order: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('profit-rates.store'), data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Profit Rate" />
            <div className="px-10 py-6">
                <Heading title="Create Profit Rate" description="Add a new profit rate for banking products" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Input
                                        id="category" value={data.category} onChange={(e) => setData('category', e.target.value)}
                                        placeholder="e.g., PLS Saving Deposit" className={errors.category ? 'border-red-500' : ''}
                                    />
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="rate">Profit Rate (%) *</Label>
                                        <Input
                                            id="rate" type="number" step="0.01" min="0" max="99.99"
                                            value={data.rate} onChange={(e) => setData('rate', e.target.value)}
                                            placeholder="e.g., 10.50" className={errors.rate ? 'border-red-500' : ''}
                                        />
                                        {errors.rate && <p className="text-sm text-red-500">{errors.rate}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order" type="number" min="0"
                                            value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)}
                                            placeholder="0" className={errors.sort_order ? 'border-red-500' : ''}
                                        />
                                        {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Validity Period</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="valid_from">Valid From *</Label>
                                        <Input
                                            id="valid_from" type="date" value={data.valid_from} onChange={(e) => setData('valid_from', e.target.value)}
                                            className={errors.valid_from ? 'border-red-500' : ''}
                                        />
                                        {errors.valid_from && <p className="text-sm text-red-500">{errors.valid_from}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="valid_to">Valid To</Label>
                                        <Input
                                            id="valid_to" type="date" value={data.valid_to} onChange={(e) => setData('valid_to', e.target.value)}
                                            className={errors.valid_to ? 'border-red-500' : ''}
                                        />
                                        {errors.valid_to && <p className="text-sm text-red-500">{errors.valid_to}</p>}
                                        <p className="text-sm text-gray-500">Leave empty for ongoing rate</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">Active Status</Label>
                                        <p className="text-sm text-gray-500">Make this rate visible and active</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Category:</span>
                                        <span className="text-gray-600">{data.category || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Rate:</span>
                                        <span className="text-gray-600">{data.rate ? `${data.rate}%` : 'Not set'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Valid Period:</span>
                                        <span className="text-gray-600">
                                            {data.valid_from ? new Date(data.valid_from).toLocaleDateString() : 'Not set'} - {data.valid_to ? new Date(data.valid_to).toLocaleDateString() : 'Ongoing'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Status:</span>
                                        <span className="text-gray-600">{data.is_active ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Sort Order:</span>
                                        <span className="text-gray-600">{data.sort_order || 'Not set'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('profit-rates.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Rate'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}