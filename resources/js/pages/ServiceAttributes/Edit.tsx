import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Settings } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Service {
    id: number;
    name: string;
}

interface ServiceAttribute {
    id: number;
    service_id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
    service: Service;
}

interface Props {
    serviceAttribute: ServiceAttribute;
    services: Service[];
}

export default function EditServiceAttribute({ serviceAttribute, services }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Service Attributes', href: route('service-attributes.index') },
        { title: 'Edit', href: route('service-attributes.edit', serviceAttribute.id) },
    ];

    const { data, setData, post, processing, errors } = useForm({
        service_id: serviceAttribute.service_id.toString(),
        attribute_name: serviceAttribute.attribute_name,
        attribute_value: serviceAttribute.attribute_value,
        sort_order: serviceAttribute.sort_order,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        const formData = {
            ...data,
            service_id: parseInt(data.service_id),
        };

        post(route('service-attributes.update', serviceAttribute.id), {
            data: formData,
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Service Attribute" />
            <div className="px-10 py-6">
                <Heading title="Edit Service Attribute" description="Update the service attribute" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="service_id">Service *</Label>
                                    <Select value={data.service_id} onValueChange={(value) => setData('service_id', value)}>
                                        <SelectTrigger className={errors.service_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {services.map((service) => (
                                                <SelectItem key={service.id} value={service.id.toString()}>
                                                    {service.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.service_id && <p className="text-sm text-red-500">{errors.service_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="attribute_name">Attribute Name *</Label>
                                    <Input
                                        id="attribute_name"
                                        value={data.attribute_name}
                                        onChange={(e) => setData('attribute_name', e.target.value)}
                                        placeholder="e.g., Service Coverage, Features, Benefits"
                                        className={errors.attribute_name ? 'border-red-500' : ''}
                                    />
                                    {errors.attribute_name && <p className="text-sm text-red-500">{errors.attribute_name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min="0"
                                        max="999"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        className={errors.sort_order ? 'border-red-500' : ''}
                                    />
                                    {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                                    <p className="text-sm text-gray-500">Lower numbers appear first (0-999)</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Attribute Value
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="attribute_value">Value *</Label>
                                    <Textarea
                                        id="attribute_value"
                                        value={data.attribute_value}
                                        onChange={(e) => setData('attribute_value', e.target.value)}
                                        placeholder="Enter the detailed attribute value or description..."
                                        rows={6}
                                        className={errors.attribute_value ? 'border-red-500' : ''}
                                    />
                                    {errors.attribute_value && <p className="text-sm text-red-500">{errors.attribute_value}</p>}
                                    <p className="text-sm text-gray-500">
                                        You can use line breaks to separate multiple items or create lists
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Update Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Service:</span>
                                        <span className="text-gray-600">
                                            {services.find(s => s.id.toString() === data.service_id)?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Attribute Name:</span>
                                        <span className="text-gray-600">{data.attribute_name}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Sort Order:</span>
                                        <span className="text-gray-600">{data.sort_order}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Value Length:</span>
                                        <span className="text-gray-600">{data.attribute_value.length} characters</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('service-attributes.index')}>Cancel</Link>
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