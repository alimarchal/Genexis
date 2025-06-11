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
import { Edit, ExternalLink, Eye, Menu as MenuIcon, MoreHorizontal, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Menus',
        href: route('admin.menus.index'),
    },
];

interface MenuItem {
    id: number;
    title: string;
    slug: string;
    url: string | null;
    route_name: string | null;
    target: string;
    icon: string | null;
    parent_id: number | null;
    sort_order: number;
    is_active: boolean;
    is_mega_menu: boolean;
    css_class: string | null;
    created_at: string;
    updated_at: string;
    parent?: {
        id: number;
        title: string;
    };
    children_count?: number;
}

interface Props {
    menus: {
        data: MenuItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        filter?: {
            title?: string;
            is_active?: string;
            parent_id?: string;
        };
        sort?: string;
    };
}

export default function MenuIndex({ menus, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.title || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.is_active || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, unknown> = {};

        if (searchTerm) {
            params['filter[title]'] = searchTerm;
        }

        if (statusFilter && statusFilter !== 'all') {
            params['filter[is_active]'] = statusFilter;
        }

        router.get(route('admin.menus.index'), params as Record<string, unknown>, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this menu item? This will also delete all its children.')) {
            router.delete(route('admin.menus.destroy', id));
        }
    };

    const clearMenuCache = () => {
        router.post(
            '/admin/clear-menu-cache',
            {},
            {
                onSuccess: () => {
                    alert('Menu cache cleared successfully!');
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Management" />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Menu Management" description="Manage your website navigation menu structure" />
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={clearMenuCache}>
                            Clear Cache
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.menus.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Menu Item
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-4">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search menu items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit">Filter</Button>
                    </div>
                </form>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Order</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>URL/Route</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {menus.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                                        No menu items found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                menus.data.map((menu) => (
                                    <TableRow key={menu.id}>
                                        <TableCell className="font-medium">{menu.sort_order}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <MenuIcon className="text-muted-foreground h-4 w-4" />
                                                <div>
                                                    <p className="font-medium">{menu.title}</p>
                                                    <p className="text-muted-foreground text-sm">{menu.slug}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px] truncate">
                                                {menu.route_name ? (
                                                    <span className="text-sm text-blue-600">Route: {menu.route_name}</span>
                                                ) : menu.url ? (
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-sm">{menu.url}</span>
                                                        {menu.target === '_blank' && <ExternalLink className="text-muted-foreground h-3 w-3" />}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">No URL</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {menu.parent ? (
                                                <span className="text-sm">{menu.parent.title}</span>
                                            ) : (
                                                <span className="text-muted-foreground text-sm">Top Level</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {menu.is_mega_menu && (
                                                    <Badge variant="outline" className="text-xs">
                                                        Mega Menu
                                                    </Badge>
                                                )}
                                                {menu.children_count && menu.children_count > 0 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        {menu.children_count} children
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={menu.is_active ? 'default' : 'secondary'}>{menu.is_active ? 'Active' : 'Inactive'}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.menus.show', menu.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.menus.edit', menu.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(menu.id)} className="text-red-600">
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

                {/* Pagination */}
                {menus.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {menus.data.length} of {menus.total} results
                        </p>
                        <div className="flex gap-2">
                            {Array.from({ length: menus.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === menus.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get(route('admin.menus.index', { page }))}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
