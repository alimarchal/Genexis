<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;

class Career extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'title',
        'description',
        'requirements',
        'location',
        'document',
        'closing_date',
        'is_active',
        'is_featured',
        'views_count',
        'benefits',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'closing_date' => 'date',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'views_count' => 'integer',
    ];

    protected $appends = [
        'document_url',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::partial('location'),
            AllowedFilter::callback('is_active', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_active', true);
                if ($value === '0')
                    return $query->where('is_active', false);
                return $query;
            }),
            AllowedFilter::callback('is_featured', function ($query, $value) {
                if ($value === '1')
                    return $query->where('is_featured', true);
                if ($value === '0')
                    return $query->where('is_featured', false);
                return $query;
            }),
            AllowedFilter::callback('has_document', function ($query, $value) {
                if ($value === 'yes')
                    return $query->whereNotNull('document');
                if ($value === 'no')
                    return $query->whereNull('document');
                return $query;
            }),
            AllowedFilter::callback('closing_status', function ($query, $value) {
                $currentDate = now()->toDateString();
                switch ($value) {
                    case 'open':
                        return $query->where(function ($q) use ($currentDate) {
                            $q->whereNull('closing_date')->orWhere('closing_date', '>=', $currentDate);
                        });
                    case 'closed':
                        return $query->whereNotNull('closing_date')->where('closing_date', '<', $currentDate);
                    default:
                        return $query;
                }
            }),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'title',
            'location',
            'closing_date',
            'is_featured',
            'is_active',
            'views_count',
            'created_at',
            'updated_at',
        ];
    }

    public function getDocumentUrlAttribute(): ?string
    {
        if ($this->document && Storage::disk('public')->exists($this->document)) {
            return route('careers.download', $this->id);
        }
        return null;
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active)
            return 'inactive';

        $currentDate = now()->toDateString();

        if ($this->closing_date && $this->closing_date < $currentDate)
            return 'closed';
        return 'open';
    }

    public function getHasDocumentAttribute(): bool
    {
        return !is_null($this->document);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOpen($query)
    {
        $currentDate = now()->toDateString();
        return $query->where(function ($q) use ($currentDate) {
            $q->whereNull('closing_date')->orWhere('closing_date', '>=', $currentDate);
        });
    }

    public function incrementViews()
    {
        $this->increment('views_count');
    }
}