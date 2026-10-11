<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ContactInfoController extends Controller
{
    /**
     * Head office contact details and social links, taken from config/bank.php.
     */
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => [
            'name' => config('app.name'),
            'phone' => config('bank.contact.contact_phone'),
            'email' => config('bank.contact.contact_email'),
            'address' => config('bank.contact.contact_address'),
            'company_secretary_phone' => config('bank.contact.company_secretary_phone'),
            'hrmd_phone' => config('bank.contact.hrmd_phone'),
            'branches_count' => config('bank.stats.branches_count'),
            'social' => config('bank.social'),
        ]]);
    }
}
