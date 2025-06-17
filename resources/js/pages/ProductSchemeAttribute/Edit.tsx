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

interface ProductScheme {
    id: number;
    name: string;
    product_type_account: {
        id: number;
        name: string;
    };
}

interface ProductSchemeAttribute {
    id: number;
    product_scheme_id: number;
    attribute_name: string;
    attribute_value: string;
    attribute_type: string;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    productSchemeAttribute: ProductSchemeAttribute;
    schemes: ProductScheme[];
}

export default function EditProductSchemeAttribute({ productSchemeAttribute, schemes }: Props) {
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
            title: 'Edit',
            href: route('product-scheme-attributes.edit', productSchemeAttribute.id),
        },
    ];

    const { data, setData, processing, errors } = useForm({
        product_scheme_id: productSchemeAttribute.product_scheme_id.toString(),
        attribute_name: productSchemeAttribute.attribute_name,
        attribute_value: productSchemeAttribute.attribute_value,
        attribute_type: productSchemeAttribute.attribute_type,
        sort_order: productSchemeAttribute.sort_order,
        is_active: productSchemeAttribute.is_active as boolean,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('product-scheme-attributes.update', productSchemeAttribute.id), {
            ...data,
            _method: 'PUT',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Attribute" />

            <div className="px-10 py-6">
                <Heading title="Edit Scheme Attribute" description="Update attribute details" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Attribute Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Scheme Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="product_scheme_id">Product Scheme *</Label>
                                    <Select value={data.product_scheme_id} onValueChange={(value) => setData('product_scheme_id', value)}>
                                        <SelectTrigger className={errors.product_scheme_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a scheme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schemes.map((scheme) => (
                                                <SelectItem key={scheme.id} value={scheme.id.toString()}>
                                                    {scheme.name} ({scheme.product_type_account?.name || 'N/A'})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.product_scheme_id && <p className="text-sm text-red-500">{errors.product_scheme_id}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Attribute Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="attribute_name">Attribute Name *</Label>
                                        <Input
                                            id="attribute_name"
                                            value={data.attribute_name}
                                            onChange={(e) => setData('attribute_name', e.target.value)}
                                            placeholder="e.g., Purpose, Eligibility"
                                            className={errors.attribute_name ? 'border-red-500' : ''}
                                        />
                                        {errors.attribute_name && <p className="text-sm text-red-500">{errors.attribute_name}</p>}
                                    </div>

                                    {/* Attribute Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="attribute_type">Attribute Type *</Label>
                                        <Select value={data.attribute_type} onValueChange={(value) => setData('attribute_type', value)}>
                                            <SelectTrigger className={errors.attribute_type ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Text</SelectItem>
                                                <SelectItem value="number">Number</SelectItem>
                                                <SelectItem value="boolean">Boolean</SelectItem>
                                                <SelectItem value="date">Date</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.attribute_type && <p className="text-sm text-red-500">{errors.attribute_type}</p>}
                                    </div>
                                </div>

                                {/* Attribute Value */}
                                <div className="space-y-2">
                                    <Label htmlFor="attribute_value">Attribute Value *</Label>
                                    <Textarea
                                        id="attribute_value"
                                        value={data.attribute_value}
                                        onChange={(e) => setData('attribute_value', e.target.value)}
                                        placeholder="Enter the attribute value or description"
                                        rows={4}
                                        className={errors.attribute_value ? 'border-red-500' : ''}
                                    />
                                    {errors.attribute_value && <p className="text-sm text-red-500">{errors.attribute_value}</p>}
                                </div>

                                {/* Sort Order */}
                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min="0"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        className={errors.sort_order ? 'border-red-500' : ''}
                                    />
                                    {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                                    <p className="text-sm text-gray-500">Lower numbers appear first</p>
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Make this attribute visible</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('product-scheme-attributes.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Attribute'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
