import Heading from '@/components/heading';
import RejectChangeDialog from '@/components/reject-change-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Check, Eye, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Change Approvals', href: '/admin/change-requests' },
];

export interface ChangeRequestRow {
    id: number;
    module: string;
    action: 'create' | 'update' | 'delete';
    summary: string;
    status: 'pending' | 'approved' | 'rejected';
    maker: { id: number; name: string } | null;
    checker: { id: number; name: string } | null;
    submitted_at: string;
    reviewed_at: string | null;
    rejection_reason: string | null;
    can_decide: boolean;
}

interface Props {
    changeRequests: { data: ChangeRequestRow[]; current_page: number; last_page: number; total: number; from: number | null; to: number | null };
    filters: { status: string; search: string | null };
    statuses: string[];
    isChecker: boolean;
    pendingCount: number;
}

export const actionLabel: Record<ChangeRequestRow['action'], string> = { create: 'Add', update: 'Edit', delete: 'Delete' };
export const statusVariant = (status: ChangeRequestRow['status']) =>
    status === 'approved' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary';
export const when = (value: string | null) =>
    value ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

export default function Index({ changeRequests, filters, statuses, isChecker, pendingCount }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [rejecting, setRejecting] = useState<ChangeRequestRow | null>(null);

    const go = (params: Record<string, string | number | null>) =>
        router.get(route('admin.change-requests.index'), params, { preserveState: true, replace: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Change Approvals" />
            <div className="px-4 py-6 md:px-10">
                <Heading
                    title={isChecker ? 'Change Approvals' : 'My Submitted Changes'}
                    description={
                        isChecker
                            ? 'Changes made by makers wait here. Nothing goes live on the website until you approve it.'
                            : 'Your changes wait here until a checker approves them. Approved changes go live on the website.'
                    }
                />

                <div className="flex flex-wrap items-center gap-2">
                    {['pending', ...statuses.filter((status) => status !== 'pending'), 'all'].map((status) => (
                        <Button
                            key={status}
                            size="sm"
                            variant={filters.status === status ? 'default' : 'outline'}
                            onClick={() => go({ status, search: filters.search })}
                            className="capitalize"
                        >
                            {status}
                            {status === 'pending' && pendingCount > 0 ? ` (${pendingCount})` : ''}
                        </Button>
                    ))}
                    <form
                        className="ml-auto flex gap-2"
                        onSubmit={(event) => {
                            event.preventDefault();
                            go({ status: filters.status, search: search || null });
                        }}
                    >
                        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title" className="w-56" />
                        <Button type="submit" variant="outline" size="sm">
                            Search
                        </Button>
                    </form>
                </div>

                <div className="mt-4 overflow-x-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Submitted</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>Maker</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Decision</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {changeRequests.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-muted-foreground py-10 text-center">
                                        Nothing here.
                                    </TableCell>
                                </TableRow>
                            )}
                            {changeRequests.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="whitespace-nowrap">{when(row.submitted_at)}</TableCell>
                                    <TableCell className="max-w-72">
                                        <div className="truncate font-medium" title={row.summary}>
                                            {row.summary}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                            {actionLabel[row.action]} · {row.module}
                                        </div>
                                    </TableCell>
                                    <TableCell>{row.maker?.name ?? 'Deleted user'}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant(row.status)} className="capitalize">
                                            {row.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-64 text-xs">
                                        {row.checker ? (
                                            <>
                                                <div>
                                                    {row.status === 'approved' ? 'Approved' : 'Rejected'} by {row.checker.name}
                                                </div>
                                                <div className="text-muted-foreground">{when(row.reviewed_at)}</div>
                                                {row.rejection_reason && <div className="mt-1 text-red-600">{row.rejection_reason}</div>}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route('admin.change-requests.show', row.id)}>
                                                    <Eye className="mr-1 h-3.5 w-3.5" /> View
                                                </Link>
                                            </Button>
                                            {row.can_decide && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            router.post(route('admin.change-requests.approve', row.id), {}, { preserveScroll: true })
                                                        }
                                                    >
                                                        <Check className="mr-1 h-3.5 w-3.5" /> Approve
                                                    </Button>
                                                    <Button size="sm" variant="destructive" onClick={() => setRejecting(row)}>
                                                        <X className="mr-1 h-3.5 w-3.5" /> Reject
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        {changeRequests.total === 0 ? '0 changes' : `Showing ${changeRequests.from}-${changeRequests.to} of ${changeRequests.total}`}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={changeRequests.current_page <= 1}
                            onClick={() => go({ status: filters.status, search: filters.search, page: changeRequests.current_page - 1 })}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={changeRequests.current_page >= changeRequests.last_page}
                            onClick={() => go({ status: filters.status, search: filters.search, page: changeRequests.current_page + 1 })}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <RejectChangeDialog changeRequestId={rejecting?.id ?? null} summary={rejecting?.summary ?? ''} onClose={() => setRejecting(null)} />
        </AppLayout>
    );
}
