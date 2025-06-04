import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import InputError from '@/components/input-error';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';

interface BankService {
    id: number;
    title: string;
    description: string;
    icon: string;
    products: string[];
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[];
    order: number;
    status: boolean;
    service_type: 'main' | 'additional' | 'stat';
    stat_number: string | null;
    stat_label: string | null;
    stat_description: string | null;
}

interface Props {
    bankService: BankService;
}

type BankServiceForm = {
    title: string;
    description: string;
    icon: string;
    products: string[];
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[];
    order: number;
    status: boolean;
    service_type: 'main' | 'additional' | 'stat';
    stat_number: string;
    stat_label: string;
    stat_description: string;
    _method?: string;
};

export default function EditBankService({ bankService }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Bank Services',
            href: route('bank-services.index'),
        },
        {
            title: bankService.title,
            href: route('bank-services.show', bankService.id),
        },
        {
            title: 'Edit',
            href: route('bank-services.edit', bankService.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm<BankServiceForm>({
        title: bankService.title,
        description: bankService.description,
        icon: bankService.icon,
        products: bankService.products.length > 0 ? bankService.products : [''],
        cta_text: bankService.cta_text,
        cta_link: bankService.cta_link,
        color: bankService.color,
        benefits: bankService.benefits.length > 0 ? bankService.benefits : [''],
        order: bankService.order,
        status: bankService.status,
        service_type: bankService.service_type,
        stat_number: bankService.stat_number || '',
        stat_label: bankService.stat_label || '',
        stat_description: bankService.stat_description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Filter out empty products and benefits
        const filteredData = {
            ...data,
            products: data.products.filter(p => p.trim() !== ''),
            benefits: data.benefits.filter(b => b.trim() !== ''),
        };
        put(route('bank-services.update', bankService.id), {
            data: filteredData,
        });
    };

    const addProduct = () => {
        setData('products', [...data.products, '']);
    };

    const removeProduct = (index: number) => {
        const newProducts = data.products.filter((_, i) => i !== index);
        setData('products', newProducts);
    };

    const updateProduct = (index: number, value: string) => {
        const newProducts = [...data.products];
        newProducts[index] = value;
        setData('products', newProducts);
    };

    const addBenefit = () => {
        setData('benefits', [...data.benefits, '']);
    };

    const removeBenefit = (index: number) => {
        const newBenefits = data.benefits.filter((_, i) => i !== index);
        setData('benefits', newBenefits);
    };

    const updateBenefit = (index: number, value: string) => {
        const newBenefits = [...data.benefits];
        newBenefits[index] = value;
        setData('benefits', newBenefits);
    };

    const iconOptions = [
        'Building', 'User', 'Users', 'Star', 'Smartphone', 'MapPin', 'CreditCard',
        'Shield', 'TrendingUp', 'Globe', 'DollarSign', 'Banknote', 'Calculator',
        'PiggyBank', 'Landmark', 'Wallet'
    ];

    const colorOptions = [
        'from-blue-600 to-blue-800',
        'from-green-600 to-green-800',
        'from-purple-600 to-purple-800',
        'from-indigo-600 to-indigo-800',
        'from-orange-600 to-orange-800',
        'from-teal-600 to-teal-800',
        'from-red-600 to-red-800',
        'from-yellow-600 to-yellow-800',
        'from-pink-600 to-pink-800',
        'from-gray-600 to-gray-800',
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Bank Service - ${bankService.title}`} />

            <div className="px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('bank-services.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Bank Services
                        </Link>
                    </Button>
                </div>

                <Heading title={`Edit Bank Service - ${bankService.title}`} description="Update bank service information" />

                <form onSubmit={submit} className="max-w-4xl space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter service title"
                                        className="mt-1"
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        className="mt-1"
                                        min="0"
                                    />
                                    <InputError message={errors.order} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Enter service description..."
                                    className="mt-1"
                                    required
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="icon">Icon *</Label>
                                    <Select value={data.icon} onValueChange={(value) => setData('icon', value)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {iconOptions.map((icon) => (
                                                <SelectItem key={icon} value={icon}>
                                                    {icon}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.icon} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="service_type">Service Type *</Label>
                                    <Select value={data.service_type} onValueChange={(value: 'main' | 'additional' | 'stat') => setData('service_type', value)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="main">Main Service</SelectItem>
                                            <SelectItem value="additional">Additional Service</SelectItem>
                                            <SelectItem value="stat">Statistics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.service_type} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="color">Color Scheme *</Label>
                                    <Select value={data.color} onValueChange={(value) => setData('color', value)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colorOptions.map((color) => (
                                                <SelectItem key={color} value={color}>
                                                    {color.replace('from-', '').replace(' to-', ' → ').replace('-600', '').replace('-800', '')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.color} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="status"
                                    checked={data.status}
                                    onCheckedChange={(checked) => setData('status', checked)}
                                />
                                <Label htmlFor="status">Active Status</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistics (only for stat type) */}
                    {data.service_type === 'stat' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="stat_number">Stat Number *</Label>
                                        <Input
                                            id="stat_number"
                                            type="text"
                                            value={data.stat_number}
                                            onChange={(e) => setData('stat_number', e.target.value)}
                                            placeholder="e.g., 87+, 500K+"
                                            className="mt-1"
                                        />
                                        <InputError message={errors.stat_number} className="mt-2" />
                                    </div>
                                    <div>
                                        <Label htmlFor="stat_label">Stat Label *</Label>
                                        <Input
                                            id="stat_label"
                                            type="text"
                                            value={data.stat_label}
                                            onChange={(e) => setData('stat_label', e.target.value)}
                                            placeholder="e.g., Branches, Customers"
                                            className="mt-1"
                                        />
                                        <InputError message={errors.stat_label} className="mt-2" />
                                    </div>
                                    <div>
                                        <Label htmlFor="stat_description">Stat Description</Label>
                                        <Input
                                            id="stat_description"
                                            type="text"
                                            value={data.stat_description}
                                            onChange={(e) => setData('stat_description', e.target.value)}
                                            placeholder="e.g., Across AJK"
                                            className="mt-1"
                                        />
                                        <InputError message={errors.stat_description} className="mt-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Products */}
                    {data.service_type !== 'stat' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.products.map((product, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            type="text"
                                            value={product}
                                            onChange={(e) => updateProduct(index, e.target.value)}
                                            placeholder="Enter product name"
                                            className="flex-1"
                                        />
                                        {data.products.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeProduct(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addProduct}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </Button>
                                <InputError message={errors.products} className="mt-2" />
                            </CardContent>
                        </Card>
                    )}

                    {/* Benefits */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Benefits</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => updateBenefit(index, e.target.value)}
                                        placeholder="Enter benefit"
                                        className="flex-1"
                                    />
                                    {data.benefits.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeBenefit(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addBenefit}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Benefit
                            </Button>
                            <InputError message={errors.benefits} className="mt-2" />
                        </CardContent>
                    </Card>

                    {/* Call to Action */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Call to Action</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="cta_text">CTA Text *</Label>
                                    <Input
                                        id="cta_text"
                                        type="text"
                                        value={data.cta_text}
                                        onChange={(e) => setData('cta_text', e.target.value)}
                                        placeholder="e.g., Learn More, Open Account"
                                        className="mt-1"
                                        required
                                    />
                                    <InputError message={errors.cta_text} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="cta_link">CTA Link *</Label>
                                    <Input
                                        id="cta_link"
                                        type="text"
                                        value={data.cta_link}
                                        onChange={(e) => setData('cta_link', e.target.value)}
                                        placeholder="e.g., /consumer-banking"
                                        className="mt-1"
                                        required
                                    />
                                    <InputError message={errors.cta_link} className="mt-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('bank-services.index')}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Service'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
