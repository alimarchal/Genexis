import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, Search, Trash } from 'lucide-react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Messages', href: '/admin/contact-submissions' },
];

interface Submission {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    category: string | null;
    subject: string;
    message: string;
    submitted_at: string | null;
}

interface Props {
    submissions: {
        data: Submission[];
        current_page: number;
        last_page: number;
        total: number;
        from: number | null;
        to: number | null;
    };
    categories: string[];
    filters: { search: string; category: string | null };
}

const formatDate = (value: string | null) =>
    value ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

export default function Index({ submissions, categories, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const canDelete = auth.permissions?.includes('delete contact submissions');
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');

    const apply = (next: { search?: string; category?: string; page?: number }) => {
        router.get(
            route('admin.contact-submissions.index'),
            { search: next.search ?? search, category: next.category ?? category, page: next.page },
            { preserveState: true, replace: true },
        );
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        apply({ page: 1 });
    };

    const remove = (id: number) => {
        if (confirm('Delete this message permanently?')) {
            router.delete(route('admin.contact-submissions.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />
            <div className="px-4 py-6 md:px-10">
                <Heading title="Contact Messages" description="Messages sent through the public contact form" />

                <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1 sm:max-w-sm">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, e-mail, subject, message"
                            className="pl-10"
                        />
                    </div>
                    <select
                        aria-label="Category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            apply({ category: e.target.value, page: 1 });
                        }}
                        className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                    >
                        <option value="">All categories</option>
                        {categories.map((name) => (
                            <option key={name} value={name}>
                                {name.replace(/_/g, ' ')}
                            </option>
                        ))}
                    </select>
                    <Button type="submit">Search</Button>
                </form>

                <div className="mt-6 overflow-x-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Received</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
                                        No messages found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {submissions.data.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell className="whitespace-nowrap">{formatDate(submission.submitted_at)}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{submission.name}</div>
                                        <div className="text-muted-foreground text-xs">{submission.email}</div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{submission.subject}</TableCell>
                                    <TableCell>
                                        {submission.category ? <Badge variant="outline">{submission.category.replace(/_/g, ' ')}</Badge> : '-'}
                                    </TableCell>
                                    <TableCell className="text-right whitespace-nowrap">
                                        <Button asChild variant="ghost" size="icon" aria-label="View message">
                                            <Link href={route('admin.contact-submissions.show', submission.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        {canDelete && (
                                            <Button variant="ghost" size="icon" aria-label="Delete message" onClick={() => remove(submission.id)}>
                                                <Trash className="h-4 w-4 text-red-600" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        {submissions.total === 0 ? '0 messages' : `Showing ${submissions.from}-${submissions.to} of ${submissions.total}`}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={submissions.current_page <= 1}
                            onClick={() => apply({ page: submissions.current_page - 1 })}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={submissions.current_page >= submissions.last_page}
                            onClick={() => apply({ page: submissions.current_page + 1 })}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
