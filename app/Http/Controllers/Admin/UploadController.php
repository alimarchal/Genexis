<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UploadStatus;
use App\Http\Controllers\Controller;
use App\Models\UploadSession;
use App\Services\ChunkedUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

/**
 * Resumable upload API used by the admin forms, plus the upload log for users with the 'view uploads' permission.
 */
class UploadController extends Controller
{
    public function __construct(private ChunkedUploadService $uploads) {}

    public function index(Request $request): Response
    {
        $status = $request->query('status');

        $sessions = UploadSession::with('user:id,name,email')
            ->when(in_array($status, array_column(UploadStatus::cases(), 'value'), true), fn ($query) => $query->where('status', $status))
            ->latest('id')
            ->paginate($this->perPage(20))
            ->withQueryString();

        return Inertia::render('Uploads/Index', [
            'sessions' => $sessions,
            'filters' => ['status' => $status],
            'statuses' => array_column(UploadStatus::cases(), 'value'),
            'limits' => [
                'chunk_size' => (int) config('bank.uploads.chunk_size'),
                'super_admin_max_bytes' => (int) config('bank.uploads.super_admin_max_bytes'),
                'contexts' => collect(config('bank.uploads.contexts'))
                    ->map(fn (array $definition) => ['label' => $definition['label'], 'max_bytes' => (int) $definition['max_bytes']])
                    ->all(),
            ],
        ]);
    }

    /**
     * Start an upload. The response tells the browser how big each chunk must be.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'context' => ['required', 'string'],
            'filename' => ['required', 'string', 'max:255'],
            'size' => ['required', 'integer', 'min:1'],
        ]);

        $session = $this->uploads->start(
            $request->user(),
            $validated['context'],
            $validated['filename'],
            (int) $validated['size'],
            $request
        );

        return response()->json($this->payload($session), 201);
    }

    public function show(Request $request, UploadSession $uploadSession): JsonResponse
    {
        $this->authorizeAccess($request, $uploadSession);

        return response()->json($this->payload($uploadSession));
    }

    public function chunk(Request $request, UploadSession $uploadSession): JsonResponse
    {
        $this->authorizeOwner($request, $uploadSession);

        $offset = $request->header('X-Upload-Offset');
        abort_unless(is_string($offset) && ctype_digit($offset), 422, 'The X-Upload-Offset header is required.');

        try {
            $this->uploads->appendChunk($uploadSession, (int) $offset, $request->getContent(true));
        } catch (ConflictHttpException $exception) {
            return response()->json([
                'message' => 'The chunk does not continue where the server stopped.',
                'offset' => (int) $exception->getMessage(),
            ], 409);
        }

        return response()->json($this->payload($uploadSession->refresh()));
    }

    public function complete(Request $request, UploadSession $uploadSession): JsonResponse
    {
        $this->authorizeOwner($request, $uploadSession);

        return response()->json($this->payload($this->uploads->complete($uploadSession)));
    }

    public function destroy(Request $request, UploadSession $uploadSession): JsonResponse
    {
        $this->authorizeAccess($request, $uploadSession);

        return response()->json($this->payload($this->uploads->cancel($uploadSession)));
    }

    private function authorizeOwner(Request $request, UploadSession $session): void
    {
        abort_unless($session->user_id === $request->user()->id, 403);
    }

    private function authorizeAccess(Request $request, UploadSession $session): void
    {
        abort_unless($session->user_id === $request->user()->id || $request->user()->can('view uploads'), 403);
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(UploadSession $session): array
    {
        return [
            'id' => $session->uuid,
            'status' => $session->status->value,
            'offset' => $session->received_bytes,
            'size' => $session->declared_size,
            'chunk_size' => $session->chunk_size,
            'progress' => $session->progress_percent,
            'name' => $session->original_name,
            'failure_reason' => $session->failure_reason,
        ];
    }
}
