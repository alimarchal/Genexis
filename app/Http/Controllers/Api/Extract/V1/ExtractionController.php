<?php

namespace App\Http\Controllers\Api\Extract\V1;

use App\Extraction\Dataset;
use App\Extraction\DatasetRegistry;
use App\Extraction\ExtractionQuery;
use App\Extraction\RecordFormatter;
use App\Extraction\XlsxWriter;
use App\Http\Controllers\Controller;
use App\Models\ExtractionLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Data extraction API: pull complete data sets out of the website database as JSON, CSV or Excel.
 */
class ExtractionController extends Controller
{
    private const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    public function __construct(
        private DatasetRegistry $datasets,
        private ExtractionQuery $queries,
        private RecordFormatter $formatter,
    ) {}

    /**
     * Every data set, its fields and filters, and whether the caller may extract it.
     */
    public function index(Request $request): JsonResponse
    {
        $catalogue = Cache::remember('extraction.catalogue.v1', now()->addMinutes(10), fn () => collect($this->datasets->all())
            ->map(fn (Dataset $dataset) => $this->describe($dataset))
            ->values()
            ->all());

        return response()->json([
            'data' => collect($catalogue)->map(fn (array $dataset) => $dataset + ['accessible' => $this->mayExtract($request, $this->datasets->find($dataset['slug']))])->all(),
            'meta' => [
                'formats' => ExtractionQuery::FORMATS,
                'common_filters' => [
                    'created_from', 'created_to', 'updated_from', 'updated_to', 'updated_since', 'status', 'filter[<field>]', 'sort', 'page', 'per_page', 'format',
                ],
            ],
        ]);
    }

    public function show(Request $request, string $dataset): Response
    {
        $definition = $this->datasets->find($dataset);

        abort_if($definition === null, 404, 'Unknown data set.');
        abort_unless($this->mayExtract($request, $definition), 403, $definition->sensitive
            ? 'This data set needs the "extract sensitive data" permission.'
            : 'You need the "extract data" permission.');

        ['format' => $format, 'page' => $page, 'per_page' => $perPage, 'filters' => $filters, 'query' => $query] = $this->queries->build($definition, $request);

        /** @var LengthAwarePaginator<int, Model> $results */
        $results = $query->paginate($perPage, ['*'], 'page', $page);
        $rows = $results->getCollection()->map(fn ($model) => $this->formatter->record($definition, $model))->all();

        $this->log($request, $definition, $format, $filters, $page, $perPage, count($rows), $results->total());

        $headers = [
            'X-Total-Count' => (string) $results->total(),
            'X-Page' => (string) $results->currentPage(),
            'X-Per-Page' => (string) $results->perPage(),
            'X-Last-Page' => (string) $results->lastPage(),
            'Cache-Control' => 'no-store, private',
        ];

        return match ($format) {
            'csv' => $this->csv($definition, $rows, $headers),
            'xlsx' => $this->xlsx($definition, $rows, $headers),
            default => response()->json([
                'data' => $rows,
                'meta' => [
                    'dataset' => $definition->slug,
                    'total' => $results->total(),
                    'count' => count($rows),
                    'page' => $results->currentPage(),
                    'per_page' => $results->perPage(),
                    'last_page' => $results->lastPage(),
                    'from' => $results->firstItem(),
                    'to' => $results->lastItem(),
                    'filters' => $filters,
                    'generated_at' => now()->toIso8601String(),
                ],
                'links' => [
                    'self' => $request->fullUrl(),
                    'next' => $results->nextPageUrl(),
                    'prev' => $results->previousPageUrl(),
                ],
            ], 200, $headers),
        };
    }

    private function mayExtract(Request $request, Dataset $dataset): bool
    {
        $user = $request->user();

        return $user !== null
            && $user->can('extract data')
            && (! $dataset->sensitive || $user->can('extract sensitive data'));
    }

    /**
     * @param  array<string, mixed>  $filters
     */
    private function log(Request $request, Dataset $dataset, string $format, array $filters, int $page, int $perPage, int $returned, int $matching): void
    {
        ExtractionLog::create([
            'user_id' => $request->user()->id,
            'api_token_id' => $request->attributes->get('api_token')?->id,
            'dataset' => $dataset->slug,
            'format' => $format,
            'filters' => $filters,
            'page' => $page,
            'per_page' => $perPage,
            'records_returned' => $returned,
            'records_matching' => $matching,
            'ip_address' => $request->ip(),
            'user_agent' => mb_substr((string) $request->userAgent(), 0, 255),
        ]);
    }

    /**
     * @param  list<array<string, mixed>>  $rows
     * @param  array<string, string>  $headers
     */
    private function csv(Dataset $dataset, array $rows, array $headers): StreamedResponse
    {
        [$columns, $table] = $this->table($dataset, $rows);

        return response()->streamDownload(function () use ($columns, $table) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF");
            fputcsv($out, $columns, ',', '"', '');

            foreach ($table as $row) {
                fputcsv($out, array_map($this->safeForSpreadsheet(...), $row), ',', '"', '');
            }

            fclose($out);
        }, $this->filename($dataset, 'csv'), ['Content-Type' => 'text/csv; charset=UTF-8'] + $headers);
    }

    /**
     * @param  list<array<string, mixed>>  $rows
     * @param  array<string, string>  $headers
     */
    private function xlsx(Dataset $dataset, array $rows, array $headers): Response
    {
        [$columns, $table] = $this->table($dataset, $rows);
        $path = (new XlsxWriter)->write($dataset->label, $columns, $table);

        return response()->download($path, $this->filename($dataset, 'xlsx'), ['Content-Type' => self::XLSX_MIME] + $headers)->deleteFileAfterSend(true);
    }

    /**
     * Header row plus one flat row per record. The columns are the data set's fields even when the page is empty.
     *
     * @param  list<array<string, mixed>>  $rows
     * @return array{0: list<string>, 1: list<list<scalar|null>>}
     */
    private function table(Dataset $dataset, array $rows): array
    {
        $flat = array_map($this->formatter->flatten(...), $rows);
        $fileColumns = collect(array_keys($dataset->files))
            ->flatMap(fn (string $field) => array_map(fn (string $part) => "files.{$field}.{$part}", ['name', 'size', 'type', 'url', 'exists']))
            ->all();
        $columns = array_values(array_unique([...$dataset->fields, ...array_keys($dataset->computed), ...$fileColumns, ...collect($flat)->flatMap(fn (array $row) => array_keys($row))->all()]));

        return [
            $columns,
            array_map(fn (array $row) => array_map(fn (string $column) => $row[$column] ?? null, $columns), $flat),
        ];
    }

    private function filename(Dataset $dataset, string $extension): string
    {
        return "{$dataset->slug}-".now()->format('Ymd-His').".{$extension}";
    }

    /**
     * A cell that starts with = + - or @ would run as a formula when the CSV is opened in a spreadsheet.
     */
    private function safeForSpreadsheet(mixed $value): mixed
    {
        return is_string($value) && ! is_numeric($value) && preg_match('/^[=+\-@\t\r]/', $value) === 1 ? "'{$value}" : $value;
    }

    /**
     * @return array<string, mixed>
     */
    private function describe(Dataset $dataset): array
    {
        $types = collect(Schema::getColumns((new $dataset->model)->getTable()))->mapWithKeys(fn (array $column) => [$column['name'] => RecordFormatter::fieldType($column['type_name'])]);

        return [
            'slug' => $dataset->slug,
            'label' => $dataset->label,
            'description' => $dataset->description,
            'endpoint' => url("/api/extract/v1/{$dataset->slug}"),
            'sensitive' => $dataset->sensitive,
            'required_permissions' => $dataset->sensitive ? ['extract data', 'extract sensitive data'] : ['extract data'],
            'fields' => collect($dataset->fields)->map(fn (string $field) => ['name' => $field, 'type' => $types[$field] ?? 'string'])
                ->merge(collect(array_keys($dataset->computed))->map(fn (string $field) => ['name' => $field, 'type' => 'array']))
                ->values()
                ->all(),
            'filters' => [
                'date_ranges' => ['created_from', 'created_to', 'updated_from', 'updated_to', 'updated_since'],
                'status' => $dataset->status !== null,
                'fields' => $dataset->filters,
            ],
            'files' => array_keys($dataset->files),
        ];
    }
}
