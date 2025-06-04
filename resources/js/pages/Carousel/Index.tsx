import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Carousel',
        href: route('carousels.index'),
    },
];

interface Carousel {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
    button_text: string | null;
    button_url: string | null;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    carousels: {
        data: Carousel[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        filter?: {
            title?: string;
            status?: string;
        };
        sort?: string;
    };
}

export default function CarouselIndex({ carousels, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.title || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, unknown> = {};

        if (searchTerm) {
            params['filter[title]'] = searchTerm;
        }

        if (statusFilter && statusFilter !== 'all') {
            params['filter[status]'] = statusFilter;
        }

        router.get(route('carousels.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this carousel slide?')) {
            router.delete(route('carousels.destroy', id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Carousel" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Carousel Slides" description="Manage your website carousel slides and content" />
                    <Button asChild>
                        <Link href={route('carousels.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Slide
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Search by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                        <div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit">
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </div>
                </form>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Button</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-32">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {carousels.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">
                                        No carousel slides found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                carousels.data.map((carousel) => (
                                    <TableRow key={carousel.id}>
                                        <TableCell className="font-medium">{carousel.order}</TableCell>
                                        <TableCell>
                                            {carousel.image_url && (
                                                <img src={carousel.image_url} alt={carousel.title} className="h-12 w-20 rounded object-cover" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{carousel.title}</TableCell>
                                        <TableCell>
                                            <div className="max-w-xs truncate">{carousel.description || '-'}</div>
                                        </TableCell>
                                        <TableCell>
                                            {carousel.button_text ? (
                                                <div className="text-sm">
                                                    <div className="font-medium">{carousel.button_text}</div>
                                                    <div className="text-muted-foreground text-xs">{carousel.button_url}</div>
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={carousel.status === 'active' ? 'default' : 'secondary'}>{carousel.status}</Badge>
                                        </TableCell>
                                        <TableCell>{formatDate(carousel.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link href={route('carousels.show', carousel.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button size="sm" variant="ghost" asChild>
                                                    <Link href={route('carousels.edit', carousel.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(carousel.id)}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {carousels.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-muted-foreground text-sm">
                            Showing {(carousels.current_page - 1) * carousels.per_page + 1} to{' '}
                            {Math.min(carousels.current_page * carousels.per_page, carousels.total)} of {carousels.total} results
                        </div>
                        <div className="flex gap-2">
                            {carousels.current_page > 1 && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('carousels.index', { page: carousels.current_page - 1 })}>Previous</Link>
                                </Button>
                            )}
                            {carousels.current_page < carousels.last_page && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('carousels.index', { page: carousels.current_page + 1 })}>Next</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
