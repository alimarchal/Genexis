<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FinancialReport>
 */
class FinancialReportFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fiscal_year' => fake()->unique()->numberBetween(2015, 2030),
            'first_quarter_report' => fake()->optional(0.7)->randomElement([
                'financial-reports/q1-2024.pdf',
                'financial-reports/first-quarter.pdf',
            ]),
            'half_yearly_report' => fake()->optional(0.8)->randomElement([
                'financial-reports/half-yearly-2024.pdf',
                'financial-reports/mid-year-report.pdf',
            ]),
            'third_quarter_report' => fake()->optional(0.6)->randomElement([
                'financial-reports/q3-2024.pdf',
                'financial-reports/third-quarter.pdf',
            ]),
            'annual_report' => fake()->optional(0.9)->randomElement([
                'financial-reports/annual-2024.pdf',
                'financial-reports/yearly-report.pdf',
            ]),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
