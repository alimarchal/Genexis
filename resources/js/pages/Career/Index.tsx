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
import { Briefcase, Download, Edit, Eye, FileText, MapPin, MoreHorizontal, Plus, Search, Star, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Careers',
        href: route('careers.index'),
    },
];

interface CareerItem {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    document: string | null;
    document_url: string | null;
    closing_date: string | null;
    benefits: string | null;
    is_featured: boolean;
    is_active: boolean;
    views_count: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    careers: {
        data: CareerItem[];
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
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [locationFilter, setLocationFilter] = useState(filters.location || 'all');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('careers.index'),
            { search: value, status: statusFilter, location: locationFilter },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        const statusParam = value === 'all' ? undefined : value;
        router.get(
            route('careers.index'),
            { search, status: statusParam, location: locationFilter === 'all' ? undefined : locationFilter },
            { preserveState: true, replace: true },
        );
    };

    const handleLocationFilter = (value: string) => {
        setLocationFilter(value);
        const locationParam = value === 'all' ? undefined : value;
        router.get(
            route('careers.index'),
            { search, status: statusFilter === 'all' ? undefined : statusFilter, location: locationParam },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this career?')) {
            router.delete(route('careers.destroy', id));
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No deadline';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isExpired = (closingDate: string | null) => {
        if (!closingDate) return false;
        return new Date(closingDate) < new Date();
    };

    return (
        <AppLayout>
            <Head title="Careers Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Careers Management"
                        description="Manage job postings and career opportunities"
                        breadcrumbs={breadcrumbs}
                    />
                    <Link href={route('careers.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Career
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search careers..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={locationFilter} onValueChange={handleLocationFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                                    <SelectItem value="Chittagong">Chittagong</SelectItem>
                                    <SelectItem value="Sylhet">Sylhet</SelectItem>
                                    <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                                    <SelectItem value="Khulna">Khulna</SelectItem>
                                    <SelectItem value="Barisal">Barisal</SelectItem>
                                    <SelectItem value="Rangpur">Rangpur</SelectItem>
                                    <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Closing Date</TableHead>
                                <TableHead>Views</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead>Document</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {careers.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                                        No careers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                careers.data.map((career) => (
                                    <TableRow key={career.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{career.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {career.description.length > 50
                                                            ? `${career.description.substring(0, 50)}...`
                                                            : career.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                                {career.location}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={isExpired(career.closing_date) ? 'text-red-600' : ''}>
                                                {formatDate(career.closing_date)}
                                            </span>
                                        </TableCell>
                                        <TableCell>{career.views_count}</TableCell>
                                        <TableCell>
                                            <Badge variant={career.is_active ? 'default' : 'secondary'}>
                                                {career.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {career.is_featured && (
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {career.document_url && (
                                                <Link
                                                    href={route('careers.admin-download', career.id)}
                                                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    <FileText className="h-3 w-3" />
                                                    PDF
                                                </Link>
                                            )}
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
                                                        <Link href={route('careers.show', career.id)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('careers.edit', career.id)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {career.document_url && (
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('careers.admin-download', career.id)}>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(career.id)}
                                                        className="text-destructive"
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

                    {careers.last_page > 1 && (
                        <div className="flex items-center justify-between px-4 py-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {careers.from} to {careers.to} of {careers.total} results
                            </div>
                            <div className="flex gap-2">
                                {careers.current_page > 1 && (
                                    <Link
                                        href={route('careers.index', {
                                            page: careers.current_page - 1,
                                            search,
                                            status: statusFilter === 'all' ? undefined : statusFilter,
                                            location: locationFilter === 'all' ? undefined : locationFilter,
                                        })}
                                    >
                                        <Button variant="outline" size="sm">
                                            Previous
                                        </Button>
                                    </Link>
                                )}
                                {careers.current_page < careers.last_page && (
                                    <Link
                                        href={route('careers.index', {
                                            page: careers.current_page + 1,
                                            search,
                                            status: statusFilter === 'all' ? undefined : statusFilter,
                                            location: locationFilter === 'all' ? undefined : locationFilter,
                                        })}
                                    >
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
