import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
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
        title: 'Product Schemes',
        href: route('product-schemes.index'),
    },
    {
        title: 'Create',
        href: route('product-schemes.create'),
    },
];

interface Product {
    id: number;
    name: string;
}

interface ProductType {
    id: number;
    name: string;
    product?: Product;
}

interface ProductTypeAccount {
    id: number;
    name: string;
    product_type?: ProductType;
}

interface Props {
    accounts: ProductTypeAccount[];
}

export default function CreateProductScheme({ accounts }: Props) {
    const { data, setData, processing, errors } = useForm({
        product_type_account_id: '',
        name: '',
        description: '',
        is_active: true as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('product-schemes.store'), data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Scheme" />

            <div className="px-10 py-6">
                <Heading title="Create Product Scheme" description="Add a new product scheme" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Scheme Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Account Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="product_type_account_id">Account *</Label>
                                    <Select value={data.product_type_account_id} onValueChange={(value) => setData('product_type_account_id', value)}>
                                        <SelectTrigger className={errors.product_type_account_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select an account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accounts.map((account) => (
                                                <SelectItem key={account.id} value={account.id.toString()}>
                                                    {account.name} ({account.product_type?.product?.name || 'N/A'} -{' '}
                                                    {account.product_type?.name || 'N/A'})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.product_type_account_id && <p className="text-sm text-red-500">{errors.product_type_account_id}</p>}
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Scheme Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter scheme name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter scheme description"
                                        rows={4}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Enable this scheme for use</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('product-schemes.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Scheme'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
