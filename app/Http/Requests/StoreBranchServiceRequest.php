<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBranchServiceRequest extends FormRequest
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
            'branch_id' => 'required|exists:branches,id',
            'service_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
            'availability_hours' => 'nullable|array',
            'availability_hours.*' => 'string|max:255',
            'service_fee' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,inactive',
        ];
    }
}
