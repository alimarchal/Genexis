import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Product {
    id: number;
    name: string;
}

interface ProductType {
    id: number;
    product_id: number;
    name: string;
    is_active: boolean;
}

interface Props {
    productType: ProductType;
    products: Product[];
}

export default function EditProductType({ productType, products }: Props) {
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
            title: 'Edit',
            href: route('product-types.edit', productType.id),
        },
    ];

    const { data, setData, processing, errors } = useForm({
        product_id: productType.product_id.toString(),
        name: productType.name,
        is_active: productType.is_active as boolean,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('product-types.update', productType.id), {
            ...data,
            _method: 'PUT',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product Type" />

            <div className="px-10 py-6">
                <Heading title="Edit Product Type" description="Update product type details" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Type Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Product Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="product_id">Product *</Label>
                                    <Select value={data.product_id} onValueChange={(value) => setData('product_id', value)}>
                                        <SelectTrigger className={errors.product_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map((product) => (
                                                <SelectItem key={product.id} value={product.id.toString()}>
                                                    {product.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.product_id && <p className="text-sm text-red-500">{errors.product_id}</p>}
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Type Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter product type name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Enable this product type for use</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('product-types.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Type'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
