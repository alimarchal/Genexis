import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, Hash, Percent, TrendingUp } from 'lucide-react';

interface ProfitRate {
    id: number;
    category: string;
    rate: number;
    valid_from: string;
    valid_to: string | null;
    is_active: boolean;
    sort_order: number | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    profitRate: ProfitRate;
}

export default function ShowProfitRate({ profitRate }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Profit Rates', href: route('profit-rates.index') },
        { title: profitRate.category, href: route('profit-rates.show', profitRate.id) },
    ];

    const getStatusBadge = () => {
        if (!profitRate.is_active) return <Badge variant="outline">Inactive</Badge>;

        const currentDate = new Date().toISOString().split('T')[0];
        const fromDate = profitRate.valid_from;
        const toDate = profitRate.valid_to;

        if (fromDate > currentDate) return <Badge variant="secondary">Upcoming</Badge>;
        if (toDate && toDate < currentDate) return <Badge variant="destructive">Expired</Badge>;
        return <Badge variant="default">Current</Badge>;
    };

    const getRateBadge = () => {
        if (profitRate.rate < 5) return <Badge variant="secondary">Low Rate</Badge>;
        if (profitRate.rate <= 10) return <Badge variant="default">Medium Rate</Badge>;
        return <Badge variant="destructive">High Rate</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${profitRate.category} - Profit Rate`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={profitRate.category} description="Profit rate details" />
                    <Button asChild>
                        <Link href={route('profit-rates.edit', profitRate.id)}>
                            <Edit className="mr-2 h-4 w-4" />Edit Rate
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                        <Percent className="h-10 w-10 text-emerald-600" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{profitRate.category}</CardTitle>
                                            <p className="mt-1 text-3xl font-bold text-emerald-600">{profitRate.rate}%</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge()}
                                            {getRateBadge()}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-lg">Rate Information</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Calendar className="h-4 w-4" />
                                            Valid From
                                        </h3>
                                        <p className="text-lg font-semibold">{formatDate(profitRate.valid_from)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Calendar className="h-4 w-4" />
                                            Valid To
                                        </h3>
                                        <p className="text-lg font-semibold">
                                            {profitRate.valid_to ? formatDate(profitRate.valid_to) : 'Ongoing'}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                                        <p className="text-3xl font-bold text-emerald-600">{profitRate.rate}%</p>
                                        <p className="text-sm text-gray-600 mt-1">Current Rate</p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-3xl font-bold text-blue-600">{profitRate.sort_order || '-'}</p>
                                        <p className="text-sm text-gray-600 mt-1">Sort Order</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <p className="text-3xl font-bold text-purple-600">
                                            {((profitRate.valid_to ? new Date(profitRate.valid_to) : new Date()).getTime() - new Date(profitRate.valid_from).getTime()) / (1000 * 60 * 60 * 24) > 0
                                                ? Math.ceil(((profitRate.valid_to ? new Date(profitRate.valid_to) : new Date()).getTime() - new Date(profitRate.valid_from).getTime()) / (1000 * 60 * 60 * 24))
                                                : '∞'
                                            }
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">Days Valid</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle className="text-lg">Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">ID</p>
                                        <p className="text-sm text-gray-600">#{profitRate.id}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Percent className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Category</p>
                                        <p className="text-sm text-gray-600">{profitRate.category}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Rate</p>
                                        <p className="text-sm text-gray-600">{profitRate.rate}%</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge()}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-lg">Statistics</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Active:</span>
                                    <span className="text-gray-600">{profitRate.is_active ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Rate Range:</span>
                                    <span className="text-gray-600">
                                        {profitRate.rate < 5 ? 'Low (<5%)' : profitRate.rate <= 10 ? 'Medium (5-10%)' : 'High (>10%)'}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Has End Date:</span>
                                    <span className="text-gray-600">{profitRate.valid_to ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Sort Order:</span>
                                    <span className="text-gray-600">{profitRate.sort_order || 'Not set'}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-lg">Timestamps</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(profitRate.created_at).toLocaleString()}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(profitRate.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-lg">Actions</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('profit-rates.edit', profitRate.id)}>
                                        <Edit className="mr-2 h-4 w-4" />Edit Rate
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('profit-rates.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}