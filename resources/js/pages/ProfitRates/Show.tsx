import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Percent, Trash2 } from 'lucide-react';

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
        title: 'Details',
        href: '',
    },
];

interface ProfitRate {
    id: number;
    category: string;
    rate: number;
    valid_from: string;
    valid_to: string | null;
    is_active: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    creator?: {
        name: string;
    };
    updater?: {
        name: string;
    };
}

interface Props {
    profitRate: ProfitRate;
}

export default function Show({ profitRate }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDateOnly = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this profit rate?')) {
            router.delete(route('profit-rates.destroy', profitRate.id));
        }
    };

    const isCurrentRate = () => {
        const now = new Date();
        const validFrom = new Date(profitRate.valid_from);
        const validTo = profitRate.valid_to ? new Date(profitRate.valid_to) : null;

        return validFrom <= now && (!validTo || validTo >= now);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Profit Rate - ${profitRate.category}`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('profit-rates.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Profit Rates
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('profit-rates.edit', profitRate.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Rate
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Heading
                    title={`Profit Rate - ${profitRate.category}`}
                    description="View complete information about this profit rate"
                />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Percent className="mr-2 h-5 w-5" />
                                    Rate Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Category</label>
                                        <p className="text-lg font-semibold text-gray-900">{profitRate.category}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Rate</label>
                                        <p className="text-2xl font-bold text-green-600">{profitRate.rate}%</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <Badge variant={profitRate.is_active ? 'default' : 'secondary'}>
                                                {profitRate.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Current Rate</label>
                                        <div className="mt-1">
                                            {isCurrentRate() ? (
                                                <Badge className="bg-green-100 text-green-800">Active Period</Badge>
                                            ) : (
                                                <Badge variant="outline">Not Current</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Validity Period */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Validity Period
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Valid From</label>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">{formatDateOnly(profitRate.valid_from)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Valid To</label>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {profitRate.valid_to ? formatDateOnly(profitRate.valid_to) : 'Ongoing'}
                                        </p>
                                    </div>
                                </div>

                                {profitRate.valid_to && (
                                    <div className="mt-4 rounded-lg bg-blue-50 p-4">
                                        <p className="text-sm text-blue-800">
                                            This rate is valid for a specific period.
                                            {isCurrentRate() ? ' It is currently active.' : ' It is no longer active.'}
                                        </p>
                                    </div>
                                )}

                                {!profitRate.valid_to && (
                                    <div className="mt-4 rounded-lg bg-green-50 p-4">
                                        <p className="text-sm text-green-800">
                                            This is an ongoing rate with no end date specified.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Audit Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Record Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(profitRate.created_at)}</dd>
                                        {profitRate.creator && (
                                            <dd className="text-xs text-gray-500">by {profitRate.creator.name}</dd>
                                        )}
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(profitRate.updated_at)}</dd>
                                        {profitRate.updater && (
                                            <dd className="text-xs text-gray-500">by {profitRate.updater.name}</dd>
                                        )}
                                    </div>
                                </dl>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild className="w-full">
                                    <Link href={route('profit-rates.edit', profitRate.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Rate
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={route('profit-rates.create')}>Create New Rate</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Rate Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Rate Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-600">{profitRate.rate}%</div>
                                        <div className="text-sm text-gray-500">Annual Rate</div>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Product:</span>
                                                <span className="font-medium">{profitRate.category}</span>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-gray-500">Status:</span>
                                                <span className={profitRate.is_active ? 'text-green-600' : 'text-gray-600'}>
                                                    {profitRate.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
