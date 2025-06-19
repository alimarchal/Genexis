<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\AllowedFilter;

class FinancialReport extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'fiscal_year',
        'first_quarter_report',
        'half_yearly_report',
        'third_quarter_report',
        'annual_report',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'fiscal_year' => 'integer',
    ];

    protected $appends = [
        'first_quarter_report_url',
        'half_yearly_report_url',
        'third_quarter_report_url',
        'annual_report_url',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('fiscal_year'),
            AllowedFilter::callback('has_reports', function ($query, $value) {
                switch ($value) {
                    case 'complete':
                        return $query->whereNotNull('first_quarter_report')
                            ->whereNotNull('half_yearly_report')
                            ->whereNotNull('third_quarter_report')
                            ->whereNotNull('annual_report');
                    case 'incomplete':
                        return $query->where(function ($q) {
                            $q->whereNull('first_quarter_report')
                                ->orWhereNull('half_yearly_report')
                                ->orWhereNull('third_quarter_report')
                                ->orWhereNull('annual_report');
                        });
                    case 'q1':
                        return $query->whereNotNull('first_quarter_report');
                    case 'half':
                        return $query->whereNotNull('half_yearly_report');
                    case 'q3':
                        return $query->whereNotNull('third_quarter_report');
                    case 'annual':
                        return $query->whereNotNull('annual_report');
                    default:
                        return $query;
                }
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

    public function getFirstQuarterReportUrlAttribute(): ?string
    {
        if ($this->first_quarter_report && Storage::disk('public')->exists($this->first_quarter_report)) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'first_quarter_report']);
        }
        return null;
    }

    public function getHalfYearlyReportUrlAttribute(): ?string
    {
        if ($this->half_yearly_report && Storage::disk('public')->exists($this->half_yearly_report)) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'half_yearly_report']);
        }
        return null;
    }

    public function getThirdQuarterReportUrlAttribute(): ?string
    {
        if ($this->third_quarter_report && Storage::disk('public')->exists($this->third_quarter_report)) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'third_quarter_report']);
        }
        return null;
    }

    public function getAnnualReportUrlAttribute(): ?string
    {
        if ($this->annual_report && Storage::disk('public')->exists($this->annual_report)) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'annual_report']);
        }
        return null;
    }

    /**
     * Get the number of uploaded reports
     */
    public function getReportsCountAttribute(): int
    {
        return collect([
            $this->first_quarter_report,
            $this->half_yearly_report,
            $this->third_quarter_report,
            $this->annual_report,
        ])->filter()->count();
    }

    /**
     * Check if all reports are uploaded
     */
    public function getIsCompleteAttribute(): bool
    {
        return $this->reports_count === 4;
    }

    /**
     * Get available report types
     */
    public function getAvailableReportsAttribute(): array
    {
        $reports = [];

        if ($this->first_quarter_report) {
            $reports[] = ['type' => 'Q1', 'url' => $this->first_quarter_report_url];
        }
        if ($this->half_yearly_report) {
            $reports[] = ['type' => 'Half-Year', 'url' => $this->half_yearly_report_url];
        }
        if ($this->third_quarter_report) {
            $reports[] = ['type' => 'Q3', 'url' => $this->third_quarter_report_url];
        }
        if ($this->annual_report) {
            $reports[] = ['type' => 'Annual', 'url' => $this->annual_report_url];
        }

        return $reports;
    }
}