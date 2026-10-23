<?php

namespace App\Console\Commands;

use App\Extraction\Dataset;
use App\Extraction\DatasetRegistry;
use App\Extraction\RecordFormatter;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

class GenerateExtractionDocsCommand extends Command
{
    protected $signature = 'bank:extraction-docs {--check : Only report whether docs/extraction-api.md is up to date}';

    protected $description = 'Write docs/extraction-api.md from the data sets the extraction API offers';

    public function __construct(private DatasetRegistry $datasets)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $path = base_path('docs/extraction-api.md');
        $markdown = $this->render();

        if ($this->option('check')) {
            $current = is_file($path) ? file_get_contents($path) : '';

            return $current === $markdown ? self::SUCCESS : self::FAILURE;
        }

        file_put_contents($path, $markdown);
        $this->info('Wrote docs/extraction-api.md');

        return self::SUCCESS;
    }

    public function render(): string
    {
        $datasets = $this->datasets->all();
        $index = collect($datasets)->map(fn (Dataset $dataset) => "| `{$dataset->slug}` | {$dataset->label} | ".($dataset->sensitive ? 'yes' : 'no')." | {$dataset->description} |")->implode("\n");
        $sections = collect($datasets)->map(fn (Dataset $dataset) => $this->section($dataset))->implode("\n");

        return <<<MD
# Data extraction API

Pull complete data sets out of the website database for reporting, backups, analysis and integration with other bank
systems. It is separate from the public API (`/api/v1`), which only returns what the website displays.

Base URL: `/api/extract/v1`

This file is generated from the code. Run `php artisan bank:extraction-docs` after adding or changing a data set.

## 1. Access

1. A user with the **`extract data`** permission owns the token (add it to a role under *User Management > Roles*).
   The personal-data sets (`contact-submissions`, `users`) additionally need **`extract sensitive data`**.
2. Create a token on the server (it is shown once, only a hash is stored):

   ```bash
   php artisan bank:create-api-token reports@bankajk.com "Reporting system" --days=365
   php artisan bank:revoke-api-token 3
   ```

3. Send it with every request: `Authorization: Bearer bajk_xxxxxxxx`. Tokens in the query string are not accepted.

Responses: `401` missing, invalid, revoked or expired token; `403` missing permission; `404` unknown data set;
`422` an invalid parameter (the body lists each problem); `429` rate limit exceeded.

**Rate limit:** 30 requests per minute per token (`EXTRACT_RATE_LIMIT`), plus a per-IP limit for unauthenticated attempts.

**Log:** every successful extraction is recorded in the `extraction_logs` table: user, token, data set, filters, format,
page, number of records returned and matching, IP address and time.

## 2. Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/extract/v1/datasets` | Lists every data set with its fields, filters and whether you may extract it |
| `GET /api/extract/v1/{dataset}` | Extracts one data set |

## 3. Parameters

| Parameter | Meaning |
|---|---|
| `format` | `json` (default), `csv` or `xlsx`. The `Accept` header (`text/csv`, spreadsheetml) works too |
| `page`, `per_page` | Pagination. Default 100 per page, at most 1000 for JSON and 5000 for CSV / Excel |
| `created_from`, `created_to` | Records created between two dates / times (inclusive; a date alone covers the whole day) |
| `updated_from`, `updated_to` | Records last changed between two dates / times |
| `updated_since` | **Incremental extraction**: everything added or changed at or after this moment, oldest change first |
| `status` | `active` or `inactive` (only for data sets that have a status) |
| `filter[field]` | Exact match on a key field of the data set (listed per data set below) |
| `sort` | `id`, `created_at` or `updated_at`; prefix with `-` for descending |

Dates are ISO 8601 (`2026-10-23` or `2026-10-23T09:30:00+05:00`).

### Incremental extraction

Remember the time the last run started and ask only for what changed since then. The boundary is inclusive, so repeat
runs never miss a record (load them as "insert or update by id"):

```bash
curl -H "Authorization: Bearer \$TOKEN" \
  "https://example.bank/api/extract/v1/downloads?updated_since=2026-10-22T00:00:00Z&per_page=500"
```

### Pagination

JSON responses carry `meta.total` and `links.next`; CSV and Excel responses carry the same in the headers
`X-Total-Count`, `X-Page`, `X-Per-Page` and `X-Last-Page`. Keep requesting `page=2, 3, ...` until `page` reaches `last_page`.

### Files

Records with attachments include a `files` object (JSON) or `files.<field>.name|size|type|url|exists` columns (CSV / Excel):

```json
"files": {
  "annual_report": {
    "name": "Annual Report 2025.pdf",
    "size": 2048,
    "type": "application/pdf",
    "url": "https://example.bank/annual-reports/12/download",
    "exists": true
  }
}
```

## 4. Example responses

`GET /api/extract/v1/datasets`

```json
{
  "data": [
    {
      "slug": "downloads",
      "label": "Downloads",
      "description": "Documents and forms offered for download.",
      "endpoint": "https://example.bank/api/extract/v1/downloads",
      "sensitive": false,
      "required_permissions": ["extract data"],
      "fields": [{ "name": "id", "type": "integer" }, { "name": "title", "type": "string" }],
      "filters": { "date_ranges": ["created_from", "created_to", "updated_from", "updated_to", "updated_since"], "status": true, "fields": ["category", "is_featured"] },
      "files": ["file_path"],
      "accessible": true
    }
  ],
  "meta": { "formats": ["json", "csv", "xlsx"] }
}
```

`GET /api/extract/v1/downloads?status=active&filter[category]=Form&per_page=2`

```json
{
  "data": [
    {
      "id": 41,
      "title": "Account opening form",
      "category": "Form",
      "file_path": "downloads/9f2c.pdf",
      "file_type": "application/pdf",
      "file_size": 48213,
      "is_active": true,
      "created_at": "2026-10-01T08:12:44.000000Z",
      "updated_at": "2026-10-20T10:02:11.000000Z",
      "files": {
        "file_path": { "name": "Account opening form.pdf", "size": 48213, "type": "application/pdf", "url": "https://example.bank/documents/41/download", "exists": true }
      }
    }
  ],
  "meta": {
    "dataset": "downloads",
    "total": 7,
    "count": 2,
    "page": 1,
    "per_page": 2,
    "last_page": 4,
    "from": 1,
    "to": 2,
    "filters": { "status": "active", "filter": { "category": "Form" } },
    "generated_at": "2026-10-23T09:30:00+00:00"
  },
  "links": { "self": "https://example.bank/api/extract/v1/downloads?...", "next": "https://example.bank/api/extract/v1/downloads?...&page=2", "prev": null }
}
```

Validation error (`422`):

```json
{ "message": "This data set cannot be filtered by 'file_path'. Allowed: category, is_featured.", "errors": { "filter.file_path": ["This data set cannot be filtered by 'file_path'. Allowed: category, is_featured."] } }
```

## 5. Data sets

| Data set | Name | Sensitive | Contents |
|---|---|---|---|
{$index}

{$sections}
MD;
    }

    private function section(Dataset $dataset): string
    {
        $types = collect(Schema::getColumns((new $dataset->model)->getTable()))->mapWithKeys(fn (array $column) => [$column['name'] => RecordFormatter::fieldType($column['type_name'])]);

        $fields = collect($dataset->fields)->map(fn (string $field) => "| `{$field}` | ".($types[$field] ?? 'string').' |')
            ->merge(collect(array_keys($dataset->computed))->map(fn (string $field) => "| `{$field}` | list |"))
            ->implode("\n");

        $filters = $dataset->filters === [] ? 'none' : collect($dataset->filters)->map(fn (string $field) => "`filter[{$field}]`")->implode(', ');
        $status = $dataset->status === null
            ? 'not available'
            : "`status=active|inactive` (column `{$dataset->status['column']}`)";
        $files = $dataset->files === [] ? 'none' : collect(array_keys($dataset->files))->map(fn (string $field) => "`{$field}`")->implode(', ');
        $permissions = $dataset->sensitive ? '`extract data` and `extract sensitive data`' : '`extract data`';

        return <<<MD
### `{$dataset->slug}` - {$dataset->label}

{$dataset->description}

`GET /api/extract/v1/{$dataset->slug}` - permission: {$permissions}

- Status filter: {$status}
- Key field filters: {$filters}
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: {$files}

| Field | Type |
|---|---|
{$fields}

MD;
    }
}
