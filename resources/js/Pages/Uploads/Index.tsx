import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatBytes } from '@/lib/chunked-upload';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Upload Log', href: '/admin/uploads' },
];

interface Session {
    id: number;
    uuid: string;
    context: string;
    original_name: string;
    declared_size: number;
    received_bytes: number;
    progress_percent: number;
    status: 'uploading' | 'completed' | 'cancelled' | 'expired' | 'failed';
    failure_reason: string | null;
    ip_address: string | null;
    sha256: string | null;
    consumed_at: string | null;
    created_at: string;
    completed_at: string | null;
    last_chunk_at: string | null;
    user: { id: number; name: string; email: string } | null;
}

interface Props {
    sessions: { data: Session[]; current_page: number; last_page: number; total: number; from: number | null; to: number | null };
    filters: { status: string | null };
    statuses: string[];
    limits: { chunk_size: number; super_admin_max_bytes: number; contexts: Record<string, { label: string; max_bytes: number }> };
}

const badgeVariant = (status: Session['status']) =>
    status === 'completed' ? 'default' : status === 'uploading' ? 'secondary' : status === 'failed' ? 'destructive' : 'outline';
const when = (value: string | null) =>
    value ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';

export default function Index({ sessions, filters, statuses, limits }: Props) {
    const active = sessions.data.some((session) => session.status === 'uploading');

    useEffect(() => {
        if (!active) return;
        const timer = setInterval(() => router.reload({ only: ['sessions'] }), 3000);
        return () => clearInterval(timer);
    }, [active]);

    const go = (params: Record<string, string | number | null>) =>
        router.get(route('admin.uploads.index'), params, { preserveState: true, replace: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload Log" />
            <div className="px-4 py-6 md:px-10">
                <Heading title="Upload Log" description="Every large-file upload and how far it got. Limits per document type are shown below." />

                <ul className="text-muted-foreground mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                    {Object.entries(limits.contexts).map(([key, definition]) => (
                        <li key={key}>
                            {definition.label}: up to {formatBytes(definition.max_bytes)}
                        </li>
                    ))}
                    <li>Super-admins: up to {formatBytes(limits.super_admin_max_bytes)}</li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                    <Button variant={filters.status ? 'outline' : 'default'} size="sm" onClick={() => go({ status: null })}>
                        All
                    </Button>
                    {statuses.map((status) => (
                        <Button key={status} variant={filters.status === status ? 'default' : 'outline'} size="sm" onClick={() => go({ status })}>
                            {status}
                        </Button>
                    ))}
                </div>

                <div className="mt-4 overflow-x-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Started</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>File</TableHead>
                                <TableHead className="min-w-48">Progress</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>IP</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-muted-foreground py-10 text-center">
                                        No uploads yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {sessions.data.map((session) => (
                                <TableRow key={session.id}>
                                    <TableCell className="whitespace-nowrap">{when(session.created_at)}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{session.user?.name ?? 'Deleted user'}</div>
                                        <div className="text-muted-foreground text-xs">{session.user?.email}</div>
                                    </TableCell>
                                    <TableCell className="max-w-64">
                                        <div className="truncate font-medium" title={session.original_name}>
                                            {session.original_name}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                            {session.context} · {formatBytes(session.declared_size)}
                                            {session.consumed_at ? ' · attached' : session.status === 'completed' ? ' · not attached yet' : ''}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            role="progressbar"
                                            aria-valuenow={Math.round(session.progress_percent)}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`Progress of ${session.original_name}`}
                                            className="bg-muted h-2 w-full overflow-hidden rounded-full"
                                        >
                                            <div
                                                className={`h-full ${session.status === 'failed' ? 'bg-red-500' : session.status === 'completed' ? 'bg-green-600' : 'bg-primary'}`}
                                                style={{ width: `${session.progress_percent}%` }}
                                            />
                                        </div>
                                        <div className="text-muted-foreground mt-1 text-xs tabular-nums">
                                            {formatBytes(session.received_bytes)} of {formatBytes(session.declared_size)} (
                                            {session.progress_percent.toFixed(1)}%)
                                            {session.last_chunk_at && session.status === 'uploading'
                                                ? ` · last data ${when(session.last_chunk_at)}`
                                                : ''}
                                        </div>
                                        {session.failure_reason && <div className="mt-1 text-xs text-red-600">{session.failure_reason}</div>}
                                        {session.sha256 && (
                                            <div className="text-muted-foreground mt-1 truncate font-mono text-[10px]" title={session.sha256}>
                                                SHA-256 {session.sha256.slice(0, 16)}…
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={badgeVariant(session.status)}>{session.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs">{session.ip_address ?? '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        {sessions.total === 0 ? '0 uploads' : `Showing ${sessions.from}-${sessions.to} of ${sessions.total}`}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={sessions.current_page <= 1}
                            onClick={() => go({ status: filters.status, page: sessions.current_page - 1 })}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={sessions.current_page >= sessions.last_page}
                            onClick={() => go({ status: filters.status, page: sessions.current_page + 1 })}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
