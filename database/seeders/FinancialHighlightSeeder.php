<?php

namespace Database\Seeders;

use App\Models\FinancialHighlight;
use Illuminate\Database\Seeder;

class FinancialHighlightSeeder extends Seeder
{
    public function run(): void
    {
        $highlights = [
            // [
            //     'fiscal_year' => 2020,
            //     'financial_highlights' => 'financial-highlights/highlights-2020.pdf',
            // ],
            // [
            //     'fiscal_year' => 2021,
            //     'financial_highlights' => 'financial-highlights/highlights-2021.pdf',
            // ],
            [
                'fiscal_year' => 2022,
                'financial_highlights' => 'financial-highlights/Financial Highlight-2022.pptx',
            ],
            // [
            //     'fiscal_year' => 2023,
            //     'financial_highlights' => 'financial-highlights/highlights-2023.pdf',
            // ],
            // [
            //     'fiscal_year' => 2024,
            //     'financial_highlights' => 'financial-highlights/highlights-2024.pdf',
            // ],
        ];

        foreach ($highlights as $highlight) {
            FinancialHighlight::create($highlight);
        }
    }
}
