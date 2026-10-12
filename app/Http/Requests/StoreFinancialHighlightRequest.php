<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFinancialHighlightRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'financial_highlights_upload_id' => ['nullable', 'uuid'],
            'fiscal_year' => [
                'required',
                'integer',
                'min:1900',
                'max:'.(date('Y') + 5),
                Rule::unique('financial_highlights', 'fiscal_year'),
            ],
            'financial_highlights' => [
                'nullable',
                'file',
                'mimes:pdf,doc,docx,xls,xlsx,ppt,pptx',
                'max:51200',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'fiscal_year.required' => 'The fiscal year is required.',
            'fiscal_year.unique' => 'Financial highlights for this fiscal year already exist.',
            'fiscal_year.min' => 'The fiscal year must be at least 1900.',
            'fiscal_year.max' => 'The fiscal year cannot be more than 5 years in the future.',
            'financial_highlights.file' => 'The file must be a valid file.',
            'financial_highlights.mimes' => 'The file must be a PDF, Word, Excel or PowerPoint file.',
            'financial_highlights.max' => 'The file size cannot exceed 50MB when posted directly (use the large-file uploader).',
        ];
    }

    public function attributes(): array
    {
        return [
            'fiscal_year' => 'fiscal year',
            'financial_highlights' => 'financial highlights',
        ];
    }
}
