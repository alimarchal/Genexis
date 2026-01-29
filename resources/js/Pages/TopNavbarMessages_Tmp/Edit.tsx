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
import { MessageSquare, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface TopNavbarMessage {
    id: number;
    type: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    icon: string;
    text: string;
    color: string;
    bg_color: string;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    message: TopNavbarMessage;
}

export default function Edit({ message }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Top Navbar Messages', href: route('top-navbar-messages.index') },
        { title: 'Edit', href: route('top-navbar-messages.edit', message.id) },
    ];

    const { data, setData, processing, errors } = useForm<{
        type: string;
        priority: 'low' | 'medium' | 'high' | 'urgent';
        icon: string;
        text: string;
        color: string;
        bg_color: string;
        is_active: boolean;
        sort_order: number;
        _method: string;
    }>({
        type: message.type,
        priority: message.priority,
        icon: message.icon,
        text: message.text,
        color: message.color,
        bg_color: message.bg_color,
        is_active: message.is_active,
        sort_order: message.sort_order,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('top-navbar-messages.update', message.id), data);
    };

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' },
    ];

    const iconOptions = ['📢', '🏆', '💰', '📋', '🎯', '⚡', '🔔', '📊', '🎉', '⭐', '💳', '🏢', '📈', '🎪', '🎁', '🔥', '💡', '🚀', '🎪', '🌟'];

    const colorOptions = [
        { value: 'from-blue-500 to-cyan-600', label: 'Blue', bg: 'from-blue-50 to-cyan-50' },
        { value: 'from-emerald-500 to-green-600', label: 'Green', bg: 'from-emerald-50 to-green-50' },
        { value: 'from-orange-500 to-red-600', label: 'Orange', bg: 'from-orange-50 to-red-50' },
        { value: 'from-purple-500 to-pink-600', label: 'Purple', bg: 'from-purple-50 to-pink-50' },
        { value: 'from-yellow-500 to-orange-600', label: 'Yellow', bg: 'from-yellow-50 to-orange-50' },
        { value: 'from-indigo-500 to-blue-600', label: 'Indigo', bg: 'from-indigo-50 to-blue-50' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Top Navbar Message" />
            <div className="px-10 py-6">
                <Heading title="Edit Top Navbar Message" description="Update the message displayed in the top navigation bar" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type *</Label>
                                    <Input
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        placeholder="e.g., Achievement, Services, News"
                                        className={errors.type ? 'border-red-500' : ''}
                                    />
                                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="text">Message Text *</Label>
                                    <Textarea
                                        id="text"
                                        value={data.text}
                                        onChange={(e) => setData('text', e.target.value)}
                                        placeholder="Enter the message content that will be displayed"
                                        rows={3}
                                        className={errors.text ? 'border-red-500' : ''}
                                    />
                                    {errors.text && <p className="text-sm text-red-500">{errors.text}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select value={data.priority} onValueChange={(value) => setData('priority', value as typeof data.priority)}>
                                            <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {priorityOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.priority && <p className="text-sm text-red-500">{errors.priority}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order"
                                            type="number"
                                            min="1"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 1)}
                                            className={errors.sort_order ? 'border-red-500' : ''}
                                        />
                                        {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                                    <div>
                                        <CardTitle>Appearance</CardTitle>
                                        <p className="mt-1 text-sm text-gray-500">Customize how the message looks</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Icon</Label>
                                    <div className="grid grid-cols-10 gap-2">
                                        {iconOptions.map((icon) => (
                                            <button
                                                key={icon}
                                                type="button"
                                                onClick={() => setData('icon', icon)}
                                                className={`rounded-md border-2 p-2 text-lg transition-colors ${
                                                    data.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Color Theme</Label>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {colorOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setData('color', option.value);
                                                    setData('bg_color', option.bg);
                                                }}
                                                className={`rounded-lg border-2 p-3 transition-colors ${
                                                    data.color === option.value ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className={`mb-2 h-4 w-full rounded bg-gradient-to-r ${option.value}`}></div>
                                                <div className="text-sm font-medium">{option.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
                                </div>
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
                                        <p className="text-sm text-gray-500">Make this message visible to users</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`rounded-lg bg-gradient-to-r p-4 ${data.bg_color}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="text-lg">{data.icon}</div>
                                        <div>
                                            <div className="font-medium text-gray-800">{data.type || 'Message Type'}</div>
                                            <div className="text-sm text-gray-600">{data.text || 'Your message content will appear here...'}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('top-navbar-messages.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Message'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
