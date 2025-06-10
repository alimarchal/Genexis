<?php

namespace Database\Seeders;

use App\Models\FinancialReport;
use Illuminate\Database\Seeder;

class FinancialReportSeeder extends Seeder
{
    public function run(): void
    {
        $financialReports = [
            [
                'fiscal_year' => 2020,
                'first_quarter_report' => null,
                'half_yearly_report' => null,
                'third_quarter_report' => null,
                'annual_report' => 'financial-reports/annual-2020.pdf',
            ],
            [
                'fiscal_year' => 2021,
                'first_quarter_report' => 'financial-reports/q1-2021.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2021.pdf',
                'third_quarter_report' => null,
                'annual_report' => 'financial-reports/annual-2021.pdf',
            ],
            [
                'fiscal_year' => 2022,
                'first_quarter_report' => 'financial-reports/q1-2022.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2022.pdf',
                'third_quarter_report' => 'financial-reports/q3-2022.pdf',
                'annual_report' => 'financial-reports/annual-2022.pdf',
            ],
            [
                'fiscal_year' => 2023,
                'first_quarter_report' => 'financial-reports/q1-2023.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2023.pdf',
                'third_quarter_report' => 'financial-reports/q3-2023.pdf',
                'annual_report' => 'financial-reports/annual-2023.pdf',
            ],
            [
                'fiscal_year' => 2024,
                'first_quarter_report' => 'financial-reports/q1-2024.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2024.pdf',
                'third_quarter_report' => null,
                'annual_report' => null,
            ],
        ];

        foreach ($financialReports as $data) {
            FinancialReport::create(array_merge($data, [
                'created_by' => 1,
                'updated_by' => 1,
            ]));
        }
    }
}
