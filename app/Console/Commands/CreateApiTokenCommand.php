<?php

namespace App\Console\Commands;

use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Console\Command;

class CreateApiTokenCommand extends Command
{
    protected $signature = 'bank:create-api-token
        {email : E-mail address of the user the token belongs to}
        {name : What the token is for, e.g. "Reporting system"}
        {--days= : Number of days until the token expires (never when omitted)}';

    protected $description = 'Create an API token for the data extraction API (shown once)';

    public function handle(): int
    {
        $user = User::where('email', strtolower(trim($this->argument('email'))))->first();

        if (! $user) {
            $this->error('There is no user with that e-mail address.');

            return self::FAILURE;
        }

        if (! $user->can('extract data')) {
            $this->warn("{$user->email} does not have the \"extract data\" permission yet. The token will be refused until it is granted.");
        }

        [$token, $plain] = ApiToken::issue($user, $this->argument('name'), $this->option('days') ? (int) $this->option('days') : null);

        $this->info("Token #{$token->id} created for {$user->email}. Copy it now, it cannot be shown again:");
        $this->line($plain);
        $this->line('Send it as: Authorization: Bearer <token>');

        return self::SUCCESS;
    }
}
