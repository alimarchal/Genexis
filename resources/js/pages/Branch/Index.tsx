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
        title: 'Branches',
        href: route('branches.index'),
    },
];

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
    district_id: number;
    district: {
        id: number;
        name: string;
        region: {
            id: number;
            name: string;
        };
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    branches: {
        data: Branch[];
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

export default function Index({ branches, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.name || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || '');

    const handleSearch = () => {
        const searchParams = new URLSearchParams();
        if (searchTerm) searchParams.append('filter[name]', searchTerm);
        if (statusFilter) searchParams.append('filter[status]', statusFilter);

        router.get(route('branches.index'), Object.fromEntries(searchParams));
    };

    const handleDelete = (branch: Branch) => {
        if (confirm('Are you sure you want to delete this branch?')) {
            router.delete(route('branches.destroy', branch.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branches" />

            <div className="flex items-center justify-between">
                <Heading level={1}>Branches</Heading>
                <Link href={route('branches.create')}>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Branch
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2 my-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search branches..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>District</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {branches.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    No branches found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            branches.data.map((branch) => (
                                <TableRow key={branch.id}>
                                    <TableCell className="font-medium">{branch.name}</TableCell>
                                    <TableCell className="font-mono">{branch.code}</TableCell>
                                    <TableCell>{branch.district.name}</TableCell>
                                    <TableCell>{branch.district.region.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                                            {branch.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(branch.created_at).toLocaleDateString()}
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
                                                    <Link href={route('branches.show', branch.id)}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('branches.edit', branch.id)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(branch)}
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
            </div>

            {/* Pagination */}
            {branches.last_page > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-700">
                        Showing {(branches.current_page - 1) * branches.per_page + 1} to{' '}
                        {Math.min(branches.current_page * branches.per_page, branches.total)} of {branches.total} results
                    </div>
                    <div className="flex items-center space-x-2">
                        {branches.links.map((link, index) => (
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
        </AppLayout>
    );
}
