<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class RateController extends Controller
{
    /**
     * Headline loan and deposit rates (percent per annum).
     */
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'loan' => config('bank.loan_rates'),
            'deposit' => config('bank.deposit_rates'),
        ]]);
    }
}
