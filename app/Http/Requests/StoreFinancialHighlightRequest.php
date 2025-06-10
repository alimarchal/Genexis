<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFinancialHighlightRequest extends FormRequest
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
            'fiscal_year' => 'required|integer|min:2000|max:'.(date('Y') + 5).'|unique:financial_highlights,fiscal_year',
            'financial_highlights' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ];
    }
}
