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

interface AboutUs {
    id: number;
    title: string;
    content: string;
    vision: string | null;
    mission: string | null;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    aboutUs: AboutUs;
}

export default function EditAboutUs({ aboutUs }: Props) {
    // Initialize hooks first
    const { data, setData, put, processing, errors } = useForm({
        title: aboutUs?.title || '',
        content: aboutUs?.content || '',
        vision: aboutUs?.vision || '',
        mission: aboutUs?.mission || '',
        is_active: aboutUs?.is_active || false,
        sort_order: aboutUs?.sort_order || 0,
        _method: 'PUT',
    });

    // Early return after hooks
    if (!aboutUs) {
        return <div>Loading...</div>;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'About Us', href: route('about-us.index') },
        { title: 'Edit', href: route('about-us.edit', aboutUs.id) },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('about-us.update', aboutUs.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About Us Content" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="Edit About Us Content" />
                    <Button variant="outline" asChild>
                        <Link href={route('about-us.index')}>Cancel</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Us Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter title"
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        placeholder="Enter sort order"
                                        min="0"
                                    />
                                    {errors.sort_order && <p className="text-sm text-destructive">{errors.sort_order}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Enter about us content"
                                    rows={10}
                                    required
                                />
                                {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vision">Vision</Label>
                                <Textarea
                                    id="vision"
                                    value={data.vision}
                                    onChange={(e) => setData('vision', e.target.value)}
                                    placeholder="Enter vision statement"
                                    rows={4}
                                />
                                {errors.vision && <p className="text-sm text-destructive">{errors.vision}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mission">Mission</Label>
                                <Textarea
                                    id="mission"
                                    value={data.mission}
                                    onChange={(e) => setData('mission', e.target.value)}
                                    placeholder="Enter mission statement"
                                    rows={4}
                                />
                                {errors.mission && <p className="text-sm text-destructive">{errors.mission}</p>}
                            </div>

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

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('about-us.index')}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Updating...' : 'Update About Us'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
