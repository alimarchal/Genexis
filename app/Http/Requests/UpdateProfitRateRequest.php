<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfitRateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category' => 'required|string|max:255',
            'rate' => 'required|numeric|between:0,99.99',
            'valid_from' => 'required|date',
            'valid_to' => 'nullable|date|after:valid_from',
            'is_active' => 'required|boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
