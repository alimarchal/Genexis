import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

/**
 * Lists every validation or upload error at the top of a form, so a rejected save is never silent
 * even when the failing field is scrolled out of view.
 */
export default function FormErrorSummary({ errors }: { errors: Record<string, string | undefined> }) {
    const messages = Object.values(errors).filter((message): message is string => Boolean(message));

    if (messages.length === 0) {
        return null;
    }

    return (
        <Alert role="alert" className="border-red-300 bg-red-50 text-red-800">
            <AlertCircle />
            <AlertTitle>The form was not saved</AlertTitle>
            <AlertDescription className="text-red-800">
                <ul className="list-disc space-y-1 pl-4">
                    {messages.map((message) => (
                        <li key={message}>{message}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
