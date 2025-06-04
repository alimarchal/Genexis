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
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
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
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || 'all');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('news-announcements.index'),
            { search: value, status: statusFilter, category: categoryFilter },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        const statusParam = value === 'all' ? undefined : value;
        router.get(
            route('news-announcements.index'),
            { search, status: statusParam, category: categoryFilter === 'all' ? undefined : categoryFilter },
            { preserveState: true, replace: true },
        );
    };

    const handleCategoryFilter = (value: string) => {
        setCategoryFilter(value);
        const categoryParam = value === 'all' ? undefined : value;
        router.get(
            route('news-announcements.index'),
            { search, status: statusFilter === 'all' ? undefined : statusFilter, category: categoryParam },
            { preserveState: true, replace: true },
        );
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

                        <Button asChild>
                            <Link href={route('news-announcements.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add News
                            </Link>
                        </Button>
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
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {announcement.image_url && (
                                                        <img
                                                            src={announcement.image_url}
                                                            alt={announcement.title}
                                                            className="h-10 w-10 rounded-md object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium">{announcement.title}</div>
                                                        <div className="line-clamp-1 text-sm text-gray-500">
                                                            {announcement.content.substring(0, 60)}...
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
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('news-announcements.show', announcement.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('news-announcements.edit', announcement.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(announcement.id)} className="text-red-600">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(route('news-announcements.index'), {
                                                ...filters,
                                                page: newsAnnouncements.current_page - 1,
                                            })
                                        }
                                    >
                                        Previous
                                    </Button>
                                )}
                                {newsAnnouncements.current_page < newsAnnouncements.last_page && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(route('news-announcements.index'), {
                                                ...filters,
                                                page: newsAnnouncements.current_page + 1,
                                            })
                                        }
                                    >
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
