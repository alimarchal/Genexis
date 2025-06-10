<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnualReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'annual_report_fiscal_year' => 'required|integer|min:2000|max:'.(date('Y') + 5).'|unique:annual_reports,annual_report_fiscal_year',
            'annual_report' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ];
    }
}
