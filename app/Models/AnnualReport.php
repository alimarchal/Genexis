<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;

class AnnualReport extends Model
{
    /** @use HasFactory<\Database\Factories\AnnualReportFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'annual_report_fiscal_year',
        'annual_report',
    ];

    protected $casts = [
        'annual_report_fiscal_year' => 'integer',
    ];

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::exact('annual_report_fiscal_year'),
            AllowedFilter::callback('search', function ($query, $value) {
                $query->where('annual_report_fiscal_year', 'like', "%{$value}%");
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
        if (! $this->annual_report) {
            return null;
        }

        return asset('storage/'.$this->annual_report);
    }
}
