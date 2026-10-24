import Heading from '@/components/heading';
import SafeImage from '@/components/safe-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Tourist Attractions', href: route('tourist-attractions.index') },
];

interface Row {
    id: number;
    title: string;
    image_url: string | null;
    order: number;
    status: 'active' | 'inactive';
    
}

interface Props {
    attractions: {
        data: Row[];
        current_page: number;
        last_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: Record<string, string>;
}

export default function TouristAttractionIndex({ attractions, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState(filters['filter[title]'] || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('tourist-attractions.index'), { 'filter[title]': value.trim() ? value : undefined }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this attraction?')) {
            router.delete(route('tourist-attractions.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tourist Attractions" />

            <div className="px-10 py-6">
                <Heading title="Tourist Attractions" description="Manage the tourist attraction pages of the website" />

                <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input placeholder="Search by title..." value={search} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
                        </div>

                        {auth.permissions.includes('create tourist attractions') && (
                            <Button asChild>
                                <Link href={route('tourist-attractions.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Attraction
                                </Link>
                            </Button>
                        )}
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Title</TableHead>
                                    
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attractions.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                                            No tourist attractions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    attractions.data.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="font-medium">{row.order}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {row.image_url && (
                                                        <SafeImage kind="generic" src={row.image_url} alt={row.title} className="h-10 w-16 rounded-md object-cover" />
                                                    )}
                                                    <span className="font-medium">{row.title}</span>
                                                </div>
                                            </TableCell>
                                            
                                            <TableCell>
                                                <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
                                                    {row.status === 'active' ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    {auth.permissions.includes('view tourist attractions') && (
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={route('tourist-attractions.show', row.id)} aria-label="View">
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {auth.permissions.includes('edit tourist attractions') && (
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={route('tourist-attractions.edit', row.id)} aria-label="Edit">
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {auth.permissions.includes('delete tourist attractions') && (
                                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.id)} aria-label="Delete">
                                                            <Trash className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {attractions.total > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                                Showing {attractions.from} to {attractions.to} of {attractions.total} results
                            </div>
                            <div className="flex gap-2">
                                {attractions.current_page > 1 && (
                                    <Button variant="outline" size="sm" onClick={() => router.get(route('tourist-attractions.index'), { page: attractions.current_page - 1 })}>
                                        Previous
                                    </Button>
                                )}
                                {attractions.current_page < attractions.last_page && (
                                    <Button variant="outline" size="sm" onClick={() => router.get(route('tourist-attractions.index'), { page: attractions.current_page + 1 })}>
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
