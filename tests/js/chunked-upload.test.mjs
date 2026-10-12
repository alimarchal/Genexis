import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ChunkedUpload, UploadCancelled, UploadHttpError, UploadPaused, backoffDelay, formatBytes, formatDuration, isRetryable } from '../../resources/js/lib/chunked-upload.ts';

/** In-memory stand-in for ChunkedUploadService with the same offset rules. */
class FakeServer {
    constructor({ chunkSize = 4, keepBytes = true } = {}) {
        this.chunkSize = chunkSize;
        this.keepBytes = keepBytes;
        this.sessions = new Map();
        this.calls = [];
        this.faults = []; // consumed one per sendChunk call: 'network' | 'http500' | 'http429' | 'lose-response' | 'http422' | null
        this.cancelled = [];
    }

    state(session) {
        return { id: session.id, status: session.status, offset: session.received, size: session.size, chunk_size: this.chunkSize, progress: 0, name: session.name };
    }

    transport() {
        return {
            start: async ({ context, filename, size }) => {
                const id = `u${this.sessions.size + 1}`;
                const session = { id, context, name: filename, size, received: 0, bytes: [], status: 'uploading' };
                this.sessions.set(id, session);
                this.calls.push(['start', size]);
                return this.state(session);
            },
            status: async (id) => {
                this.calls.push(['status', id]);
                if (!this.sessions.has(id)) throw new UploadHttpError(404, 'missing');
                return this.state(this.sessions.get(id));
            },
            sendChunk: async (id, offset, chunk, signal, onBytes) => {
                const fault = this.faults.shift() ?? null;
                this.calls.push(['chunk', offset, chunk.size, fault]);
                if (fault === 'network') throw new TypeError('network down');
                if (fault === 'http500') throw new UploadHttpError(500, 'boom');
                if (fault === 'http429') throw new UploadHttpError(429, 'slow down');
                if (fault === 'http422') throw new UploadHttpError(422, 'file type not allowed');
                const session = this.sessions.get(id);
                if (offset !== session.received) throw new UploadHttpError(409, 'conflict', { offset: session.received });
                if (chunk.size > this.chunkSize) throw new UploadHttpError(413, 'too big');
                if (this.keepBytes) session.bytes.push(new Uint8Array(await chunk.arrayBuffer()));
                session.received += chunk.size;
                onBytes(chunk.size);
                if (fault === 'lose-response') throw new TypeError('response lost after the server stored the chunk');
                return this.state(session);
            },
            complete: async (id) => {
                const session = this.sessions.get(id);
                if (session.received !== session.size) throw new UploadHttpError(422, 'incomplete');
                session.status = 'completed';
                this.calls.push(['complete', id]);
                return this.state(session);
            },
            cancel: async (id) => {
                this.cancelled.push(id);
                this.sessions.get(id).status = 'cancelled';
            },
        };
    }
}

const file = (text) => Object.assign(new Blob([text]), { name: 'report.pdf' });
const noWait = async () => undefined;
const content = (server, id = 'u1') => new Blob(server.sessions.get(id).bytes).text();

test('uploads a file in server-sized chunks and reassembles it exactly', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    const text = 'The quick brown fox jumps over the lazy dog';

    const done = await new ChunkedUpload({ file: file(text), context: 'downloads', transport: server.transport(), sleep: noWait }).run();

    assert.equal(done.status, 'completed');
    assert.equal(await content(server), text);
    assert.equal(server.calls.filter((c) => c[0] === 'chunk').length, Math.ceil(text.length / 4));
});

test('reports increasing progress that ends at 100%', async () => {
    const server = new FakeServer({ chunkSize: 5 });
    const seen = [];

    await new ChunkedUpload({ file: file('x'.repeat(23)), context: 'downloads', transport: server.transport(), sleep: noWait, onProgress: (p) => seen.push(p.percent) }).run();

    assert.ok(seen.length > 3);
    for (let i = 1; i < seen.length; i++) assert.ok(seen[i] >= seen[i - 1], `progress went backwards at ${i}`);
    assert.equal(seen.at(-1), 100);
});

test('retries after a network error and carries on from the server offset', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    server.faults = [null, 'network', 'http500', 'http429'];
    const text = '0123456789abcdef';

    await new ChunkedUpload({ file: file(text), context: 'downloads', transport: server.transport(), sleep: noWait }).run();

    assert.equal(await content(server), text);
});

test('does not duplicate data when the server stored a chunk but the response was lost', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    server.faults = [null, 'lose-response'];
    const text = '0123456789abcdef';

    await new ChunkedUpload({ file: file(text), context: 'downloads', transport: server.transport(), sleep: noWait }).run();

    assert.equal(await content(server), text);
});

test('resynchronises when the server answers 409 with its own offset', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    const transport = server.transport();
    const upload = new ChunkedUpload({ file: file('0123456789abcdef'), context: 'downloads', transport, sleep: noWait });
    // The browser believes it is behind: pre-send the first chunk behind its back.
    const original = transport.start;
    transport.start = async (body) => {
        const state = await original(body);
        server.sessions.get(state.id).received = 4;
        server.sessions.get(state.id).bytes.push(new TextEncoder().encode('0123'));
        return { ...state, offset: 0 };
    };

    await upload.run();

    assert.equal(await content(server), '0123456789abcdef');
});

test('gives up on errors that retrying cannot fix', async () => {
    const server = new FakeServer();
    server.faults = ['http422'];

    await assert.rejects(new ChunkedUpload({ file: file('data'), context: 'downloads', transport: server.transport(), sleep: noWait }).run(), (error) => error instanceof UploadHttpError && error.status === 422);
    assert.equal(server.calls.filter((c) => c[0] === 'chunk').length, 1);
});

test('stops retrying after the maximum number of consecutive failures', async () => {
    const server = new FakeServer();
    server.faults = Array(20).fill('network');
    const waits = [];

    await assert.rejects(new ChunkedUpload({ file: file('data'), context: 'downloads', transport: server.transport(), maxRetries: 3, sleep: async (ms) => waits.push(ms) }).run());

    assert.deepEqual(waits, [1000, 2000, 4000]);
});

test('backoff doubles and is capped', () => {
    assert.deepEqual([0, 1, 2, 3, 10].map(backoffDelay), [1000, 2000, 4000, 8000, 30000]);
});

test('only network, timeout, rate-limit and server errors are retryable', () => {
    for (const status of [0, 408, 429, 500, 502, 503]) assert.equal(isRetryable(new UploadHttpError(status, '')), true, String(status));
    for (const status of [400, 401, 403, 404, 413, 422]) assert.equal(isRetryable(new UploadHttpError(status, '')), false, String(status));
    assert.equal(isRetryable(new TypeError('x')), true);
    assert.equal(isRetryable(new Error('x')), false);
});

test('resumes an earlier session instead of starting over', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    const transport = server.transport();
    const text = '0123456789abcdef';

    const first = await transport.start({ context: 'downloads', filename: 'report.pdf', size: text.length });
    await transport.sendChunk(first.id, 0, new Blob([text.slice(0, 8)]).slice(0, 4), new AbortController().signal, () => {});
    await transport.sendChunk(first.id, 4, new Blob([text.slice(4, 8)]), new AbortController().signal, () => {});
    server.calls.length = 0;

    await new ChunkedUpload({ file: file(text), context: 'downloads', transport, resumeId: first.id, sleep: noWait }).run();

    assert.equal(await content(server, first.id), text);
    assert.equal(server.calls.filter((c) => c[0] === 'start').length, 0);
    assert.deepEqual(server.calls.filter((c) => c[0] === 'chunk').map((c) => c[1]), [8, 12]);
});

test('starts a new session when the remembered one is gone or belongs to a different file', async () => {
    const server = new FakeServer({ chunkSize: 4 });

    await new ChunkedUpload({ file: file('abcdefgh'), context: 'downloads', transport: server.transport(), resumeId: 'does-not-exist', sleep: noWait }).run();
    assert.equal(server.calls.filter((c) => c[0] === 'start').length, 1);

    const other = await server.transport().start({ context: 'downloads', filename: 'x.pdf', size: 999 });
    await new ChunkedUpload({ file: file('abcdefgh'), context: 'downloads', transport: server.transport(), resumeId: other.id, sleep: noWait }).run();
    assert.equal(server.calls.filter((c) => c[0] === 'start').length, 3);
});

test('pause stops sending and run() continues from the stored offset', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    const transport = server.transport();
    const real = transport.sendChunk;
    let upload;
    let sent = 0;
    transport.sendChunk = async (...args) => {
        const result = await real(...args);
        if (++sent === 2) upload.pause();
        return result;
    };
    const text = '0123456789abcdef';
    upload = new ChunkedUpload({ file: file(text), context: 'downloads', transport, sleep: noWait });

    await assert.rejects(upload.run(), UploadPaused);
    assert.equal(server.sessions.get('u1').received, 8);

    await upload.run();

    assert.equal(await content(server), text);
    assert.equal(server.calls.filter((c) => c[0] === 'start').length, 1);
});

test('cancel tells the server and stops', async () => {
    const server = new FakeServer({ chunkSize: 4 });
    const transport = server.transport();
    const real = transport.sendChunk;
    let upload;
    transport.sendChunk = async (...args) => {
        const result = await real(...args);
        await upload.cancel();
        return result;
    };
    upload = new ChunkedUpload({ file: file('0123456789abcdef'), context: 'downloads', transport, sleep: noWait });

    await assert.rejects(upload.run(), UploadCancelled);

    assert.deepEqual(server.cancelled, ['u1']);
});

test('handles a 5 GB file without 32-bit overflow', async () => {
    const size = 5 * 1024 ** 3 + 7;
    const chunkSize = 4 * 1024 ** 2;
    const server = new FakeServer({ chunkSize, keepBytes: false });
    const virtualFile = { name: 'huge.zip', size, slice: (start, end) => ({ size: end - start, arrayBuffer: async () => new ArrayBuffer(0) }) };

    const done = await new ChunkedUpload({ file: virtualFile, context: 'downloads', transport: server.transport(), sleep: noWait }).run();

    assert.equal(done.status, 'completed');
    assert.equal(server.sessions.get('u1').received, size);
    assert.equal(server.calls.filter((c) => c[0] === 'chunk').length, Math.ceil(size / chunkSize));
});

test('computes speed and time remaining from recent progress', async () => {
    const server = new FakeServer({ chunkSize: 1000 });
    let clock = 0;
    const seen = [];

    await new ChunkedUpload({
        file: file('x'.repeat(5000)),
        context: 'downloads',
        transport: server.transport(),
        sleep: noWait,
        now: () => (clock += 1000),
        onProgress: (p) => seen.push(p),
    }).run();

    const mid = seen.find((p) => p.loaded === 3000);
    assert.ok(mid.bytesPerSecond > 0 && mid.secondsRemaining > 0);
    assert.equal(seen.at(-1).secondsRemaining, 0);
});

test('formats sizes and durations for humans', () => {
    assert.equal(formatBytes(0), '0 B');
    assert.equal(formatBytes(1536), '1.50 KB');
    assert.equal(formatBytes(5 * 1024 ** 3), '5.00 GB');
    assert.equal(formatBytes(NaN), '0 B');
    assert.equal(formatDuration(null), '--');
    assert.equal(formatDuration(45), '45s');
    assert.equal(formatDuration(125), '2m 05s');
    assert.equal(formatDuration(3 * 3600 + 7 * 60), '3h 07m');
});
