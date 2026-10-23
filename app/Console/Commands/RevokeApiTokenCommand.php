<?php

namespace App\Console\Commands;

use App\Models\ApiToken;
use Illuminate\Console\Command;

class RevokeApiTokenCommand extends Command
{
    protected $signature = 'bank:revoke-api-token {id : Token number printed when it was created}';

    protected $description = 'Revoke an API token of the data extraction API';

    public function handle(): int
    {
        $token = ApiToken::find($this->argument('id'));

        if (! $token) {
            $this->error('There is no token with that number.');

            return self::FAILURE;
        }

        $token->forceFill(['revoked_at' => $token->revoked_at ?? now()])->save();
        $this->info("Token #{$token->id} ({$token->name}) is revoked.");

        return self::SUCCESS;
    }
}
