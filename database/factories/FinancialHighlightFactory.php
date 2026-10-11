<?php

namespace Database\Factories;

use App\Models\FinancialHighlight;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FinancialHighlight>
 */
class FinancialHighlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = fake()->unique()->numberBetween(2000, 2030);
        $hasHighlights = fake()->boolean(80); // 80% chance of having highlights

        return [
            'fiscal_year' => $year,
            'financial_highlights' => $hasHighlights ? 'financial-highlights/highlights-'.$year.'.pdf' : null,
        ];
    }
}
