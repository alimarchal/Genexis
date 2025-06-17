import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building, Calendar, Edit, Eye, Star, Tag } from 'lucide-react';

interface BankService {
    id: number;
    title: string;
    description: string;
    icon: string;
    products: string[] | string;
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[] | string;
    order: number;
    status: boolean;
    service_type: 'service' | 'deposit' | 'stat';
    stat_number: string | null;
    stat_label: string | null;
    stat_description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    bankService: BankService;
}

export default function ShowBankService({ bankService }: Props) {
    // Helper function to ensure we have arrays
    const ensureArray = (value: string | string[] | unknown): string[] => {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [value];
            } catch {
                return [value];
            }
        }
        return [];
    };

    const products = ensureArray(bankService.products);
    const benefits = ensureArray(bankService.benefits);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Bank Services',
            href: route('bank-services.index'),
        },
        {
            title: bankService.title,
            href: route('bank-services.show', bankService.id),
        },
    ];

    const getStatusBadge = (status: boolean) => {
        return status ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            service: 'default',
            deposit: 'secondary',
            stat: 'outline',
        };

        return <Badge variant={variants[type] || 'default'}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${bankService.title} - Bank Service`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={bankService.title} description="View bank service details" />
                    <Button asChild>
                        <Link href={route('bank-services.edit', bankService.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Service
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">{bankService.title}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            {getTypeBadge(bankService.service_type)}
                                            {getStatusBadge(bankService.status)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Description */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Description</h3>
                                    <div className="prose max-w-none">
                                        <p className="whitespace-pre-wrap text-gray-700">{bankService.description}</p>
                                    </div>
                                </div>

                                {/* Statistics (only for stat type) */}
                                {bankService.service_type === 'stat' && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Statistics</h3>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            <div className="rounded-lg border p-4">
                                                <div className="text-primary text-2xl font-bold">{bankService.stat_number}</div>
                                                <div className="text-sm font-medium text-gray-600">{bankService.stat_label}</div>
                                                {bankService.stat_description && (
                                                    <div className="text-xs text-gray-500">{bankService.stat_description}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Products (not for stat type) */}
                                {bankService.service_type !== 'stat' && products.length > 0 && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Products</h3>
                                        <div className="space-y-2">
                                            {products.map((product, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                    <span>{product}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Benefits */}
                                {benefits.length > 0 && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Benefits</h3>
                                        <div className="space-y-2">
                                            {benefits.map((benefit, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-green-500" />
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Call to Action */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Call to Action</h3>
                                    <div className="rounded-lg border p-4">
                                        <div className="font-medium">{bankService.cta_text}</div>
                                        <div className="text-sm text-gray-600">{bankService.cta_link}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Created</p>
                                        <p className="text-sm text-gray-600">{formatDate(bankService.created_at)}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Tag className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Service Type</p>
                                        <div className="mt-1">{getTypeBadge(bankService.service_type)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Eye className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(bankService.status)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Display Order</p>
                                    <p className="rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-600">{bankService.order}</p>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Icon</p>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4" />
                                        <span className="text-sm text-gray-600">{bankService.icon}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Color Scheme</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-4 w-8 rounded bg-gradient-to-r ${bankService.color}`}></div>
                                        <span className="text-xs text-gray-600">{bankService.color}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{formatDate(bankService.created_at)}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{formatDate(bankService.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('bank-services.edit', bankService.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Service
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('bank-services.index')}>Back to Services</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
