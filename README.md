# Bank of Azad Jammu & Kashmir (BAJK) - Website & Content Management System

Public website and administration panel for the Bank of Azad Jammu & Kashmir.

- **Public site:** products, services, rates, financial reports, branch network, news, careers, downloads, loan calculator, contact form
- **Admin panel:** role-based content management, dashboard, contact-message inbox, menu builder, user/role management
- **Public JSON API (v1):** branches (with "nearest branch"), regions, districts, contact details, rates, news, careers
- **Urdu documentation (right-to-left):** [docs/ur/README.md](docs/ur/README.md)

| | |
|---|---|
| Backend | Laravel 13, PHP 8.3+ (production runs 8.4) |
| Frontend | React 19 + TypeScript, Inertia.js v2, Tailwind CSS v4, Vite |
| Database | MariaDB/MySQL (production), SQLite for tests |
| Auth / permissions | Laravel auth + `spatie/laravel-permission` |
| Tests | Pest 4 (about 440 tests) |

---

## Contents

1. [Quick start (local development)](#quick-start-local-development)
2. [Configuration (`.env`)](#configuration-env)
3. [Creating the first administrator](#creating-the-first-administrator)
4. [Everyday commands](#everyday-commands)
5. [Project structure](#project-structure)
6. [Roles and permissions](#roles-and-permissions)
7. [Public API v1](#public-api-v1)
8. [Security](#security)
9. [Testing and quality](#testing-and-quality)
10. [Deployment to production](#deployment-to-production)
11. [Upgrading Laravel](#upgrading-laravel)
12. [Troubleshooting](#troubleshooting)

---

## Quick start (local development)

Requirements: PHP 8.3 or newer with `mbstring`, `intl`, `gd`, `zip` and a database driver (`pdo_mysql` or `pdo_sqlite`), Composer 2, Node.js 22+ and npm.

```bash
git clone https://github.com/alimarchal/Genexis.git
cd Genexis

composer install
npm ci

cp .env.example .env
php artisan key:generate
```

Pick a database in `.env`.

*SQLite (simplest for development):*

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/Genexis/database/database.sqlite
```

```bash
touch database/database.sqlite
```

*MariaDB / MySQL:*

```dotenv
DB_CONNECTION=mariadb
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bajk
DB_USERNAME=bajk
DB_PASSWORD=choose-a-strong-password
```

Then create the tables, load the starter content and start everything:

```bash
php artisan migrate --seed        # tables + menus, branches, news, products, roles, permissions ...
php artisan storage:link          # makes uploaded files reachable under /storage
php artisan bank:create-admin you@example.com --name="Your Name"   # first administrator (asks for a password)

composer run dev                  # PHP server + queue worker + log viewer + Vite (hot reload)
```

Open <http://localhost:8000> for the website and <http://localhost:8000/login> for the admin panel.

> If you see "Unable to locate file in Vite manifest", run `npm run build` once, or keep `composer run dev` running.

## Configuration (`.env`)

`.env.example` documents every key. The important groups:

| Group | Keys | Notes |
|---|---|---|
| Application | `APP_ENV`, `APP_DEBUG`, `APP_URL`, `APP_KEY` | **Production must use `APP_ENV=production`, `APP_DEBUG=false`, an `https://` `APP_URL`.** |
| Database | `DB_*` | MariaDB in production. |
| Sessions | `SESSION_SECURE_COOKIE`, `SESSION_ENCRYPT` | Set `SESSION_SECURE_COOKIE=true` on https. |
| Mail | `MAIL_*`, `CONTACT_EMAIL`, `CONTACT_FORM_RECIPIENT` | Notification e-mail for the contact form. Messages are always saved in the admin inbox even if mail fails. |
| Bank details | `CONTACT_PHONE`, `CONTACT_ADDRESS`, `BANK_BRANCHES_COUNT`, `SOCIAL_*`, `*_URL` | Shown in header, footer and contact page. |
| Rates | `LOAN_RATE_*`, `DEPOSIT_RATE_*`, `LOAN_MIN_*`, `LOAN_MAX_*`, `LOAN_TENURE_*` | Loan calculator and rate widgets. |
| Security | `TRUSTED_PROXIES`, `FORCE_HTTPS`, `CSP_ENABLED`, `*_RATE_LIMIT` | See [Security](#security). |

All bank-specific values are read through `config/bank.php`. **Never call `env()` outside the `config/` folder**: after `php artisan config:cache` it returns `null`. A test enforces this.

## Creating the first administrator

Public registration is disabled. Create administrators from the command line:

```bash
php artisan bank:create-admin name@bankajk.com --name="Full Name"
```

The password must be at least 12 characters with letters and numbers. Running the command again for the same e-mail resets the password. Other staff accounts are created in the panel under **User Management -> Users**.

## Everyday commands

| Command | What it does |
|---|---|
| `composer run dev` | Full development stack with hot reload |
| `php artisan test` | Run the whole test suite |
| `php artisan test --filter=Name` | Run matching tests |
| `vendor/bin/pint` | Fix PHP code style |
| `npm run ci` | Prettier check + ESLint + TypeScript |
| `npm run format` / `npm run lint` | Auto-fix JS/TS style |
| `npm run build` | Production build of the front end |
| `php artisan bank:check` | Verify that the environment is safe for production |
| `php artisan bank:create-admin <email>` | Create or reset a super-admin |
| `php artisan news:populate-excerpts` | Generate missing news excerpts |

## Project structure

```
app/
  Console/Commands/        bank:check, bank:create-admin, ...
  Http/Controllers/        public pages, admin CRUD, Admin/ (dashboard, menus, inbox), Api/V1/
  Http/Middleware/         SecurityHeaders, Inertia shared data, menus, breadcrumbs
  Http/Resources/V1/       JSON shapes of the public API
  Models/  Policies/  Services/MenuService.php  Support/PublicFile.php
config/bank.php            every bank-specific setting (contacts, rates, links, security limits)
routes/
  web.php                  public pages + admin panel
  api.php                  /api/v1 public API
resources/js/
  Pages/                   one folder per screen (public and admin)
  components/              shared UI (SafeImage, header, footer, sidebar ...)
public/images/defaults/    built-in fallback illustrations (shown when an image is missing)
scripts/deploy.sh          server-side deployment script
tests/Feature/             Pest tests
docs/                      documentation (Urdu admin guide, API reference)
```

Where to change things:

- **Website text and lists** (news, careers, carousel, branches...): admin panel, no code needed.
- **Navigation menu:** admin panel -> System Management -> Admin Menus.
- **Contact details, rates, social/footer links:** `.env` (see above), then `php artisan config:cache` on the server.
- **A new admin module:** controller + Form Requests + React pages + `Route::resource(...)->guardedBy('x')` in `routes/web.php` + permissions in `RoleAndPermissionSeeder` (and a migration that creates them on existing installs, see `database/migrations/*contact_submission_permissions.php`).

## Roles and permissions

- `super-admin` can do everything (`Gate::before`).
- Every other role is a set of permissions named `view|create|edit|delete <module>` (for example `edit carousels`).
- Admin routes use `->guardedBy('module')`, which maps index/show -> view, create/store -> create, edit/update -> edit, destroy -> delete. A user with only `view carousels` can look but not change anything.
- Staff can only hand out permissions they hold themselves; only a super-admin can create or modify another super-admin, and the `super-admin` role cannot be renamed.
- Dashboard widgets and sidebar entries appear only for permissions the user has.

## Public API v1

Read-only, no authentication, JSON, cacheable (`Cache-Control: public, max-age=300` + `ETag`), rate limited per IP (default 60 requests/minute; HTTP 429 with `Retry-After`).

Base URL: `https://<your-domain>/api/v1`

| Endpoint | Description |
|---|---|
| `GET /branches` | Active branches. Filters: `filter[region_id]`, `filter[district_id]`, `filter[type]`, `filter[is_24_hours]`, `filter[name]`, `filter[address]`. Sort: `sort=name` or `sort=-code`. `per_page` (max 100). |
| `GET /branches/{code}` | One branch by branch code, with phones and e-mails. |
| `GET /branches/nearby?lat=&lng=&radius_km=&limit=` | Branches around a point, nearest first, with `distance_km` (default radius 25 km, max 200). |
| `GET /regions`, `GET /districts?region_id=` | Geography with active branch counts. |
| `GET /contact` | Head-office phone, e-mail, address, social links. |
| `GET /rates` | Loan and deposit rates (% p.a.). |
| `GET /news`, `GET /news/{slug}` | Published news (full content on the detail endpoint). |
| `GET /careers`, `GET /careers/{id}` | Open vacancies. |

Example:

```bash
curl "https://example.bank/api/v1/branches/nearby?lat=34.37&lng=73.47&radius_km=10&limit=3"
```

```json
{ "data": [ { "code": "0001", "name": "Main Branch Muzaffarabad", "distance_km": 3.1,
              "phones": ["05822-921181"], "facilities": ["Safe Deposit Boxes"], "...": "..." } ] }
```

Full reference: [docs/api.md](docs/api.md). The older `GET /api/search?q=` endpoint (site search) is unchanged.

## Security

Built in:

- **Authorization:** per-action permissions, privilege-escalation guards, no public registration.
- **Browser protections:** nonce-based Content-Security-Policy, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS on https (`app/Http/Middleware/SecurityHeaders.php`). Set `CSP_ENABLED=false` only for debugging.
- **Rate limits per IP:** pages 600/min, API 60/min, downloads 30/min, contact form 5 per 10 min (`WEB_RATE_LIMIT`, `API_RATE_LIMIT`, `DOWNLOAD_RATE_LIMIT`, `CONTACT_RATE_LIMIT`). Behind a reverse proxy (Cloudflare, nginx, cPanel) set `TRUSTED_PROXIES` (`*` or a comma-separated list of proxy IPs); otherwise every visitor looks like the proxy and shares one limit.
- **Input safety:** Form Requests everywhere, menu links reject `javascript:`/`data:` URLs, file downloads only serve active records and never accept paths from the visitor.
- **Privacy:** contact-form details are not written to log files.
- **Deployment guard:** `php artisan bank:check` stops a deployment if `APP_DEBUG=true` in production.

Operational checklist for the server:

1. `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://...`, `SESSION_SECURE_COOKIE=true`, `LOG_LEVEL=error`
2. A real mail server in `MAIL_*` (not `mailpit`)
3. Database user with access only to the application database
4. The web server's document root is the `public/` folder (never the project root); `.env` is not web-accessible
5. Regular database and `storage/app/public` backups
6. Keep dependencies current (Dependabot pull requests, `composer audit`)

Report security problems privately to the repository owner.

## Testing and quality

```bash
php artisan test                 # PHP tests (SQLite in memory)
vendor/bin/pint --test           # style check
npm run ci                       # prettier + eslint + tsc
```

The tests are behavioural: for example they verify that a view-only user cannot delete, that inactive documents cannot be downloaded, that hidden news is not shown, that distances in the nearby-branches API are correct and that every `route('...')` used by the React code exists on the server. GitHub Actions runs everything on PHP 8.3 and 8.4 for every pull request (`.github/workflows/ci.yml`).

## Deployment to production

Production assumptions: Linux, PHP 8.3+ (8.4 recommended), MariaDB 10.6+/11, a web server whose document root is `public/`, Composer on the server, SSH access.

### One-time setup on the server

```bash
git clone https://github.com/alimarchal/Genexis.git /var/www/bajk
cd /var/www/bajk
cp .env.example .env            # then edit: APP_ENV, APP_DEBUG=false, APP_URL, DB_*, MAIL_*, TRUSTED_PROXIES ...
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force --seed
php artisan storage:link
php artisan bank:create-admin you@bankajk.com
php artisan bank:check          # must report no errors
php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan event:cache
```

Make `storage/` and `bootstrap/cache/` writable by the web-server user. Build assets once (`npm ci && npm run build`) or upload `public/build/` from CI.

An existing production database that already matches the migrations needs only `php artisan migrate --force` (new migrations add permissions only).

### Automatic deployment (GitHub Actions)

`.github/workflows/deploy.yml` runs after CI passes on `main`. Add these repository secrets (Settings -> Secrets and variables -> Actions); without them the workflow skips itself:

| Secret | Example |
|---|---|
| `DEPLOY_HOST` | `server.example.com` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PATH` | `/var/www/bajk` |
| `DEPLOY_SSH_KEY` | private key of a deploy-only user |
| `DEPLOY_PORT` | `22` (optional) |

On each push to `main` the workflow builds the assets, uploads `public/build`, then runs `scripts/deploy.sh` on the server: pull (fast-forward only), `composer install --no-dev`, `php artisan bank:check`, maintenance mode, `migrate --force`, caches, queue restart, back online. If `bank:check` finds an error nothing on the live site is touched.

Manual deployment is the same command on the server: `bash scripts/deploy.sh`.

### Rollback

```bash
git log --oneline -5                     # choose the previous good commit
git checkout <commit> && composer install --no-dev -o
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

Migrations are additive; restore the database backup only if a migration itself is at fault.

## Upgrading Laravel

The code follows framework conventions (no framework-internal hacks, `bootstrap/app.php` configuration, Form Requests, resources, config-only `env()`), so major upgrades should be small:

1. Create a branch and read the official upgrade guide for the target version.
2. Raise `laravel/framework` in `composer.json`, then `composer update -W`. Dependabot already proposes minor updates weekly.
3. Packages that usually need a matching bump: `inertiajs/inertia-laravel`, `spatie/*`, `pestphp/*`, `laravel/boost`, `laravel/tinker`.
4. Run `php artisan test`, `npm run ci` and open the main pages (CI does the first two automatically).
5. `composer.json` pins `config.platform.php` to `8.3.0` so the lock file installs on 8.3 and 8.4; raise it when you drop 8.3.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| White page / "Unable to locate file in Vite manifest" | Assets not built: `npm run build` |
| Images missing (default illustration shown) | File not uploaded or `php artisan storage:link` not run |
| Values from `.env` ignored after editing | Config is cached: `php artisan config:cache` (or `config:clear` in development) |
| Contact form works but no e-mail arrives | Check `MAIL_*`; messages are still in Admin -> Contact Messages |
| Everyone gets "Too many requests" | Behind a proxy without `TRUSTED_PROXIES`; set it |
| 403 in the admin panel | The user's role lacks that module's permission (User Management -> Roles) |
| `bank:check` fails with APP_DEBUG | Set `APP_DEBUG=false` in the production `.env` |
| Session cookie error "name cannot be empty" | Remove an empty `SESSION_COOKIE=` line from `.env` |

## License

Proprietary - Bank of Azad Jammu & Kashmir. All rights reserved.
