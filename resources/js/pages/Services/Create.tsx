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

interface ServiceAttribute {
    name: string;
    value: string;
}

export default function CreateService() {
    const { data, setData, processing, errors } = useForm({
        name: '',
        description: '',
        icon: '',
        image: null as File | null,
        is_active: true as boolean,
        sort_order: 0,
        meta_data: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        attributes: [] as any[],
    });

    const [attributeItems, setAttributeItems] = useState<ServiceAttribute[]>([{ name: '', value: '' }]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Filter out empty attributes
        const filteredAttributes = attributeItems.filter((item) => item.name.trim() !== '' && item.value.trim() !== '');

        router.post(route('services.store'), {
            ...data,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            attributes: filteredAttributes as any,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const addAttributeItem = () => {
        setAttributeItems([...attributeItems, { name: '', value: '' }]);
    };

    const removeAttributeItem = (index: number) => {
        if (attributeItems.length > 1) {
            const newItems = attributeItems.filter((_, i) => i !== index);
            setAttributeItems(newItems);
        }
    };

    const updateAttributeItem = (index: number, field: 'name' | 'value', value: string) => {
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
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Service Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Service Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name || ''}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter service name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Sort Order */}
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order"
                                            type="number"
                                            min="0"
                                            value={data.sort_order || 0}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            className={errors.sort_order ? 'border-red-500' : ''}
                                        />
                                        {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Input
                                        id="icon"
                                        value={data.icon || ''}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        placeholder="Enter icon name or emoji (e.g., 🔒, CreditCard)"
                                        className={errors.icon ? 'border-red-500' : ''}
                                    />
                                    {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                                    <p className="text-sm text-gray-500">Icon name for Lucide icons or emoji</p>
                                </div>

                                {/* Image Upload */}
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
                                    <p className="text-sm text-gray-500">Upload a service image (optional)</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Service Description</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description || ''}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Detailed description of the service"
                                        rows={6}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Attributes */}
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
                                    <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Attribute Name</Label>
                                            <Input
                                                value={item.name}
                                                onChange={(e) => updateAttributeItem(index, 'name', e.target.value)}
                                                placeholder={`Attribute ${index + 1} name`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Attribute Value</Label>
                                            <div className="flex gap-2">
                                                <Textarea
                                                    value={item.value}
                                                    onChange={(e) => updateAttributeItem(index, 'value', e.target.value)}
                                                    placeholder={`Attribute ${index + 1} value`}
                                                    rows={2}
                                                    className="flex-1"
                                                />
                                                {attributeItems.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => removeAttributeItem(index)}
                                                        className="self-start"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {errors.attributes && <p className="text-sm text-red-500">{errors.attributes}</p>}
                            </CardContent>
                        </Card>

                        {/* Settings */}
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
                                    <Switch id="is_active" checked={!!data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('services.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Service'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
