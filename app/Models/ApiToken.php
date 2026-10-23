<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ApiToken extends Model
{
    protected $fillable = ['user_id', 'name', 'token_hash', 'last_used_at', 'expires_at', 'revoked_at'];

    protected function casts(): array
    {
        return [
            'last_used_at' => 'datetime',
            'expires_at' => 'datetime',
            'revoked_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Create a token. The plain text is returned once and never stored: only its SHA-256 hash is kept.
     *
     * @return array{0: self, 1: string} the token record and its plain text
     */
    public static function issue(User $user, string $name, ?int $days = null): array
    {
        $plain = 'bajk_'.Str::random(48);

        $token = static::create([
            'user_id' => $user->id,
            'name' => $name,
            'token_hash' => static::hash($plain),
            'expires_at' => $days ? now()->addDays($days) : null,
        ]);

        return [$token, $plain];
    }

    public static function hash(string $plain): string
    {
        return hash('sha256', $plain);
    }

    /**
     * The usable token for this plain text, or null when it is unknown, revoked or expired.
     */
    public static function findUsable(string $plain): ?self
    {
        $token = static::with('user')->where('token_hash', static::hash($plain))->first();

        if (! $token || $token->revoked_at || ($token->expires_at && $token->expires_at->isPast())) {
            return null;
        }

        return $token;
    }
}
