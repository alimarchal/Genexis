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
                'fiscal_year' => 2013,
                'first_quarter_report' => 'financial-reports/q1-2013.xls',
                'half_yearly_report' => 'financial-reports/half-yearly-2013.xls',
                'third_quarter_report' => 'financial-reports/q3-2013.xls',
                'annual_report' => 'financial-reports/annual-2013.pdf',
            ],
             [
                'fiscal_year' => 2014,
                'first_quarter_report' => 'financial-reports/q1-2014.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2014.pdf',
                'third_quarter_report' => 'financial-reports/q3-2014.pdf',
                'annual_report' => 'financial-reports/annual-2014.pdf',
            ], [
                'fiscal_year' => 2015,
                'first_quarter_report' => 'financial-reports/q1-2015.xls',
                'half_yearly_report' => 'financial-reports/half-yearly-2015.pdf',
                'third_quarter_report' => 'financial-reports/q3-2015.xls',
                'annual_report' => 'financial-reports/annual-2015.pdf',
            ], [
                'fiscal_year' => 2016,
                'first_quarter_report' => 'financial-reports/q1-2016.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2016.pdf',
                'third_quarter_report' => 'financial-reports/q3-2016.xls',
                'annual_report' => 'financial-reports/annual-2016.pdf',
            ], [
                'fiscal_year' => 2017,
                'first_quarter_report' => 'financial-reports/q1-2017.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2017.pdf',
                'third_quarter_report' => 'financial-reports/q3-2017.pdf',
                'annual_report' => 'financial-reports/annual-2017.pdf',
            ],
             [
                'fiscal_year' => 2018,
                'first_quarter_report' => 'financial-reports/q1-2018.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2018.pdf',
                'third_quarter_report' => 'financial-reports/q3-2018.pdf',
                'annual_report' => 'financial-reports/annual-2018.pdf',
            ], [
                'fiscal_year' => 2019,
                'first_quarter_report' => 'financial-reports/q1-2019.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2019.pdf',
                'third_quarter_report' => 'financial-reports/q3-2019.pdf',
                'annual_report' => 'financial-reports/annual-2019.pdf',
            ],
            [
                'fiscal_year' => 2020,
                'first_quarter_report' => 'financial-reports/q1-2020.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2020.pdf',
                'third_quarter_report' => 'financial-reports/q3-2020.pdf',
                'annual_report' => 'financial-reports/annual-2020.pdf',
            ],
            [
                'fiscal_year' => 2021,
                'first_quarter_report' => 'financial-reports/q1-2021.pdf',
                'half_yearly_report' => 'financial-reports/half-yearly-2021.pdf',
                'third_quarter_report' => 'financial-reports/q3-2021.pdf',
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
                'third_quarter_report' => 'financial-reports/q3-2024.pdf',
                'annual_report' => 'financial-reports/annual-2024.pdf',
            ],
            //  [
            //     'fiscal_year' => 2025,
            //     'first_quarter_report' => 'financial-reports/q1-2025.pdf',
            //     'half_yearly_report' => 'financial-reports/half-yearly-2024.pdf',
            //     'third_quarter_report' => 'financial-reports/q3-2024.pdf',
            //     'annual_report' => 'financial-reports/annual-2024.pdf',
            // ],
        ];

        foreach ($financialReports as $data) {
            FinancialReport::create(array_merge($data, [
                'created_by' => 1,
                'updated_by' => 1,
            ]));
        }
    }
}