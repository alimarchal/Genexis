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
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface NewsAnnouncement {
    id: number;
    title: string;
    content: string;
    image: string | null;
    image_url: string | null;
    published_date: string;
    is_featured: boolean;
    category: string;
    slug: string;
    is_published: boolean;
}

interface Props {
    newsAnnouncement: NewsAnnouncement;
}

interface NewsAnnouncementForm {
    title: string;
    content: string;
    image: File | null;
    published_date: string;
    is_featured: boolean;
    category: string;
    slug: string;
    is_published: boolean;
    _method: string;
}

export default function EditNewsAnnouncement({ newsAnnouncement }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'News & Announcements',
            href: route('news-announcements.index'),
        },
        {
            title: 'Edit',
            href: route('news-announcements.edit', newsAnnouncement.id),
        },
    ];

    const { data, setData, processing, errors } = useForm<NewsAnnouncementForm>({
        title: newsAnnouncement.title,
        content: newsAnnouncement.content,
        image: null,
        published_date: newsAnnouncement.published_date,
        is_featured: newsAnnouncement.is_featured,
        category: newsAnnouncement.category,
        slug: newsAnnouncement.slug,
        is_published: newsAnnouncement.is_published,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('news-announcements.update', newsAnnouncement.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const generateSlug = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
        setData('slug', slug);
    };

    const handleTitleChange = (value: string) => {
        setData('title', value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit News Announcement" />

            <div className="px-10 py-6">
                <Heading
                    title="Edit News Announcement"
                    description="Update the details of this news article or announcement"
                />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <form onSubmit={submit} className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>News Announcement Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Current Image Preview */}
                                {newsAnnouncement.image_url && (
                                    <div className="space-y-2">
                                        <Label>Current Image</Label>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={newsAnnouncement.image_url}
                                                alt={newsAnnouncement.title}
                                                className="h-20 w-20 rounded-md object-cover"
                                            />
                                            <p className="text-sm text-gray-500">
                                                Upload a new image to replace the current one
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="Enter news title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                {/* Slug */}
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder="news-slug"
                                            className={errors.slug ? 'border-red-500' : ''}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => generateSlug(data.title)}
                                        >
                                            Generate
                                        </Button>
                                    </div>
                                    {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                                    <p className="text-sm text-gray-500">Click Generate to create slug from title</p>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content *</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Enter news content"
                                        rows={8}
                                        className={errors.content ? 'border-red-500' : ''}
                                    />
                                    {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Featured Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className={errors.image ? 'border-red-500' : ''}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                    <p className="text-sm text-gray-500">
                                        {newsAnnouncement.image_url
                                            ? "Upload a new image to replace the current one (optional)"
                                            : "Upload an image for this news article (optional)"
                                        }
                                    </p>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="banking">Banking</SelectItem>
                                            <SelectItem value="services">Services</SelectItem>
                                            <SelectItem value="announcements">Announcements</SelectItem>
                                            <SelectItem value="updates">Updates</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                {/* Published Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="published_date">Published Date *</Label>
                                    <Input
                                        id="published_date"
                                        type="date"
                                        value={data.published_date}
                                        onChange={(e) => setData('published_date', e.target.value)}
                                        className={errors.published_date ? 'border-red-500' : ''}
                                    />
                                    {errors.published_date && <p className="text-sm text-red-500">{errors.published_date}</p>}
                                </div>

                                {/* Switches */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_published" className="text-base">Published</Label>
                                            <p className="text-sm text-gray-500">Make this announcement visible to the public</p>
                                        </div>
                                        <Switch
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_featured" className="text-base">Featured</Label>
                                            <p className="text-sm text-gray-500">Highlight this announcement on the homepage</p>
                                        </div>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('news-announcements.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing ? 'Updating...' : 'Update Announcement'}
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
