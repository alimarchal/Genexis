<?php

use App\Extraction\DatasetRegistry;
use App\Models\AnnualReport;
use App\Models\ApiToken;
use App\Models\BankService;
use App\Models\ContactSubmission;
use App\Models\Download;
use App\Models\ExtractionLog;
use App\Models\ProfitRate;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleAndPermissionSeeder::class);
    Storage::fake('public');
    Cache::flush();

    $this->extractor = User::factory()->create();
    $this->extractor->givePermissionTo('extract data');
    [$this->token, $this->plain] = ApiToken::issue($this->extractor, 'Reporting system');

    $this->sensitive = User::factory()->create();
    $this->sensitive->givePermissionTo(['extract data', 'extract sensitive data']);
    [, $this->sensitivePlain] = ApiToken::issue($this->sensitive, 'Compliance');

    $this->extract = fn (string $path = '', array $query = [], ?string $plain = null) => $this
        ->withToken($plain ?? $this->plain)
        ->getJson('/api/extract/v1/'.$path.($query ? '?'.http_build_query($query) : ''));
});

describe('authentication and permissions', function () {
    it('needs an API token', function () {
        $this->getJson('/api/extract/v1/downloads')->assertUnauthorized();
        $this->withToken('bajk_not-a-real-token')->getJson('/api/extract/v1/downloads')->assertUnauthorized();
        $this->getJson('/api/extract/v1/datasets')->assertUnauthorized();
    });

    it('refuses revoked and expired tokens', function () {
        $this->token->forceFill(['revoked_at' => now()])->save();
        ($this->extract)('downloads')->assertUnauthorized();

        $this->token->forceFill(['revoked_at' => null, 'expires_at' => now()->subMinute()])->save();
        ($this->extract)('downloads')->assertUnauthorized();

        $this->token->forceFill(['expires_at' => now()->addDay()])->save();
        ($this->extract)('downloads')->assertOk();
    });

    it('does not accept a web session or the token in the query string', function () {
        $this->actingAs($this->extractor)->getJson('/api/extract/v1/downloads')->assertUnauthorized();
        $this->getJson('/api/extract/v1/downloads?token='.$this->plain)->assertUnauthorized();
    });

    it('needs the extract data permission', function () {
        $nobody = User::factory()->create();
        [, $plain] = ApiToken::issue($nobody, 'No rights');

        ($this->extract)('downloads', [], $plain)->assertForbidden();
    });

    it('keeps personal data sets behind a separate permission', function (string $dataset) {
        ($this->extract)($dataset)->assertForbidden();
        ($this->extract)($dataset, [], $this->sensitivePlain)->assertOk();
    })->with(['contact-submissions', 'users']);

    it('records when a token was last used', function () {
        expect($this->token->fresh()->last_used_at)->toBeNull();

        ($this->extract)('downloads')->assertOk();

        expect($this->token->fresh()->last_used_at)->not->toBeNull();
    });

    it('stores only a hash of the token', function () {
        expect(ApiToken::where('token_hash', $this->plain)->exists())->toBeFalse()
            ->and($this->token->token_hash)->toBe(hash('sha256', $this->plain));
    });

    it('returns 404 for an unknown data set', function () {
        ($this->extract)('passwords')->assertNotFound();
    });
});

describe('data set catalogue', function () {
    it('lists every data set with its fields, filters and whether the caller may extract it', function () {
        $response = ($this->extract)('datasets')->assertOk();

        $slugs = collect($response->json('data'))->pluck('slug')->all();
        expect($slugs)->toEqualCanonicalizing(array_keys(app(DatasetRegistry::class)->all()))
            ->and($slugs)->toContain('branches', 'branch-services', 'regions', 'districts', 'divisions', 'products', 'product-schemes', 'services', 'bank-services', 'profit-rates', 'schedule-of-charges', 'downloads', 'annual-reports', 'financial-reports', 'financial-highlights', 'news-announcements', 'careers', 'board-of-directors', 'bod-committees', 'management', 'carousels', 'top-navbar-messages', 'contact-submissions', 'users');

        $downloads = collect($response->json('data'))->firstWhere('slug', 'downloads');
        expect(collect($downloads['fields'])->pluck('name'))->toContain('title', 'category', 'file_path')
            ->and($downloads['filters']['status'])->toBeTrue()
            ->and($downloads['filters']['fields'])->toContain('category')
            ->and($downloads['endpoint'])->toEndWith('/api/extract/v1/downloads')
            ->and($downloads['accessible'])->toBeTrue()
            ->and(collect($response->json('data'))->firstWhere('slug', 'users')['accessible'])->toBeFalse();
    });

    it('answers every listed data set', function (string $slug) {
        ($this->extract)($slug, [], $this->sensitivePlain)->assertOk()->assertJsonStructure(['data', 'meta' => ['total', 'page', 'per_page', 'last_page'], 'links']);
    })->with(fn () => array_keys(app(DatasetRegistry::class)->all()));
});

describe('records', function () {
    it('returns exactly the declared fields', function () {
        Download::factory()->create(['title' => 'Tender', 'category' => 'Document']);

        $record = ($this->extract)('downloads')->json('data.0');

        expect(array_keys($record))->toEqualCanonicalizing([...app(DatasetRegistry::class)->find('downloads')->fields, 'files']);
    });

    it('never exposes passwords or tokens of users, and lists their roles', function () {
        $this->sensitive->assignRole('admin');

        $record = collect(($this->extract)('users', [], $this->sensitivePlain)->json('data'))->firstWhere('id', $this->sensitive->id);

        expect($record)->not->toHaveKeys(['password', 'remember_token', 'two_factor_secret'])
            ->and($record['email'])->toBe($this->sensitive->email)
            ->and($record['roles'])->toBe(['admin']);
    });

    it('includes personal data sets only for the right permission', function () {
        ContactSubmission::factory()->create(['name' => 'A Customer', 'email' => 'customer@example.com']);

        expect(($this->extract)('contact-submissions', [], $this->sensitivePlain)->json('data.0.email'))->toBe('customer@example.com');
    });

    it('describes attached files with name, size, type and download link', function () {
        Storage::disk('public')->put('annual-reports/abc123.pdf', str_repeat('x', 2048));
        $report = AnnualReport::factory()->create([
            'annual_report_fiscal_year' => 2025,
            'annual_report' => 'annual-reports/abc123.pdf',
            'file_name' => 'Annual Report 2025.pdf',
        ]);

        $file = ($this->extract)('annual-reports')->json('data.0.files.annual_report');

        expect($file)->toMatchArray([
            'name' => 'Annual Report 2025.pdf',
            'size' => 2048,
            'type' => 'application/pdf',
            'url' => route('annual-reports.download', $report),
            'exists' => true,
        ]);
    });

    it('leaves files out for records without one and flags a missing file', function () {
        AnnualReport::factory()->create(['annual_report_fiscal_year' => 2020, 'annual_report' => null]);
        AnnualReport::factory()->create(['annual_report_fiscal_year' => 2021, 'annual_report' => 'annual-reports/gone.pdf']);

        $data = ($this->extract)('annual-reports', ['sort' => 'id'])->json('data');

        expect($data[0]['files'])->toBe([])
            ->and($data[1]['files']['annual_report']['exists'])->toBeFalse()
            ->and($data[1]['files']['annual_report']['size'])->toBeNull();
    });
});

describe('filters', function () {
    it('filters by creation date range, inclusive of the whole last day', function () {
        Download::factory()->create(['title' => 'Old', 'created_at' => '2026-01-10 08:00:00']);
        Download::factory()->create(['title' => 'Inside', 'created_at' => '2026-02-15 23:30:00']);
        Download::factory()->create(['title' => 'Later', 'created_at' => '2026-03-20 08:00:00']);

        $titles = ($this->extract)('downloads', ['created_from' => '2026-02-01', 'created_to' => '2026-02-15'])->json('data.*.title');

        expect($titles)->toBe(['Inside']);
    });

    it('filters by update date range', function () {
        $old = Download::factory()->create(['title' => 'Untouched']);
        $touched = Download::factory()->create(['title' => 'Touched']);
        Download::whereKey($old->id)->update(['updated_at' => '2026-01-01 00:00:00']);
        Download::whereKey($touched->id)->update(['updated_at' => '2026-06-01 12:00:00']);

        expect(($this->extract)('downloads', ['updated_from' => '2026-05-01', 'updated_to' => '2026-06-30'])->json('data.*.title'))->toBe(['Touched']);
    });

    it('supports incremental extraction with updated_since, oldest change first', function () {
        $a = Download::factory()->create(['title' => 'A']);
        $b = Download::factory()->create(['title' => 'B']);
        $c = Download::factory()->create(['title' => 'C']);
        Download::whereKey($a->id)->update(['updated_at' => '2026-05-01 10:00:00']);
        Download::whereKey($b->id)->update(['updated_at' => '2026-05-03 10:00:00']);
        Download::whereKey($c->id)->update(['updated_at' => '2026-05-02 10:00:00']);

        $response = ($this->extract)('downloads', ['updated_since' => '2026-05-02T10:00:00']);

        expect($response->json('data.*.title'))->toBe(['C', 'B'])
            ->and($response->json('meta.filters.updated_since'))->toBe('2026-05-02T10:00:00');
    });

    it('picks up a record created or edited after the last sync', function () {
        $before = now()->subMinute()->toIso8601String();
        Download::factory()->create(['title' => 'Existing', 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)]);
        $fresh = Download::factory()->create(['title' => 'Fresh']);

        expect(($this->extract)('downloads', ['updated_since' => $before])->json('data.*.title'))->toBe(['Fresh']);

        Download::where('title', 'Existing')->first()->update(['title' => 'Existing edited']);

        expect(($this->extract)('downloads', ['updated_since' => $before])->json('data.*.title'))->toEqualCanonicalizing(['Fresh', 'Existing edited']);
    });

    it('filters by status for every way status is stored', function () {
        Download::factory()->create(['title' => 'Live', 'is_active' => true]);
        Download::factory()->create(['title' => 'Hidden', 'is_active' => false]);
        BankService::factory()->create(['title' => 'On', 'status' => 1]);
        BankService::factory()->create(['title' => 'Off', 'status' => 0]);

        expect(($this->extract)('downloads', ['status' => 'active'])->json('data.*.title'))->toBe(['Live'])
            ->and(($this->extract)('downloads', ['status' => 'inactive'])->json('data.*.title'))->toBe(['Hidden'])
            ->and(($this->extract)('bank-services', ['status' => 'inactive'])->json('data.*.title'))->toBe(['Off']);
    });

    it('filters by key fields', function () {
        Download::factory()->create(['title' => 'A form', 'category' => 'Form']);
        Download::factory()->create(['title' => 'A picture', 'category' => 'Picture']);

        expect(($this->extract)('downloads', ['filter' => ['category' => 'Form']])->json('data.*.title'))->toBe(['A form']);
    });

    it('rejects filters and values it does not understand', function (array $query, string $field) {
        ($this->extract)('downloads', $query)->assertUnprocessable()->assertJsonValidationErrors($field);
    })->with([
        'unknown field' => [['filter' => ['file_path' => 'x']], 'filter.file_path'],
        'bad date' => [['created_from' => 'yesterday-ish'], 'created_from'],
        'bad status' => [['status' => 'maybe'], 'status'],
        'bad sort' => [['sort' => 'password'], 'sort'],
        'bad format' => [['format' => 'pdf'], 'format'],
        'page zero' => [['page' => 0], 'page'],
        'too many per page' => [['per_page' => 100000], 'per_page'],
        'both since and from' => [['updated_since' => '2026-01-01', 'updated_from' => '2026-01-01'], 'updated_since'],
    ]);

    it('says when a data set has no active / inactive status', function () {
        ($this->extract)('annual-reports', ['status' => 'active'])->assertUnprocessable()->assertJsonValidationErrors('status');
    });

    it('sorts newest first when asked', function () {
        ProfitRate::factory()->count(3)->create();

        $ids = ($this->extract)('profit-rates', ['sort' => '-id'])->json('data.*.id');

        expect($ids)->toBe(collect($ids)->sortDesc()->values()->all());
    });
});

describe('pagination', function () {
    it('pages through a data set and reports the total', function () {
        Download::factory()->count(7)->create();

        $first = ($this->extract)('downloads', ['per_page' => 3])->assertHeader('X-Total-Count', '7');
        $last = ($this->extract)('downloads', ['per_page' => 3, 'page' => 3]);

        expect($first->json('meta'))->toMatchArray(['total' => 7, 'count' => 3, 'page' => 1, 'per_page' => 3, 'last_page' => 3, 'from' => 1, 'to' => 3])
            ->and($first->json('links.next'))->toContain('page=2')
            ->and($first->json('links.prev'))->toBeNull()
            ->and($last->json('meta.count'))->toBe(1)
            ->and($last->json('links.next'))->toBeNull();

        $seen = collect([1, 2, 3])->flatMap(fn ($page) => ($this->extract)('downloads', ['per_page' => 3, 'page' => $page])->json('data.*.id'));
        expect($seen->unique())->toHaveCount(7);
    });
});

describe('formats', function () {
    beforeEach(function () {
        Download::factory()->create(['title' => 'Tender, "urgent"', 'description' => "Line one\nLine two", 'category' => 'Form', 'file_path' => 'downloads/t.pdf']);
        Download::factory()->create(['title' => '=HYPERLINK("http://evil")', 'category' => 'Document', 'file_path' => 'downloads/u.pdf']);
        Storage::disk('public')->put('downloads/t.pdf', 'pdf');
    });

    it('exports CSV with a header row, escaping and the total count in a header', function () {
        $response = ($this->extract)('downloads', ['format' => 'csv', 'sort' => 'id']);

        $response->assertOk()->assertHeader('X-Total-Count', '2');
        expect($response->headers->get('content-type'))->toContain('text/csv')
            ->and($response->headers->get('content-disposition'))->toContain('downloads-')->toContain('.csv');

        $body = $response->streamedContent();
        expect($body)->toStartWith("\xEF\xBB\xBF");

        $rows = array_map('str_getcsv', preg_split('/\r?\n(?=\d+,)/', trim(substr($body, 3))));
        expect($rows[0])->toContain('title', 'category', 'files.file_path.url')
            ->and($rows)->toHaveCount(3);

        $titleColumn = array_search('title', $rows[0], true);
        expect($rows[1][$titleColumn])->toBe('Tender, "urgent"')
            ->and($rows[2][$titleColumn])->toBe("'=HYPERLINK(\"http://evil\")");
    });

    it('exports Excel as a real workbook with the same rows', function () {
        $response = ($this->extract)('downloads', ['format' => 'xlsx', 'sort' => 'id']);

        $response->assertOk()->assertHeader('X-Total-Count', '2');
        expect($response->headers->get('content-type'))->toContain('spreadsheetml.sheet');

        $path = tempnam(sys_get_temp_dir(), 'x');
        file_put_contents($path, $response->baseResponse->getFile()->getContent());

        $zip = new ZipArchive;
        expect($zip->open($path))->toBeTrue();

        $sheet = $zip->getFromName('xl/worksheets/sheet1.xml');
        expect($zip->getFromName('[Content_Types].xml'))->toContain('worksheet')
            ->and($zip->getFromName('xl/workbook.xml'))->toContain('Downloads')
            ->and($sheet)->toContain('<t xml:space="preserve">title</t>')
            ->and($sheet)->toContain('Tender, &quot;urgent&quot;')
            ->and(substr_count($sheet, '<row '))->toBe(3);
        simplexml_load_string($sheet) ?: throw new RuntimeException('sheet is not valid XML');
        $zip->close();
        unlink($path);
    });

    it('negotiates the format from the Accept header', function () {
        $csv = $this->withToken($this->plain)->get('/api/extract/v1/downloads', ['Accept' => 'text/csv']);
        expect($csv->headers->get('content-type'))->toContain('text/csv');

        $xlsx = $this->withToken($this->plain)->get('/api/extract/v1/downloads', ['Accept' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']);
        expect($xlsx->headers->get('content-type'))->toContain('spreadsheetml.sheet');
    });

    it('still sends the header row for an empty export', function () {
        Download::query()->delete();

        $body = ($this->extract)('downloads', ['format' => 'csv'])->streamedContent();

        expect($body)->toContain('title')->toContain('files.file_path.name');
    });

    it('allows bigger pages for exports than for JSON', function () {
        ($this->extract)('downloads', ['per_page' => 1001])->assertUnprocessable();
        ($this->extract)('downloads', ['per_page' => 1001, 'format' => 'csv'])->assertOk();
    });
});

describe('extraction log', function () {
    it('records who extracted what, with which filters, how many records and when', function () {
        Download::factory()->count(4)->create(['category' => 'Form']);
        Download::factory()->create(['category' => 'Picture']);

        ($this->extract)('downloads', ['filter' => ['category' => 'Form'], 'per_page' => 2, 'format' => 'csv'])->assertOk();

        $log = ExtractionLog::firstOrFail();
        expect($log->user_id)->toBe($this->extractor->id)
            ->and($log->api_token_id)->toBe($this->token->id)
            ->and($log->dataset)->toBe('downloads')
            ->and($log->format)->toBe('csv')
            ->and($log->filters)->toBe(['filter' => ['category' => 'Form']])
            ->and($log->records_returned)->toBe(2)
            ->and($log->records_matching)->toBe(4)
            ->and($log->page)->toBe(1)
            ->and($log->per_page)->toBe(2)
            ->and($log->ip_address)->not->toBeNull()
            ->and($log->created_at)->not->toBeNull();
    });

    it('logs every extraction but not refused or invalid requests', function () {
        ($this->extract)('downloads')->assertOk();
        ($this->extract)('downloads', ['page' => 2])->assertOk();
        ($this->extract)('users')->assertForbidden();
        ($this->extract)('downloads', ['status' => 'nope'])->assertUnprocessable();
        $this->flushHeaders()->getJson('/api/extract/v1/downloads')->assertUnauthorized();

        expect(ExtractionLog::count())->toBe(2);
    });
});

describe('rate limiting', function () {
    it('limits each token separately', function () {
        config(['bank.extraction.rate_limit' => 2]);
        RateLimiter::clear('extract');

        ($this->extract)('downloads')->assertOk();
        ($this->extract)('downloads')->assertOk();
        ($this->extract)('downloads')->assertTooManyRequests();

        ($this->extract)('downloads', [], $this->sensitivePlain)->assertOk();
    });
});

describe('token commands', function () {
    it('creates a token that works and is shown once', function () {
        $this->artisan('bank:create-api-token', ['email' => $this->extractor->email, 'name' => 'Backup job', '--days' => 30])
            ->expectsOutputToContain('Token #')
            ->assertSuccessful();

        $token = ApiToken::where('name', 'Backup job')->firstOrFail();
        expect($token->expires_at->isFuture())->toBeTrue();
    });

    it('refuses an unknown user', function () {
        $this->artisan('bank:create-api-token', ['email' => 'nobody@example.com', 'name' => 'x'])->assertFailed();
    });

    it('revokes a token', function () {
        $this->artisan('bank:revoke-api-token', ['id' => $this->token->id])->assertSuccessful();

        ($this->extract)('downloads')->assertUnauthorized();
    });
});

it('makes super-admin able to extract everything and an ordinary admin nothing by default', function () {
    $root = $this->createAdminUser();
    expect($root->can('extract data'))->toBeTrue()->and($root->can('extract sensitive data'))->toBeTrue();

    $admin = User::factory()->create();
    $admin->assignRole('admin');
    expect($admin->can('extract data'))->toBeFalse();
});

describe('documentation', function () {
    it('lists every data set, its fields, filters and an example, and is up to date with the code', function () {
        $docs = file_get_contents(base_path('docs/extraction-api.md'));

        foreach (app(DatasetRegistry::class)->all() as $slug => $dataset) {
            expect($docs)->toContain("### `{$slug}`");

            foreach ($dataset->fields as $field) {
                expect($docs)->toContain("| `{$field}` |");
            }
        }

        expect($docs)->toContain('updated_since')->toContain('"meta"')->toContain('Bearer');

        $this->artisan('bank:extraction-docs', ['--check' => true])->assertSuccessful();
    });
});
