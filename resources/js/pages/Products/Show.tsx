import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Package } from 'lucide-react';

interface ProductType {
    id: number;
    name: string;
    is_active: boolean;
}

interface Product {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    product_types?: ProductType[];
}

interface Props {
    product: Product;
}

export default function ShowProduct({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Products',
            href: route('product.index'),
        },
        {
            title: product.name,
            href: route('product.show', product.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${product.name} - Products`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={product.name} description="View product details" />
                    <Button asChild>
                        <Link href={route('product.edit', product.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-blue-100 p-3">
                                        <Package className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                                        <div className="flex items-center gap-2">{getStatusBadge(product.is_active)}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Product Types */}
                                {product.product_types && product.product_types.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Product Types</h3>
                                        <div className="space-y-2">
                                            {product.product_types.map((type) => (
                                                <div key={type.id} className="flex items-center justify-between rounded-lg border p-3">
                                                    <span className="font-medium">{type.name}</span>
                                                    {getStatusBadge(type.is_active)}
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
                                        <p className="text-sm font-medium">Product Name</p>
                                        <p className="text-sm text-gray-600">{product.name}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(product.is_active)}</div>
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
                                    <span className="font-medium">Product Types:</span>
                                    <span className="text-gray-600">{product.product_types ? product.product_types.length : 0}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Active Types:</span>
                                    <span className="text-gray-600">
                                        {product.product_types ? product.product_types.filter((type) => type.is_active).length : 0}
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
                                    <p className="text-gray-600">{new Date(product.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(product.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('product.edit', product.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Product
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('product.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
