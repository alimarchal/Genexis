import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuditRecord {
    created_at?: string | null;
    updated_at?: string | null;
    creator?: { name: string } | null;
    updater?: { name: string } | null;
}

const formatDateTime = (value?: string | null) =>
    value ? new Date(value).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

/**
 * Who added a record and who changed it last, with the dates. Shown on the admin view pages.
 */
export default function AuditInfo({ record }: { record: AuditRecord }) {
    return (
        <Card data-testid="audit-info">
            <CardHeader>
                <CardTitle className="text-base">Record history</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                        <dt className="text-muted-foreground">Created by</dt>
                        <dd className="font-medium">{record.creator?.name ?? 'Not recorded'}</dd>
                        <dd className="text-muted-foreground text-xs">{formatDateTime(record.created_at)}</dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground">Last updated by</dt>
                        <dd className="font-medium">{record.updater?.name ?? 'Not recorded'}</dd>
                        <dd className="text-muted-foreground text-xs">{formatDateTime(record.updated_at)}</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}
