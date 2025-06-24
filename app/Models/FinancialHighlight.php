<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;

class FinancialHighlight extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'fiscal_year',
        'financial_highlights',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'fiscal_year' => 'integer',
    ];

    protected $appends = [
        'financial_highlights_url',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::callback('fiscal_year', function ($query, $value) {
                $dbDriver = config('database.default');

                if ($dbDriver === 'pgsql') {
                    return $query->whereRaw("CAST(fiscal_year AS TEXT) LIKE ?", ["%{$value}%"]);
                } else {
                    return $query->whereRaw("CAST(fiscal_year AS CHAR) LIKE ?", ["%{$value}%"]);
                }
            }),
            AllowedFilter::callback('has_highlights', function ($query, $value) {
                if ($value === 'yes') {
                    return $query->whereNotNull('financial_highlights');
                } elseif ($value === 'no') {
                    return $query->whereNull('financial_highlights');
                }
                return $query;
            }),
            AllowedFilter::callback('year_range', function ($query, $value) {
                $currentYear = now()->year;
                switch ($value) {
                    case 'recent':
                        return $query->where('fiscal_year', '>=', $currentYear - 1);
                    case 'last_5_years':
                        return $query->whereBetween('fiscal_year', [$currentYear - 5, $currentYear - 2]);
                    case 'older':
                        return $query->where('fiscal_year', '<', $currentYear - 5);
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
            'fiscal_year',
            'created_at',
            'updated_at',
        ];
    }

    public function getFinancialHighlightsUrlAttribute(): ?string
    {
        if ($this->financial_highlights && Storage::disk('public')->exists($this->financial_highlights)) {
            return route('financial-highlights.download', $this->id);
        }
        return null;
    }

    public function getHasHighlightsAttribute(): bool
    {
        return !is_null($this->financial_highlights);
    }

    public function getYearCategoryAttribute(): string
    {
        $currentYear = now()->year;
        $yearDiff = $currentYear - $this->fiscal_year;

        if ($yearDiff <= 1) {
            return 'recent';
        } elseif ($yearDiff <= 5) {
            return 'last_5_years';
        } else {
            return 'older';
        }
    }
}