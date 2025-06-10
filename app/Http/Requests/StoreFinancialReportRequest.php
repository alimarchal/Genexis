<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFinancialReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fiscal_year' => ['required', 'integer', 'min:1900', 'max:'.(date('Y') + 10), 'unique:financial_reports,fiscal_year'],
            'first_quarter_report' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
            'half_yearly_report' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
            'third_quarter_report' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
            'annual_report' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
        ];
    }

    public function messages(): array
    {
        return [
            'fiscal_year.required' => 'The fiscal year field is required.',
            'fiscal_year.unique' => 'A financial report for this fiscal year already exists.',
            'fiscal_year.min' => 'The fiscal year must be at least 1900.',
            'fiscal_year.max' => 'The fiscal year cannot be more than '.(date('Y') + 10).'.',
            '*.mimes' => 'The file must be a PDF or image file (jpg, jpeg, png).',
            '*.max' => 'The file may not be greater than 10MB.',
        ];
    }
}
