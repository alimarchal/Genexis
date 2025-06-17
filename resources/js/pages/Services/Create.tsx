import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Minus, Plus, Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Services',
        href: route('services.index'),
    },
    {
        title: 'Create',
        href: route('services.create'),
    },
];

export default function CreateService() {
    const { data, setData, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        icon: '',
        image: null as File | null,
        is_active: true as boolean,
        sort_order: 0,
        meta_data: null,
        attributes: [] as Array<{ attribute_name: string; attribute_value: string }>,
    });

    const [attributeItems, setAttributeItems] = useState([{ attribute_name: '', attribute_value: '' }]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const filteredAttributes = attributeItems.filter((item) =>
            item.attribute_name.trim() !== '' && item.attribute_value.trim() !== ''
        );

        router.post(route('services.store'), {
            ...data,
            attributes: filteredAttributes,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const addAttributeItem = () => {
        setAttributeItems([...attributeItems, { attribute_name: '', attribute_value: '' }]);
    };

    const removeAttributeItem = (index: number) => {
        if (attributeItems.length > 1) {
            const newItems = attributeItems.filter((_, i) => i !== index);
            setAttributeItems(newItems);
        }
    };

    const updateAttributeItem = (index: number, field: 'attribute_name' | 'attribute_value', value: string) => {
        const newItems = [...attributeItems];
        newItems[index][field] = value;
        setAttributeItems(newItems);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Service" />

            <div className="px-10 py-6">
                <Heading title="Create Service" description="Add a new service to your organization" />

                <div className="mt-8">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Service Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter service name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder="service-slug (auto-generated if empty)"
                                            className={errors.slug ? 'border-red-500' : ''}
                                        />
                                        {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                                        <p className="text-sm text-gray-500">Leave empty to auto-generate from name</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="icon">Icon</Label>
                                        <Input
                                            id="icon"
                                            value={data.icon}
                                            onChange={(e) => setData('icon', e.target.value)}
                                            placeholder="🏦 or icon name"
                                            className={errors.icon ? 'border-red-500' : ''}
                                        />
                                        {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                                        <p className="text-sm text-gray-500">Use emoji or icon name</p>
                                    </div>

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
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Detailed description of the service"
                                        rows={5}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Service Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className={errors.image ? 'border-red-500' : ''}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                    <p className="text-sm text-gray-500">Upload a service image (optional, max 2MB)</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Service Attributes</CardTitle>
                                    <Button type="button" variant="outline" size="sm" onClick={addAttributeItem}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Attribute
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {attributeItems.map((item, index) => (
                                    <div key={index} className="grid gap-4 grid-cols-1 md:grid-cols-5 items-end">
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor={`attribute_name_${index}`}>Attribute Name</Label>
                                            <Input
                                                id={`attribute_name_${index}`}
                                                value={item.attribute_name}
                                                onChange={(e) => updateAttributeItem(index, 'attribute_name', e.target.value)}
                                                placeholder={`Attribute ${index + 1} name`}
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor={`attribute_value_${index}`}>Attribute Value</Label>
                                            <Textarea
                                                id={`attribute_value_${index}`}
                                                value={item.attribute_value}
                                                onChange={(e) => updateAttributeItem(index, 'attribute_value', e.target.value)}
                                                placeholder={`Attribute ${index + 1} value`}
                                                rows={2}
                                            />
                                        </div>
                                        <div>
                                            {attributeItems.length > 1 && (
                                                <Button type="button" variant="outline" size="sm" onClick={() => removeAttributeItem(index)}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {errors.attributes && <p className="text-sm text-red-500">{errors.attributes}</p>}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Make this service visible on the website</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('services.index')}>Cancel</Link>
                            </Button>
                            <Button onClick={submit} disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Service'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}