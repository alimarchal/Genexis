<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\QueryBuilder\AllowedFilter;
use App\Models\Management; // Import the Management model

class BodCommittee extends Model
{
    /** @use HasFactory<\Database\Factories\BodCommitteeFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'name',
        'description',
        'chairman_board_id',
        'secretary_board_id',
        'secretary_management_id',
        'board_members',
        'management_members',
        'is_active',
        'sort_order',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'board_members' => 'array',
        'management_members' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    // Relationships
    public function chairmanBoard(): BelongsTo
    {
        return $this->belongsTo(BoardOfDirector::class, 'chairman_board_id');
    }

    public function secretaryBoard(): BelongsTo
    {
        return $this->belongsTo(BoardOfDirector::class, 'secretary_board_id');
    }

    public function secretaryManagement(): BelongsTo
    {
        return $this->belongsTo(Management::class, 'secretary_management_id');
    }

    // Get board members
    public function getBoardMembersListAttribute()
    {
        if (!$this->board_members)
            return collect();

        return BoardOfDirector::whereIn('id', $this->board_members)
            ->where('is_active', true)
            ->get();
    }

    // Get management members
    public function getManagementMembersListAttribute()
    {
        if (!$this->management_members)
            return collect();

        return Management::whereIn('id', $this->management_members)
            ->where('status', 'active')
            ->get();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    // Spatie Query Builder Methods
    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
            AllowedFilter::partial('description'),
            AllowedFilter::callback('is_active', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_active', true);
                if ($value === '0')
                    return $query->where('is_active', false);
                return $query;
            }),
            AllowedFilter::callback('has_chairman', function ($query, $value) {
                if ($value === 'yes')
                    return $query->whereNotNull('chairman_board_id');
                if ($value === 'no')
                    return $query->whereNull('chairman_board_id');
                return $query;
            }),
            AllowedFilter::callback('has_secretary', function ($query, $value) {
                if ($value === 'yes')
                    return $query->where(function ($q) {
                        $q->whereNotNull('secretary_board_id')
                            ->orWhereNotNull('secretary_management_id');
                    });
                if ($value === 'no')
                    return $query->whereNull('secretary_board_id')
                        ->whereNull('secretary_management_id');
                return $query;
            }),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'sort_order',
            'is_active',
            'created_at',
            'updated_at',
        ];
    }

    // Status attribute for easier access
    public function getStatusAttribute(): string
    {
        return $this->is_active ? 'active' : 'inactive';
    }

    // Get secretary name (could be from board or management)
    public function getSecretaryNameAttribute(): ?string
    {
        if ($this->secretaryBoard) {
            return $this->secretaryBoard->full_name;
        }

        if ($this->secretaryManagement) {
            return $this->secretaryManagement->full_name;
        }

        return null;
    }

    // Get secretary type
    public function getSecretaryTypeAttribute(): ?string
    {
        if ($this->secretaryBoard) {
            return 'board';
        }

        if ($this->secretaryManagement) {
            return 'management';
        }

        return null;
    }

    // Convenient accessor methods
    public function getChairmanAttribute()
    {
        return $this->chairmanBoard;
    }

    public function getSecretaryAttribute()
    {
        return $this->secretaryBoard ?: $this->secretaryManagement;
    }

    public function getMembersAttribute()
    {
        return $this->board_members_list->merge($this->management_members_list);
    }
}
