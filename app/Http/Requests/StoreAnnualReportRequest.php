<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAnnualReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'annual_report_fiscal_year' => [
                'required',
                'integer',
                'min:1900',
                'max:' . (date('Y') + 5),
                Rule::unique('annual_reports', 'annual_report_fiscal_year'),
            ],
            'annual_report' => [
                'nullable',
                'file',
                'mimes:pdf,doc,docx,xls,xlsx',
                'max:1048576', // 1GB
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'annual_report_fiscal_year.required' => 'The fiscal year is required.',
            'annual_report_fiscal_year.unique' => 'An annual report for this fiscal year already exists.',
            'annual_report_fiscal_year.min' => 'The fiscal year must be at least 1900.',
            'annual_report_fiscal_year.max' => 'The fiscal year cannot be more than 5 years in the future.',
            'annual_report.file' => 'The file must be a valid file.',
            'annual_report.mimes' => 'The file must be a PDF, Word document, or Excel file.',
            'annual_report.max' => 'The file size cannot exceed 1GB.',
        ];
    }

    public function attributes(): array
    {
        return [
            'annual_report_fiscal_year' => 'fiscal year',
            'annual_report' => 'annual report',
        ];
    }
}