import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface BankService {
    id: number;
    title: string;
    description: string;
    icon: string;
    products: string[] | string;
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[] | string;
    order: number;
    status: boolean;
    service_type: 'service' | 'deposit' | 'stat';
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
    service_type: 'service' | 'deposit' | 'stat';
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

    // Helper function to ensure we have arrays
    const ensureArray = (value: string | string[] | unknown): string[] => {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [value];
            } catch {
                return [value];
            }
        }
        return [];
    };

    const { data, setData, processing, errors } = useForm<BankServiceForm>({
        title: bankService.title,
        description: bankService.description,
        icon: bankService.icon,
        products: ensureArray(bankService.products).length > 0 ? ensureArray(bankService.products) : [''],
        cta_text: bankService.cta_text,
        cta_link: bankService.cta_link,
        color: bankService.color,
        benefits: ensureArray(bankService.benefits).length > 0 ? ensureArray(bankService.benefits) : [''],
        order: bankService.order,
        status: bankService.status,
        service_type: bankService.service_type,
        stat_number: bankService.stat_number || '',
        stat_label: bankService.stat_label || '',
        stat_description: bankService.stat_description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Prepare data based on service type
        let finalProducts = data.products.filter((p) => p.trim() !== '');
        let finalBenefits = data.benefits.filter((b) => b.trim() !== '');

        // For stat type, products are not required
        if (data.service_type === 'stat') {
            finalProducts = [];
        }

        // Ensure we have at least one benefit
        if (finalBenefits.length === 0) {
            finalBenefits = ['Banking service benefit'];
        }

        // Use router.put directly with prepared data
        router.put(route('bank-services.update', bankService.id), {
            ...data,
            products: finalProducts,
            benefits: finalBenefits,
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
        'Building',
        'Building2',
        'User',
        'Users',
        'Star',
        'Smartphone',
        'MapPin',
        'CreditCard',
        'Shield',
        'TrendingUp',
        'Globe',
        'DollarSign',
        'Banknote',
        'Calculator',
        'PiggyBank',
        'Landmark',
        'Wallet',
        'Wheat',
        'Home',
    ];

    const colorOptions = [
        'from-blue-600 to-blue-700',
        'from-blue-600 to-blue-800',
        'from-green-600 to-green-700',
        'from-green-600 to-green-800',
        'from-purple-600 to-purple-700',
        'from-purple-600 to-purple-800',
        'from-indigo-600 to-indigo-800',
        'from-orange-600 to-orange-700',
        'from-orange-600 to-orange-800',
        'from-teal-600 to-teal-700',
        'from-teal-600 to-teal-800',
        'from-amber-600 to-amber-700',
        'from-red-600 to-red-800',
        'from-yellow-600 to-yellow-800',
        'from-pink-600 to-pink-800',
        'from-gray-600 to-gray-800',
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Bank Service" />

            <div className="px-10 py-6">
                <Heading title="Edit Bank Service" description="Update the details of this bank service" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <form onSubmit={submit} className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bank Service Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter service title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <InputError message={errors.title} />}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter service description"
                                        rows={8}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <InputError message={errors.description} />}
                                </div>

                                {/* Icon */}
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon *</Label>
                                    <Select value={data.icon} onValueChange={(value) => setData('icon', value)}>
                                        <SelectTrigger className={errors.icon ? 'border-red-500' : ''}>
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
                                    {errors.icon && <InputError message={errors.icon} />}
                                </div>

                                {/* Service Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="service_type">Service Type *</Label>
                                    <Select
                                        value={data.service_type}
                                        onValueChange={(value: 'service' | 'deposit' | 'stat') => setData('service_type', value)}
                                    >
                                        <SelectTrigger className={errors.service_type ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select service type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="service">Main Service</SelectItem>
                                            <SelectItem value="deposit">Deposit Service</SelectItem>
                                            <SelectItem value="stat">Statistics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.service_type && <InputError message={errors.service_type} />}
                                </div>

                                {/* Color Scheme */}
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color Scheme *</Label>
                                    <Select value={data.color} onValueChange={(value) => setData('color', value)}>
                                        <SelectTrigger className={errors.color ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select color scheme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colorOptions.map((color) => (
                                                <SelectItem key={color} value={color}>
                                                    {color.replace('from-', '').replace(' to-', ' → ').replace('-600', '').replace('-800', '')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.color && <InputError message={errors.color} />}
                                </div>

                                {/* Display Order */}
                                <div className="space-y-2">
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        min="0"
                                        className={errors.order ? 'border-red-500' : ''}
                                    />
                                    {errors.order && <InputError message={errors.order} />}
                                </div>

                                {/* Statistics (only for stat type) */}
                                {data.service_type === 'stat' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="stat_number">Stat Number *</Label>
                                            <Input
                                                id="stat_number"
                                                value={data.stat_number}
                                                onChange={(e) => setData('stat_number', e.target.value)}
                                                placeholder="e.g., 87+, 500K+"
                                                className={errors.stat_number ? 'border-red-500' : ''}
                                            />
                                            {errors.stat_number && <InputError message={errors.stat_number} />}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="stat_label">Stat Label *</Label>
                                            <Input
                                                id="stat_label"
                                                value={data.stat_label}
                                                onChange={(e) => setData('stat_label', e.target.value)}
                                                placeholder="e.g., Branches, Customers"
                                                className={errors.stat_label ? 'border-red-500' : ''}
                                            />
                                            {errors.stat_label && <InputError message={errors.stat_label} />}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="stat_description">Stat Description</Label>
                                            <Input
                                                id="stat_description"
                                                value={data.stat_description}
                                                onChange={(e) => setData('stat_description', e.target.value)}
                                                placeholder="e.g., Across AJK"
                                                className={errors.stat_description ? 'border-red-500' : ''}
                                            />
                                            {errors.stat_description && <InputError message={errors.stat_description} />}
                                        </div>
                                    </>
                                )}

                                {/* Products (not for stat type) */}
                                {data.service_type !== 'stat' && (
                                    <div className="space-y-2">
                                        <Label>Products</Label>
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
                                                    <Button type="button" variant="outline" size="sm" onClick={() => removeProduct(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={addProduct}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Product
                                        </Button>
                                        {errors.products && <InputError message={errors.products} />}
                                    </div>
                                )}

                                {/* Benefits */}
                                <div className="space-y-2">
                                    <Label>Benefits</Label>
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
                                                <Button type="button" variant="outline" size="sm" onClick={() => removeBenefit(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={addBenefit}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Benefit
                                    </Button>
                                    {errors.benefits && <InputError message={errors.benefits} />}
                                </div>

                                {/* CTA Text */}
                                <div className="space-y-2">
                                    <Label htmlFor="cta_text">CTA Text *</Label>
                                    <Input
                                        id="cta_text"
                                        value={data.cta_text}
                                        onChange={(e) => setData('cta_text', e.target.value)}
                                        placeholder="e.g., Learn More, Open Account"
                                        className={errors.cta_text ? 'border-red-500' : ''}
                                    />
                                    {errors.cta_text && <InputError message={errors.cta_text} />}
                                </div>

                                {/* CTA Link */}
                                <div className="space-y-2">
                                    <Label htmlFor="cta_link">CTA Link *</Label>
                                    <Input
                                        id="cta_link"
                                        value={data.cta_link}
                                        onChange={(e) => setData('cta_link', e.target.value)}
                                        placeholder="e.g., /consumer-banking"
                                        className={errors.cta_link ? 'border-red-500' : ''}
                                    />
                                    {errors.cta_link && <InputError message={errors.cta_link} />}
                                </div>

                                {/* Switches */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="status" checked={data.status} onCheckedChange={(checked) => setData('status', checked)} />
                                        <Label htmlFor="status">Active Status</Label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('bank-services.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Service'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
