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
        title: 'Contacts',
        href: route('contacts.index'),
    },
];

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
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
    contacts: {
        data: Contact[];
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

export default function Index({ contacts, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.filter?.name || '');
    const [statusFilter, setStatusFilter] = useState(filters.filter?.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        if (searchTerm) searchParams.append('filter[name]', searchTerm);
        if (statusFilter && statusFilter !== 'all') searchParams.append('filter[status]', statusFilter);

        router.get(route('contacts.index'), Object.fromEntries(searchParams));
    };

    const handleDelete = (contact: Contact) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(route('contacts.destroy', contact.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title="Contacts" description="Manage contact information and directory" />
                    <Link href={route('contacts.create')}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Directory</CardTitle>
                        <form onSubmit={handleSearch} className="flex items-center space-x-2">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[200px]">
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
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Contact Info</TableHead>
                                    <TableHead>Branch</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            No contacts found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    contacts.data.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell className="font-medium">{contact.name}</TableCell>
                                            <TableCell>{contact.position || 'N/A'}</TableCell>
                                            <TableCell>{contact.department || 'N/A'}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="text-sm">{contact.email}</div>
                                                    <div className="text-sm text-muted-foreground">{contact.phone || 'N/A'}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{contact.branch?.name || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                                                    {contact.status}
                                                </Badge>
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
                                                            <Link href={route('contacts.show', contact.id)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('contacts.edit', contact.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => handleDelete(contact)}
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
