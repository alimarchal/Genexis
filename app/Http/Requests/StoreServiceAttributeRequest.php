<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceAttributeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'service_id' => 'required|exists:services,id',
            'attribute_name' => 'required|string|max:255',
            'attribute_value' => 'required|string|max:5000',
            'sort_order' => 'integer|min:0|max:999',
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required' => 'Please select a service.',
            'service_id.exists' => 'The selected service is invalid.',
            'attribute_name.required' => 'The attribute name is required.',
            'attribute_name.max' => 'The attribute name cannot exceed 255 characters.',
            'attribute_value.required' => 'The attribute value is required.',
            'attribute_value.max' => 'The attribute value cannot exceed 5000 characters.',
            'sort_order.integer' => 'The sort order must be a number.',
            'sort_order.min' => 'The sort order must be at least 0.',
            'sort_order.max' => 'The sort order cannot exceed 999.',
        ];
    }
}