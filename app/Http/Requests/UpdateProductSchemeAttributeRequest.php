<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductSchemeAttributeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_scheme_id' => 'required|exists:product_schemes,id',
            'attribute_name' => 'required|string|max:255',
            'attribute_value' => 'required|string',
            'attribute_type' => 'required|string|in:text,number,boolean,date',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'product_scheme_id.required' => 'Please select a scheme.',
            'product_scheme_id.exists' => 'The selected scheme is invalid.',
            'attribute_name.required' => 'The attribute name is required.',
            'attribute_value.required' => 'The attribute value is required.',
            'attribute_type.required' => 'Please select an attribute type.',
        ];
    }
}