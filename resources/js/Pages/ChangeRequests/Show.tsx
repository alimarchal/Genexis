import Heading from '@/components/heading';
import RejectChangeDialog from '@/components/reject-change-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle, Check, X } from 'lucide-react';
import { useState } from 'react';
import { actionLabel, statusVariant, when, type ChangeRequestRow } from './Index';

interface Props {
    changeRequest: ChangeRequestRow & {
        payload: Record<string, unknown>;
        current: Record<string, unknown> | null;
        files: { key: string; name: string }[];
        failure_reason: string | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Change Approvals', href: '/admin/change-requests' },
    { title: 'Review', href: '#' },
];

const display = (value: unknown): string => {
    if (value === null || value === undefined || value === '') return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

export default function Show({ changeRequest }: Props) {
    const [rejecting, setRejecting] = useState(false);
    const fields = Object.keys(changeRequest.payload).filter((key) => !key.endsWith('_upload_id'));
    const isUpdate = changeRequest.action === 'update' && changeRequest.current !== null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Review: ${changeRequest.summary}`} />
            <div className="px-4 py-6 md:px-10">
                <Heading title={changeRequest.summary} description={`${actionLabel[changeRequest.action]} · ${changeRequest.module}`} />

                {changeRequest.failure_reason && changeRequest.status === 'pending' && (
                    <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-900">
                        <AlertCircle />
                        <AlertDescription className="text-amber-900">
                            The last attempt to approve this change failed: {changeRequest.failure_reason}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>{changeRequest.action === 'delete' ? 'Record to delete' : 'Proposed values'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {changeRequest.action === 'delete' ? (
                                <p className="text-sm">The maker asked to delete this record.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-muted-foreground border-b text-left">
                                                <th className="py-2 pr-4 font-medium">Field</th>
                                                {isUpdate && <th className="py-2 pr-4 font-medium">Current</th>}
                                                <th className="py-2 font-medium">{isUpdate ? 'Proposed' : 'Value'}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((key) => {
                                                const changed =
                                                    isUpdate && display(changeRequest.current?.[key]) !== display(changeRequest.payload[key]);
                                                return (
                                                    <tr key={key} className="border-b align-top last:border-0">
                                                        <td className="py-2 pr-4 font-medium whitespace-nowrap">{key.replace(/_/g, ' ')}</td>
                                                        {isUpdate && (
                                                            <td className="text-muted-foreground py-2 pr-4 break-words">
                                                                {display(changeRequest.current?.[key])}
                                                            </td>
                                                        )}
                                                        <td className={`py-2 break-words ${changed ? 'font-medium text-green-700' : ''}`}>
                                                            {display(changeRequest.payload[key])}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {changeRequest.files.map((file) => (
                                                <tr key={file.key} className="border-b align-top last:border-0">
                                                    <td className="py-2 pr-4 font-medium whitespace-nowrap">{file.key.replace(/_/g, ' ')}</td>
                                                    {isUpdate && <td className="text-muted-foreground py-2 pr-4">-</td>}
                                                    <td className="py-2 font-medium text-green-700">New file: {file.name}</td>
                                                </tr>
                                            ))}
                                            {Object.keys(changeRequest.payload)
                                                .filter((key) => key.endsWith('_upload_id'))
                                                .map((key) => (
                                                    <tr key={key} className="border-b align-top last:border-0">
                                                        <td className="py-2 pr-4 font-medium whitespace-nowrap">
                                                            {key.replace('_upload_id', '').replace(/_/g, ' ')}
                                                        </td>
                                                        {isUpdate && <td className="text-muted-foreground py-2 pr-4">-</td>}
                                                        <td className="py-2 font-medium text-green-700">New file uploaded in parts</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Log</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <div className="text-muted-foreground">Status</div>
                                <Badge variant={statusVariant(changeRequest.status)} className="capitalize">
                                    {changeRequest.status}
                                </Badge>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Made by</div>
                                <div className="font-medium">{changeRequest.maker?.name ?? 'Deleted user'}</div>
                                <div className="text-muted-foreground text-xs">{when(changeRequest.submitted_at)}</div>
                            </div>
                            {changeRequest.checker && (
                                <div>
                                    <div className="text-muted-foreground">{changeRequest.status === 'approved' ? 'Approved by' : 'Rejected by'}</div>
                                    <div className="font-medium">{changeRequest.checker.name}</div>
                                    <div className="text-muted-foreground text-xs">{when(changeRequest.reviewed_at)}</div>
                                </div>
                            )}
                            {changeRequest.rejection_reason && (
                                <div>
                                    <div className="text-muted-foreground">Reason for rejection</div>
                                    <div className="font-medium text-red-600">{changeRequest.rejection_reason}</div>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {changeRequest.can_decide && (
                                    <>
                                        <Button onClick={() => router.post(route('admin.change-requests.approve', changeRequest.id))}>
                                            <Check className="mr-1 h-4 w-4" /> Approve
                                        </Button>
                                        <Button variant="destructive" onClick={() => setRejecting(true)}>
                                            <X className="mr-1 h-4 w-4" /> Reject
                                        </Button>
                                    </>
                                )}
                                <Button asChild variant="outline">
                                    <Link href={route('admin.change-requests.index')}>Back to list</Link>
                                </Button>
                            </div>
                            {changeRequest.status === 'pending' && !changeRequest.can_decide && (
                                <p className="text-muted-foreground text-xs">A change can only be decided by a checker other than the maker.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <RejectChangeDialog
                changeRequestId={rejecting ? changeRequest.id : null}
                summary={changeRequest.summary}
                onClose={() => setRejecting(false)}
            />
        </AppLayout>
    );
}
