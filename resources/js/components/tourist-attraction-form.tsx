import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export interface TouristAttractionRecord {
    id: number;
    title: string;
    summary: string | null;
    content: string | null;
    image_url: string | null;
    route_map_image_url: string | null;
    order: number;
    status: 'active' | 'inactive';
}

type AttractionForm = {
    title: string;
    summary: string;
    content: string;
    image: File | null;
    route_map_image: File | null;
    order: number;
    status: 'active' | 'inactive';
};

export default function TouristAttractionForm({ attraction }: { attraction?: TouristAttractionRecord }) {
    const { data, setData, post, processing, errors } = useForm<AttractionForm>({
        title: attraction?.title ?? '',
        summary: attraction?.summary ?? '',
        content: attraction?.content ?? '',
        image: null,
        route_map_image: null,
        order: attraction?.order ?? 0,
        status: attraction?.status ?? 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (attraction) {
            post(route('tourist-attractions.update', attraction.id), {
                forceFormData: true,
                transform: (formData) => ({ ...formData, _method: 'put' }),
            });
        } else {
            post(route('tourist-attractions.store'), { forceFormData: true });
        }
    };

    return (
        <form onSubmit={submit} className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Attraction Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="order">Display Order</Label>
                            <Input
                                id="order"
                                type="number"
                                min="0"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            />
                            {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea id="summary" rows={2} value={data.summary} onChange={(e) => setData('summary', e.target.value)} />
                        {errors.summary && <p className="text-sm text-red-500">{errors.summary}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Description</Label>
                        <Textarea id="content" rows={12} value={data.content} onChange={(e) => setData('content', e.target.value)} />
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="image">Photo</Label>
                            {attraction?.image_url && <img src={attraction.image_url} alt="" className="h-24 w-40 rounded-md object-cover" />}
                            <Input
                                id="image"
                                type="file"
                                accept="image/jpeg,image/png"
                                onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                            />
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="route_map_image">Route Map</Label>
                            {attraction?.route_map_image_url && (
                                <img src={attraction.route_map_image_url} alt="" className="h-24 w-40 rounded-md object-cover" />
                            )}
                            <Input
                                id="route_map_image"
                                type="file"
                                accept="image/jpeg,image/png"
                                onChange={(e) => setData('route_map_image', e.target.files?.[0] ?? null)}
                            />
                            {errors.route_map_image && <p className="text-sm text-red-500">{errors.route_map_image}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status *</Label>
                        <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                            <SelectTrigger id="status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('tourist-attractions.index')}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : attraction ? 'Update Attraction' : 'Create Attraction'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
