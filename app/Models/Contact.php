<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    /** @use HasFactory<\Database\Factories\ContactFactory> */
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'contact',
        'type',
        'status',
    ];

    protected $casts = [
        'type' => 'string',
        'status' => 'string',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function getFormattedContactAttribute(): string
    {
        return match ($this->type) {
            'email' => $this->contact,
            'telephone_no', 'mobile_no', 'whatsapp' => $this->formatPhoneNumber($this->contact),
            'fax' => "Fax: {$this->contact}",
            default => $this->contact,
        };
    }

    private function formatPhoneNumber(?string $phone): string
    {
        if (! $phone) {
            return '';
        }

        return preg_replace('/(\d{4})(\d{7})/', '$1-$2', $phone) ?: $phone;
    }
}
