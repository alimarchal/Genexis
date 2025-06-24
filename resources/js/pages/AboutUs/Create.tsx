import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'About Us', href: route('about-us.index') },
    { title: 'Create', href: route('about-us.create') },
];

export default function CreateAboutUs() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        vision: '',
        mission: '',
        is_active: true as boolean,
        sort_order: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('about-us.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create About Us Content" />

            <div className="px-10 py-6">
                <Heading title="Create About Us Content" description="Add new about us content and information for your organization" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About Us Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter title"
                                            className={errors.title ? 'border-red-500' : ''}
                                            required
                                        />
                                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
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
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content *</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Enter about us content"
                                        className={errors.content ? 'border-red-500' : ''}
                                        rows={10}
                                        required
                                    />
                                    {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                                </div>

                                {/* Vision */}
                                <div className="space-y-2">
                                    <Label htmlFor="vision">Vision</Label>
                                    <Textarea
                                        id="vision"
                                        value={data.vision}
                                        onChange={(e) => setData('vision', e.target.value)}
                                        placeholder="Enter vision statement"
                                        className={errors.vision ? 'border-red-500' : ''}
                                        rows={4}
                                    />
                                    {errors.vision && <p className="text-sm text-red-500">{errors.vision}</p>}
                                </div>

                                {/* Mission */}
                                <div className="space-y-2">
                                    <Label htmlFor="mission">Mission</Label>
                                    <Textarea
                                        id="mission"
                                        value={data.mission}
                                        onChange={(e) => setData('mission', e.target.value)}
                                        placeholder="Enter mission statement"
                                        className={errors.mission ? 'border-red-500' : ''}
                                        rows={4}
                                    />
                                    {errors.mission && <p className="text-sm text-red-500">{errors.mission}</p>}
                                </div>

                                {/* Status Toggle */}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" asChild>
                                <Link href={route('about-us.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create About Us'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
