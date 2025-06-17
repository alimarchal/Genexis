<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductTypeAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_type_id' => 'required|exists:product_types,id',
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'product_type_id.required' => 'Please select a product type.',
            'product_type_id.exists' => 'The selected product type is invalid.',
            'name.required' => 'The account name is required.',
        ];
    }
}
