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
        title: 'Branch Services',
        href: route('branch-services.index'),
    },
];

interface BranchService {
    id: number;
    service_name: string;
    description: string;
    branch_id: number;
    branch: {
        id: number;
        name: string;
        code: string;
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    branchServices: {
        data: BranchService[];
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
    filters: {
        filter?: {
            service_name?: string;
            status?: string;
        };
    };
}

export default function Index({ branchServices, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.service_name || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchTerm) {
            params.append('filter[service_name]', searchTerm);
        }

        if (statusFilter && statusFilter !== 'all') {
            params.append('filter[status]', statusFilter);
        }

        router.get(
            `${route('branch-services.index')}?${params.toString()}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (branchService: BranchService) => {
        if (confirm('Are you sure you want to delete this branch service?')) {
            router.delete(route('branch-services.destroy', branchService.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branch Services" />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title="Branch Services" description="Manage services available at branches" />
                    <Link href={route('branch-services.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Branch Service
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="my-4 flex items-center space-x-2">
                    <div className="flex-1">
                        <Input
                            placeholder="Search branch services..."
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
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>Branch Services List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table className="min-w-[970px]">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Service Name</TableHead>
                                        <TableHead className="w-[150px]">Branch</TableHead>
                                        <TableHead className="w-[300px]">Description</TableHead>
                                        <TableHead className="w-[100px]">Status</TableHead>
                                        <TableHead className="w-[120px]">Created</TableHead>
                                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {branchServices.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="py-8 text-center">
                                                No branch services found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        branchServices.data.map((branchService) => (
                                            <TableRow key={branchService.id}>
                                                <TableCell className="font-medium w-[200px]">{branchService.service_name}</TableCell>
                                                <TableCell className="w-[150px]">{branchService.branch?.name || 'N/A'}</TableCell>
                                                <TableCell className="w-[300px]">
                                                    <div className="max-w-[280px] truncate pr-4" title={branchService.description}>
                                                        {branchService.description}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="w-[100px]">
                                                    <Badge variant={branchService.status === 'active' ? 'default' : 'secondary'}>
                                                        {branchService.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="w-[120px]">{new Date(branchService.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="w-[100px] text-right">
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
                                                                <Link href={route('branch-services.show', branchService.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('branch-services.edit', branchService.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDelete(branchService)} className="text-red-600">
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
                    </CardContent>
                </Card>

                {/* Pagination */}
                {branchServices.last_page > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {(branchServices.current_page - 1) * branchServices.per_page + 1} to{' '}
                            {Math.min(branchServices.current_page * branchServices.per_page, branchServices.total)} of {branchServices.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            {branchServices.links.map((link, index) => (
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
