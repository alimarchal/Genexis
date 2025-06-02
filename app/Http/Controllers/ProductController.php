<?php

namespace App\Http\Controllers;

use App\Models\ProductTypeAccount;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function depositAccounts()
    {
        $depositAccount = ProductTypeAccount::where('name', 'Deposit Accounts')->first();

        $schemes = $depositAccount->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return Inertia::render('DepositAccounts', [
            'schemes' => $schemes,
        ]);
    }

    public function termDeposit()
    {
        $termDeposit = ProductTypeAccount::where('name', 'Term Deposit')->first();

        $schemes = $termDeposit->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return Inertia::render('TermDeposit', [
            'schemes' => $schemes,
        ]);
    }

    public function consumerFinances()
    {
        $consumerFinance = ProductTypeAccount::where('name', 'Consumer Finances')->first();

        $schemes = $consumerFinance->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return Inertia::render('ConsumerFinances', [
            'schemes' => $schemes,
        ]);
    }

    public function commercialSME()
    {
        $commercialSME = ProductTypeAccount::where('name', 'Commercial / SME Finances')->first();

        $schemes = $commercialSME->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return Inertia::render('CommercialSME', [
            'schemes' => $schemes,
        ]);
    }

    public function agriculture()
    {
        $agriculture = ProductTypeAccount::where('name', 'Agriculture Finances')->first();

        $schemes = $agriculture->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return Inertia::render('Agriculture', [
            'schemes' => $schemes,
        ]);
    }

    public function microFinance()
    {
        $microFinance = ProductTypeAccount::where('name', 'Micro Finances')->first();

        $schemes = $microFinance->productSchemes()
            ->with(['attributes' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->get();

        return Inertia::render('MicroFinance', [
            'schemes' => $schemes,
        ]);
    }
}
