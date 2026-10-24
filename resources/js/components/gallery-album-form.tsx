import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export interface GalleryPhoto {
    id: number;
    image_url: string | null;
    caption: string | null;
}

export interface GalleryAlbumRecord {
    id: number;
    title: string;
    description: string | null;
    cover_image_url: string | null;
    order: number;
    status: 'active' | 'inactive';
    photos: GalleryPhoto[];
}

type AlbumForm = {
    title: string;
    description: string;
    cover_image: File | null;
    photos: File[];
    remove_photo_ids: number[];
    order: number;
    status: 'active' | 'inactive';
};

export default function GalleryAlbumForm({ album }: { album?: GalleryAlbumRecord }) {
    const { data, setData, post, processing, errors } = useForm<AlbumForm>({
        title: album?.title ?? '',
        description: album?.description ?? '',
        cover_image: null,
        photos: [],
        remove_photo_ids: [],
        order: album?.order ?? 0,
        status: album?.status ?? 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (album) {
            post(route('gallery-albums.update', album.id), { forceFormData: true, transform: (formData) => ({ ...formData, _method: 'put' }) });
        } else {
            post(route('gallery-albums.store'), { forceFormData: true });
        }
    };

    const toggleRemoval = (photoId: number) => {
        setData(
            'remove_photo_ids',
            data.remove_photo_ids.includes(photoId) ? data.remove_photo_ids.filter((id) => id !== photoId) : [...data.remove_photo_ids, photoId],
        );
    };

    const photoErrors = Object.entries(errors).filter(([key]) => key.startsWith('photos'));

    return (
        <form onSubmit={submit} className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Album Information</CardTitle>
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cover_image">Cover Image</Label>
                        {album?.cover_image_url && <img src={album.cover_image_url} alt="" className="h-24 w-40 rounded-md object-cover" />}
                        <Input
                            id="cover_image"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setData('cover_image', e.target.files?.[0] ?? null)}
                        />
                        <p className="text-muted-foreground text-sm">JPG or PNG, up to 10MB. If empty, the first photo is used as the cover.</p>
                        {errors.cover_image && <p className="text-sm text-red-500">{errors.cover_image}</p>}
                    </div>

                    {album && album.photos.length > 0 && (
                        <div className="space-y-2">
                            <Label>Photos in this album (click to mark for removal)</Label>
                            <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                                {album.photos.map((photo) => (
                                    <button
                                        type="button"
                                        key={photo.id}
                                        onClick={() => toggleRemoval(photo.id)}
                                        className={`relative overflow-hidden rounded-md border-2 ${data.remove_photo_ids.includes(photo.id) ? 'border-red-500 opacity-40' : 'border-transparent'}`}
                                    >
                                        {photo.image_url && (
                                            <img src={photo.image_url} alt={photo.caption ?? ''} className="h-20 w-full object-cover" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="photos">Add Photos</Label>
                        <Input
                            id="photos"
                            type="file"
                            multiple
                            accept="image/jpeg,image/png"
                            onChange={(e) => setData('photos', Array.from(e.target.files ?? []))}
                        />
                        <p className="text-muted-foreground text-sm">Select up to 50 JPG or PNG photos (10MB each).</p>
                        {photoErrors.map(([key, message]) => (
                            <p key={key} className="text-sm text-red-500">
                                {message}
                            </p>
                        ))}
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
                            <Link href={route('gallery-albums.index')}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : album ? 'Update Album' : 'Create Album'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
