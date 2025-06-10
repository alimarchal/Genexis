<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnualReportRequest extends FormRequest
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
        $annualReportId = $this->route('annual_report')->id ?? null;

        return [
            'annual_report_fiscal_year' => 'required|integer|min:2000|max:'.(date('Y') + 5).'|unique:annual_reports,annual_report_fiscal_year,'.$annualReportId,
            'annual_report' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ];
    }
}
