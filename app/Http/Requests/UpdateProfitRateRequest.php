<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfitRateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => 'required|string|max:255',
            'rate' => 'required|numeric|between:0,99.99',
            'valid_from' => 'required|date',
            'valid_to' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'category.required' => 'The category is required.',
            'rate.required' => 'The profit rate is required.',
            'rate.between' => 'The profit rate must be between 0 and 99.99.',
            'valid_from.required' => 'The valid from date is required.',
            'valid_to.after_or_equal' => 'The valid to date must be after or equal to the valid from date.',
            'sort_order.min' => 'The sort order must be at least 0.',
        ];
    }
}