import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Building, Star } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';

interface BankService {
    id: number;
    title: string;
    description: string;
    icon: string;
    products: string[];
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[];
    order: number;
    status: boolean;
    service_type: 'main' | 'additional' | 'stat';
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this bank service?')) {
            router.delete(route('bank-services.destroy', bankService.id));
        }
    };

    const getServiceTypeColor = (type: string) => {
        switch (type) {
            case 'main':
                return 'bg-blue-100 text-blue-800';
            case 'additional':
                return 'bg-green-100 text-green-800';
            case 'stat':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${bankService.title} - Bank Service`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('bank-services.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Bank Services
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href={route('bank-services.edit', bankService.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Service
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Heading title="Bank Service Details" description="View complete information about this bank service" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Service Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Title</label>
                                        <p className="mt-1 font-medium">{bankService.title}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Order</label>
                                        <p className="mt-1">{bankService.order}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1">{bankService.description}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Icon</label>
                                        <p className="mt-1 flex items-center gap-2">
                                            <Building className="h-4 w-4" />
                                            {bankService.icon}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Service Type</label>
                                        <div className="mt-1">
                                            <Badge className={getServiceTypeColor(bankService.service_type)}>
                                                {bankService.service_type}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <div className="mt-1">
                                            <Badge variant={bankService.status ? 'default' : 'secondary'}>
                                                {bankService.status ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Color Scheme</label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <div className={`h-4 w-8 rounded bg-gradient-to-r ${bankService.color}`}></div>
                                        <span className="text-sm">{bankService.color}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistics Information (only for stat type) */}
                        {bankService.service_type === 'stat' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Statistics Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Stat Number</label>
                                            <p className="mt-1 text-2xl font-bold text-primary">{bankService.stat_number}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Stat Label</label>
                                            <p className="mt-1 font-medium">{bankService.stat_label}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Stat Description</label>
                                            <p className="mt-1">{bankService.stat_description || '-'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Products (not for stat type) */}
                        {bankService.service_type !== 'stat' && bankService.products.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                        {bankService.products.map((product, index) => (
                                            <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                                                <Star className="h-4 w-4 text-yellow-500" />
                                                <span>{product}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Benefits */}
                        {bankService.benefits.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Benefits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                        {bankService.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                                                <Star className="h-4 w-4 text-green-500" />
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Call to Action */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Call to Action</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">CTA Text</label>
                                        <p className="mt-1 font-medium">{bankService.cta_text}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">CTA Link</label>
                                        <p className="mt-1 text-blue-600 hover:underline">
                                            <a href={bankService.cta_link} target="_blank" rel="noopener noreferrer">
                                                {bankService.cta_link}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                                    <p className="mt-1 text-sm">{formatDate(bankService.created_at)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <p className="mt-1 text-sm">{formatDate(bankService.updated_at)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Service ID</label>
                                    <p className="mt-1 text-sm font-mono">#{bankService.id}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild className="w-full">
                                    <Link href={route('bank-services.edit', bankService.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Service
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={route('bank-services.create')}>
                                        Create New Service
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
