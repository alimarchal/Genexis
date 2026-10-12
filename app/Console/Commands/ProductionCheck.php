<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductionCheck extends Command
{
    protected $signature = 'bank:check {--strict : Treat warnings as failures}';

    protected $description = 'Verify that the environment is safe to serve production traffic';

    /** @var list<string> */
    private array $errors = [];

    /** @var list<string> */
    private array $warnings = [];

    public function handle(): int
    {
        $this->errors = [];
        $this->warnings = [];

        $production = app()->environment('production');

        $this->checkApplication($production);
        $this->checkDatabase();
        $this->checkMail($production);
        $this->checkStorage();

        foreach ($this->warnings as $warning) {
            $this->components->warn($warning);
        }
        foreach ($this->errors as $error) {
            $this->components->error($error);
        }

        if ($this->errors === [] && $this->warnings === []) {
            $this->components->info('All production checks passed.');
        }

        $failed = $this->errors !== [] || ($this->option('strict') && $this->warnings !== []);

        return $failed ? self::FAILURE : self::SUCCESS;
    }

    private function checkApplication(bool $production): void
    {
        if (blank(config('app.key'))) {
            $this->errors[] = 'APP_KEY is not set. Run: php artisan key:generate';
        }

        if ($production && config('app.debug')) {
            $this->errors[] = 'APP_DEBUG is true in production. It leaks stack traces and secrets; set APP_DEBUG=false.';
        }

        if (! $production) {
            $this->warnings[] = 'APP_ENV is "'.app()->environment().'", not "production".';

            return;
        }

        if (! str_starts_with((string) config('app.url'), 'https://')) {
            $this->warnings[] = 'APP_URL is not https. Use your real https:// address.';
        }

        if (! config('session.secure')) {
            $this->warnings[] = 'SESSION_SECURE_COOKIE is not true; cookies can be sent over plain http.';
        }

        if (config('logging.channels.single.level') === 'debug' && config('logging.default') !== 'null') {
            $this->warnings[] = 'LOG_LEVEL is debug; use error or warning in production.';
        }
    }

    private function checkDatabase(): void
    {
        try {
            DB::connection()->getPdo();
        } catch (\Throwable $exception) {
            $this->errors[] = 'Database connection failed: '.$exception->getMessage();

            return;
        }

        try {
            if (! Schema::hasTable('migrations')) {
                $this->errors[] = 'Database is empty. Run: php artisan migrate --force';
            }
        } catch (\Throwable $exception) {
            $this->errors[] = 'Cannot read the database schema: '.$exception->getMessage();
        }
    }

    private function checkMail(bool $production): void
    {
        $mailer = config('mail.default');
        $host = (string) config('mail.mailers.smtp.host');

        if (in_array($mailer, ['log', 'array'], true)) {
            $this->warnings[] = "MAIL_MAILER is \"{$mailer}\": contact-form notification e-mails are NOT delivered. Messages are still saved in the admin inbox.";
        }

        if ($mailer === 'smtp' && in_array($host, ['mailpit', 'localhost', '127.0.0.1', 'mailhog'], true) && $production) {
            $this->warnings[] = "MAIL_HOST is \"{$host}\" (a development mail catcher): notification e-mails will not reach anyone.";
        }
    }

    private function checkStorage(): void
    {
        if (! is_link(public_path('storage')) && ! is_dir(public_path('storage'))) {
            $this->warnings[] = 'public/storage is missing: uploaded images/files will 404. Run: php artisan storage:link';
        }

        $free = @disk_free_space(storage_path());
        $needed = (int) config('bank.uploads.super_admin_max_bytes') + (int) config('bank.uploads.reserve_bytes');
        if ($free !== false && $free < $needed) {
            $this->warnings[] = sprintf(
                'Only %.1f GB of disk space is free but a super-admin may upload files of up to %.1f GB (plus a %.1f GB reserve). Free some space or lower UPLOAD_MAX_BYTES.',
                $free / 1024 ** 3,
                config('bank.uploads.super_admin_max_bytes') / 1024 ** 3,
                config('bank.uploads.reserve_bytes') / 1024 ** 3
            );
        }

        foreach (['storage', 'bootstrap/cache'] as $path) {
            if (! is_writable(base_path($path))) {
                $this->errors[] = "{$path} is not writable by the web server user.";
            }
        }
    }
}
