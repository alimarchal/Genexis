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
curl -H "Authorization: Bearer $TOKEN" \
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
| `branches` | Branches | no | Branch network with location, opening hours and map details. |
| `branch-services` | Branch services | no | Services offered by each branch, with availability and fees. |
| `regions` | Regions | no | Regions of the branch network. |
| `districts` | Districts | no | Districts, each belonging to a region. |
| `divisions` | Divisions | no | Divisions of the bank. |
| `products` | Products | no | Top level products. |
| `product-types` | Product types | no | Product types, each belonging to a product. |
| `product-type-accounts` | Product accounts | no | Accounts offered under each product type. |
| `product-schemes` | Product schemes | no | Schemes offered under each product account. |
| `product-scheme-attributes` | Product scheme attributes | no | Terms and features of each product scheme. |
| `services` | Services | no | Services of the bank. |
| `service-attributes` | Service attributes | no | Details of each service. |
| `bank-services` | Bank services | no | Homepage banking services. |
| `profit-rates` | Profit rates | no | Profit rate history with validity periods. |
| `schedule-of-charges` | Schedule of charges | no | Published schedules of charges. |
| `downloads` | Downloads | no | Documents and forms offered for download. |
| `annual-reports` | Annual reports | no | Annual reports by fiscal year. |
| `financial-reports` | Financial reports | no | Quarterly, half-yearly and annual statements by fiscal year. |
| `financial-highlights` | Financial highlights | no | Financial highlights by fiscal year. |
| `news-announcements` | News and announcements | no | News and announcements, published or draft. |
| `careers` | Careers | no | Career and internship notices. |
| `board-of-directors` | Board of directors | no | Directors with biography and photo. |
| `bod-committees` | Board committees | no | Board committees and their members. |
| `management` | Management | no | Members of management. |
| `carousels` | Carousels | no | Homepage carousel slides. |
| `top-navbar-messages` | Top navbar messages | no | Messages shown in the top bar of the website. |
| `contact-submissions` | Contact submissions | yes | Messages sent through the website contact form (personal data). |
| `users` | Users | yes | Admin users and their roles. Passwords and tokens are never included. |

### `branches` - Branches

Branch network with location, opening hours and map details.

`GET /api/extract/v1/branches` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: `filter[region_id]`, `filter[district_id]`, `filter[code]`, `filter[type]`, `filter[show_on_map]`, `filter[is_24_hours]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `popup_image`

| Field | Type |
|---|---|
| `id` | integer |
| `region_id` | integer |
| `district_id` | integer |
| `code` | string |
| `type` | string |
| `name` | string |
| `address` | string |
| `latitude` | decimal |
| `longitude` | decimal |
| `map_url` | string |
| `directions` | text |
| `operating_hours` | text |
| `is_24_hours` | boolean |
| `holidays` | text |
| `facilities` | text |
| `show_on_map` | boolean |
| `map_priority` | integer |
| `status` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `branch-services` - Branch services

Services offered by each branch, with availability and fees.

`GET /api/extract/v1/branch-services` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: `filter[branch_id]`, `filter[is_available]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `branch_id` | integer |
| `service_name` | string |
| `description` | text |
| `is_available` | boolean |
| `availability_hours` | text |
| `service_fee` | decimal |
| `status` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `regions` - Regions

Regions of the branch network.

`GET /api/extract/v1/regions` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: `filter[division_id]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `division_id` | integer |
| `name` | string |
| `status` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `districts` - Districts

Districts, each belonging to a region.

`GET /api/extract/v1/districts` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: `filter[region_id]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `region_id` | integer |
| `name` | string |
| `status` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `divisions` - Divisions

Divisions of the bank.

`GET /api/extract/v1/divisions` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `name` | string |
| `short_name` | string |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `products` - Products

Top level products.

`GET /api/extract/v1/products` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `name` | string |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `product-types` - Product types

Product types, each belonging to a product.

`GET /api/extract/v1/product-types` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[product_id]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `product_id` | integer |
| `name` | string |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `product-type-accounts` - Product accounts

Accounts offered under each product type.

`GET /api/extract/v1/product-type-accounts` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[product_type_id]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `product_type_id` | integer |
| `name` | string |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `product-schemes` - Product schemes

Schemes offered under each product account.

`GET /api/extract/v1/product-schemes` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[product_type_account_id]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `product_type_account_id` | integer |
| `name` | string |
| `description` | text |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `product-scheme-attributes` - Product scheme attributes

Terms and features of each product scheme.

`GET /api/extract/v1/product-scheme-attributes` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[product_scheme_id]`, `filter[attribute_type]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `product_scheme_id` | integer |
| `attribute_name` | string |
| `attribute_value` | text |
| `attribute_type` | string |
| `sort_order` | integer |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `services` - Services

Services of the bank.

`GET /api/extract/v1/services` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[slug]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `image`

| Field | Type |
|---|---|
| `id` | integer |
| `name` | string |
| `slug` | string |
| `description` | text |
| `icon` | string |
| `image` | string |
| `sort_order` | integer |
| `meta_data` | text |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `service-attributes` - Service attributes

Details of each service.

`GET /api/extract/v1/service-attributes` - permission: `extract data`

- Status filter: not available
- Key field filters: `filter[service_id]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `service_id` | integer |
| `attribute_name` | string |
| `attribute_value` | text |
| `sort_order` | integer |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `bank-services` - Bank services

Homepage banking services.

`GET /api/extract/v1/bank-services` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: `filter[service_type]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `description` | text |
| `icon` | string |
| `products` | text |
| `cta_text` | string |
| `cta_link` | string |
| `color` | string |
| `benefits` | text |
| `order` | integer |
| `service_type` | string |
| `stat_number` | string |
| `stat_label` | string |
| `stat_description` | string |
| `status` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `profit-rates` - Profit rates

Profit rate history with validity periods.

`GET /api/extract/v1/profit-rates` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[category]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `category` | string |
| `rate` | decimal |
| `valid_from` | date |
| `valid_to` | date |
| `sort_order` | integer |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `schedule-of-charges` - Schedule of charges

Published schedules of charges.

`GET /api/extract/v1/schedule-of-charges` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `attachment`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `from` | date |
| `to` | date |
| `description` | text |
| `attachment` | string |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `downloads` - Downloads

Documents and forms offered for download.

`GET /api/extract/v1/downloads` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[category]`, `filter[is_featured]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `file_path`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `description` | text |
| `category` | string |
| `file_path` | string |
| `file_type` | string |
| `file_size` | integer |
| `is_featured` | boolean |
| `download_count` | integer |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `annual-reports` - Annual reports

Annual reports by fiscal year.

`GET /api/extract/v1/annual-reports` - permission: `extract data`

- Status filter: not available
- Key field filters: `filter[annual_report_fiscal_year]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `annual_report`

| Field | Type |
|---|---|
| `id` | integer |
| `annual_report_fiscal_year` | integer |
| `annual_report` | string |
| `file_name` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `financial-reports` - Financial reports

Quarterly, half-yearly and annual statements by fiscal year.

`GET /api/extract/v1/financial-reports` - permission: `extract data`

- Status filter: not available
- Key field filters: `filter[fiscal_year]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `first_quarter_report`, `half_yearly_report`, `third_quarter_report`, `annual_report`

| Field | Type |
|---|---|
| `id` | integer |
| `fiscal_year` | integer |
| `first_quarter_report` | string |
| `half_yearly_report` | string |
| `third_quarter_report` | string |
| `annual_report` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `financial-highlights` - Financial highlights

Financial highlights by fiscal year.

`GET /api/extract/v1/financial-highlights` - permission: `extract data`

- Status filter: not available
- Key field filters: `filter[fiscal_year]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `financial_highlights`

| Field | Type |
|---|---|
| `id` | integer |
| `fiscal_year` | integer |
| `financial_highlights` | string |
| `file_name` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `news-announcements` - News and announcements

News and announcements, published or draft.

`GET /api/extract/v1/news-announcements` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_published`)
- Key field filters: `filter[category]`, `filter[is_featured]`, `filter[slug]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `image`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `slug` | string |
| `excerpt` | text |
| `content` | text |
| `category` | string |
| `published_date` | date |
| `is_featured` | boolean |
| `is_published` | boolean |
| `image` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `careers` - Careers

Career and internship notices.

`GET /api/extract/v1/careers` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[location]`, `filter[is_featured]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `document`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `description` | text |
| `requirements` | text |
| `benefits` | text |
| `location` | string |
| `closing_date` | date |
| `document` | string |
| `is_featured` | boolean |
| `views_count` | integer |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `board-of-directors` - Board of directors

Directors with biography and photo.

`GET /api/extract/v1/board-of-directors` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[is_chairman]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `image`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `full_name` | string |
| `designation` | string |
| `short_description` | text |
| `full_biography` | text |
| `experience` | text |
| `achievements` | text |
| `image` | string |
| `sort_order` | integer |
| `is_chairman` | boolean |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `bod-committees` - Board committees

Board committees and their members.

`GET /api/extract/v1/bod-committees` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `name` | string |
| `description` | text |
| `chairman_board_id` | integer |
| `secretary_board_id` | integer |
| `secretary_management_id` | integer |
| `board_members` | text |
| `management_members` | text |
| `sort_order` | integer |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `management` - Management

Members of management.

`GET /api/extract/v1/management` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `attachment`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `full_name` | string |
| `designation` | string |
| `description` | text |
| `attachment` | string |
| `order` | integer |
| `status` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `carousels` - Carousels

Homepage carousel slides.

`GET /api/extract/v1/carousels` - permission: `extract data`

- Status filter: `status=active|inactive` (column `status`)
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: `image`

| Field | Type |
|---|---|
| `id` | integer |
| `title` | string |
| `description` | text |
| `image` | string |
| `button_text` | string |
| `button_url` | string |
| `order` | integer |
| `status` | string |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `top-navbar-messages` - Top navbar messages

Messages shown in the top bar of the website.

`GET /api/extract/v1/top-navbar-messages` - permission: `extract data`

- Status filter: `status=active|inactive` (column `is_active`)
- Key field filters: `filter[type]`, `filter[priority]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `type` | string |
| `priority` | string |
| `icon` | string |
| `text` | text |
| `color` | string |
| `bg_color` | string |
| `sort_order` | integer |
| `is_active` | boolean |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |

### `contact-submissions` - Contact submissions

Messages sent through the website contact form (personal data).

`GET /api/extract/v1/contact-submissions` - permission: `extract data` and `extract sensitive data`

- Status filter: not available
- Key field filters: `filter[category]`, `filter[district]`
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `name` | string |
| `email` | string |
| `phone` | string |
| `district` | string |
| `tehsil` | string |
| `place` | string |
| `category` | string |
| `subject` | string |
| `message` | text |
| `ip_address` | string |
| `user_agent` | string |
| `submitted_at` | datetime |
| `created_at` | datetime |
| `updated_at` | datetime |

### `users` - Users

Admin users and their roles. Passwords and tokens are never included.

`GET /api/extract/v1/users` - permission: `extract data` and `extract sensitive data`

- Status filter: not available
- Key field filters: none
- Date filters: `created_from`, `created_to`, `updated_from`, `updated_to`, `updated_since`
- Attached files: none

| Field | Type |
|---|---|
| `id` | integer |
| `name` | string |
| `email` | string |
| `email_verified_at` | datetime |
| `created_by` | integer |
| `updated_by` | integer |
| `created_at` | datetime |
| `updated_at` | datetime |
| `roles` | list |
