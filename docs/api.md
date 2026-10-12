# Public API v1 reference

Base URL: `https://<your-domain>/api/v1` - read-only, no authentication, JSON.

## Conventions

- **Rate limit:** 60 requests per minute per IP (`API_RATE_LIMIT`). Exceeding it returns `429 Too Many Requests` with a `Retry-After` header.
- **Caching:** `Cache-Control: public, max-age=300` and an `ETag`; send `If-None-Match` to receive `304`.
- **Errors** are always JSON: `{"message": "..."}`; validation errors are `422` with `errors`.
- **Writes** (`POST`, `PUT`, `DELETE`) are not supported (`405`).
- **Collections** are wrapped as `{"data": [...], "links": {...}, "meta": {...}}` when paginated (`per_page` up to the endpoint's maximum).
- Unknown `filter[...]` or `sort` values return `400`.

## Branches

### `GET /branches`

| Parameter | Description |
|---|---|
| `filter[region_id]`, `filter[district_id]` | exact id |
| `filter[type]` | `main_branch`, `sub_branch`, `atm`, `service_center`, `mobile_unit` |
| `filter[is_24_hours]` | `1` / `0` |
| `filter[name]`, `filter[address]` | partial match |
| `sort` | `name`, `code` (prefix `-` for descending). Default `code` |
| `per_page` | default 25, max 100 |

Branch object:

```json
{
  "code": "0001",
  "name": "Main Branch Muzaffarabad",
  "type": "main_branch",
  "address": "Fatima Plaza, Chatter Domel Muzaffarabad",
  "region": {"id": 1, "name": "Muzaffarabad"},
  "district": {"id": 1, "name": "Muzaffarabad"},
  "latitude": 34.34444, "longitude": 73.466404,
  "map_url": null, "directions": null,
  "facilities": ["Safe Deposit Boxes", "Foreign Exchange"],
  "is_24_hours": false,
  "operating_hours": {"monday": ["09:00", "17:00"]},
  "holidays": [],
  "phones": ["05822-921181"],
  "emails": ["manager0001@bankajk.com"]
}
```

### `GET /branches/{code}`
One active branch by its code. `404` if unknown or inactive.

### `GET /branches/nearby`

| Parameter | Description |
|---|---|
| `lat` (required) | -90 .. 90 |
| `lng` (required) | -180 .. 180 |
| `radius_km` | 0.1 .. 200, default 25 |
| `limit` | 1 .. 50, default 10 |

Returns branches with coordinates inside the radius, nearest first, each with `distance_km` (great-circle distance).

```bash
curl "https://example.bank/api/v1/branches/nearby?lat=34.37&lng=73.47&radius_km=10&limit=3"
```

## Geography

- `GET /regions` -> `[{"id", "name", "branches_count"}]`
- `GET /districts?region_id=1` -> `[{"id", "name", "region_id", "branches_count"}]`

## Bank information

- `GET /contact` -> `name`, `phone`, `email`, `address`, `company_secretary_phone`, `hrmd_phone`, `branches_count`, `social`
- `GET /rates` -> `{"loan": {"personal": 28, ...}, "deposit": {"savings": 7, ...}}` (percent per annum)

## News

- `GET /news` - published, not future-dated, newest first. Filters: `filter[category]`, `filter[is_featured]`, `filter[title]`. `per_page` max 50. Items contain `slug`, `title`, `excerpt`, `category`, `is_featured`, `published_date`, `image_url`.
- `GET /news/{slug}` - same plus `content` (HTML).

## Careers

- `GET /careers` - active vacancies not past their closing date (a vacancy is open through its closing date). Items: `id`, `title`, `location`, `closing_date`, `is_featured`, `document_url`.
- `GET /careers/{id}` - adds `description`, `requirements`, `benefits`.

## Versioning

Breaking changes will be published under a new prefix (`/api/v2`); `/api/v1` stays stable.
