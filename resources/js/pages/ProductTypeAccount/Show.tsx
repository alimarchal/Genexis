import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CreditCard, Edit } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    is_active: boolean;
}

interface ProductType {
    id: number;
    name: string;
    is_active: boolean;
    product?: Product;
}

interface ProductScheme {
    id: number;
    name: string;
    is_active: boolean;
    description?: string;
}

interface ProductTypeAccount {
    id: number;
    product_type_id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    product_type?: ProductType; // Changed from productType to product_type
    product_schemes?: ProductScheme[]; // Changed from productSchemes to product_schemes
}

interface Props {
    productTypeAccount: ProductTypeAccount;
}

export default function ShowProductTypeAccount({ productTypeAccount }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Product Type Accounts',
            href: route('product-type-accounts.index'),
        },
        {
            title: productTypeAccount.name,
            href: route('product-type-accounts.show', productTypeAccount.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${productTypeAccount.name} - Accounts`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={productTypeAccount.name} description="View account details" />
                    <Button asChild>
                        <Link href={route('product-type-accounts.edit', productTypeAccount.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Account
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-purple-100 p-3">
                                        <CreditCard className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <CardTitle className="text-2xl">{productTypeAccount.name}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{productTypeAccount.product_type?.name || 'N/A'}</Badge>
                                            <Badge variant="secondary">{productTypeAccount.product_type?.product?.name || 'N/A'}</Badge>
                                            {getStatusBadge(productTypeAccount.is_active)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Product Schemes */}
                                {productTypeAccount.product_schemes && productTypeAccount.product_schemes.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Product Schemes</h3>
                                        <div className="space-y-2">
                                            {productTypeAccount.product_schemes.map((scheme) => (
                                                <div key={scheme.id} className="flex items-center justify-between rounded-lg border p-3">
                                                    <div>
                                                        <span className="font-medium">{scheme.name}</span>
                                                        {scheme.description && (
                                                            <p className="mt-1 max-w-md truncate text-sm text-gray-600">{scheme.description}</p>
                                                        )}
                                                    </div>
                                                    {getStatusBadge(scheme.is_active)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Account Name</p>
                                        <p className="text-sm text-gray-600">{productTypeAccount.name}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Product Type</p>
                                        <div className="mt-1">
                                            <Badge variant="outline">{productTypeAccount.product_type?.name || 'N/A'}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium">Product</p>
                                        <div className="mt-1">
                                            <Badge variant="secondary">{productTypeAccount.product_type?.product?.name || 'N/A'}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(productTypeAccount.is_active)}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistics Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Product Schemes:</span>
                                    <span className="text-gray-600">
                                        {productTypeAccount.product_schemes ? productTypeAccount.product_schemes.length : 0}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Active Schemes:</span>
                                    <span className="text-gray-600">
                                        {productTypeAccount.product_schemes
                                            ? productTypeAccount.product_schemes.filter((scheme) => scheme.is_active).length
                                            : 0}
                                    </span>
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
                                    <p className="text-gray-600">{new Date(productTypeAccount.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(productTypeAccount.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('product-type-accounts.edit', productTypeAccount.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Account
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('product-type-accounts.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
