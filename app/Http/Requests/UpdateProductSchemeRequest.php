<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductSchemeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_type_account_id' => 'required|exists:product_type_accounts,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'product_type_account_id.required' => 'Please select an account.',
            'product_type_account_id.exists' => 'The selected account is invalid.',
            'name.required' => 'The scheme name is required.',
        ];
    }
}
