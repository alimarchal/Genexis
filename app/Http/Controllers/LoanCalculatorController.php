<?php

namespace App\Http\Controllers;

use App\Models\ProductScheme;
use App\Models\ProfitRate;
use Inertia\Inertia;

class LoanCalculatorController extends Controller
{
    public function index()
    {
        // Get ALL active loan types from ProductSchemes (dynamically)
        $loanTypes = ProductScheme::where('is_active', true)
            ->whereHas('productTypeAccount', function ($query) {
                $query->where('is_active', true)
                    ->whereHas('productType', function ($subQuery) {
                        $subQuery->where('is_active', true)
                            ->where('name', 'Asset'); // Only Asset products (loans), not Liability (deposits)
                    });
            })
            ->with('productTypeAccount.productType')
            ->select('id', 'name', 'description', 'product_type_account_id')
            ->get()
            ->unique('name')
            ->map(function ($scheme) {
                $limits = $this->extractLoanLimits($scheme->name);

                return [
                    'id' => $scheme->id,
                    'name' => $scheme->name,
                    'description' => $scheme->description,
                    'category' => $scheme->productTypeAccount->name,
                    'minAmount' => $limits['min'],
                    'maxAmount' => $limits['max'],
                    'minTenure' => $limits['minTenure'],
                    'maxTenure' => $limits['maxTenure'],
                    'suggestedRate' => $limits['rate'],
                    'hasInsurance' => true,
                ];
            })->values();

        // Get current active profit rates from database
        $currentRates = ProfitRate::active()
            ->current()
            ->orderBy('sort_order')
            ->select('category', 'rate')
            ->get();

        // Define insurance options
        $insuranceOptions = [
            'types' => [
                'fixed' => 'Fixed Premium',
                'percentage' => 'Percentage of Loan Amount',
            ],
            'defaults' => [
                'fixed' => 0,
                'percentage' => 0.00,
                'maxPercentage' => 100.00,
            ],
            'advance' => [
                'fixed' => 0,
                'percentage' => 0.00,
                'maxPercentage' => 100.00,
            ],
        ];

        return Inertia::render('LoanCalculator/Index', [
            'loanTypes' => $loanTypes,
            'currentRates' => $currentRates,
            'insuranceOptions' => $insuranceOptions,
        ]);
    }

    private function extractLoanLimits($loanName)
    {
        // Define loan-specific limits using rates and limits from .env file
        $defaults = [
            'min' => 50000,
            'max' => 1000000,
            'minTenure' => 12,
            'maxTenure' => 60,
            'rate' => config('bank.loan_rates.personal'),
        ];

        $name = strtolower($loanName);

        // Consumer Finances
        if (str_contains($name, 'advance salary')) {
            return [
                'min' => config('bank.loan_limits.min_advance_salary'),
                'max' => config('bank.loan_limits.max_advance_salary'),
                'minTenure' => config('bank.loan_limits.tenure_min_advance_salary'),
                'maxTenure' => config('bank.loan_limits.tenure_max_advance_salary'),
                'rate' => config('bank.loan_rates.salary'),
            ];
        }

        if (str_contains($name, 'car finance')) {
            return [
                'min' => config('bank.loan_limits.min_car'),
                'max' => config('bank.loan_limits.max_car'),
                'minTenure' => config('bank.loan_limits.tenure_min_car'),
                'maxTenure' => config('bank.loan_limits.tenure_max_car'),
                'rate' => config('bank.loan_rates.car'),
            ];
        }

        if (str_contains($name, 'motorcycle')) {
            return [
                'min' => config('bank.loan_limits.min_motorcycle'),
                'max' => config('bank.loan_limits.max_motorcycle'),
                'minTenure' => config('bank.loan_limits.tenure_min_motorcycle'),
                'maxTenure' => config('bank.loan_limits.tenure_max_motorcycle'),
                'rate' => config('bank.loan_rates.motorcycle'),
            ];
        }

        if (str_contains($name, 'house loan')) {
            return [
                'min' => config('bank.loan_limits.min_house'),
                'max' => config('bank.loan_limits.max_house'),
                'minTenure' => config('bank.loan_limits.tenure_min_house'),
                'maxTenure' => config('bank.loan_limits.tenure_max_house'),
                'rate' => config('bank.loan_rates.house'),
            ];
        }

        if (str_contains($name, 'personal loan')) {
            return [
                'min' => config('bank.loan_limits.min_personal'),
                'max' => config('bank.loan_limits.max_personal'),
                'minTenure' => config('bank.loan_limits.tenure_min_personal'),
                'maxTenure' => config('bank.loan_limits.tenure_max_personal'),
                'rate' => config('bank.loan_rates.personal'),
            ];
        }

        if (str_contains($name, 'student loan')) {
            return [
                'min' => config('bank.loan_limits.min_student'),
                'max' => config('bank.loan_limits.max_student'),
                'minTenure' => config('bank.loan_limits.tenure_min_student'),
                'maxTenure' => config('bank.loan_limits.tenure_max_student'),
                'rate' => config('bank.loan_rates.student'),
            ];
        }

        if (str_contains($name, 'gold loan')) {
            return [
                'min' => config('bank.loan_limits.min_gold'),
                'max' => config('bank.loan_limits.max_gold'),
                'minTenure' => config('bank.loan_limits.tenure_min_gold'),
                'maxTenure' => config('bank.loan_limits.tenure_max_gold'),
                'rate' => config('bank.loan_rates.gold'),
            ];
        }

        if (str_contains($name, 'home appliances')) {
            return [
                'min' => config('bank.loan_limits.min_home_appliances'),
                'max' => config('bank.loan_limits.max_home_appliances'),
                'minTenure' => config('bank.loan_limits.tenure_min_home_appliances'),
                'maxTenure' => config('bank.loan_limits.tenure_max_home_appliances'),
                'rate' => config('bank.loan_rates.home_appliances'),
            ];
        }

        if (str_contains($name, 'pension')) {
            return [
                'min' => config('bank.loan_limits.min_pension'),
                'max' => config('bank.loan_limits.max_pension'),
                'minTenure' => config('bank.loan_limits.tenure_min_pension'),
                'maxTenure' => config('bank.loan_limits.tenure_max_pension'),
                'rate' => config('bank.loan_rates.pension'),
            ];
        }

        // Commercial/SME Finances
        if (str_contains($name, 'running finance')) {
            return [
                'min' => config('bank.loan_limits.min_running_finance'),
                'max' => config('bank.loan_limits.max_running_finance'),
                'minTenure' => 6,
                'maxTenure' => 12,
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        if (str_contains($name, 'auto finance')) {
            return [
                'min' => config('bank.loan_limits.min_auto_finance'),
                'max' => config('bank.loan_limits.max_auto_finance'),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => config('bank.loan_rates.car'),
            ];
        }

        if (str_contains($name, 'demand finance')) {
            return [
                'min' => config('bank.loan_limits.min_demand_finance'),
                'max' => config('bank.loan_limits.max_demand_finance'),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        if (str_contains($name, 'house finance') || str_contains($name, 'construction finance')) {
            return [
                'min' => config('bank.loan_limits.min_construction_finance'),
                'max' => config('bank.loan_limits.max_construction_finance'),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        if (str_contains($name, 'tourism')) {
            return [
                'min' => config('bank.loan_limits.min_tourism_finance'),
                'max' => config('bank.loan_limits.max_tourism_finance'),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        if (str_contains($name, 'small business')) {
            return [
                'min' => config('bank.loan_limits.min_small_business'),
                'max' => config('bank.loan_limits.max_small_business'),
                'minTenure' => 6,
                'maxTenure' => 12,
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        if (str_contains($name, 'health') || str_contains($name, 'care')) {
            return [
                'min' => config('bank.loan_limits.min_healthcare'),
                'max' => config('bank.loan_limits.max_healthcare'),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        // Agriculture Finances
        if (str_contains($name, 'agriculture production')) {
            return [
                'min' => config('bank.loan_limits.min_agriculture_production'),
                'max' => config('bank.loan_limits.max_agriculture_production'),
                'minTenure' => config('bank.loan_limits.tenure_min_agriculture_production'),
                'maxTenure' => config('bank.loan_limits.tenure_max_agriculture_production'),
                'rate' => config('bank.loan_rates.agriculture'),
            ];
        }

        if (str_contains($name, 'agriculture development')) {
            return [
                'min' => config('bank.loan_limits.min_agriculture_development'),
                'max' => config('bank.loan_limits.max_agriculture_development'),
                'minTenure' => config('bank.loan_limits.tenure_min_agriculture_development'),
                'maxTenure' => config('bank.loan_limits.tenure_max_agriculture_development'),
                'rate' => config('bank.loan_rates.agriculture'),
            ];
        }

        // Micro Finances
        if (str_contains($name, 'micro enterprise')) {
            return [
                'min' => config('bank.loan_limits.min_micro_enterprise'),
                'max' => config('bank.loan_limits.max_micro_enterprise'),
                'minTenure' => config('bank.loan_limits.tenure_min_micro_enterprise'),
                'maxTenure' => config('bank.loan_limits.tenure_max_micro_enterprise'),
                'rate' => config('bank.loan_rates.business'),
            ];
        }

        if (str_contains($name, 'murghbani') || str_contains($name, 'poultry')) {
            return [
                'min' => config('bank.loan_limits.min_poultry'),
                'max' => config('bank.loan_limits.max_poultry'),
                'minTenure' => 6,
                'maxTenure' => 18,
                'rate' => config('bank.loan_rates.agriculture'),
            ];
        }

        return $defaults;
    }
}
