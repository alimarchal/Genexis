<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;

class AnnualReport extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'annual_report_fiscal_year',
        'annual_report',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'annual_report_fiscal_year' => 'integer',
    ];

    protected $appends = [
        'annual_report_url',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('annual_report_fiscal_year'),
            AllowedFilter::callback('has_report', function ($query, $value) {
                if ($value === 'yes') {
                    return $query->whereNotNull('annual_report');
                } elseif ($value === 'no') {
                    return $query->whereNull('annual_report');
                }
                return $query;
            }),
            AllowedFilter::callback('year_range', function ($query, $value) {
                $currentYear = now()->year;
                switch ($value) {
                    case 'recent':
                        return $query->where('annual_report_fiscal_year', '>=', $currentYear - 1);
                    case 'last_5_years':
                        return $query->whereBetween('annual_report_fiscal_year', [$currentYear - 5, $currentYear - 2]);
                    case 'older':
                        return $query->where('annual_report_fiscal_year', '<', $currentYear - 5);
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
            'annual_report_fiscal_year',
            'created_at',
            'updated_at',
        ];
    }

    public function getAnnualReportUrlAttribute(): ?string
    {
        if ($this->annual_report && Storage::disk('public')->exists($this->annual_report)) {
            return route('annual-reports.download', $this->id);
        }
        return null;
    }

    /**
     * Check if report is uploaded
     */
    public function getHasReportAttribute(): bool
    {
        return !is_null($this->annual_report);
    }

    /**
     * Get year category
     */
    public function getYearCategoryAttribute(): string
    {
        $currentYear = now()->year;
        $yearDiff = $currentYear - $this->annual_report_fiscal_year;

        if ($yearDiff <= 1) {
            return 'recent';
        } elseif ($yearDiff <= 5) {
            return 'last_5_years';
        } else {
            return 'older';
        }
    }
}