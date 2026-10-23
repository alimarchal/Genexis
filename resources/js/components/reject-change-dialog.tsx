import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface RejectChangeDialogProps {
    changeRequestId: number | null;
    summary: string;
    onClose: () => void;
}

/**
 * Asks the checker for the reason a change is rejected; the reason is kept in the log and shown to the maker.
 */
export default function RejectChangeDialog({ changeRequestId, summary, onClose }: RejectChangeDialogProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const close = () => {
        setReason('');
        setError(null);
        onClose();
    };

    const submit = () => {
        if (changeRequestId === null) return;
        router.post(
            route('admin.change-requests.reject', changeRequestId),
            { reason },
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onError: (errors) => setError(errors.reason ?? 'The change could not be rejected.'),
                onSuccess: close,
            },
        );
    };

    return (
        <Dialog open={changeRequestId !== null} onOpenChange={(open) => !open && close()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reject this change?</DialogTitle>
                    <DialogDescription>{summary}. The maker will see your reason.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="rejection-reason">Reason for rejection *</Label>
                    <Textarea id="rejection-reason" value={reason} onChange={(event) => setReason(event.target.value)} rows={4} />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={close}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" disabled={processing} onClick={submit}>
                        Reject change
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
