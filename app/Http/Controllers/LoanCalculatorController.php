<?php

namespace App\Http\Controllers;

use App\Models\ProductScheme;
use App\Models\ProfitRate;
use Inertia\Inertia;

class LoanCalculatorController extends Controller
{
    public function index()
    {
        // Get loan types from ProductSchemes (only loan/finance schemes, not deposit accounts)
        $loanTypes = ProductScheme::whereHas('productTypeAccount', function ($query) {
            $query->whereIn('name', [
                'Consumer Finances',
                'Commercial / SME Finances', 
                'Agriculture Finances',
                'Micro Finances'
            ]);
        })->with('productTypeAccount')
        ->select('id', 'name', 'description', 'product_type_account_id')
        ->get()
        ->unique('name') // Remove duplicates
        ->map(function ($scheme) {
            // Extract loan limits and tenure from .env based on scheme name
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
            ];
        })->values(); // Reset array keys

        // Get current active profit rates from database  
        $currentRates = ProfitRate::active()
            ->current()
            ->orderBy('sort_order')
            ->select('category', 'rate')
            ->get();

        return Inertia::render('LoanCalculator/Index', [
            'loanTypes' => $loanTypes,
            'currentRates' => $currentRates,
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
            'rate' => (float) env('LOAN_RATE_PERSONAL', 14.0),
        ];

        $name = strtolower($loanName);
        
        // Consumer Finances
        if (str_contains($name, 'advance salary')) {
            return [
                'min' => (int) env('LOAN_MIN_ADVANCE_SALARY', 10000),
                'max' => (int) env('LOAN_MAX_ADVANCE_SALARY', 3000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_ADVANCE_SALARY', 1),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_ADVANCE_SALARY', 48),
                'rate' => (float) env('LOAN_RATE_SALARY', 15.0),
            ];
        }
        
        if (str_contains($name, 'car finance')) {
            return [
                'min' => (int) env('LOAN_MIN_CAR', 100000),
                'max' => (int) env('LOAN_MAX_CAR', 3000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_CAR', 12),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_CAR', 60),
                'rate' => (float) env('LOAN_RATE_CAR', 12.5),
            ];
        }
        
        if (str_contains($name, 'motorcycle')) {
            return [
                'min' => (int) env('LOAN_MIN_MOTORCYCLE', 50000),
                'max' => (int) env('LOAN_MAX_MOTORCYCLE', 500000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_MOTORCYCLE', 12),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_MOTORCYCLE', 36),
                'rate' => (float) env('LOAN_RATE_MOTORCYCLE', 13.5),
            ];
        }
        
        if (str_contains($name, 'house loan')) {
            return [
                'min' => (int) env('LOAN_MIN_HOUSE', 500000),
                'max' => (int) env('LOAN_MAX_HOUSE', 10000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_HOUSE', 12),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_HOUSE', 240),
                'rate' => (float) env('LOAN_RATE_HOUSE', 11.5),
            ];
        }
        
        if (str_contains($name, 'personal loan')) {
            return [
                'min' => (int) env('LOAN_MIN_PERSONAL', 50000),
                'max' => (int) env('LOAN_MAX_PERSONAL', 1000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_PERSONAL', 6),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_PERSONAL', 36),
                'rate' => (float) env('LOAN_RATE_PERSONAL', 14.0),
            ];
        }
        
        if (str_contains($name, 'student loan')) {
            return [
                'min' => (int) env('LOAN_MIN_STUDENT', 100000),
                'max' => (int) env('LOAN_MAX_STUDENT', 10000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_STUDENT', 6),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_STUDENT', 24),
                'rate' => (float) env('LOAN_RATE_STUDENT', 10.0),
            ];
        }
        
        if (str_contains($name, 'gold loan')) {
            return [
                'min' => (int) env('LOAN_MIN_GOLD', 25000),
                'max' => (int) env('LOAN_MAX_GOLD', 2000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_GOLD', 6),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_GOLD', 24),
                'rate' => (float) env('LOAN_RATE_GOLD', 12.0),
            ];
        }
        
        if (str_contains($name, 'home appliances')) {
            return [
                'min' => (int) env('LOAN_MIN_HOME_APPLIANCES', 25000),
                'max' => (int) env('LOAN_MAX_HOME_APPLIANCES', 200000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_HOME_APPLIANCES', 6),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_HOME_APPLIANCES', 36),
                'rate' => (float) env('LOAN_RATE_HOME_APPLIANCES', 13.0),
            ];
        }
        
        // Commercial/SME Finances
        if (str_contains($name, 'running finance')) {
            return [
                'min' => (int) env('LOAN_MIN_RUNNING_FINANCE', 100000),
                'max' => (int) env('LOAN_MAX_RUNNING_FINANCE', 5000000),
                'minTenure' => 6,
                'maxTenure' => 12,
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        if (str_contains($name, 'auto finance')) {
            return [
                'min' => (int) env('LOAN_MIN_AUTO_FINANCE', 200000),
                'max' => (int) env('LOAN_MAX_AUTO_FINANCE', 5000000),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => (float) env('LOAN_RATE_CAR', 12.5),
            ];
        }
        
        if (str_contains($name, 'demand finance')) {
            return [
                'min' => (int) env('LOAN_MIN_DEMAND_FINANCE', 100000),
                'max' => (int) env('LOAN_MAX_DEMAND_FINANCE', 10000000),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        if (str_contains($name, 'construction finance')) {
            return [
                'min' => (int) env('LOAN_MIN_CONSTRUCTION_FINANCE', 500000),
                'max' => (int) env('LOAN_MAX_CONSTRUCTION_FINANCE', 20000000),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        if (str_contains($name, 'tourism')) {
            return [
                'min' => (int) env('LOAN_MIN_TOURISM_FINANCE', 100000),
                'max' => (int) env('LOAN_MAX_TOURISM_FINANCE', 5000000),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        if (str_contains($name, 'small business')) {
            return [
                'min' => (int) env('LOAN_MIN_SMALL_BUSINESS', 50000),
                'max' => (int) env('LOAN_MAX_SMALL_BUSINESS', 500000),
                'minTenure' => 6,
                'maxTenure' => 12,
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        if (str_contains($name, 'health') || str_contains($name, 'care')) {
            return [
                'min' => (int) env('LOAN_MIN_HEALTHCARE', 100000),
                'max' => (int) env('LOAN_MAX_HEALTHCARE', 10000000),
                'minTenure' => 12,
                'maxTenure' => 60,
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        // Agriculture Finances
        if (str_contains($name, 'agriculture production')) {
            return [
                'min' => (int) env('LOAN_MIN_AGRICULTURE_PRODUCTION', 10000),
                'max' => (int) env('LOAN_MAX_AGRICULTURE_PRODUCTION', 200000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_AGRICULTURE_PRODUCTION', 3),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_AGRICULTURE_PRODUCTION', 12),
                'rate' => (float) env('LOAN_RATE_AGRICULTURE', 11.0),
            ];
        }
        
        if (str_contains($name, 'agriculture development')) {
            return [
                'min' => (int) env('LOAN_MIN_AGRICULTURE_DEVELOPMENT', 50000),
                'max' => (int) env('LOAN_MAX_AGRICULTURE_DEVELOPMENT', 1000000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_AGRICULTURE_DEVELOPMENT', 12),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_AGRICULTURE_DEVELOPMENT', 60),
                'rate' => (float) env('LOAN_RATE_AGRICULTURE', 11.0),
            ];
        }
        
        // Micro Finances
        if (str_contains($name, 'micro enterprise')) {
            return [
                'min' => (int) env('LOAN_MIN_MICRO_ENTERPRISE', 10000),
                'max' => (int) env('LOAN_MAX_MICRO_ENTERPRISE', 100000),
                'minTenure' => (int) env('LOAN_TENURE_MIN_MICRO_ENTERPRISE', 6),
                'maxTenure' => (int) env('LOAN_TENURE_MAX_MICRO_ENTERPRISE', 36),
                'rate' => (float) env('LOAN_RATE_BUSINESS', 13.5),
            ];
        }
        
        if (str_contains($name, 'murghbani') || str_contains($name, 'poultry')) {
            return [
                'min' => (int) env('LOAN_MIN_POULTRY', 15000),
                'max' => (int) env('LOAN_MAX_POULTRY', 50000),
                'minTenure' => 6,
                'maxTenure' => 18,
                'rate' => (float) env('LOAN_RATE_AGRICULTURE', 11.0),
            ];
        }

        return $defaults;
    }
}
