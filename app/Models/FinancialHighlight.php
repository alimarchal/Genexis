<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class FinancialHighlight extends Model
{
    /** @use HasFactory<\Database\Factories\FinancialHighlightFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'fiscal_year',
        'financial_highlights',
    ];

    protected $casts = [
        'fiscal_year' => 'integer',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('fiscal_year'),
            AllowedFilter::callback('search', function ($query, $value) {
                $query->where('fiscal_year', 'like', "%{$value}%");
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
        if (! $this->financial_highlights) {
            return null;
        }

        return asset('storage/'.$this->financial_highlights);
    }
}
