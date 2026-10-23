<?php

namespace App\Extraction;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * Turns the query string of an extraction request into a query on one data set, rejecting anything it does not understand.
 */
class ExtractionQuery
{
    public const FORMATS = ['json', 'csv', 'xlsx'];

    private const DATE_FILTERS = ['created_from', 'created_to', 'updated_from', 'updated_to', 'updated_since'];

    private const SORTABLE = ['id', 'created_at', 'updated_at'];

    /**
     * @return array{format: string, page: int, per_page: int, filters: array<string, mixed>, query: Builder<Model>}
     *
     * @throws ValidationException
     */
    public function build(Dataset $dataset, Request $request): array
    {
        $format = $this->format($request);
        $maxPerPage = (int) config($format === 'json' ? 'bank.extraction.max_per_page' : 'bank.extraction.max_per_page_export');

        $input = $request->query();
        $validator = Validator::make($input, [
            'format' => ['nullable', Rule::in(self::FORMATS)],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', "max:{$maxPerPage}"],
            'created_from' => ['nullable', 'date'],
            'created_to' => ['nullable', 'date'],
            'updated_from' => ['nullable', 'date'],
            'updated_to' => ['nullable', 'date'],
            'updated_since' => ['nullable', 'date'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
            'sort' => ['nullable', Rule::in([...self::SORTABLE, ...array_map(fn (string $field) => "-{$field}", self::SORTABLE)])],
            'filter' => ['nullable', 'array'],
            'filter.*' => ['nullable', 'string', 'max:255'],
        ]);

        $validator->after(function ($validator) use ($dataset, $input) {
            foreach (array_diff(array_keys($input['filter'] ?? []), $dataset->filters) as $unknown) {
                $validator->errors()->add("filter.{$unknown}", "This data set cannot be filtered by '{$unknown}'. Allowed: ".($dataset->filters === [] ? 'none' : implode(', ', $dataset->filters)).'.');
            }

            if (isset($input['status']) && $dataset->status === null) {
                $validator->errors()->add('status', 'This data set has no active / inactive status.');
            }

            if (isset($input['updated_since'], $input['updated_from'])) {
                $validator->errors()->add('updated_since', 'Use either updated_since or updated_from, not both.');
            }
        });

        $validated = $validator->validate();

        $query = $dataset->model::query()->select($dataset->fields)->with($dataset->with);

        $this->applyDates($query, $validated);

        if (isset($validated['status'])) {
            $query->where($dataset->status['column'], $dataset->status[$validated['status']]);
        }

        foreach ($validated['filter'] ?? [] as $field => $value) {
            filled($value) && $query->where($field, $value);
        }

        $this->applySort($query, $validated['sort'] ?? (isset($validated['updated_since']) ? 'updated_at' : 'id'));

        return [
            'format' => $format,
            'page' => (int) ($validated['page'] ?? 1),
            'per_page' => (int) ($validated['per_page'] ?? min($maxPerPage, (int) config('bank.extraction.default_per_page'))),
            'filters' => array_filter(
                collect($validated)->except(['format', 'page', 'per_page'])->all(),
                fn ($value) => filled($value),
            ),
            'query' => $query,
        ];
    }

    /**
     * The format comes from ?format=, falling back to the Accept header, then JSON.
     */
    private function format(Request $request): string
    {
        $requested = $request->query('format');

        if (is_string($requested) && in_array($requested, self::FORMATS, true)) {
            return $requested;
        }

        return match (true) {
            $request->accepts('text/csv') && ! $request->accepts('application/json') => 'csv',
            str_contains((string) $request->header('Accept'), 'spreadsheetml.sheet') => 'xlsx',
            default => 'json',
        };
    }

    /**
     * @param  Builder<Model>  $query
     * @param  array<string, mixed>  $validated
     */
    private function applyDates(Builder $query, array $validated): void
    {
        $bound = fn (string $value, bool $end) => ($end && ! str_contains($value, ':') ? Carbon::parse($value)->endOfDay() : Carbon::parse($value));

        isset($validated['created_from']) && $query->where('created_at', '>=', $bound($validated['created_from'], false));
        isset($validated['created_to']) && $query->where('created_at', '<=', $bound($validated['created_to'], true));
        isset($validated['updated_from']) && $query->where('updated_at', '>=', $bound($validated['updated_from'], false));
        isset($validated['updated_to']) && $query->where('updated_at', '<=', $bound($validated['updated_to'], true));
        // Incremental extraction: everything added or changed at or after this moment (safe to repeat, so nothing is missed at the boundary).
        isset($validated['updated_since']) && $query->where('updated_at', '>=', Carbon::parse($validated['updated_since']));
    }

    /**
     * @param  Builder<Model>  $query
     */
    private function applySort(Builder $query, string $sort): void
    {
        $descending = str_starts_with($sort, '-');
        $column = ltrim($sort, '-');

        $query->orderBy($column, $descending ? 'desc' : 'asc');

        if ($column !== 'id') {
            $query->orderBy('id', $descending ? 'desc' : 'asc');
        }
    }
}
