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
    type: string;
    region_id: number;
    district_id: number;
    region: {
        id: number;
        name: string;
    };
    district: {
        id: number;
        name: string;
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Region {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
    region: {
        id: number;
        name: string;
    };
}

interface Props {
    branches: {
        data: Branch[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    regions: Region[];
    districts: District[];
    filters: Record<string, string>;
}

export default function BranchIndex({ branches, regions, districts, filters }: Props) {
    const [search, setSearch] = useState(filters['filter[name]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const statusParam = filters['filter[status]'];
        if (statusParam === 'active') return 'active';
        if (statusParam === 'inactive') return 'inactive';
        return 'all';
    });
    const [regionFilter, setRegionFilter] = useState(filters['filter[region_id]'] || 'all');
    const [districtFilter, setDistrictFilter] = useState(filters['filter[district_id]'] || 'all');
    const [typeFilter, setTypeFilter] = useState(filters['filter[type]'] || 'all');

    const buildParams = () => {
        const params: Record<string, string> = {};

        if (search.trim()) {
            params['filter[name]'] = search;
        }
        if (statusFilter !== 'all') {
            params['filter[status]'] = statusFilter;
        }
        if (regionFilter !== 'all') {
            params['filter[region_id]'] = regionFilter;
        }
        if (districtFilter !== 'all') {
            params['filter[district_id]'] = districtFilter;
        }
        if (typeFilter !== 'all') {
            params['filter[type]'] = typeFilter;
        }

        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('branches.index'),
            {
                ...buildParams(),
                'filter[name]': value.trim() ? value : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('branches.index'),
            {
                ...buildParams(),
                'filter[status]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleRegionFilter = (value: string) => {
        setRegionFilter(value);
        // Reset district filter when region changes
        setDistrictFilter('all');
        router.get(
            route('branches.index'),
            {
                ...buildParams(),
                'filter[region_id]': value !== 'all' ? value : undefined,
                'filter[district_id]': undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleDistrictFilter = (value: string) => {
        setDistrictFilter(value);
        router.get(
            route('branches.index'),
            {
                ...buildParams(),
                'filter[district_id]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleTypeFilter = (value: string) => {
        setTypeFilter(value);
        router.get(
            route('branches.index'),
            {
                ...buildParams(),
                'filter[type]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('branches.index'), {
            ...buildParams(),
            page,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this branch?')) {
            router.delete(route('branches.destroy', id));
        }
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getTypeBadge = (type: string) => {
        const colors: Record<string, 'default' | 'secondary' | 'outline'> = {
            main: 'default',
            sub: 'secondary',
            agent: 'outline',
        };
        return <Badge variant={colors[type] || 'outline'}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Filter districts based on selected region
    const filteredDistricts = regionFilter !== 'all' ? districts.filter((district) => district.region.id.toString() === regionFilter) : districts;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branches" />

            <div className="px-10 py-6">
                <Heading title="Branches" description="Manage branches within your organization" />

                <div className="mt-8 space-y-6">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search branches..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={regionFilter} onValueChange={handleRegionFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Regions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Regions</SelectItem>
                                    {regions.map((region) => (
                                        <SelectItem key={region.id} value={region.id.toString()}>
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={districtFilter} onValueChange={handleDistrictFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Districts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Districts</SelectItem>
                                    {filteredDistricts.map((district) => (
                                        <SelectItem key={district.id} value={district.id.toString()}>
                                            {district.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={typeFilter} onValueChange={handleTypeFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="main">Main</SelectItem>
                                    <SelectItem value="sub">Sub</SelectItem>
                                    <SelectItem value="agent">Agent</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button asChild>
                            <Link href={route('branches.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Branch
                            </Link>
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Type</TableHead>
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
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            No branches found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    branches.data.map((branch) => (
                                        <TableRow key={branch.id}>
                                            <TableCell className="font-medium">{branch.name}</TableCell>
                                            <TableCell className="font-mono text-sm">{branch.code}</TableCell>
                                            <TableCell>{getTypeBadge(branch.type)}</TableCell>
                                            <TableCell>{branch.district?.name || 'N/A'}</TableCell>
                                            <TableCell>{branch.region?.name || 'N/A'}</TableCell>
                                            <TableCell>{getStatusBadge(branch.status)}</TableCell>
                                            <TableCell>{formatDate(branch.created_at)}</TableCell>
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
                                                            <Link href={route('branches.show', branch.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('branches.edit', branch.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(branch.id)}>
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
                    {branches.last_page > 1 && (
                        <div className="flex items-center justify-between">
                            <div className="text-muted-foreground text-sm">
                                Showing {branches.from} to {branches.to} of {branches.total} results
                            </div>
                            <div className="flex gap-2">
                                {Array.from({ length: branches.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === branches.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handlePagination(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
