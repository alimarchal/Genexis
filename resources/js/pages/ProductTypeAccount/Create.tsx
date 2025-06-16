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
        title: 'Create',
        href: route('product-type-accounts.create'),
    },
];

interface Product {
    id: number;
    name: string;
}

interface ProductType {
    id: number;
    name: string;
    product: Product;
}

interface Props {
    productTypes: ProductType[];
}

export default function CreateProductTypeAccount({ productTypes }: Props) {
    const { data, setData, processing, errors } = useForm({
        product_type_id: '',
        name: '',
        is_active: true as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('product-type-accounts.store'), data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Account" />

            <div className="px-10 py-6">
                <Heading title="Create Product Type Account" description="Add a new product account category" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Product Type Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="product_type_id">Product Type *</Label>
                                    <Select value={data.product_type_id} onValueChange={(value) => setData('product_type_id', value)}>
                                        <SelectTrigger className={errors.product_type_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a product type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productTypes.map((productType) => (
                                                <SelectItem key={productType.id} value={productType.id.toString()}>
                                                    {productType.product.name} - {productType.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.product_type_id && <p className="text-sm text-red-500">{errors.product_type_id}</p>}
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Account Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter account name"
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
                                        <p className="text-sm text-gray-500">Enable this account for use</p>
                                    </div>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('product-type-accounts.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Account'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}