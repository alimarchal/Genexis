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
                'annual_report_fiscal_year' => 2016,
                'annual_report' => 'annual-reports/Annual-Report-2016.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2017,
                'annual_report' => 'annual-reports/Annual-Report-2017.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2018,
                'annual_report' => 'annual-reports/Annual-Report-2018.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2019,
                'annual_report' => 'annual-reports/Annual-Report-2019.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2020,
                'annual_report' => 'annual-reports/Annual-Report-2020.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2021,
                'annual_report' => 'annual-reports/Annual-Report-2021.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2022,
                'annual_report' => 'annual-reports/Annual-Report-2022.pdf',
            ],
            [
                'annual_report_fiscal_year' => 2023,
                'annual_report' => 'annual-reports/Annual-Report-2023.pdf',
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
