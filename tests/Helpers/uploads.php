<?php

use App\Models\User;

function startUpload(User $user, array $overrides = [])
{
    return test()->actingAs($user)->postJson(route('admin.uploads.store'), array_merge([
        'context' => 'downloads',
        'filename' => 'tender.pdf',
        'size' => 25,
    ], $overrides));
}

function sendChunk(User $user, string $id, int $offset, string $bytes)
{
    return test()->actingAs($user)->call('PUT', route('admin.uploads.chunk', $id), [], [], [], [
        'HTTP_X_UPLOAD_OFFSET' => (string) $offset,
        'CONTENT_TYPE' => 'application/octet-stream',
        'HTTP_ACCEPT' => 'application/json',
    ], $bytes);
}

function pdfBytes(int $length): string
{
    return substr(str_pad('%PDF-1.4 ', $length, 'x'), 0, $length);
}

/**
 * Upload $content through the chunked API and return the finished upload's id.
 */
function chunkedUpload(User $user, string $context, string $filename, string $content, int $chunk = 10): string
{
    config(['bank.uploads.chunk_size' => $chunk, 'bank.uploads.reserve_bytes' => 0]);

    $id = startUpload($user, ['context' => $context, 'filename' => $filename, 'size' => strlen($content)])->assertCreated()->json('id');

    foreach (str_split($content, $chunk) as $index => $piece) {
        sendChunk($user, $id, $index * $chunk, $piece)->assertOk();
    }

    test()->actingAs($user)->postJson(route('admin.uploads.complete', $id))->assertOk();

    return $id;
}
