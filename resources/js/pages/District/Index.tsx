import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        title: 'Districts',
        href: route('districts.index'),
    },
];

interface District {
    id: number;
    name: string;
    region_id: number;
    region: {
        id: number;
        name: string;
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    districts: {
        data: District[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: Record<string, any>;
}

export default function Index({ districts, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.name || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchTerm) {
            params.append('filter[name]', searchTerm);
        }

        if (statusFilter && statusFilter !== 'all') {
            params.append('filter[status]', statusFilter);
        }

        router.get(`${route('districts.index')}?${params.toString()}`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (district: District) => {
        if (confirm('Are you sure you want to delete this district?')) {
            router.delete(route('districts.destroy', district.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Districts" />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title="Districts" />
                    <Link href={route('districts.create')}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add District
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="flex items-center space-x-2 my-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search districts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Search by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>Districts List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {districts.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            No districts found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    districts.data.map((district) => (
                                        <TableRow key={district.id}>
                                            <TableCell className="font-medium">{district.name}</TableCell>
                                            <TableCell>{district.region?.name || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant={district.status === 'active' ? 'default' : 'secondary'}>
                                                    {district.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(district.created_at).toLocaleDateString()}
                                            </TableCell>
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
                                                            <Link href={route('districts.show', district.id)}>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('districts.edit', district.id)}>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(district)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash className="h-4 w-4 mr-2" />
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
                    </CardContent>
                </Card>

                {/* Pagination */}
                {districts.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-700">
                            Showing {(districts.current_page - 1) * districts.per_page + 1} to{' '}
                            {Math.min(districts.current_page * districts.per_page, districts.total)} of {districts.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            {districts.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
