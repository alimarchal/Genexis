import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, FileText } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    is_active: boolean;
}

interface ProductType {
    id: number;
    name: string;
    is_active: boolean;
    product: Product;
}

interface ProductTypeAccount {
    id: number;
    name: string;
    is_active: boolean;
    productType: ProductType;
}

interface ProductSchemeAttribute {
    id: number;
    attribute_name: string;
    attribute_value: string;
    attribute_type: string;
    is_active: boolean;
}

interface ProductScheme {
    id: number;
    product_type_account_id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    productTypeAccount: ProductTypeAccount;
    attributes?: ProductSchemeAttribute[];
}

interface Props {
    productScheme: ProductScheme;
}

export default function ShowProductScheme({ productScheme }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Product Schemes',
            href: route('product-schemes.index'),
        },
        {
            title: productScheme.name,
            href: route('product-schemes.show', productScheme.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${productScheme.name} - Schemes`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={productScheme.name} description="View scheme details" />
                    <Button asChild>
                        <Link href={route('product-schemes.edit', productScheme.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Scheme
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-yellow-100 p-3">
                                        <FileText className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <CardTitle className="text-2xl">{productScheme.name}</CardTitle>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="outline">{productScheme.productTypeAccount.name}</Badge>
                                            <Badge variant="secondary">{productScheme.productTypeAccount.productType.name}</Badge>
                                            <Badge variant="destructive">{productScheme.productTypeAccount.productType.product.name}</Badge>
                                            {getStatusBadge(productScheme.is_active)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Description */}
                                {productScheme.description && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Description</h3>
                                        <p className="text-gray-700 leading-relaxed">{productScheme.description}</p>
                                    </div>
                                )}

                                {/* Attributes */}
                                {productScheme.attributes && productScheme.attributes.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Attributes</h3>
                                        <div className="space-y-2">
                                            {productScheme.attributes.map((attribute) => (
                                                <div key={attribute.id} className="flex items-start justify-between rounded-lg border p-3">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{attribute.attribute_name}</h4>
                                                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{attribute.attribute_value}</p>
                                                        <Badge variant="outline" className="mt-2 text-xs">
                                                            {attribute.attribute_type}
                                                        </Badge>
                                                    </div>
                                                    {getStatusBadge(attribute.is_active)}
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
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Scheme Name</p>
                                        <p className="text-sm text-gray-600">{productScheme.name}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Account</p>
                                        <div className="mt-1">
                                            <Badge variant="outline">{productScheme.productTypeAccount.name}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium">Type & Product</p>
                                        <div className="mt-1 space-y-1">
                                            <Badge variant="secondary">{productScheme.productTypeAccount.productType.name}</Badge>
                                            <br />
                                            <Badge variant="destructive">{productScheme.productTypeAccount.productType.product.name}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(productScheme.is_active)}</div>
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
                                    <span className="font-medium">Attributes:</span>
                                    <span className="text-gray-600">
                                        {productScheme.attributes ? productScheme.attributes.length : 0}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Active Attributes:</span>
                                    <span className="text-gray-600">
                                        {productScheme.attributes ? productScheme.attributes.filter(attr => attr.is_active).length : 0}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Has Description:</span>
                                    <span className="text-gray-600">
                                        {productScheme.description ? 'Yes' : 'No'}
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
                                    <p className="text-gray-600">{new Date(productScheme.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(productScheme.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('product-schemes.edit', productScheme.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Scheme
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('product-schemes.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}