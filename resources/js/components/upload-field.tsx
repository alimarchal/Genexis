import { Button } from '@/components/ui/button';
import {
    ChunkedUpload,
    UploadCancelled,
    UploadHttpError,
    UploadPaused,
    createBrowserTransport,
    formatBytes,
    formatDuration,
    type UploadProgress,
} from '@/lib/chunked-upload';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, FileText, Loader2, Pause, Play, RotateCcw, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'uploading' | 'paused' | 'retrying' | 'done' | 'error';

interface UploadFieldProps {
    /** Upload type, for example "financial-reports" (must exist in config/bank.php). */
    context: string;
    label?: string;
    /** File extensions the picker offers, without dots. */
    accept?: string[];
    /** Called with the finished upload's id (send it as "<field>_upload_id"), or null when cleared. */
    onChange: (uploadId: string | null) => void;
    /** Tells the parent form to disable "Save" while a transfer is running. */
    onBusyChange?: (busy: boolean) => void;
    /** Name of the file that is already attached (edit forms). */
    currentFileName?: string | null;
    error?: string;
    disabled?: boolean;
}

const storageKey = (context: string, file: File) => `upload:${context}:${file.name}:${file.size}:${file.lastModified}`;
const remember = (key: string, id: string | null) => {
    try {
        if (id) localStorage.setItem(key, id);
        else localStorage.removeItem(key);
    } catch {
        // storage may be unavailable; resuming after a refresh is then simply not offered
    }
};
const recall = (key: string): string | null => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

export default function UploadField({ context, label = 'File', accept, onChange, onBusyChange, currentFileName, error, disabled }: UploadFieldProps) {
    const { uploadLimits } = usePage<SharedData>().props;
    const [phase, setPhase] = useState<Phase>('idle');
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<UploadProgress | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const uploader = useRef<ChunkedUpload | null>(null);
    const resumeKey = useRef<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const busy = phase === 'uploading' || phase === 'paused' || phase === 'retrying';

    // The parent usually passes an inline function; keep the latest one in a ref so the effect only runs when `busy` changes.
    const busyCallback = useRef(onBusyChange);
    useEffect(() => {
        busyCallback.current = onBusyChange;
    });
    useEffect(() => {
        busyCallback.current?.(busy);
    }, [busy]);

    useEffect(() => {
        if (!busy) return;
        const warn = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [busy]);

    const run = async () => {
        if (!uploader.current) return;
        setPhase('uploading');
        setMessage(null);
        try {
            const done = await uploader.current.run();
            remember(resumeKey.current, null);
            setProgress((previous) => (previous ? { ...previous, loaded: previous.total, percent: 100, secondsRemaining: 0 } : previous));
            setPhase('done');
            onChange(done.id);
        } catch (failure) {
            if (failure instanceof UploadPaused) {
                setPhase('paused');
            } else if (failure instanceof UploadCancelled) {
                reset();
            } else {
                setPhase('error');
                setMessage(failure instanceof UploadHttpError || failure instanceof Error ? failure.message : 'The upload failed.');
                onChange(null);
            }
        }
    };

    const reset = () => {
        remember(resumeKey.current, null);
        uploader.current = null;
        setFile(null);
        setProgress(null);
        setMessage(null);
        setPhase('idle');
        onChange(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const choose = (selected: File | null) => {
        if (!selected) return;

        if (uploadLimits && selected.size > uploadLimits.maxBytes) {
            setMessage(
                uploadLimits.isSuperAdmin
                    ? `This file is larger than the maximum of ${formatBytes(uploadLimits.maxBytes)}.`
                    : `Files larger than ${formatBytes(uploadLimits.staffMaxBytes)} can only be uploaded by a super-admin.`,
            );
            setPhase('error');
            setFile(selected);
            return;
        }

        resumeKey.current = storageKey(context, selected);
        setFile(selected);
        uploader.current = new ChunkedUpload({
            file: selected,
            context,
            transport: createBrowserTransport({ base: route('admin.uploads.store') }),
            resumeId: recall(resumeKey.current),
            onProgress: setProgress,
            onSession: (id) => remember(resumeKey.current, id),
        });
        onChange(null);
        void run();
    };

    const cancel = async () => {
        await uploader.current?.cancel();
        reset();
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{label}</span>
                {uploadLimits && <span className="text-muted-foreground text-xs">Up to {formatBytes(uploadLimits.maxBytes)}</span>}
            </div>

            {phase === 'idle' && (
                <div>
                    <label
                        className="hover:border-primary/60 hover:bg-muted/40 flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm transition-colors"
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                            event.preventDefault();
                            if (!disabled) choose(event.dataTransfer.files?.[0] ?? null);
                        }}
                    >
                        <Upload className="text-muted-foreground h-6 w-6" />
                        <span>{currentFileName ? 'Choose a new file to replace the current one' : 'Click to choose a file or drop it here'}</span>
                        {accept && <span className="text-muted-foreground text-xs">{accept.map((ext) => ext.toUpperCase()).join(', ')}</span>}
                        <input
                            ref={inputRef}
                            type="file"
                            className="sr-only"
                            disabled={disabled}
                            accept={accept?.map((ext) => `.${ext}`).join(',')}
                            onChange={(event) => choose(event.target.files?.[0] ?? null)}
                        />
                    </label>
                    {currentFileName && (
                        <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
                            <FileText className="h-3.5 w-3.5" /> Current file: {currentFileName}
                        </p>
                    )}
                </div>
            )}

            {phase !== 'idle' && file && (
                <div className="space-y-3 rounded-lg border p-3" aria-live="polite">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                            {phase === 'done' ? (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                            ) : (
                                <FileText className="text-muted-foreground h-5 w-5 shrink-0" />
                            )}
                            <div className="min-w-0">
                                <div className="truncate text-sm font-medium">{file.name}</div>
                                <div className="text-muted-foreground text-xs">{formatBytes(file.size)}</div>
                            </div>
                        </div>
                        {(busy || phase === 'error') && (
                            <Button type="button" variant="ghost" size="icon" aria-label="Cancel upload" onClick={cancel}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                        {phase === 'done' && (
                            <Button type="button" variant="ghost" size="sm" onClick={reset}>
                                Remove
                            </Button>
                        )}
                    </div>

                    {phase !== 'error' && (
                        <>
                            <div
                                role="progressbar"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(progress?.percent ?? 0)}
                                aria-label={`Upload progress for ${file.name}`}
                                className="bg-muted h-2.5 w-full overflow-hidden rounded-full"
                            >
                                <div
                                    className={`h-full rounded-full transition-[width] duration-300 ${phase === 'done' ? 'bg-green-600' : phase === 'paused' ? 'bg-amber-500' : 'bg-primary'}`}
                                    style={{ width: `${progress?.percent ?? 0}%` }}
                                />
                            </div>
                            <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs tabular-nums">
                                <span>
                                    {formatBytes(progress?.loaded ?? 0)} of {formatBytes(file.size)} ({(progress?.percent ?? 0).toFixed(1)}%)
                                </span>
                                {phase === 'uploading' && (
                                    <span>
                                        {formatBytes(progress?.bytesPerSecond ?? 0)}/s · {formatDuration(progress?.secondsRemaining ?? null)} left
                                    </span>
                                )}
                                {phase === 'paused' && <span>Paused</span>}
                                {phase === 'done' && (
                                    <span className="text-green-700 dark:text-green-400">Uploaded. Save the form to attach it.</span>
                                )}
                            </div>
                        </>
                    )}

                    {phase === 'uploading' && (
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={() => uploader.current?.pause()}>
                                <Pause className="mr-1 h-3.5 w-3.5" /> Pause
                            </Button>
                            <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Keep this page open until the upload finishes.
                            </span>
                        </div>
                    )}
                    {phase === 'paused' && (
                        <Button type="button" variant="outline" size="sm" onClick={() => void run()}>
                            <Play className="mr-1 h-3.5 w-3.5" /> Resume
                        </Button>
                    )}
                    {phase === 'error' && (
                        <div className="space-y-2">
                            <p className="text-sm text-red-600">{message}</p>
                            {file && !message?.includes('super-admin') && !message?.includes('maximum') && (
                                <Button type="button" variant="outline" size="sm" onClick={() => choose(file)}>
                                    <RotateCcw className="mr-1 h-3.5 w-3.5" /> Try again
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
