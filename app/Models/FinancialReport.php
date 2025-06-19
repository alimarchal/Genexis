<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('fiscal_year'),
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
        if ($this->first_quarter_report) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'first_quarter_report']);
        }

        return null;
    }

    public function getHalfYearlyReportUrlAttribute(): ?string
    {
        if ($this->half_yearly_report) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'half_yearly_report']);
        }

        return null;
    }

    public function getThirdQuarterReportUrlAttribute(): ?string
    {
        if ($this->third_quarter_report) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'third_quarter_report']);
        }

        return null;
    }

    public function getAnnualReportUrlAttribute(): ?string
    {
        if ($this->annual_report) {
            return route('financial-reports.download', ['financial_report' => $this->id, 'type' => 'annual_report']);
        }

        return null;
    }
}
