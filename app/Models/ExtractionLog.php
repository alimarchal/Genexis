<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExtractionLog extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id', 'api_token_id', 'dataset', 'format', 'filters', 'page', 'per_page',
        'records_returned', 'records_matching', 'ip_address', 'user_agent',
    ];

    protected function casts(): array
    {
        return ['filters' => 'array'];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
