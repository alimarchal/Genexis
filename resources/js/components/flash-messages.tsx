import { Alert, AlertDescription } from '@/components/ui/alert';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, X, XCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Shows the success or error message a controller flashed with `->with('success', ...)` / `->with('error', ...)`,
 * so an admin always sees whether a change was saved.
 */
export default function FlashMessages() {
    const { flash } = usePage<SharedData>().props;
    const [dismissed, setDismissed] = useState<string | null>(null);

    const messages = [
        { kind: 'success', text: flash?.success },
        { kind: 'error', text: flash?.error },
    ].filter((message): message is { kind: 'success' | 'error'; text: string } => Boolean(message.text) && message.text !== dismissed);

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2 px-4 pt-4 md:px-10">
            {messages.map(({ kind, text }) => (
                <Alert
                    key={`${kind}:${text}`}
                    role={kind === 'error' ? 'alert' : 'status'}
                    data-flash={kind}
                    className={kind === 'error' ? 'border-red-300 bg-red-50 text-red-800' : 'border-green-300 bg-green-50 text-green-800'}
                >
                    {kind === 'error' ? <XCircle /> : <CheckCircle2 />}
                    <AlertDescription className="flex items-center justify-between gap-4 text-current">
                        <span>{text}</span>
                        <button
                            type="button"
                            aria-label="Dismiss message"
                            onClick={() => setDismissed(text)}
                            className="shrink-0 opacity-70 hover:opacity-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </AlertDescription>
                </Alert>
            ))}
        </div>
    );
}
