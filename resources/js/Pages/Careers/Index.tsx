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
import { Briefcase, Download, Edit, Eye, MapPin, MoreHorizontal, Plus, Search, Star, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Careers', href: route('careers.index') },
];

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    document: string | null;
    document_url: string | null;
    closing_date: string | null;
    is_active: boolean;
    is_featured: boolean;
    views_count: number;
    benefits: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    careers: {
        data: Career[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function CareerIndex({ careers, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[title]'] || '');
    const [locationFilter, setLocationFilter] = useState(filters['filter[location]'] || '');
    const [statusFilter, setStatusFilter] = useState(() => {
        const param = filters['filter[is_active]'];
        if (param === '1') return 'active';
        if (param === '0') return 'inactive';
        return 'all';
    });
    const [featuredFilter, setFeaturedFilter] = useState(() => {
        const param = filters['filter[is_featured]'];
        if (param === '1') return 'featured';
        if (param === '0') return 'regular';
        return 'all';
    });
    const [closingFilter, setClosingFilter] = useState(() => {
        const param = filters['filter[closing_status]'];
        if (param === 'open') return 'open';
        if (param === 'closed') return 'closed';
        return 'all';
    });

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[title]'] = search;
        if (locationFilter.trim()) params['filter[location]'] = locationFilter;
        if (statusFilter !== 'all') params['filter[is_active]'] = statusFilter === 'active' ? '1' : '0';
        if (featuredFilter !== 'all') params['filter[is_featured]'] = featuredFilter === 'featured' ? '1' : '0';
        if (closingFilter !== 'all') params['filter[closing_status]'] = closingFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('careers.index'),
            {
                ...buildParams(),
                'filter[title]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleLocationFilter = (value: string) => {
        setLocationFilter(value);
        router.get(
            route('careers.index'),
            {
                ...buildParams(),
                'filter[location]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('careers.index'),
            {
                ...buildParams(),
                'filter[is_active]': value !== 'all' ? (value === 'active' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleFeaturedFilter = (value: string) => {
        setFeaturedFilter(value);
        router.get(
            route('careers.index'),
            {
                ...buildParams(),
                'filter[is_featured]': value !== 'all' ? (value === 'featured' ? '1' : '0') : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleClosingFilter = (value: string) => {
        setClosingFilter(value);
        router.get(
            route('careers.index'),
            {
                ...buildParams(),
                'filter[closing_status]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('careers.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this career?')) {
            router.delete(route('careers.destroy', id));
        }
    };

    const getStatusBadge = (career: Career) => {
        if (!career.is_active) return <Badge variant="outline">Inactive</Badge>;

        const currentDate = new Date().toISOString().split('T')[0];
        if (career.closing_date && career.closing_date < currentDate) {
            return <Badge variant="destructive">Closed</Badge>;
        }
        return <Badge variant="default">Open</Badge>;
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
            <Head title="Careers" />
            <div className="px-10 py-6">
                <Heading title="Careers" description="Manage job postings and career opportunities" />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search by title..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Input
                                placeholder="Location..."
                                value={locationFilter}
                                onChange={(e) => handleLocationFilter(e.target.value)}
                                className="w-40"
                            />
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
                            <Select value={featuredFilter} onValueChange={handleFeaturedFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="regular">Regular</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={closingFilter} onValueChange={handleClosingFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All Applications" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Applications</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {(auth.permissions.includes('create careers') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('careers.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Career
                                </Link>
                            </Button>
                        )}
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Closing Date</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {careers.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                            No careers found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    careers.data.map((career) => (
                                        <TableRow key={career.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Briefcase className="h-5 w-5 text-blue-500" />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{career.title}</span>
                                                            {career.is_featured && <Star className="h-4 w-4 fill-current text-yellow-500" />}
                                                        </div>
                                                        <div className="max-w-xs truncate text-sm text-gray-500">{career.description}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-48 max-w-48">
                                                <div className="flex min-w-0 items-center gap-1 overflow-hidden text-sm">
                                                    <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                                                    <span className="truncate">{career.location}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(career)}</TableCell>
                                            <TableCell className="text-sm">
                                                {career.closing_date ? formatDate(career.closing_date) : 'Open'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{career.views_count}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(career.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view careers') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('careers.show', career.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit careers') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('careers.edit', career.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {career.document_url && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild>
                                                                    <a href={career.document_url} target="_blank" rel="noopener noreferrer">
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download
                                                                    </a>
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete careers') || auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(career.id)} className="text-red-600">
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
                    {careers.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {careers.from} to {careers.to} of {careers.total} results
                            </div>
                            <div className="flex gap-2">
                                {careers.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(careers.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {careers.current_page < careers.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(careers.current_page + 1)}>
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
