<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

/**
 * Records which admin user added (created_by) and last changed (updated_by) a record.
 *
 * Changes that have no logged-in user (seeders, console commands, public visitors) leave the
 * existing values alone instead of blanking them.
 */
trait UserTracking
{
    public static function bootUserTracking(): void
    {
        static::creating(function (Model $model) {
            $model->created_by = Auth::id() ?? $model->created_by;
            $model->updated_by = Auth::id() ?? $model->updated_by;
        });

        static::updating(function (Model $model) {
            $model->updated_by = Auth::id() ?? $model->updated_by;
        });
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
