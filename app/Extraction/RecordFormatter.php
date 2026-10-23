<?php

namespace App\Extraction;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

/**
 * Turns models into the plain arrays that are sent out, including details of attached files.
 */
class RecordFormatter
{
    private const MIME_BY_EXTENSION = [
        'pdf' => 'application/pdf',
        'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls' => 'application/vnd.ms-excel',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ppt' => 'application/vnd.ms-powerpoint',
        'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'zip' => 'application/zip',
        'rar' => 'application/vnd.rar',
    ];

    /**
     * @return array<string, mixed>
     */
    public function record(Dataset $dataset, Model $model): array
    {
        $row = Arr::only($model->attributesToArray(), $dataset->fields);

        foreach ($dataset->computed as $name => $value) {
            $row[$name] = $value($model);
        }

        if ($dataset->files !== []) {
            $row['files'] = collect($dataset->files)
                ->map(fn (array $definition, string $column) => $this->file($model, $column, $definition))
                ->filter()
                ->all();
        }

        return $row;
    }

    /**
     * Name, size, type and download link of a stored file, or null when the record has none.
     *
     * @param  array{name?: \Closure, url?: \Closure}  $definition
     * @return array{name: string, size: int|null, type: string|null, url: string, exists: bool}|null
     */
    private function file(Model $model, string $column, array $definition): ?array
    {
        $path = $model->getAttribute($column);

        if (blank($path)) {
            return null;
        }

        $disk = Storage::disk('public');
        $exists = $disk->exists($path);
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        return [
            'name' => (isset($definition['name']) ? $definition['name']($model) : null) ?: basename($path),
            'size' => $exists ? (int) $disk->size($path) : null,
            'type' => self::MIME_BY_EXTENSION[$extension] ?? ($exists ? $disk->mimeType($path) : null) ?: null,
            'url' => isset($definition['url']) ? $definition['url']($model) : $disk->url($path),
            'exists' => $exists,
        ];
    }

    /**
     * Flatten nested values so a record fits one spreadsheet row: files.annual_report.name, roles ...
     *
     * @param  array<string, mixed>  $row
     * @return array<string, scalar|null>
     */
    public function flatten(array $row): array
    {
        $flat = [];

        foreach (Arr::dot($row) as $key => $value) {
            $flat[$key] = is_bool($value) ? ($value ? 1 : 0) : $value;
        }

        // Lists such as roles or facilities come out as one JSON cell instead of roles.0, roles.1 ...
        foreach ($row as $key => $value) {
            if (is_array($value) && array_is_list($value)) {
                foreach (array_keys($flat) as $dotted) {
                    if (str_starts_with($dotted, "{$key}.")) {
                        unset($flat[$dotted]);
                    }
                }
                $flat[$key] = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
        }

        return $flat;
    }

    /**
     * Database-independent type name for a column: string, text, integer, decimal, boolean, date or datetime.
     */
    public static function fieldType(?string $databaseType): string
    {
        return match (strtolower((string) $databaseType)) {
            'tinyint', 'bool', 'boolean' => 'boolean',
            'int', 'integer', 'bigint', 'smallint', 'mediumint' => 'integer',
            'decimal', 'numeric', 'float', 'double' => 'decimal',
            'date' => 'date',
            'datetime', 'timestamp' => 'datetime',
            'text', 'mediumtext', 'longtext', 'json' => 'text',
            default => 'string',
        };
    }
}
