import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Newspaper, Plus, Search, Star, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'News & Announcements',
        href: route('news-announcements.index'),
    },
];

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
    newsAnnouncements: {
        data: NewsAnnouncement[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function NewsAnnouncementIndex({ newsAnnouncements, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[title]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const publishedFilter = filters['filter[is_published]'];
        if (publishedFilter === '1') return 'published';
        if (publishedFilter === '0') return 'draft';
        return 'all';
    });
    const [categoryFilter, setCategoryFilter] = useState(filters['filter[category]'] || 'all');

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[title]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[is_published]'] = statusFilter === 'published' ? '1' : '0';
        }
        if (categoryFilter !== 'all') {
            params['filter[category]'] = categoryFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('news-announcements.index'),
            {
                ...buildParams(),
                'filter[title]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('news-announcements.index'),
            {
                ...buildParams(),
                'filter[is_published]': value !== 'all' ? (value === 'published' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleCategoryFilter = (value: string) => {
        setCategoryFilter(value);
        router.get(
            route('news-announcements.index'),
            {
                ...buildParams(),
                'filter[category]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('news-announcements.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this news announcement?')) {
            router.delete(route('news-announcements.destroy', id));
        }
    };

    const getStatusBadge = (isPublished: boolean) => {
        return isPublished ? <Badge variant="default">Published</Badge> : <Badge variant="secondary">Draft</Badge>;
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
            <Head title="News & Announcements" />

            <div className="px-10 py-6">
                <Heading title="News & Announcements" description="Manage news articles and announcements for your website" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input placeholder="Search news..." value={search} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
                            </div>

                            <Select value={statusFilter} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="banking">Banking</SelectItem>
                                    <SelectItem value="services">Services</SelectItem>
                                    <SelectItem value="announcements">Announcements</SelectItem>
                                    <SelectItem value="updates">Updates</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(auth.permissions.includes('create news announcements') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('news-announcements.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add News
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Published Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsAnnouncements.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                                            No news announcements found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    newsAnnouncements.data.map((announcement) => (
                                        <TableRow key={announcement.id}>
                                            <TableCell className="w-[400px] max-w-[400px]">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                                        {announcement.image_url ? (
                                                            <img
                                                                src={announcement.image_url}
                                                                alt={announcement.title}
                                                                className="h-10 w-10 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <Newspaper className="h-5 w-5 text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1 overflow-hidden">
                                                        <div className="flex items-start gap-2">
                                                            <div className="pr-1 text-sm leading-tight font-medium break-words hyphens-auto whitespace-normal">
                                                                {announcement.title}
                                                            </div>
                                                            {announcement.is_featured && (
                                                                <Star className="mt-0.5 h-4 w-4 shrink-0 fill-current text-yellow-500" />
                                                            )}
                                                        </div>
                                                        <div className="mt-1 line-clamp-2 text-xs break-words hyphens-auto whitespace-normal text-gray-500">
                                                            {announcement.content.substring(0, 100)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getCategoryBadge(announcement.category)}</TableCell>
                                            <TableCell>{new Date(announcement.published_date).toLocaleDateString()}</TableCell>
                                            <TableCell>{getStatusBadge(announcement.is_published)}</TableCell>
                                            <TableCell>{announcement.is_featured && <Badge variant="outline">Featured</Badge>}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('view news announcements') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('news-announcements.show', announcement.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit news announcements') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('news-announcements.edit', announcement.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete news announcements') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(announcement.id)} className="text-red-600">
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Info */}
                    {newsAnnouncements.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {newsAnnouncements.from} to {newsAnnouncements.to} of {newsAnnouncements.total} results
                            </div>
                            <div className="flex gap-2">
                                {newsAnnouncements.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(newsAnnouncements.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {newsAnnouncements.current_page < newsAnnouncements.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(newsAnnouncements.current_page + 1)}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
