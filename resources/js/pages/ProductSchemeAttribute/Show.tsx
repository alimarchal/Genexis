import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Package } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    is_active: boolean;
}

interface ProductTypeAccount {
    id: number;
    name: string;
    is_active: boolean;
}

interface ProductType {
    id: number;
    product_id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    product: Product;
    productTypeAccounts?: ProductTypeAccount[];
}

interface Props {
    productType: ProductType;
}

export default function ShowProductType({ productType }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Product Types',
            href: route('product-types.index'),
        },
        {
            title: productType.name,
            href: route('product-types.show', productType.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${productType.name} - Product Types`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={productType.name} description="View product type details" />
                    <Button asChild>
                        <Link href={route('product-types.edit', productType.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Type
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-green-100 p-3">
                                        <Package className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <CardTitle className="text-2xl">{productType.name}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{productType.product.name}</Badge>
                                            {getStatusBadge(productType.is_active)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Product Type Accounts */}
                                {productType.productTypeAccounts && productType.productTypeAccounts.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Product Type Accounts</h3>
                                        <div className="space-y-2">
                                            {productType.productTypeAccounts.map((account) => (
                                                <div key={account.id} className="flex items-center justify-between rounded-lg border p-3">
                                                    <span className="font-medium">{account.name}</span>
                                                    {getStatusBadge(account.is_active)}
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
                                    <Package className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Parent Product</p>
                                        <div className="mt-1">
                                            <Badge variant="outline">{productType.product.name}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Package className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Type Name</p>
                                        <p className="text-sm text-gray-600">{productType.name}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(productType.is_active)}</div>
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
                                    <span className="font-medium">Accounts:</span>
                                    <span className="text-gray-600">
                                        {productType.productTypeAccounts ? productType.productTypeAccounts.length : 0}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Active Accounts:</span>
                                    <span className="text-gray-600">
                                        {productType.productTypeAccounts ? productType.productTypeAccounts.filter(account => account.is_active).length : 0}
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
                                    <p className="text-gray-600">{new Date(productType.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(productType.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('product-types.edit', productType.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Type
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('product-types.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}