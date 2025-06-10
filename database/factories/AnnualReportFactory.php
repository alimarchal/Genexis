<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnnualReport>
 */
class AnnualReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = fake()->unique()->numberBetween(2000, 2030);
        $hasReport = fake()->boolean(70); // 70% chance of having a report

        return [
            'annual_report_fiscal_year' => $year,
            'annual_report' => $hasReport ? 'annual-reports/annual-'.$year.'.pdf' : null,
        ];
    }
}
