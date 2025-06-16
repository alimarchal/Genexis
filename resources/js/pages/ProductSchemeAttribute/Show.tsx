import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Hash } from 'lucide-react';

interface ProductSchemeAttribute {
    id: number;
    product_scheme_id: number;
    attribute_name: string;
    attribute_value: string;
    attribute_type: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    product_scheme?: {
        id: number;
        name: string;
        description?: string;
        product_type_account?: {
            id: number;
            name: string;
            product_type?: {
                id: number;
                name: string;
                product?: {
                    id: number;
                    name: string;
                };
            };
        };
    };
}

interface Props {
    productSchemeAttribute: ProductSchemeAttribute;
}

export default function ShowProductSchemeAttribute({ productSchemeAttribute }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Scheme Attributes',
            href: route('product-scheme-attributes.index'),
        },
        {
            title: productSchemeAttribute.attribute_name,
            href: route('product-scheme-attributes.show', productSchemeAttribute.id),
        },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            text: 'default',
            number: 'secondary',
            boolean: 'destructive',
            date: 'outline',
        };
        return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${productSchemeAttribute.attribute_name} - Attributes`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={productSchemeAttribute.attribute_name} description="View attribute details" />
                    <Button asChild>
                        <Link href={route('product-scheme-attributes.edit', productSchemeAttribute.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Attribute
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
                                        <Hash className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <CardTitle className="text-2xl">{productSchemeAttribute.attribute_name}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            {getTypeBadge(productSchemeAttribute.attribute_type)}
                                            {getStatusBadge(productSchemeAttribute.is_active)}
                                            <Badge variant="outline">Order: {productSchemeAttribute.sort_order}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Attribute Value */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">Attribute Value</h3>
                                    <div className="rounded-lg border p-4 bg-gray-50">
                                        <p className="text-sm whitespace-pre-wrap">{productSchemeAttribute.attribute_value}</p>
                                    </div>
                                </div>

                                {/* Scheme Information */}
                                {productSchemeAttribute.product_scheme && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium">Associated Scheme</h3>
                                        <div className="rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="font-medium text-sm">Scheme:</span>
                                                    <p className="text-sm text-gray-600">{productSchemeAttribute.product_scheme.name}</p>
                                                </div>
                                                {productSchemeAttribute.product_scheme.description && (
                                                    <div>
                                                        <span className="font-medium text-sm">Description:</span>
                                                        <p className="text-sm text-gray-600">{productSchemeAttribute.product_scheme.description}</p>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="font-medium text-sm">Account:</span>
                                                    <p className="text-sm text-gray-600">{productSchemeAttribute.product_scheme.product_type_account?.name || 'N/A'}</p>
                                                </div>
                                            </div>
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
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Attribute Name</p>
                                        <p className="text-sm text-gray-600">{productSchemeAttribute.attribute_name}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium">Type</p>
                                        <div className="mt-1">{getTypeBadge(productSchemeAttribute.attribute_type)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Sort Order</p>
                                        <p className="text-sm text-gray-600">{productSchemeAttribute.sort_order}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(productSchemeAttribute.is_active)}</div>
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
                                    <p className="text-gray-600">{new Date(productSchemeAttribute.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(productSchemeAttribute.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('product-scheme-attributes.edit', productSchemeAttribute.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Attribute
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('product-scheme-attributes.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}