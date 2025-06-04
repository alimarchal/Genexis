import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, Eye, Star, Tag } from 'lucide-react';

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
    created_at: string;
    updated_at: string;
}

interface Props {
    newsAnnouncement: NewsAnnouncement;
}

export default function ShowNewsAnnouncement({ newsAnnouncement }: Props) {
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
            title: newsAnnouncement.title,
            href: route('news-announcements.show', newsAnnouncement.id),
        },
    ];

    const getStatusBadge = (isPublished: boolean) => {
        return isPublished ? <Badge variant="success">Published</Badge> : <Badge variant="secondary">Draft</Badge>;
    };

    const getCategoryBadge = (category: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            banking: 'default',
            services: 'secondary',
            announcements: 'outline',
            updates: 'destructive',
            general: 'secondary',
        };

        return <Badge variant={variants[category] || 'default'}>{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${newsAnnouncement.title} - News & Announcements`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={newsAnnouncement.title} description="View news announcement details" />
                    <Button asChild>
                        <Link href={route('news-announcements.edit', newsAnnouncement.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Announcement
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">{newsAnnouncement.title}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(newsAnnouncement.is_published)}
                                            {newsAnnouncement.is_featured && (
                                                <Badge variant="outline" className="gap-1">
                                                    <Star className="h-3 w-3" />
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Featured Image */}
                                {newsAnnouncement.image_url && (
                                    <div className="space-y-2">
                                        <img
                                            src={newsAnnouncement.image_url}
                                            alt={newsAnnouncement.title}
                                            className="h-64 w-full rounded-lg border object-cover"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Content</h3>
                                    <div className="prose max-w-none">
                                        <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{newsAnnouncement.content}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Published Date</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(newsAnnouncement.published_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Tag className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Category</p>
                                        <div className="mt-1">{getCategoryBadge(newsAnnouncement.category)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Eye className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(newsAnnouncement.is_published)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">URL Slug</p>
                                    <p className="rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-600">{newsAnnouncement.slug}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(newsAnnouncement.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(newsAnnouncement.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('news-announcements.edit', newsAnnouncement.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Announcement
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('news-announcements.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
