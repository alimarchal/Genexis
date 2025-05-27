import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Edit, Eye, Plus, Search, Trash2, User } from 'lucide-react';

interface Managment {
    id: number;
    title?: string;
    full_name: string;
    designation: string;
    description?: string;
    attachment?: string;
    attachment_url?: string;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    managments: {
        data: Managment[];
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
        search?: string;
        status?: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Management', href: '/managment' },
];

export default function Index({ managments, filters, flash }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/managment', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        router.delete(`/managment/${id}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
        ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">Inactive</Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Management" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {flash?.success && (
                    <Alert className="border-green-200 bg-green-50">
                        <AlertDescription className="text-green-800">
                            {flash.success}
                        </AlertDescription>
                    </Alert>
                )}

                {flash?.error && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">
                            {flash.error}
                        </AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Management ({managments.total})
                            </CardTitle>
                            <Link href="/managment/create">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Management
                                </Button>
                            </Link>
                        </div>

                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name or designation..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button type="submit" variant="outline">
                                Search
                            </Button>
                        </form>
                    </CardHeader>

                    <CardContent>
                        {managments.data.length === 0 ? (
                            <div className="text-center py-12">
                                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No management members found.</p>
                                <Link href="/managment/create">
                                    <Button className="mt-4">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add First Management Member
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {managments.data.map((member) => (
                                    <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-4 flex-1">
                                                {member.attachment_url && (
                                                    <img
                                                        src={member.attachment_url}
                                                        alt={member.full_name}
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-lg">
                                                            {member.title} {member.full_name}
                                                        </h3>
                                                        {getStatusBadge(member.status)}
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{member.designation}</p>
                                                    {member.description && (
                                                        <p className="text-sm text-gray-500 line-clamp-2">
                                                            {member.description}
                                                        </p>
                                                    )}
                                                    <div className="text-xs text-gray-400 mt-2">
                                                        Order: {member.order} | Created: {new Date(member.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/managment/${member.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/managment/${member.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Delete Management Member</DialogTitle>
                                                            <DialogDescription>
                                                                Are you sure you want to delete {member.full_name}? This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex gap-2 justify-end">
                                                            <Button variant="outline">Cancel</Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => handleDelete(member.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {managments.last_page > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="flex gap-2">
                                    {managments.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}