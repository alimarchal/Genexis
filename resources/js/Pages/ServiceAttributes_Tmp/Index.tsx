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
import { Edit, Eye, MoreHorizontal, Plus, Search, Settings, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Service Attributes', href: route('service-attributes.index') },
];

interface Service {
    id: number;
    name: string;
}

interface ServiceAttribute {
    id: number;
    service_id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
    service: Service;
}

interface Props {
    serviceAttributes: {
        data: ServiceAttribute[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    services: Service[];
    filters: Record<string, string>;
}

export default function ServiceAttributeIndex({ serviceAttributes, services, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[attribute_name]'] || '');
    const [serviceFilter, setServiceFilter] = useState(filters['filter[service_id]'] || '');

    const buildParams = () => {
        const params: Record<string, string> = {};
        if (search.trim()) params['filter[attribute_name]'] = search;
        if (serviceFilter) params['filter[service_id]'] = serviceFilter;
        return params;
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('service-attributes.index'),
            {
                ...buildParams(),
                'filter[attribute_name]': value.trim() ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleServiceFilter = (value: string) => {
        setServiceFilter(value);
        router.get(
            route('service-attributes.index'),
            {
                ...buildParams(),
                'filter[service_id]': value !== 'all' ? value : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePagination = (page: number) => {
        router.get(route('service-attributes.index'), { ...buildParams(), page });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service attribute?')) {
            router.delete(route('service-attributes.destroy', id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const truncateText = (text: string, maxLength: number = 100) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service Attributes" />
            <div className="px-10 py-6">
                <Heading title="Service Attributes" description="Manage service attributes and their properties" />
                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    placeholder="Search by attribute name..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={serviceFilter} onValueChange={handleServiceFilter}>
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="All Services" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Services</SelectItem>
                                    {services.map((service) => (
                                        <SelectItem key={service.id} value={service.id.toString()}>
                                            {service.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {(auth.permissions.includes('create service attributes') || auth.roles.includes('super-admin')) && (
                            <Button asChild>
                                <Link href={route('service-attributes.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Attribute
                                </Link>
                            </Button>
                        )}
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Attribute Name</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Sort Order</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {serviceAttributes.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                                            No service attributes found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    serviceAttributes.data.map((attribute) => (
                                        <TableRow key={attribute.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Settings className="h-5 w-5 text-blue-500" />
                                                    <div>
                                                        <span className="font-medium">{attribute.attribute_name}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-48 max-w-48">
                                                <Badge variant="outline">{attribute.service.name}</Badge>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="text-sm text-gray-600">{truncateText(attribute.attribute_value)}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{attribute.sort_order}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">{formatDate(attribute.created_at)}</TableCell>
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
                                                        {(auth.permissions.includes('view service attributes') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('service-attributes.show', attribute.id)}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {(auth.permissions.includes('edit service attributes') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('service-attributes.edit', attribute.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        {(auth.permissions.includes('delete service attributes') ||
                                                            auth.roles.includes('super-admin')) && (
                                                            <DropdownMenuItem onClick={() => handleDelete(attribute.id)} className="text-red-600">
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
                    {serviceAttributes.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {serviceAttributes.from} to {serviceAttributes.to} of {serviceAttributes.total} results
                            </div>
                            <div className="flex gap-2">
                                {serviceAttributes.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(serviceAttributes.current_page - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {serviceAttributes.current_page < serviceAttributes.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => handlePagination(serviceAttributes.current_page + 1)}>
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
