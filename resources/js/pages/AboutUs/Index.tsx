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
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'About Us', href: route('about-us.index') },
];

interface AboutUs {
    id: number;
    title: string;
    content: string;
    vision: string | null;
    mission: string | null;
    is_active: boolean;
    sort_order: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    aboutUsList: {
        data: AboutUs[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function AboutUsIndex({ aboutUsList, filters }: Props) {
    // Initialize hooks first
    const [search, setSearch] = useState(filters?.['filter[title]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const param = filters?.['filter[is_active]'];
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });

    // Early return after hooks
    if (!aboutUsList?.data) {
        return <div>Loading...</div>;
    }

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[title]'] = search;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('about-us.index'),
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
            route('about-us.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this about us content?')) {
            router.delete(route('about-us.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Us Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="About Us Management" />
                    <Button asChild>
                        <Link href={route('about-us.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add About Us Content
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={handleStatusFilter}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Sort Order</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {aboutUsList.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6">
                                        No about us content found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                aboutUsList.data.map((aboutUs) => (
                                    <TableRow key={aboutUs.id}>
                                        <TableCell className="font-medium">
                                            <div>
                                                <div className="font-medium">{aboutUs.title}</div>
                                                <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                    {aboutUs.content.substring(0, 100)}...
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={aboutUs.is_active ? 'default' : 'secondary'}>
                                                {aboutUs.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{aboutUs.sort_order}</TableCell>
                                        <TableCell>
                                            {new Date(aboutUs.created_at).toLocaleDateString()}
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
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('about-us.show', aboutUs.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('about-us.edit', aboutUs.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(aboutUs.id)}
                                                        className="text-destructive focus:text-destructive"
                                                    >
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

                {aboutUsList.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {aboutUsList.from} to {aboutUsList.to} of {aboutUsList.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: aboutUsList.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === aboutUsList.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() =>
                                        router.get(route('about-us.index'), {
                                            ...buildParams(),
                                            page,
                                        })
                                    }
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
