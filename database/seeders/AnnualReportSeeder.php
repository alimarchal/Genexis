<?php

namespace Database\Seeders;

use App\Models\AnnualReport;
use Illuminate\Database\Seeder;

class AnnualReportSeeder extends Seeder
{
    public function run(): void
    {
        $reports = [
            [
                'annual_report_fiscal_year' => 2020,
                'annual_report' => 'annual-reports/annual-2020.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2021,
                'annual_report' => 'annual-reports/annual-2021.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2022,
                'annual_report' => 'annual-reports/annual-2022.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2023,
                'annual_report' => 'annual-reports/annual-2023.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2024,
                'annual_report' => null,
            ],
        ];

        foreach ($reports as $report) {
            AnnualReport::create($report);
        }
    }
}
