<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFinancialReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fiscal_year' => [
                'required',
                'integer',
                'min:1900',
                'max:' . (date('Y') + 5),
                Rule::unique('financial_reports', 'fiscal_year')->ignore($this->route('financial_report')),
            ],
            'first_quarter_report' => [
                'nullable',
                'file',
                'mimes:pdf,doc,docx,xls,xlsx',
                'max:1048576', // 1GB
            ],
            'half_yearly_report' => [
                'nullable',
                'file',
                'mimes:pdf,doc,docx,xls,xlsx',
                'max:1048576', // 1GB
            ],
            'third_quarter_report' => [
                'nullable',
                'file',
                'mimes:pdf,doc,docx,xls,xlsx',
                'max:1048576', // 1GB
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
            'fiscal_year.required' => 'The fiscal year is required.',
            'fiscal_year.unique' => 'A financial report for this fiscal year already exists.',
            'fiscal_year.min' => 'The fiscal year must be at least 1900.',
            'fiscal_year.max' => 'The fiscal year cannot be more than 5 years in the future.',
            '*.file' => 'The file must be a valid file.',
            '*.mimes' => 'The file must be a PDF, Word document, or Excel file.',
            '*.max' => 'The file size cannot exceed 1GB.',
        ];
    }

    public function attributes(): array
    {
        return [
            'fiscal_year' => 'fiscal year',
            'first_quarter_report' => 'first quarter report',
            'half_yearly_report' => 'half yearly report',
            'third_quarter_report' => 'third quarter report',
            'annual_report' => 'annual report',
        ];
    }
}