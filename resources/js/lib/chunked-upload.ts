/**
 * Resumable chunked upload engine (no DOM or React; the network is injected so it can be tested).
 *
 * Protocol (see App\Services\ChunkedUploadService): start -> PUT chunks at the offset the
 * server expects -> complete. If the connection drops, the engine asks the server where it
 * stopped and continues from there, so even a multi-gigabyte upload survives network hiccups.
 */

export interface UploadState {
    id: string;
    status: 'uploading' | 'completed' | 'cancelled' | 'expired' | 'failed';
    offset: number;
    size: number;
    chunk_size: number;
    progress: number;
    name: string;
    failure_reason?: string | null;
}

export class UploadHttpError extends Error {
    status: number;
    data: { offset?: number; errors?: Record<string, string[]> };

    constructor(status: number, message: string, data: { offset?: number; errors?: Record<string, string[]> } = {}) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

export interface UploadTransport {
    start(body: { context: string; filename: string; size: number }): Promise<UploadState>;
    status(id: string): Promise<UploadState>;
    sendChunk(id: string, offset: number, chunk: Blob, signal: AbortSignal, onBytes: (sent: number) => void): Promise<UploadState>;
    complete(id: string): Promise<UploadState>;
    cancel(id: string): Promise<void>;
}

export interface UploadProgress {
    loaded: number;
    total: number;
    percent: number;
    bytesPerSecond: number;
    secondsRemaining: number | null;
}

export interface UploadOptions {
    file: Blob & { name?: string };
    context: string;
    transport: UploadTransport;
    resumeId?: string | null;
    onProgress?: (progress: UploadProgress) => void;
    onSession?: (id: string) => void;
    maxRetries?: number;
    sleep?: (ms: number) => Promise<void>;
    now?: () => number;
}

export class UploadCancelled extends Error {
    constructor() {
        super('Upload cancelled');
    }
}

export class UploadPaused extends Error {
    constructor() {
        super('Upload paused');
    }
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Errors worth retrying: no response, server trouble, rate limiting, timeouts. */
export function isRetryable(error: unknown): boolean {
    if (error instanceof UploadHttpError) {
        return error.status === 0 || error.status === 408 || error.status === 429 || error.status >= 500;
    }
    return error instanceof TypeError;
}

export function backoffDelay(attempt: number): number {
    return Math.min(30_000, 1000 * 2 ** attempt);
}

export class ChunkedUpload {
    private controller = new AbortController();
    private stopReason: 'pause' | 'cancel' | null = null;
    private samples: { time: number; loaded: number }[] = [];
    sessionId: string | null = null;
    private options: UploadOptions;

    constructor(options: UploadOptions) {
        this.options = options;
    }

    pause(): void {
        this.stopReason = 'pause';
        this.controller.abort();
    }

    async cancel(): Promise<void> {
        this.stopReason = 'cancel';
        this.controller.abort();
        if (this.sessionId) {
            await this.options.transport.cancel(this.sessionId).catch(() => undefined);
        }
    }

    /** Run (or continue after pause) until the server confirms the finished file. */
    async run(): Promise<UploadState> {
        const { file, transport } = this.options;
        const sleep = this.options.sleep ?? defaultSleep;
        const maxRetries = this.options.maxRetries ?? 8;
        const name = (file as File).name ?? 'file';

        this.stopReason = null;
        this.controller = new AbortController();

        let state = await this.openSession(name);

        let failures = 0;
        while (state.offset < state.size) {
            this.throwIfStopped();

            const end = Math.min(state.offset + state.chunk_size, state.size);
            const chunk = file.slice(state.offset, end);

            try {
                state = await transport.sendChunk(state.id, state.offset, chunk, this.controller.signal, (sent) =>
                    this.report(state.offset + sent, state.size),
                );
                failures = 0;
                this.report(state.offset, state.size);
            } catch (error) {
                this.throwIfStopped();

                if (error instanceof UploadHttpError && error.status === 409 && typeof error.data.offset === 'number') {
                    state = { ...state, offset: error.data.offset };
                    continue;
                }

                if (!isRetryable(error) || failures >= maxRetries) {
                    throw error;
                }

                await sleep(backoffDelay(failures++));
                this.throwIfStopped();
                state = await this.resync(state.id, sleep);
            }
        }

        this.throwIfStopped();

        return transport.complete(state.id);
    }

    private async openSession(name: string): Promise<UploadState> {
        const { file, context, transport, resumeId } = this.options;

        if (this.sessionId || resumeId) {
            try {
                const existing = await transport.status((this.sessionId ?? resumeId) as string);

                if (existing.status === 'uploading' && existing.size === file.size) {
                    this.sessionId = existing.id;
                    this.options.onSession?.(existing.id);
                    this.report(existing.offset, existing.size);

                    return existing;
                }
            } catch {
                // fall through and start a fresh session
            }
        }

        const state = await transport.start({ context, filename: name, size: file.size });
        this.sessionId = state.id;
        this.options.onSession?.(state.id);

        return state;
    }

    private async resync(id: string, sleep: (ms: number) => Promise<void>): Promise<UploadState> {
        let attempt = 0;
        for (;;) {
            try {
                return await this.options.transport.status(id);
            } catch (error) {
                this.throwIfStopped();
                if (!isRetryable(error) || attempt >= 5) {
                    throw error;
                }
                await sleep(backoffDelay(attempt++));
            }
        }
    }

    private throwIfStopped(): void {
        if (this.stopReason === 'cancel') {
            throw new UploadCancelled();
        }
        if (this.stopReason === 'pause') {
            throw new UploadPaused();
        }
    }

    private report(loaded: number, total: number): void {
        const now = (this.options.now ?? Date.now)();
        this.samples.push({ time: now, loaded });
        this.samples = this.samples.filter((sample) => now - sample.time <= 8000);

        const first = this.samples[0];
        const elapsed = (now - first.time) / 1000;
        const bytesPerSecond = elapsed > 0 ? Math.max(0, (loaded - first.loaded) / elapsed) : 0;

        this.options.onProgress?.({
            loaded,
            total,
            percent: total > 0 ? Math.min(100, (loaded / total) * 100) : 0,
            bytesPerSecond,
            secondsRemaining: bytesPerSecond > 0 ? Math.max(0, (total - loaded) / bytesPerSecond) : null,
        });
    }
}

export function formatBytes(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes <= 0) {
        return '0 B';
    }
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const power = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
    const value = bytes / 1024 ** power;

    return `${value >= 100 || power === 0 ? Math.round(value) : value.toFixed(value >= 10 ? 1 : 2)} ${units[power]}`;
}

export function formatDuration(seconds: number | null): string {
    if (seconds === null || !Number.isFinite(seconds)) {
        return '--';
    }
    const total = Math.round(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    if (hours > 0) {
        return `${hours}h ${String(minutes).padStart(2, '0')}m`;
    }

    return minutes > 0 ? `${minutes}m ${String(secs).padStart(2, '0')}s` : `${secs}s`;
}

/** Browser transport: fetch for small calls, XMLHttpRequest for chunks so we get live byte progress. */
export function createBrowserTransport(routes: { base: string }): UploadTransport {
    const xsrf = () =>
        decodeURIComponent(
            document.cookie
                .split('; ')
                .find((row) => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1] ?? '',
        );
    const headers = () => ({ Accept: 'application/json', 'X-XSRF-TOKEN': xsrf(), 'X-Requested-With': 'XMLHttpRequest' });

    const json = async (url: string, init: RequestInit): Promise<UploadState> => {
        let response: Response;
        try {
            response = await fetch(url, { credentials: 'same-origin', ...init, headers: { ...headers(), ...(init.headers ?? {}) } });
        } catch {
            throw new UploadHttpError(0, 'Network error');
        }
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            const first = data?.errors ? (Object.values(data.errors)[0] as string[])[0] : undefined;
            throw new UploadHttpError(response.status, first ?? data?.message ?? `Server error (${response.status})`, data);
        }
        return data as UploadState;
    };

    return {
        start: (body) => json(routes.base, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
        status: (id) => json(`${routes.base}/${id}`, { method: 'GET' }),
        complete: (id) => json(`${routes.base}/${id}/complete`, { method: 'POST' }),
        cancel: async (id) => {
            await json(`${routes.base}/${id}`, { method: 'DELETE' });
        },
        sendChunk: (id, offset, chunk, signal, onBytes) =>
            new Promise<UploadState>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', `${routes.base}/${id}/chunk`);
                Object.entries({ ...headers(), 'Content-Type': 'application/octet-stream', 'X-Upload-Offset': String(offset) }).forEach(
                    ([key, value]) => xhr.setRequestHeader(key, value),
                );
                xhr.upload.onprogress = (event) => event.lengthComputable && onBytes(event.loaded);
                xhr.onload = () => {
                    let data: UploadState & { message?: string; offset?: number; errors?: Record<string, string[]> };
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch {
                        data = {} as typeof data;
                    }
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(data);
                    } else {
                        reject(new UploadHttpError(xhr.status, data.message ?? `Server error (${xhr.status})`, data));
                    }
                };
                xhr.onerror = () => reject(new UploadHttpError(0, 'Network error'));
                xhr.ontimeout = () => reject(new UploadHttpError(408, 'Timed out'));
                signal.addEventListener('abort', () => {
                    xhr.abort();
                    reject(new UploadHttpError(0, 'Aborted'));
                });
                xhr.send(chunk);
            }),
    };
}
